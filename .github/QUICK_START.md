# Quick Setup Checklist

## ✅ Complete These Steps in Order

### 1. Get Netlify Tokens (5 min)

- [ ] Go to https://app.netlify.com/user/applications
- [ ] Create new Personal Access Token
- [ ] Copy token (starts with `nfp_`)
- [ ] Get Production Site ID from Production site settings
- [ ] Get Dev Site ID from Dev site settings

### 2. Add GitHub Secrets (5 min)

- [ ] Go to https://github.com/YeshaJK/krown-properties/settings/secrets/actions
- [ ] Add `NETLIFY_AUTH_TOKEN`
- [ ] Add `NETLIFY_SITE_ID_PROD`
- [ ] Add `NETLIFY_SITE_ID_DEV`

### 3. Push Workflow Files (1 min)

```bash
cd C:/Users/yesha/krown-properties
git add .github/
git commit -m "Add GitHub Actions deployment workflows"
git push origin main

# Also push to dev branch
git checkout dev
git merge main
git push origin dev
```

### 4. Test It! (2 min)

- [ ] Go to https://github.com/YeshaJK/krown-properties/actions
- [ ] Click "Deploy to Development"
- [ ] Click "Run workflow" → Select "dev" branch
- [ ] Click green "Run workflow" button
- [ ] Watch it deploy! ✅

---

## 🎯 Visual Flow

```
┌─────────────────────────────────────────────────────┐
│  YOU CLICK "Run workflow" in GitHub Actions Tab     │
└──────────────────┬──────────────────────────────────┘
                   ↓
         ┌─────────┴─────────┐
         │  GitHub Actions   │
         │  Starts Running   │
         └─────────┬─────────┘
                   ↓
         ┌─────────┴─────────┐
         │  Checks out code  │
         │  from branch      │
         └─────────┬─────────┘
                   ↓
         ┌─────────┴─────────┐
         │  Deploys to       │
         │  Netlify using    │
         │  your tokens      │
         └─────────┬─────────┘
                   ↓
         ┌─────────┴─────────┐
         │  ✅ Site Live!    │
         │  in 30 seconds    │
         └───────────────────┘
```

---

## 🚨 Important Notes

1. **Secrets are encrypted** - nobody can see them, not even you after saving
2. **Workflows run in the cloud** - free for public repos
3. **Each deployment shows status** - see logs in Actions tab
4. **Failed deployments don't affect live site** - it's safe to experiment!

---

## Need Help?

**Can't find Netlify Site ID?**
- Netlify Dashboard → Your Site → Site Settings → Site information → API ID

**Can't find Netlify Auth Token?**
- https://app.netlify.com/user/applications → "New access token"

**Workflow not showing in GitHub?**
- Make sure you pushed the files: `git push origin main`
- Check files exist at: `.github/workflows/`

**Ready to start?** Follow Step 1 above! 👆
