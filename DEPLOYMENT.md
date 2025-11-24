# Radio Signal Visualization - Deployment Guide

## Option 1: Render.com (Recommended) ⭐

### Prerequisites
- GitHub account
- Render account (free): https://render.com

### Steps:

1. **Push your code to GitHub** (already done ✅)

2. **Deploy Backend on Render:**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub: `PiotrRomanczuk/radio-signal-visualization`
   - Configure:
     - Name: `radio-signal-backend`
     - Root Directory: `back`
     - Environment: `Docker`
     - Plan: `Free`
   - Click "Create Web Service"
   - Copy the service URL (e.g., `https://radio-signal-backend.onrender.com`)

3. **Deploy Frontend on Render:**
   - Click "New +" → "Static Site"
   - Connect same GitHub repo
   - Configure:
     - Name: `radio-signal-frontend`
     - Root Directory: `front`
     - Build Command: `npm install && npm run build`
     - Publish Directory: `dist`
     - Plan: `Free`
   - Add Environment Variable:
     - Key: `VITE_WS_URL`
     - Value: `wss://radio-signal-backend.onrender.com` (use wss:// for secure WebSocket)
   - Click "Create Static Site"

4. **Access your app:**
   - Frontend: `https://radio-signal-frontend.onrender.com`

### Notes:
- Free tier spins down after 15 minutes of inactivity
- First request may take 50s to wake up
- Automatic deploys on git push

---

## Option 2: Railway.app

### Why Railway:
- $5 free credit per month
- Better performance than Render free tier
- Docker support
- Easy setup

### Steps:

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `radio-signal-visualization`
5. Railway will detect Docker and deploy automatically
6. Configure environment variables in dashboard
7. Get public URLs for both services

---

## Option 3: Vercel (Frontend) + Render (Backend)

### Frontend on Vercel:
```bash
npm install -g vercel
cd front
vercel
```

### Backend on Render:
- Follow Render backend steps above

---

## Option 4: Fly.io (Full Stack)

### Why Fly.io:
- $5 free allowance per month
- Excellent WebSocket support
- Global deployment

### Setup:
```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Deploy backend
cd back
fly launch --name radio-signal-backend
fly deploy

# Deploy frontend
cd ../front
fly launch --name radio-signal-frontend
fly deploy
```

---

## Comparison:

| Platform | Free Tier | WebSocket | Docker | Cold Start | Complexity |
|----------|-----------|-----------|--------|------------|------------|
| **Render** | ✅ Yes | ✅ Excellent | ✅ Yes | ~50s | ⭐ Easy |
| **Railway** | 💰 $5/month | ✅ Excellent | ✅ Yes | Fast | ⭐ Easy |
| **Fly.io** | 💰 $5/month | ✅ Excellent | ✅ Yes | Fast | ⭐⭐ Medium |
| **Vercel+Render** | ✅ Yes | ✅ Good | ⚠️ Front only | ~50s (backend) | ⭐⭐ Medium |

---

## My Recommendation:

**Start with Render.com** - it's the easiest and truly free. If you need better performance later, upgrade to Railway or Fly.io.

