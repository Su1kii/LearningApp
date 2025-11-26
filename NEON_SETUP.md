# Using Neon PostgreSQL Database

Your application is now configured to use Neon PostgreSQL instead of SQLite.

## ✅ What's Already Done

1. **Database Configuration Updated**: `backend/app/config.py` now defaults to your Neon database
2. **Database Engine Configured**: `backend/app/database.py` is set up for PostgreSQL with connection pooling
3. **Connection String**: Your Neon connection string is configured

## 🔧 Set in Render Dashboard

Even though the code has the default, you should set it as an environment variable in Render:

1. **Go to Render Dashboard** → Your backend service
2. **Click "Environment" tab**
3. **Add/Update Environment Variable**:
   - **Key**: `DATABASE_URL`
   - **Value**: `postgresql://neondb_owner:npg_rUZpTBKl7v8W@ep-fragrant-brook-afdf1x7w-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
4. **Save Changes**
5. **Redeploy** (or it will auto-redeploy)

## 🗄️ Database Tables

The tables will be **automatically created** on first run when you start the server. The code in `main.py` includes:

```python
Base.metadata.create_all(bind=engine)
```

This creates all tables (Users, Courses, Assignments, Submissions, etc.) automatically.

## ✅ Verify It's Working

1. **Check Render Logs**: After redeploy, check that there are no database connection errors
2. **Test API**: Visit `https://learningapp-iear.onrender.com/docs`
3. **Try Registering**: Create a new user account
4. **Check Database**: Go to Neon dashboard and verify tables were created

## 🔄 Migration from SQLite (if you had data)

If you had data in SQLite and want to migrate:

1. Export data from SQLite (if needed)
2. The new PostgreSQL database will start fresh
3. All new data will go to Neon PostgreSQL

## 📝 Connection String Details

Your Neon connection string includes:
- **Host**: `ep-fragrant-brook-afdf1x7w-pooler.c-2.us-west-2.aws.neon.tech`
- **Database**: `neondb`
- **User**: `neondb_owner`
- **SSL**: Required (`sslmode=require`)
- **Channel Binding**: Required (`channel_binding=require`)

All of this is handled automatically by SQLAlchemy.

## 🚀 You're All Set!

Your application will now use Neon PostgreSQL for all database operations. The connection pooling is configured for optimal performance.

