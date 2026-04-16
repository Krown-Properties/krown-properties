# GitHub Actions Deployment Setup

This guide shows you how to deploy from GitHub UI with one click!

## What You Get

✅ **Auto-deploy** when you push to `main` or `dev`
✅ **Manual deploy** with one click from GitHub UI
✅ **Deployment status** visible in GitHub
✅ **Rollback capability** - redeploy any previous commit

---

## 🔧 One-Time Setup (15 minutes)

### Step 1: Get Netlify Auth Token

1. Go to [app.netlify.com/user/applications](https://app.netlify.com/user/applications)
2. Scroll to **"Personal access tokens"**
3. Click **"New access token"**
4. Description: `GitHub Actions Deploy`
5. Click **"Generate token"**
6. **COPY THE TOKEN** - you won't see it again!
   - Example: `nfp_abc123xyz456...`

### Step 2: Get Netlify Site IDs

#### Production Site ID:

1. Go to your **Production** Netlify site dashboard
2. Click **"Site settings"**
3. Under **"Site information"**, find **"API ID"**
4. Copy it - looks like: `abc12345-6789-def0-1234-567890abcdef`

#### Development Site ID:

1. Go to your **Development** Netlify site dashboard
2. Click **"Site settings"**
3. Under **"Site information"**, find **"API ID"**
4. Copy it - looks like: `xyz98765-4321-ghi0-9876-543210fedcba`

### Step 3: Add Secrets to GitHub

1. Go to your GitHub repo: [github.com/YeshaJK/krown-properties](https://github.com/YeshaJK/krown-properties)
2. Click **"Settings"** (top menu)
3. In left sidebar: **"Secrets and variables" → "Actions"**
4. Click **"New repository secret"**

Add these 3 secrets:

| Secret Name | Value | Where to Get It |
|------------|-------|-----------------|
| `NETLIFY_AUTH_TOKEN` | `nfp_abc123...` | From Step 1 |
| `NETLIFY_SITE_ID_PROD` | `abc12345-6789...` | Production API ID (Step 2) |
| `NETLIFY_SITE_ID_DEV` | `xyz98765-4321...` | Development API ID (Step 2) |

For each secret:
1. Click **"New repository secret"**
2. Enter the **Name** exactly as shown
3. Paste the **Value**
4. Click **"Add secret"**

---

## 🚀 How to Deploy from GitHub UI

### Deploy to Development (Testing)

1. Go to [github.com/YeshaJK/krown-properties/actions](https://github.com/YeshaJK/krown-properties/actions)
2. Click **"Deploy to Development (Netlify)"** in left sidebar
3. Click **"Run workflow"** button (top right)
4. Select branch: `dev`
5. (Optional) Add reason: e.g., "Testing new images"
6. Click **"Run workflow"**
7. ⏱️ Wait 30-60 seconds
8. ✅ Deployed to: https://krown-properties-dev.netlify.app

### Deploy to Production (Live Site)

1. Go to [github.com/YeshaJK/krown-properties/actions](https://github.com/YeshaJK/krown-properties/actions)
2. Click **"Deploy to Production (Netlify)"** in left sidebar
3. Click **"Run workflow"** button (top right)
4. Select branch: `main`
5. (Optional) Add reason: e.g., "New project launch"
6. Click **"Run workflow"**
7. ⏱️ Wait 30-60 seconds
8. ✅ Deployed to: https://krownproperties.co.nz

---

## 🔄 Auto-Deploy (Already Working!)

Workflows also auto-deploy when you push code:

```bash
# Auto-deploys to DEV
git checkout dev
git add .
git commit -m "Added new images"
git push origin dev
# → Automatically deploys to dev.krownproperties.co.nz

# Auto-deploys to PRODUCTION
git checkout main
git merge dev
git push origin main
# → Automatically deploys to krownproperties.co.nz
```

---

## 📊 View Deployment Status

1. Go to [github.com/YeshaJK/krown-properties/actions](https://github.com/YeshaJK/krown-properties/actions)
2. See all deployments with:
   - ✅ Success (green check)
   - ⏳ In Progress (yellow circle)
   - ❌ Failed (red X)
3. Click any deployment to see details

---

## 🔙 Rollback to Previous Version

If production breaks, rollback instantly:

### Option 1: GitHub UI (Easiest)

1. Go to **Actions** tab
2. Find the **last successful** "Deploy to Production" workflow
3. Click **"Re-run all jobs"**
4. ✅ Reverts to that version!

### Option 2: Git Command

```bash
git checkout main
git log --oneline  # Find the working commit

git revert <bad-commit-hash>
git push origin main
# Auto-deploys the fixed version
```

---

## 🎯 Best Practice Workflow

### Adding New Features:

```
1. Work in DEV
   ├─ git checkout dev
   ├─ Make changes (add images, edit code)
   ├─ git add . && git commit -m "Description"
   └─ git push origin dev
      └─ Auto-deploys to dev.krownproperties.co.nz

2. Test thoroughly on dev site
   ├─ Check all pages
   ├─ Test on mobile
   └─ Verify images load

3. Deploy to PRODUCTION
   ├─ git checkout main
   ├─ git merge dev
   └─ git push origin main
      └─ Auto-deploys to krownproperties.co.nz

4. Verify production works!
```

### Emergency Hotfix:

```
1. Fix directly in main (only for emergencies!)
   ├─ git checkout main
   ├─ Make critical fix
   ├─ git add . && git commit -m "HOTFIX: Critical bug"
   └─ git push origin main
      └─ Deploys immediately!

2. Merge hotfix back to dev
   ├─ git checkout dev
   ├─ git merge main
   └─ git push origin dev
```

---

## 🔍 Troubleshooting

### "Deployment failed"

1. Check the Actions log for error messages
2. Common issues:
   - Missing secret → Add in GitHub Settings
   - Wrong Site ID → Check Netlify dashboard
   - Invalid token → Generate new one

### "Site not updating"

1. Check deployment succeeded in Actions tab
2. Hard refresh browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
3. Check Netlify dashboard for deploy status

### "Can't find workflow in Actions tab"

1. Make sure workflow files are pushed to GitHub
2. Check they're in `.github/workflows/` folder
3. Verify YAML syntax is correct (no tabs, proper indentation)

---

## 📱 GitHub Mobile App

You can also deploy from your phone!

1. Install **GitHub** app (iOS/Android)
2. Go to your repo → **Actions**
3. Tap workflow → **"Run workflow"**
4. Deploy from anywhere! 🚀

---

## Next Steps

1. ✅ Complete the "One-Time Setup" above
2. ✅ Test manual deploy from GitHub UI
3. ✅ Try auto-deploy by pushing code
4. ✅ Save this file as reference!

---

Need help? Check your deployment status at:
- GitHub Actions: https://github.com/YeshaJK/krown-properties/actions
- Netlify Dev: https://app.netlify.com
- Netlify Prod: https://app.netlify.com
