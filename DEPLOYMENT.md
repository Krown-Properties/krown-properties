# Deployment Checklist

## Development Deployment (dev.krownproperties.co.nz)

- [ ] Switch to dev branch: `git checkout dev`
- [ ] Make your changes
- [ ] Test locally in browser
- [ ] Commit: `git add . && git commit -m "Description"`
- [ ] Push: `git push origin dev`
- [ ] Wait 30 seconds for auto-deploy
- [ ] Test on: https://krown-properties-dev.netlify.app
- [ ] Verify all features work

## Production Deployment (krownproperties.co.nz)

- [ ] All testing complete on dev site
- [ ] Switch to main: `git checkout main`
- [ ] Merge dev: `git merge dev`
- [ ] Review changes: `git log -3`
- [ ] Push: `git push origin main`
- [ ] Wait 30 seconds for auto-deploy
- [ ] Test on: https://krownproperties.co.nz
- [ ] Check mobile responsiveness
- [ ] Verify all project images load
- [ ] Test all navigation links

## Emergency Rollback

If production breaks:

```bash
# Find last working commit
git log --oneline

# Revert to that commit
git revert <commit-hash>

# Push immediately
git push origin main
```

## Future: Database Integration

When ready for database:

1. **Dev Database**: Use Supabase free tier (separate project)
2. **Prod Database**: Use Supabase paid tier
3. **Config**: Use `js/config.js` for different API URLs

## Quick Commands Reference

```bash
# Check current branch
git branch

# Switch branches
git checkout dev     # Development
git checkout main    # Production

# See what changed
git status
git diff

# Undo local changes
git checkout -- .

# Pull latest from GitHub
git pull origin dev
git pull origin main
```
