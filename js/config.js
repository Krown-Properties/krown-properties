// Supabase credentials
var SUPABASE_URL = 'https://wedyxdwjgtacplkbzjne.supabase.co';
var SUPABASE_ANON_KEY = 'sb_publishable_TAJm7-CNL3ZxHb-nIjUs9Q_AMG_C';

// Environment configuration
// Automatically detects dev vs production

var ENV_CONFIG = {
  isDev: window.location.hostname.includes('dev') ||
         window.location.hostname.includes('localhost') ||
         window.location.hostname.includes('netlify.app'),

  // API endpoints (for future database integration)
  apiUrl: function() {
    if (this.isDev) {
      return 'https://dev-api.krownproperties.co.nz';
    } else {
      return 'https://api.krownproperties.co.nz';
    }
  },

  // Analytics (don't track in dev)
  enableAnalytics: function() {
    return !this.isDev;
  },

  // Debug mode
  debug: function() {
    return this.isDev;
  }
};

// Example usage:
if (ENV_CONFIG.debug()) {
  console.log('Running in DEV mode');
}
