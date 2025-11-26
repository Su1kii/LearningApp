# Git Commands for Force Push/Pull

## Force Push to GitHub (Overwrite Remote with Local)

If you want to push your local changes and overwrite what's on GitHub:

```bash
# First, make sure you're on the right branch
git checkout main  # or master, or your branch name

# Add all changes
git add .

# Commit changes (if not already committed)
git commit -m "Fix CORS configuration and API URL handling"

# Force push to GitHub (WARNING: This overwrites remote!)
git push origin main --force
```

**⚠️ WARNING**: Force push overwrites the remote branch. Only do this if you're sure!

## Alternative: Force Push with Lease (Safer)

This is safer - it fails if someone else pushed changes:

```bash
git push origin main --force-with-lease
```

## Reset Local to Match Remote (Discard Local Changes)

If you want to discard all local changes and match GitHub exactly:

```bash
# Fetch latest from GitHub
git fetch origin

# Reset local branch to match remote (WARNING: Loses local changes!)
git reset --hard origin/main

# Clean up any untracked files
git clean -fd
```

**⚠️ WARNING**: This permanently deletes all local changes!

## Pull Latest from GitHub (Normal Pull)

If you just want to get the latest changes from GitHub:

```bash
# Pull latest changes
git pull origin main

# If there are conflicts, resolve them, then:
git add .
git commit -m "Merge remote changes"
git push origin main
```

## Check Current Status

Before doing anything, check what's different:

```bash
# See what files changed
git status

# See differences between local and remote
git diff origin/main

# See commit history
git log --oneline -10
```

## Recommended Workflow for Your Current Situation

Since you've made CORS fixes locally:

1. **Check what you have locally**:
   ```bash
   git status
   ```

2. **Add and commit your changes**:
   ```bash
   git add .
   git commit -m "Fix CORS configuration, API URL handling, and add debug endpoint"
   ```

3. **Push to GitHub** (normal push first):
   ```bash
   git push origin main
   ```

4. **If push is rejected** (because remote has different commits):
   ```bash
   # Pull and merge
   git pull origin main --rebase
   # Resolve any conflicts, then:
   git push origin main
   ```

5. **Only use force push if absolutely necessary**:
   ```bash
   git push origin main --force-with-lease
   ```

## For Your Specific Case

You probably want to:

```bash
# 1. Check current status
git status

# 2. Add all changes
git add .

# 3. Commit
git commit -m "Fix CORS and API URL issues"

# 4. Push (this will trigger Vercel and Render redeploy)
git push origin main
```

This will:
- Push your changes to GitHub
- Trigger Vercel to redeploy (if connected)
- You'll need to manually redeploy Render or it will auto-deploy if connected to GitHub

