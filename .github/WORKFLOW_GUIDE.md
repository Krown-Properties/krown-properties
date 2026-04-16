# 🚀 Complete Deployment Workflow Guide

## Three Workflows Available

### 1️⃣ Deploy to Development
**When:** Testing new features
**Branch:** `github`
**Result:** https://dev-krown-properties.netlify.app

### 2️⃣ Promote to Production
**When:** Development tested and ready
**Action:** Merges `github` → `main`
**Result:** Triggers automatic production deploy

### 3️⃣ Deploy to Production
**When:** Auto-runs after promotion OR manual hotfix
**Branch:** `main`
**Result:** https://krownproperties.co.nz

---

## 📋 Daily Workflow

### Step 1: Work in Development
```bash
# Make your changes in github branch
git checkout github
git add .
git commit -m "Added new project images"
git push origin github
```

✅ **Auto-deploys to:** https://dev-krown-properties.netlify.app

### Step 2: Test Development Site
1. Open https://dev-krown-properties.netlify.app
2. Check all pages work
3. Test on mobile
4. Verify images load

### Step 3: Promote to Production (GitHub UI)
1. Go to: https://github.com/YeshaJK/krown-properties/actions
2. Click **"Promote Development to Production"**
3. Click **"Run workflow"** dropdown
4. Choose merge method:
   - **merge** (default) - keeps full commit history
   - **squash** - combines all commits into one
5. Add reason (optional): "New project images tested"
6. Click green **"Run workflow"** button

✅ **Result:**
- Merges `github` → `main`
- Auto-deploys to production
- Live at: https://krownproperties.co.nz

---

## 🎯 Visual Flow

```
┌─────────────────────────────────────────────────┐
│  1. Make changes & push to `github` branch      │
│     git push origin github                      │
└──────────────────┬──────────────────────────────┘
                   ↓
         ┌─────────┴──────────┐
         │  Auto-Deploy to    │
         │  DEV Site          │
         └─────────┬──────────┘
                   ↓
         ┌─────────┴──────────┐
         │  Test on Dev Site  │
         │  Everything OK?    │
         └─────────┬──────────┘
                   ↓
         ┌─────────┴──────────┐
         │  Click "Promote    │
         │  to Production"    │
         │  in GitHub Actions │
         └─────────┬──────────┘
                   ↓
         ┌─────────┴──────────┐
         │  Merges github →   │
         │  main branch       │
         └─────────┬──────────┘
                   ↓
         ┌─────────┴──────────┐
         │  Auto-Deploy to    │
         │  PRODUCTION        │
         └─────────┬──────────┘
                   ↓
         ┌─────────┴──────────┐
         │  ✅ Live at        │
         │  krownproperties   │
         │  .co.nz            │
         └────────────────────┘
```

---

## 🔧 Alternative Methods

### A. Manual Promotion via Git
```bash
# Switch to main
git checkout main

# Merge github into main
git merge github

# Push to main (triggers auto-deploy)
git push origin main
```

### B. Emergency Hotfix (Skip Dev)
```bash
# Make urgent fix directly in main
git checkout main
# ... make fix ...
git add .
git commit -m "HOTFIX: Critical bug fix"
git push origin main

# Sync fix back to github branch
git checkout github
git merge main
git push origin github
```

---

## 📊 Monitoring Deployments

### Check Status
**GitHub Actions:** https://github.com/YeshaJK/krown-properties/actions
- See all deployments
- Green ✅ = Success
- Red ❌ = Failed
- Yellow ⏳ = Running

**Netlify Dashboard:** https://app.netlify.com
- Real-time deploy logs
- Preview URLs
- Deployment history

### Verify Live Sites
**Development:** https://dev-krown-properties.netlify.app
**Production:** https://krownproperties.co.nz

---

## 🆘 Troubleshooting

### "Promote workflow failed"
1. Check Actions tab for error message
2. Common causes:
   - Merge conflict → Fix locally then push
   - No changes to promote → Already in sync

### "Production not updating"
1. Check Actions tab - deployment succeeded?
2. Hard refresh: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
3. Check Netlify dashboard for deploy status
4. Wait 2-3 minutes - DNS propagation

### "Merge conflict"
```bash
# Fix merge conflicts locally
git checkout main
git pull origin main
git merge github

# Resolve conflicts in files
# Then:
git add .
git commit -m "Resolved merge conflicts"
git push origin main
```

---

## 🎓 Best Practices

### ✅ DO
- Always test on dev site first
- Use clear commit messages
- Promote during low-traffic hours
- Keep github and main branches synced

### ❌ DON'T
- Don't work directly in `main` branch (except hotfixes)
- Don't promote untested changes
- Don't force push to main
- Don't skip the dev testing step

---

## 📝 Quick Reference

| Action | Command/Location |
|--------|------------------|
| **View Workflows** | [Actions Tab](https://github.com/YeshaJK/krown-properties/actions) |
| **Dev Site** | https://dev-krown-properties.netlify.app |
| **Prod Site** | https://krownproperties.co.nz |
| **Netlify** | https://app.netlify.com |
| **Push to Dev** | `git push origin github` |
| **Promote** | Actions → "Promote to Production" |

---

## 🚀 Ready to Use!

1. Commit and push this workflow:
   ```bash
   git add .github/workflows/promote-to-production.yml
   git commit -m "Add promotion workflow"
   git push origin github
   ```

2. Go to [Actions tab](https://github.com/YeshaJK/krown-properties/actions)

3. You'll see **"Promote Development to Production"** workflow

4. Click it and try your first promotion! 🎉

---

**Need help?** Check the Actions tab for detailed logs or review this guide.
