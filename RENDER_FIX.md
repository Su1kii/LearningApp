# Fix Render Python Version Issue

Render is trying to use Python 3.13.4, but `pydantic-core` needs to be compiled from source (requires Rust), which isn't available on Render.

## Solution: Set Python Version in Render Dashboard

The `runtime.txt` file should work, but if Render isn't detecting it, set it manually:

### Step 1: Go to Render Dashboard

1. Navigate to your web service
2. Click on **"Settings"** tab
3. Scroll down to **"Python Version"** section

### Step 2: Set Python Version

1. In the **"Python Version"** field, enter: `3.11.9`
2. Click **"Save Changes"**
3. Render will automatically redeploy

### Step 3: Verify

After redeploy, check the build logs. You should see:
```
==> Installing Python version 3.11.9...
==> Using Python version 3.11.9
```

Instead of:
```
==> Installing Python version 3.13.4...
```

## Alternative: Update Packages (If you want to use Python 3.13)

If you prefer to use Python 3.13, you'd need to update `pydantic` to a version that has pre-built wheels:

```txt
pydantic[email]==2.10.0  # or newer
```

But Python 3.11.9 is recommended for compatibility with all current packages.

## Why This Happens

- Python 3.13 is very new (released Oct 2024)
- `pydantic-core==2.14.1` doesn't have pre-built wheels for Python 3.13
- Building from source requires Rust, which Render doesn't provide
- Python 3.11.9 has pre-built wheels for all packages

## Quick Fix Summary

**In Render Dashboard → Your Service → Settings → Python Version:**
- Set to: `3.11.9`
- Save
- Wait for redeploy

This will fix the build error immediately.

