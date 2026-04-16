// Netlify Function to handle newsletter signups
const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse form data
    const data = JSON.parse(event.body);

    // Validate email
    if (!data.email || !data.email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Valid email address is required'
        })
      };
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    // Insert newsletter subscription (upsert to handle duplicates)
    const { data: subscriber, error } = await supabase
      .from('newsletter_subscribers')
      .upsert(
        {
          email: data.email.toLowerCase().trim(),
          subscribed: true,
          source: 'website'
        },
        {
          onConflict: 'email',
          ignoreDuplicates: false
        }
      )
      .select()
      .single();

    if (error) {
      // Handle duplicate email gracefully
      if (error.code === '23505') {
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            success: true,
            message: 'You are already subscribed to our newsletter!'
          })
        };
      }

      console.error('Supabase error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to subscribe' })
      };
    }

    // Success response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Successfully subscribed! Thank you for signing up.'
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error',
        details: error.message
      })
    };
  }
};
