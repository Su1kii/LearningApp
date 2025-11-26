# URGENT CORS FIX - Your New Vercel URL

## The Problem
Your Vercel URL changed to: `https://learning-app-ten-blond.vercel.app`

This URL is **NOT** in the `CORS_ORIGINS` list in Render, so CORS is blocking it!

## The Solution - Update Render NOW

### Step 1: Go to Render Dashboard
1. Go to: https://dashboard.render.com
2. Click on your backend: **`learningapp-iear`**
3. Click **"Environment"** tab

### Step 2: Update CORS_ORIGINS
1. Find `CORS_ORIGINS` (or add it if missing)
2. Click **Edit** (pencil icon)
3. Set the value to:

```
https://learning-app-ten-blond.vercel.app,https://learning-5kpyjg1hl-su1kiis-projects.vercel.app,https://learning-1bbze2ktk-su1kiis-projects.vercel.app,http://localhost:3000,http://localhost:5173
```

**IMPORTANT**: Include ALL your Vercel URLs (comma-separated, NO spaces after commas)

4. Click **"Save Changes"**

### Step 3: Wait for Redeploy
- Render will auto-redeploy (2-3 minutes)
- Wait for it to finish

### Step 4: Test
1. Visit: `https://learningapp-iear.onrender.com/api/cors-check`
2. Check that `https://learning-app-ten-blond.vercel.app` is in the list
3. Try registering from your Vercel frontend
4. CORS should work now! ✅

## Why This Keeps Happening

Vercel generates **different URLs** for:
- Production deployments
- Preview deployments  
- Branch deployments

Each URL needs to be added to `CORS_ORIGINS` in Render.

## Better Solution (Optional)

If you want to avoid this issue, you can:

1. **Use a custom domain** in Vercel (one stable URL)
2. **Or** allow all Vercel preview URLs (less secure, but easier)

For option 2, you'd need to modify the CORS middleware to allow `*.vercel.app` patterns, but this requires code changes.

## Quick Fix Right Now

**Copy this EXACTLY into Render → Environment → CORS_ORIGINS:**

```
https://learning-app-ten-blond.vercel.app,https://learning-5kpyjg1hl-su1kiis-projects.vercel.app,https://learning-1bbze2ktk-su1kiis-projects.vercel.app,http://localhost:3000,http://localhost:5173
```

Save and wait for redeploy! 🚀

