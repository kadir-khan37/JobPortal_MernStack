# Render Deployment Guide

This guide will help you deploy your full-stack Job Portal application on Render.

## Prerequisites

- Render account (free or paid) - https://render.com
- MongoDB Atlas account (free tier available) - https://www.mongodb.com/cloud/atlas
- Cloudinary account (free tier available) - https://cloudinary.com
- Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Prepare Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in all required environment variables:
   - **MONGODB_URI**: MongoDB connection string from MongoDB Atlas
   - **JWT_SECRET**: Generate a secure secret key
   - **Cloudinary credentials**: Get from your Cloudinary dashboard
   - **FRONTEND_URL**: Will be your Render app URL (update after deployment)

## Step 2: Push Code to Git Repository

```bash
git init
git add .
git commit -m "Initial commit: prepare for Render deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Step 3: Deploy on Render

### Option A: Using render.yaml (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Select "Build and deploy from a Git repository"
4. Connect your Git repository
5. Render will automatically detect `render.yaml` and configure the service
6. Set the following in Environment variables:
   - `NODE_ENV`: production
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret
   - `CLOUDINARY_CLOUD_NAME`: Your cloud name
   - `CLOUDINARY_API_KEY`: Your API key
   - `CLOUDINARY_API_SECRET`: Your API secret
   - `FRONTEND_URL`: https://[your-app-name].onrender.com (after deployment)
7. Click "Create Web Service"

### Option B: Manual Configuration (Without render.yaml)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your Git repository
4. Configure the following:
   - **Name**: jobportal-app
   - **Environment**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free or Starter
5. Add all environment variables (see Step 2)
6. Click "Create Web Service"

## Step 4: Update Frontend URL

After deployment completes:

1. Note your app URL (e.g., `https://jobportal-app.onrender.com`)
2. Update the `FRONTEND_URL` environment variable in Render dashboard
3. Restart the application

## Step 5: Verify Deployment

1. Visit your app URL in browser
2. Test user registration and login
3. Test job posting and application features
4. Check browser console for any errors

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are listed in `package.json`
- Verify Node version compatibility

### Application Crashes
- Check logs in Render dashboard
- Verify all environment variables are set
- Ensure MongoDB URI is correct and IP whitelist includes Render

### Frontend Not Loading
- Verify `FRONTEND_URL` environment variable is set
- Check that frontend build output exists in `frontend/dist`
- Verify CORS settings in backend

### CORS Errors
- Update `FRONTEND_URL` in backend environment variables
- Ensure it matches your Render deployment URL

## Important Notes

### Cold Starts
- Render free plan experiences cold starts (first request takes 30+ seconds)
- Consider upgrading to Starter plan for production use

### Data Persistence
- MongoDB data persists (hosted on MongoDB Atlas)
- Render ephemeral file system means uploads to local disk won't persist
- Ensure all file uploads go to Cloudinary

### Build Time Limit
- Free plan has 30-minute build limit
- Optimize dependencies if build times exceed this

## Scaling

When ready for production:

1. Upgrade to Starter or Standard plan
2. Enable auto-scaling
3. Set up custom domain
4. Configure SSL certificate (automatic with Render)

## Update and Redeploy

After making changes locally:

```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```

Render will automatically detect the push and trigger a redeploy.

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Render Node.js Guide](https://render.com/docs/deploy-node)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Cloudinary Docs](https://cloudinary.com/documentation)
