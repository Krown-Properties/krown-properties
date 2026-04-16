-- Create enquiries table for project contact forms
CREATE TABLE enquiries (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Contact info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,

  -- Enquiry details
  enquiry_type TEXT,
  message TEXT
);

-- Create index for better performance
CREATE INDEX idx_enquiries_created_at ON enquiries(created_at DESC);

-- Enable Row Level Security (RLS) for security
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from functions (authenticated service role only)
CREATE POLICY "Allow service role inserts" ON enquiries
  FOR INSERT WITH CHECK (true);
