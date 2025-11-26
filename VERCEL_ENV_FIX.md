# Fix Vercel Environment Variable

## Problem
The API URL is missing `/api` - requests are going to `https://learningapp-iear.onrender.com//auth/register` instead of `https://learningapp-iear.onrender.com/api/auth/register`

## Solution: Update VITE_API_URL in Vercel

### Step 1: Go to Vercel Dashboard
1. Navigate to your project: `LearningApp`
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in the left sidebar

### Step 2: Update VITE_API_URL
1. Find the `VITE_API_URL` variable
2. **Current (WRONG)**: Probably set to `https://learningapp-iear.onrender.com` or `https://learningapp-iear.onrender.com/`
3. **Should be**: `https://learningapp-iear.onrender.com/api`
4. Click **"Edit"** or **"Add"** if it doesn't exist
5. Set value to: `https://learningapp-iear.onrender.com/api`
6. Make sure it's set for **Production**, **Preview**, and **Development** environments
7. Click **"Save"**

### Step 3: Redeploy
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger redeploy

## Verify

After redeploy, check:
1. Open browser console
2. Try to register/login
3. Check the Network tab
4. The URL should be: `https://learningapp-iear.onrender.com/api/auth/register` (with `/api`)

## Quick Fix

**In Vercel Dashboard → Settings → Environment Variables:**

**Key**: `VITE_API_URL`  
**Value**: `https://learningapp-iear.onrender.com/api`

**Important**: Must include `/api` at the end!

Save and redeploy! 🚀

