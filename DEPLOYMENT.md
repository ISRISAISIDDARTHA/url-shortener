# 🚀 URL Shortener Deployment Guide

## 📋 Prerequisites
- GitHub account
- MongoDB Atlas database (already set up)
- Node.js installed locally

## 🎯 Recommended: Vercel + Railway (Easiest & Free)

### Step 1: Prepare Your Code

1. **Update Environment Variables**
   ```bash
   # In backend/.env (for production)
   PORT=5000
   BASE_URL=https://your-backend-url.railway.app
   MONGO_URI=your-mongodb-atlas-uri
   JWT_SECRET=your-super-secret-jwt-key
   ```

2. **Update Frontend API URL**
   ```javascript
   // In frontend/src/components/LandingPage.js
   axios.defaults.baseURL = 'https://your-backend-url.railway.app';
   ```

### Step 2: Deploy Backend to Railway

1. **Go to [Railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Click "New Project" → "Deploy from GitHub repo"**
4. **Select your repository**
5. **Set Root Directory to: `backend`**
6. **Add Environment Variables:**
   ```
   PORT=5000
   BASE_URL=https://your-app-name.railway.app
   MONGO_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   ```
7. **Deploy!**

### Step 3: Deploy Frontend to Vercel

1. **Go to [Vercel.com](https://vercel.com)**
2. **Sign up with GitHub**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Set Root Directory to: `frontend`**
6. **Add Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```
7. **Deploy!**

## 🌐 Alternative: Netlify + Render

### Backend on Render:
1. **Go to [Render.com](https://render.com)**
2. **Sign up with GitHub**
3. **Click "New Web Service"**
4. **Connect your repository**
5. **Set Root Directory to: `backend`**
6. **Add environment variables**
7. **Deploy!**

### Frontend on Netlify:
1. **Go to [Netlify.com](https://netlify.com)**
2. **Sign up with GitHub**
3. **Click "New site from Git"**
4. **Select your repository**
5. **Set Base directory to: `frontend`**
6. **Set Build command to: `npm run build`**
7. **Set Publish directory to: `build`**
8. **Deploy!**

## 🔧 Manual Deployment Steps

### 1. Build Frontend
```bash
cd frontend
npm install
npm run build
```

### 2. Prepare Backend
```bash
cd backend
npm install
```

### 3. Environment Setup
Create production `.env` file:
```env
PORT=5000
BASE_URL=https://your-domain.com
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=your-super-secret-jwt-key
```

## 📱 Mobile Deployment (Optional)

### PWA Setup
1. **Add manifest.json to frontend/public/**
2. **Add service worker**
3. **Update index.html with meta tags**

## 🔒 Security Checklist

- [ ] Use HTTPS in production
- [ ] Set strong JWT_SECRET
- [ ] Enable CORS properly
- [ ] Validate input data
- [ ] Rate limiting (optional)
- [ ] Environment variables secured

## 🚨 Common Issues & Solutions

### CORS Error
```javascript
// In backend/server.js
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:3000'],
  credentials: true
}));
```

### MongoDB Connection
- Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check connection string format

### Build Errors
- Clear node_modules and reinstall
- Check Node.js version compatibility

## 📊 Monitoring & Analytics

### Free Options:
- **Vercel Analytics** (built-in)
- **Google Analytics**
- **MongoDB Atlas Charts**

## 🔄 Continuous Deployment

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      # Add deployment steps
```

## 💰 Cost Estimation

### Free Tier:
- **Vercel**: $0/month (frontend)
- **Railway**: $0/month (backend, limited)
- **MongoDB Atlas**: $0/month (512MB)
- **Total**: $0/month

### Paid Options:
- **Railway Pro**: $5/month
- **Vercel Pro**: $20/month
- **MongoDB Atlas**: $9/month
- **Total**: ~$34/month

## 🎉 Post-Deployment

1. **Test all features**
2. **Update DNS if using custom domain**
3. **Set up monitoring**
4. **Share your app!**

## 📞 Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test locally first
4. Check platform documentation

---

**Happy Deploying! 🚀** 