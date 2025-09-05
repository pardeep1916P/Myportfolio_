# Vercel Likes Setup Guide

## 🚀 **Setup Steps:**

### 1. **Deploy to Vercel**
```bash
npm run build
vercel --prod
```

### 2. **Enable Vercel KV Database**
1. Go to your Vercel dashboard
2. Select your project
3. Go to **Storage** tab
4. Click **Create Database** → **KV**
5. Name it `portfolio-likes` (or any name you prefer)

### 3. **Set Environment Variables**
In Vercel dashboard → Settings → Environment Variables:
- `KV_REST_API_URL` (auto-generated)
- `KV_REST_API_TOKEN` (auto-generated)
- `KV_REST_API_READ_ONLY_TOKEN` (auto-generated)

### 4. **Test the API**
- `GET /api/likes` - Get current likes count
- `POST /api/likes` - Increment likes count

## ✅ **Benefits:**
- **No AWS needed** - Everything runs on Vercel
- **Global edge caching** - Fast worldwide
- **Automatic scaling** - Handles traffic spikes
- **Free tier** - 30,000 requests/month
- **Real-time updates** - All users see same count

## 🔧 **Alternative Options:**

### Option 2: Vercel Edge Config
For even simpler setup (no database needed):
```bash
npm install @vercel/edge-config
```

### Option 3: Vercel Postgres
For more complex data:
```bash
npm install @vercel/postgres
```

## 🎯 **Current Setup:**
- ✅ API routes created (`/api/likes`)
- ✅ LikeButton updated to use Vercel API
- ✅ Local storage fallback included
- ✅ CORS headers configured
- ✅ Error handling implemented

**Ready to deploy!** 🚀
