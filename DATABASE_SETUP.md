# Database Integration Setup Guide

This guide shows you how to set up **separate databases** for Development and Production.

## 🎯 Architecture

```
Development Environment:
├── Dev Website (dev-krown-properties.netlify.app)
└── Dev Database (Supabase DEV project)

Production Environment:
├── Production Website (krownproperties.co.nz)
└── Production Database (Supabase PROD project)
```

✅ **Why separate databases?**
- Test data doesn't mix with real customer data
- Safe to experiment in dev without affecting production
- Can reset dev database anytime

---

## 🔧 Complete Setup (20 minutes)

### Step 1: Create DEV Supabase Project (5 min)

1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub
3. Click **"New project"**
   - **Organization:** `krown-properties` (or create new)
   - **Name:** `krown-properties-dev`
   - **Database Password:** (create strong password - SAVE IT!)
   - **Region:** `ap-southeast-1` (Singapore)
   - Click **"Create new project"**
4. ⏱️ Wait 2-3 minutes

### Step 2: Create PROD Supabase Project (5 min)

1. In Supabase dashboard, click organization name (top left)
2. Click **"New project"**
   - **Name:** `krown-properties-prod`
   - **Database Password:** (different from dev - SAVE IT!)
   - **Region:** `ap-southeast-1` (Singapore)
   - Click **"Create new project"**
3. ⏱️ Wait 2-3 minutes

---

### Step 3: Set Up DEV Database Tables (3 min)

1. In Supabase, select **`krown-properties-dev`** project (dropdown, top left)
2. Click **"SQL Editor"** (left sidebar)
3. Click **"+ New query"**
4. Open `supabase/schema.sql` from your project folder
5. Copy ALL the SQL code
6. Paste into Supabase SQL Editor
7. Click **"Run"** button
8. ✅ "Success. No rows returned"

### Step 4: Set Up PROD Database Tables (2 min)

1. Switch to **`krown-properties-prod`** project (dropdown, top left)
2. Click **"SQL Editor"**
3. Click **"+ New query"**
4. Paste the SAME SQL from `supabase/schema.sql`
5. Click **"Run"**
6. ✅ "Success. No rows returned"

---

### Step 5: Get DEV API Credentials (2 min)

1. Select **`krown-properties-dev`** project
2. Click **Settings** ⚙️ (bottom left)
3. Click **"API"** in sidebar
4. Copy and save these:

```
DEV Project URL: https://xxxxx.supabase.co
DEV anon key: eyJhbGc...
DEV service_role key: eyJhbGc... (Click "Reveal")
```

### Step 6: Get PROD API Credentials (2 min)

1. Switch to **`krown-properties-prod`** project
2. Click **Settings** → **"API"**
3. Copy and save these:

```
PROD Project URL: https://yyyyy.supabase.co
PROD anon key: eyJhbGc...
PROD service_role key: eyJhbGc... (Click "Reveal")
```

⚠️ **Keep service_role keys SECRET - never commit to GitHub!**

---

### Step 7: Add Environment Variables to Netlify DEV Site (3 min)

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click your **DEV site** (`dev-krown-properties`)
3. Go to **Site settings** → **Environment variables**
4. Click **"Add a variable"** for each:

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | DEV Project URL (from Step 5) |
| `SUPABASE_SERVICE_KEY` | DEV service_role key (from Step 5) |

5. Click **"Save"**

### Step 8: Add Environment Variables to Netlify PROD Site (3 min)

1. Still in [app.netlify.com](https://app.netlify.com)
2. Click your **PRODUCTION site** (`krown-properties`)
3. Go to **Site settings** → **Environment variables**
4. Click **"Add a variable"** for each:

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | PROD Project URL (from Step 6) |
| `SUPABASE_SERVICE_KEY` | PROD service_role key (from Step 6) |

5. Click **"Save"**

---

### Step 9: Deploy (5 min)

```bash
cd C:/Users/yesha/krown-properties

# Install npm packages
npm install

# Commit all changes
git add .
git commit -m "Add database integration with Supabase

- Created Netlify Functions for enquiries and newsletter
- Added Supabase database schema
- Integrated forms with serverless functions
- Separate databases for dev and prod environments

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"

# Push to github branch (dev)
git push origin github
```

**Wait 1-2 minutes for DEV deployment**

Then **promote to production:**
1. Go to [Actions](https://github.com/YeshaJK/krown-properties/actions)
2. Click **"Promote Development to Production"**
3. Click **"Run workflow"** → `github` branch
4. Click green button
5. ✅ Wait for deployment

---

## 🧪 Test Both Environments

### Test DEV Environment

1. **Go to:** https://dev-krown-properties.netlify.app/currentProjects
2. **Newsletter form:**
   - Enter test email: `test-dev@example.com`
   - Click Subscribe
   - ✅ Success message

3. **Verify in Supabase DEV:**
   - Switch to `krown-properties-dev` project
   - Table Editor → `newsletter_subscribers`
   - Should see `test-dev@example.com`

4. **Test enquiry form:**
   - Go to any project detail page
   - Fill enquiry form
   - Submit
   - ✅ Success message

5. **Verify in Supabase DEV:**
   - Table Editor → `enquiries`
   - Should see your test enquiry

### Test PROD Environment

1. **Go to:** https://krownproperties.co.nz/currentProjects
2. **Newsletter form:**
   - Enter real email
   - Click Subscribe
   - ✅ Success message

3. **Verify in Supabase PROD:**
   - Switch to `krown-properties-prod` project
   - Table Editor → `newsletter_subscribers`
   - Should see real email

---

## 📊 Managing Your Data

### View DEV Data

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select **`krown-properties-dev`**
3. Click **Table Editor**
4. View `enquiries` and `newsletter_subscribers`

### View PROD Data (Real Customers)

1. Select **`krown-properties-prod`**
2. Click **Table Editor**
3. View real customer data

### Export Data

1. In Table Editor, click table
2. Click **"..."** menu (top right)
3. **"Export as CSV"**

### Clear DEV Data (Safe to do anytime)

```sql
-- In Supabase DEV SQL Editor:
DELETE FROM enquiries;
DELETE FROM newsletter_subscribers;
```

⚠️ **Never run DELETE on PROD database!**

---

## 📋 Environment Variables Summary

Make sure these are set correctly:

### DEV Site (`dev-krown-properties.netlify.app`)
```
SUPABASE_URL = https://xxxxx.supabase.co (DEV project)
SUPABASE_SERVICE_KEY = eyJhbGc... (DEV service key)
```

### PROD Site (`krownproperties.co.nz`)
```
SUPABASE_URL = https://yyyyy.supabase.co (PROD project)
SUPABASE_SERVICE_KEY = eyJhbGc... (PROD service key)
```

---

## 🔄 Daily Workflow

```
1. Test new features in DEV
   ├─ Submit test forms
   ├─ Check DEV database
   └─ Verify everything works

2. Promote to PROD when ready
   ├─ GitHub Actions → "Promote to Production"
   └─ Real customer data goes to PROD database

3. Monitor PROD data
   ├─ Check Supabase PROD daily
   ├─ Export customer enquiries
   └─ Follow up with leads
```

---

## 🛠️ Future Enhancements

### 1. Email Notifications (PROD only)
Get notified when real customers submit enquiries:
```javascript
// In submit-enquiry.js, after successful insert:
if (process.env.CONTEXT === 'production') {
  // Send email notification
  await sendEmail({
    to: 'krownproperties@krown.co.nz',
    subject: 'New Enquiry - ' + data.projectName,
    body: // enquiry details
  });
}
```

### 2. Admin Dashboard
Build simple dashboard to manage enquiries:
- Use Supabase Auth for login
- Show enquiries from PROD database
- Mark as contacted/qualified/closed

### 3. Analytics
Track form conversion rates:
- How many visitors
- How many submit enquiries
- Which projects get most interest

---

## 🆘 Troubleshooting

### "Function not found"
- Redeploy site after adding environment variables
- Check Netlify Functions tab shows your functions

### DEV form submits to PROD database (or vice versa)
- Check environment variables in Netlify site settings
- Verify each site has correct SUPABASE_URL
- Redeploy after fixing

### Can't see data in Supabase
- Make sure you're viewing correct project (dev vs prod)
- Check project switcher (top left dropdown)
- Try refreshing table

### Form shows error message
- Open browser console (F12)
- Check Network tab for error details
- Verify environment variables are set

---

## ✅ Setup Checklist

- [ ] Created Supabase DEV project (`krown-properties-dev`)
- [ ] Created Supabase PROD project (`krown-properties-prod`)
- [ ] Ran schema SQL in DEV database
- [ ] Ran schema SQL in PROD database
- [ ] Got DEV API credentials (URL + service key)
- [ ] Got PROD API credentials (URL + service key)
- [ ] Added DEV credentials to Netlify DEV site
- [ ] Added PROD credentials to Netlify PROD site
- [ ] Installed dependencies (`npm install`)
- [ ] Committed and pushed code
- [ ] Promoted to production
- [ ] Tested DEV newsletter ✅
- [ ] Tested DEV enquiry ✅
- [ ] Tested PROD newsletter ✅
- [ ] Tested PROD enquiry ✅
- [ ] Verified data in both databases ✅

---

## 🎉 You're Done!

```bash
cd C:/Users/yesha/krown-properties

# Install npm packages
npm install

# Commit all changes
git add .
git commit -m "Add database integration with Supabase

- Created Netlify Functions for enquiries and newsletter
- Added Supabase database schema
- Integrated forms with serverless functions
- Added client-side form handlers

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"

# Push to github branch (dev)
git push origin github
```

**Wait 1-2 minutes for deployment to complete**

---

### Step 6: Promote to Production (1 min)

1. Go to [github.com/YeshaJK/krown-properties/actions](https://github.com/YeshaJK/krown-properties/actions)
2. Click **"Promote Development to Production"**
3. Click **"Run workflow"** → Select `github` branch
4. Click green **"Run workflow"** button
5. ✅ Wait for deployment to complete

---

## 🧪 Test Your Forms

### Test Newsletter Signup

1. Go to: https://krownproperties.co.nz/currentProjects
2. Scroll to newsletter form at bottom
3. Enter your email
4. Click **"Subscribe"**
5. ✅ Should see success message

**Verify in Supabase:**
1. Supabase dashboard → **Table Editor**
2. Select `newsletter_subscribers`
3. Your email should appear!

### Test Project Enquiry

1. Go to: https://krownproperties.co.nz/project?id=arundel
2. Scroll to "Enquire Now" form
3. Fill out:
   - First Name
   - Last Name
   - Email
   - Phone (optional)
   - Type: Select one
   - Message (optional)
4. Click **"Submit Enquiry"**
5. ✅ Should see success message

**Verify in Supabase:**
1. Table Editor → `enquiries`
2. Your enquiry should appear!

---

## 📊 View Your Data

### In Supabase Dashboard:

1. Click **"Table Editor"** (left sidebar)
2. Select a table:
   - `enquiries` - All project enquiries
   - `newsletter_subscribers` - All newsletter signups

### Export Data (CSV/Excel):

1. In Table Editor, click table name
2. Click **"..."** menu (top right)
3. Click **"Export as CSV"**

---

## 🔄 What Happens When Someone Submits a Form?

```
User fills form on website
      ↓
JavaScript sends data to Netlify Function
/.netlify/functions/submit-enquiry
      ↓
Netlify Function validates data
      ↓
Function saves to Supabase database
      ↓
Success message shown to user
      ↓
You can view data in Supabase dashboard
```

---

## 🛠️ Future Enhancements

Once basic setup is working, you can add:

### 1. Email Notifications
Get notified when someone submits enquiry:
- Use Supabase Database Webhooks
- Trigger email via SendGrid/Resend

### 2. Admin Dashboard
View and manage enquiries:
- Build simple admin page
- Use Supabase Auth for login
- Filter/search enquiries

### 3. Auto-Responder
Send thank you emails automatically:
- Use Netlify Function + Email API
- Send branded confirmation emails

### 4. CRM Integration
Connect to your CRM:
- Zapier integration
- Send new enquiries to Salesforce/HubSpot
- Auto-create contacts

---

## 🆘 Troubleshooting

### "Function not found" error
- Check that functions deployed correctly
- Verify Netlify build completed
- Check Netlify Functions tab in dashboard

### "Failed to save enquiry"
- Check environment variables are set in Netlify
- Verify SUPABASE_URL and SUPABASE_SERVICE_KEY
- Check Supabase project is active

### Form submits but no data in database
- Check browser console for errors (F12)
- Verify network tab shows successful request
- Check Supabase Table Editor for data

### "No rows returned" after running SQL
- ✅ This is NORMAL! It means tables were created successfully
- Check Table Editor to see your tables

---

## 📝 Summary Checklist

- [ ] Created Supabase account & project
- [ ] Ran SQL schema in Supabase
- [ ] Got API credentials (URL + service key)
- [ ] Added environment variables to Netlify (both sites)
- [ ] Installed dependencies (`npm install`)
- [ ] Committed and pushed code
- [ ] Promoted to production
- [ ] Tested newsletter signup ✅
- [ ] Tested project enquiry ✅
- [ ] Verified data in Supabase ✅

---

## ✅ You're Done!

Your website now has a fully functional database! 🎉

- **Store enquiries** from project pages
- **Collect emails** for newsletter
- **View all data** in Supabase dashboard
- **Export data** anytime as CSV

---

Need help? Check:
- **Supabase Docs:** https://supabase.com/docs
- **Netlify Functions:** https://docs.netlify.com/functions/overview/
- **Your Supabase Dashboard:** https://app.supabase.com
- **Your Netlify Dashboard:** https://app.netlify.com
