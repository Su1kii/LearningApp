# Frontend Deployment Guide (Vercel)

Quick guide to deploy the frontend and connect it to your Render backend.

## 🚀 Deploy to Vercel

### Step 1: Prepare Frontend

Your frontend is already configured to use environment variables. The API URL is set via `VITE_API_URL`.

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
   - Sign up/login with GitHub
   - Connect your GitHub account

2. **Import Project**
   - Click **"Add New..."** → **"Project"**
   - Import your GitHub repository: `Su1kii/LearningApp`

3. **Configure Project**
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Set Environment Variable**
   - Scroll to **"Environment Variables"** section
   - Click **"Add"**
   - **Key**: `VITE_API_URL`
   - **Value**: `https://learningapp-iear.onrender.com/api`
   - Click **"Save"**

5. **Deploy**
   - Click **"Deploy"**
   - Wait 2-3 minutes for build to complete

### Step 3: Update Backend CORS

After getting your Vercel URL:

1. **Go to Render Dashboard** → Your backend service
2. **Environment** tab
3. **Update `CORS_ORIGINS`**:
   - Add your Vercel URL: `https://your-app.vercel.app`
   - Or set: `https://your-app.vercel.app,http://localhost:3000`
4. **Save** and **Redeploy**

## 🔧 Local Development

For local development, create `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:8000/api
```

This file is gitignored and won't affect production.

## ✅ Verify Deployment

1. Visit your Vercel URL
2. Try registering a new account
3. Test login
4. Create a course (as teacher)
5. Enroll in course (as student)
6. Submit assignment
7. Verify AI grading works

## 🐛 Troubleshooting

**CORS Errors:**
- Make sure `CORS_ORIGINS` in Render includes your Vercel URL
- Check browser console for exact error

**API Not Found:**
- Verify `VITE_API_URL` is set correctly in Vercel
- Check that it includes `/api` at the end
- Format: `https://learningapp-iear.onrender.com/api`

**Build Fails:**
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify TypeScript compiles without errors

## 📝 Environment Variables Summary

**Vercel Environment Variable:**
```
VITE_API_URL=https://learningapp-iear.onrender.com/api
```

**Render Environment Variable (update after getting Vercel URL):**
```
CORS_ORIGINS=https://your-app.vercel.app,http://localhost:3000
```

---

Your frontend will now connect to your Render backend! 🎉

