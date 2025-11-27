# Deploy SumUp Backend to Render.com

Step-by-step guide to deploy your SumUp Shopify backend to Render.com.

## 📋 Prerequisites

- ✅ GitHub account (or Git repository)
- ✅ Render.com account (free tier works)
- ✅ SumUp API credentials ready
- ✅ Backend code tested locally

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Initialize Git (if not already done):**
   ```bash
   cd C:\Users\HP\OneDrive\Desktop\EMMAN
   git init
   git add .
   git commit -m "Initial commit: SumUp Shopify integration"
   ```

2. **Create a GitHub repository:**
   - Go to [GitHub.com](https://github.com)
   - Click "New repository"
   - Name it: `sumup-shopify-backend` (or any name)
   - Don't initialize with README
   - Click "Create repository"

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/sumup-shopify-backend.git
   git branch -M main
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` with your GitHub username.

### Step 2: Deploy to Render

1. **Sign up/Login to Render:**
   - Go to [render.com](https://render.com)
   - Sign up or log in (you can use GitHub to sign in)

2. **Create New Web Service:**
   - Click **"New +"** button in dashboard
   - Select **"Web Service"**

3. **Connect Repository:**
   - Click **"Connect account"** if not connected
   - Select your GitHub account
   - Find and select your repository: `sumup-shopify-backend`
   - Click **"Connect"**

4. **Configure Service Settings:**
   
   **Basic Settings:**
   - **Name:** `sumup-shopify-backend` (or your preferred name)
   - **Region:** Choose closest to your users (e.g., Frankfurt for EU)
   - **Branch:** `main` (or `master`)
   - **Root Directory:** `backend` ⚠️ **IMPORTANT: Set this to `backend`**
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free (or paid for better performance)

5. **Add Environment Variables:**
   
   Scroll down to **"Environment Variables"** section and click **"Add Environment Variable"** for each:
   
   ```
   Name: PUBLIC_API_KEY
   Value: sup_pk_T1CKKooeHzqTf1CIVlHPPH03l0OclA7ux
   ```
   
   ```
   Name: SECRET_API_KEY
   Value: sup_sk_ILzwdB9aw3wnSIQcC11vdInQt9ev8uMje
   ```
   
   ```
   Name: SUMUP_MERCHANT_ID
   Value: MCW7KJQ8
   ```
   
   ```
   Name: PORT
   Value: 3000
   ```
   
   ```
   Name: SUMUP_API_BASE
   Value: https://api.sumup.com/v0.1
   ```
   
   ```
   Name: SUMUP_TOKEN_URL
   Value: https://api.sumup.com/token
   ```
   
   ```
   Name: SHOPIFY_STORE_URL
   Value: luximyvibes.shop
   ```
   
   ```
   Name: SHOPIFY_RETURN_URL
   Value: https://luximyvibes.shop/checkout/thank_you
   ```

6. **Deploy:**
   - Click **"Create Web Service"** at the bottom
   - Render will start building and deploying your service
   - Wait for deployment to complete (usually 2-5 minutes)

### Step 3: Get Your Backend URL

1. **After deployment completes:**
   - You'll see a URL like: `https://sumup-shopify-backend.onrender.com`
   - Copy this URL - you'll need it for Shopify integration

2. **Test the deployment:**
   - Visit: `https://your-service-name.onrender.com/health`
   - Should return: `{"status":"ok","service":"SumUp Shopify Integration",...}`

3. **Test checkout endpoint:**
   - Use the test page or Postman to test `/create-checkout`
   - URL: `https://your-service-name.onrender.com/create-checkout`

### Step 4: Update Shopify Integration

1. **Update the snippet:**
   - Go to your Shopify theme editor
   - Edit `sumup-pay-button.liquid` snippet
   - Update the backend URL:
   ```liquid
   {% render 'sumup-pay-button', backend_url: 'https://your-service-name.onrender.com' %}
   ```

2. **Or use theme settings:**
   - Add the backend URL to your theme settings
   - The snippet will automatically use it

## ⚙️ Render Configuration Summary

| Setting | Value |
|---------|-------|
| **Root Directory** | `backend` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Environment** | Node |
| **Auto-Deploy** | Yes (on git push) |

## 🔄 Auto-Deploy Setup

Render automatically deploys when you push to your repository:

```bash
git add .
git commit -m "Update code"
git push
```

Render will detect the push and redeploy automatically.

## 🆓 Free Tier Limitations

- **Spins down after 15 minutes of inactivity**
- **First request after spin-down takes ~30 seconds** (cold start)
- **750 hours/month free** (enough for most use cases)

**Solution for production:** Consider upgrading to paid plan ($7/month) for:
- Always-on service (no spin-down)
- Faster response times
- Better performance

## 🔍 Troubleshooting

### Deployment Fails

1. **Check build logs:**
   - Go to your service in Render dashboard
   - Click "Logs" tab
   - Look for error messages

2. **Common issues:**
   - ❌ Wrong root directory (should be `backend`)
   - ❌ Missing environment variables
   - ❌ Build command fails (check package.json)

### Service Not Responding

1. **Check service status:**
   - Dashboard shows service status
   - Green = running, Yellow = deploying, Red = error

2. **Check logs:**
   - View logs for runtime errors
   - Check if environment variables are set correctly

3. **Test health endpoint:**
   - Visit `/health` endpoint
   - Should return JSON response

### Environment Variables Not Working

1. **Verify in Render dashboard:**
   - Go to Environment tab
   - Ensure all variables are set
   - No typos in variable names

2. **Redeploy after adding variables:**
   - Render auto-redeploys when you add variables
   - Or manually trigger redeploy

## 📝 Post-Deployment Checklist

- [ ] Service is deployed and running
- [ ] Health endpoint works: `https://your-url.onrender.com/health`
- [ ] Environment variables are all set
- [ ] Backend URL is copied
- [ ] Shopify snippet updated with backend URL
- [ ] Test payment flow works
- [ ] Monitor first few transactions

## 🔗 Quick Links

- **Render Dashboard:** https://dashboard.render.com
- **Your Service:** https://dashboard.render.com/web/[your-service-id]
- **Documentation:** https://render.com/docs

## 💡 Pro Tips

1. **Custom Domain (Optional):**
   - Render allows custom domains
   - Go to Settings → Custom Domains
   - Add your domain (e.g., `api.luximyvibes.shop`)

2. **Monitoring:**
   - Render provides basic monitoring
   - Check Metrics tab for performance data

3. **Backups:**
   - Your code is in GitHub (backed up)
   - Environment variables are stored securely in Render

---

**Your backend will be live at:** `https://your-service-name.onrender.com` 🚀

