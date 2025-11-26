# Fix CORS in Render - Step by Step

## The Problem
CORS errors when frontend tries to access backend API. The backend needs to explicitly allow your Vercel frontend URL.

## Solution: Set CORS_ORIGINS in Render

### Step 1: Go to Render Dashboard
1. Go to https://dashboard.render.com
2. Click on your backend service: **`learningapp-iear`** (or `k12-lms-backend`)

### Step 2: Navigate to Environment Tab
1. Click on **"Environment"** tab in the left sidebar
2. You'll see a list of environment variables

### Step 3: Add/Update CORS_ORIGINS
1. **If `CORS_ORIGINS` exists**: Click the **"Edit"** button (pencil icon)
2. **If `CORS_ORIGINS` doesn't exist**: Click **"Add Environment Variable"**

3. Set the following:
   - **Key**: `CORS_ORIGINS`
   - **Value**: `https://learning-5kpyjg1hl-su1kiis-projects.vercel.app,https://learning-1bbze2ktk-su1kiis-projects.vercel.app,http://localhost:3000,http://localhost:5173`
   
   **Important**: 
   - Use commas to separate multiple URLs (NO spaces after commas)
   - Include ALL your Vercel URLs
   - Include localhost for local development

4. Click **"Save Changes"**

### Step 4: Redeploy
After saving, Render will automatically redeploy. You'll see:
- A notification that changes were saved
- The deployment will start automatically
- Wait for it to complete (usually 2-3 minutes)

**OR** manually trigger redeploy:
1. Go to **"Events"** or **"Deployments"** tab
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

### Step 5: Verify CORS is Working
1. Wait for deployment to complete (check the logs)
2. Visit: `https://learningapp-iear.onrender.com/api/cors-check`
3. You should see the CORS origins listed
4. Try registering/logging in from your Vercel frontend
5. CORS errors should be gone!

## Troubleshooting

### If CORS still doesn't work:

1. **Check the exact Vercel URL**:
   - Go to your Vercel project → Settings → Domains
   - Copy the EXACT production URL
   - Make sure it matches what's in `CORS_ORIGINS`

2. **Check Render logs**:
   - Go to Render → Your Service → Logs
   - Look for any errors during startup
   - Check if CORS_ORIGINS is being read correctly

3. **Verify environment variable**:
   - In Render → Environment tab
   - Make sure `CORS_ORIGINS` is listed
   - Check the value is correct (no extra spaces, correct URLs)

4. **Test the debug endpoint**:
   - Visit: `https://learningapp-iear.onrender.com/api/cors-check`
   - This shows what CORS origins are actually configured

## Quick Copy-Paste

**In Render Dashboard → Environment Variables:**

**Key**: `CORS_ORIGINS`  
**Value**: 
```
https://learning-5kpyjg1hl-su1kiis-projects.vercel.app,https://learning-1bbze2ktk-su1kiis-projects.vercel.app,http://localhost:3000,http://localhost:5173
```

Save and redeploy! 🚀

## What This Does

The `CORS_ORIGINS` environment variable tells the FastAPI backend which frontend URLs are allowed to make requests. Without this, browsers block cross-origin requests for security.

The backend reads this variable and configures the CORS middleware to allow requests from these origins.

