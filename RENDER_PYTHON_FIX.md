# Fix Python Version on Render

Render is using Python 3.13.4, but your packages need Python 3.11.9.

## ✅ Solution: Set PYTHON_VERSION Environment Variable

Render uses environment variables, not `runtime.txt` files.

### Steps:

1. **Go to Render Dashboard**
   - Navigate to your web service
   - Click **"Environment"** tab (or **"Settings"** → **"Environment Variables"**)

2. **Add Environment Variable**
   - Click **"Add Environment Variable"**
   - **Key**: `PYTHON_VERSION`
   - **Value**: `3.11.9`
   - Click **"Save Changes"**

3. **Redeploy**
   - Render will automatically redeploy
   - Or manually trigger: **"Manual Deploy"** → **"Deploy latest commit"**

4. **Verify**
   - Check build logs
   - You should see: `==> Installing Python version 3.11.9...`

## Alternative: Update Packages (Not Recommended)

If you want to use Python 3.13, you'd need to update pydantic:
```txt
pydantic[email]==2.10.0  # or newer
```

But Python 3.11.9 is recommended for compatibility.

## Why This Happens

- Render doesn't automatically detect `runtime.txt`
- Render uses `PYTHON_VERSION` environment variable
- Python 3.13 is too new - packages don't have wheels yet
- Python 3.11.9 has pre-built wheels for all packages

