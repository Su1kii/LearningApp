# Verify CORS Setup - Step by Step

## Your Vercel Setup ✅
You have: `VITE_API_URL = https://learningapp-iear.onrender.com/api`
This is **CORRECT** - no changes needed here!

## The Problem is in Render (Backend)

The backend needs to allow your Vercel frontend URL. Let's verify and fix:

### Step 1: Check Current CORS Configuration

1. Go to **Render Dashboard**: https://dashboard.render.com
2. Click on your backend service: **`learningapp-iear`**
3. Click **"Environment"** tab
4. Look for `CORS_ORIGINS` environment variable

### Step 2: Set CORS_ORIGINS in Render

**If `CORS_ORIGINS` doesn't exist or is wrong:**

1. Click **"Add Environment Variable"** (or edit existing)
2. Set:
   - **Key**: `CORS_ORIGINS`
   - **Value**: `https://learning-5kpyjg1hl-su1kiis-projects.vercel.app,https://learning-1bbze2ktk-su1kiis-projects.vercel.app,http://localhost:3000,http://localhost:5173`
3. **Save Changes**

**Important**: 
- Use commas to separate URLs (NO spaces after commas)
- Include ALL your Vercel URLs
- The value should be a single line

### Step 3: Redeploy Render

After saving:
1. Render will auto-redeploy (wait 2-3 minutes)
2. OR manually: Go to **"Events"** → **"Manual Deploy"** → **"Deploy latest commit"**

### Step 4: Test CORS Configuration

After deployment completes:

1. Visit: `https://learningapp-iear.onrender.com/api/cors-check`
   - This shows what CORS origins are configured
   - Should list your Vercel URLs

2. Try registering from your Vercel frontend
   - Open browser console (F12)
   - Check Network tab
   - CORS errors should be gone!

## Quick Checklist

- [ ] `CORS_ORIGINS` exists in Render Environment Variables
- [ ] `CORS_ORIGINS` includes your Vercel URL(s)
- [ ] Render service has been redeployed after setting CORS_ORIGINS
- [ ] `/api/cors-check` endpoint shows correct origins
- [ ] `VITE_API_URL` in Vercel is set to `https://learningapp-iear.onrender.com/api`

## Common Issues

### Issue 1: CORS_ORIGINS not set in Render
**Solution**: Add it in Render Dashboard → Environment tab

### Issue 2: Wrong URL format
**Solution**: Make sure URLs don't have trailing slashes in CORS_ORIGINS

### Issue 3: Backend not redeployed
**Solution**: After setting CORS_ORIGINS, wait for redeploy or trigger manually

### Issue 4: Multiple Vercel URLs
**Solution**: Include ALL your Vercel URLs (comma-separated, no spaces)

## Exact Value to Use in Render

Copy this exactly:

```
https://learning-5kpyjg1hl-su1kiis-projects.vercel.app,https://learning-1bbze2ktk-su1kiis-projects.vercel.app,http://localhost:3000,http://localhost:5173
```

Paste it as the value for `CORS_ORIGINS` in Render!

