# Database Architecture - Dev & Prod Separation

## Complete System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT FLOW                          │
└─────────────────────────────────────────────────────────────┘

1. Developer pushes to `github` branch
   ↓
2. GitHub Actions deploys to DEV Netlify
   https://dev-krown-properties.netlify.app
   ↓
3. User submits form on DEV site
   ↓
4. Netlify Function uses DEV environment variables:
   - SUPABASE_URL (DEV)
   - SUPABASE_SERVICE_KEY (DEV)
   ↓
5. Data saved to DEV Supabase Database
   Project: krown-properties-dev
   ✓ Safe to test and experiment
   ✓ Can delete test data anytime


┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION FLOW                           │
└─────────────────────────────────────────────────────────────┘

1. Developer promotes `github` → `main` via GitHub Actions
   ↓
2. GitHub Actions deploys to PROD Netlify
   https://krownproperties.co.nz
   ↓
3. Customer submits form on PROD site
   ↓
4. Netlify Function uses PROD environment variables:
   - SUPABASE_URL (PROD)
   - SUPABASE_SERVICE_KEY (PROD)
   ↓
5. Data saved to PROD Supabase Database
   Project: krown-properties-prod
   ✓ Real customer data
   ✓ Never delete without backup


┌─────────────────────────────────────────────────────────────┐
│                    ENVIRONMENT ISOLATION                     │
└─────────────────────────────────────────────────────────────┘

DEV Environment:
├── Netlify Site: dev-krown-properties
├── GitHub Branch: github
├── Supabase Project: krown-properties-dev
├── Database Tables:
│   ├── enquiries (test data)
│   └── newsletter_subscribers (test emails)
└── Use Case: Testing new features

PROD Environment:
├── Netlify Site: krown-properties (krownproperties.co.nz)
├── GitHub Branch: main
├── Supabase Project: krown-properties-prod
├── Database Tables:
│   ├── enquiries (real customer data)
│   └── newsletter_subscribers (real subscriber emails)
└── Use Case: Live website serving real customers


┌─────────────────────────────────────────────────────────────┐
│                    DATA FLOW DIAGRAM                         │
└─────────────────────────────────────────────────────────────┘

Website Form Submission:
  ↓
JavaScript (js/forms.js)
  ↓
Netlify Function
  ├─ If DEV site:
  │   └─ Uses process.env.SUPABASE_URL (DEV)
  │   └─ Uses process.env.SUPABASE_SERVICE_KEY (DEV)
  │   └─ Saves to DEV database
  │
  └─ If PROD site:
      └─ Uses process.env.SUPABASE_URL (PROD)
      └─ Uses process.env.SUPABASE_SERVICE_KEY (PROD)
      └─ Saves to PROD database


┌─────────────────────────────────────────────────────────────┐
│                    SECURITY BEST PRACTICES                   │
└─────────────────────────────────────────────────────────────┘

✅ DO:
- Use separate databases for dev and prod
- Set environment variables in Netlify (server-side only)
- Use service_role key only in Netlify Functions (never client-side)
- Regularly export PROD data as backup
- Test thoroughly in DEV before promoting to PROD

❌ DON'T:
- Never commit API keys to GitHub
- Never use PROD credentials in DEV
- Never delete PROD data without backup
- Never expose service_role key in frontend JavaScript
- Never share PROD database password


┌─────────────────────────────────────────────────────────────┐
│                    WORKFLOW EXAMPLE                          │
└─────────────────────────────────────────────────────────────┘

Scenario: Adding a new form field

1. Update form HTML locally
2. Update submit-enquiry.js to handle new field
3. Update Supabase schema.sql with new column
4. Commit and push to `github` branch
   → Auto-deploys to DEV

5. In Supabase DEV: Run SQL to add new column
6. Test form on DEV site
7. Verify new field saves in DEV database

8. Once tested: Promote github → main via GitHub Actions
   → Auto-deploys to PROD

9. In Supabase PROD: Run SAME SQL to add column
10. New field now works on production!

Benefits of this workflow:
✓ Never break production
✓ Test with real environment before going live
✓ Easy to rollback if something goes wrong
