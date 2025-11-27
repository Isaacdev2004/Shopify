# Quick Deployment Reference

## 🚀 Fast Track to Render Deployment

### 1. Push to GitHub
```bash
cd C:\Users\HP\OneDrive\Desktop\EMMAN
git init
git add .
git commit -m "SumUp Shopify integration"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

### 2. Render.com Setup

**Service Configuration:**
- **Root Directory:** `backend` ⚠️ CRITICAL
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment:** Node

**Environment Variables (Add all 8):**
```
PUBLIC_API_KEY=sup_pk_T1CKKooeHzqTf1CIVlHPPH03l0OclA7ux
SECRET_API_KEY=sup_sk_ILzwdB9aw3wnSIQcC11vdInQt9ev8uMje
SUMUP_MERCHANT_ID=MCW7KJQ8
PORT=3000
SUMUP_API_BASE=https://api.sumup.com/v0.1
SUMUP_TOKEN_URL=https://api.sumup.com/token
SHOPIFY_STORE_URL=luximyvibes.shop
SHOPIFY_RETURN_URL=https://luximyvibes.shop/checkout/thank_you
```

### 3. Get Your Backend URL
After deployment: `https://your-service-name.onrender.com`

### 4. Update Shopify
In `sumup-pay-button.liquid` snippet:
```liquid
{% render 'sumup-pay-button', backend_url: 'https://your-service-name.onrender.com' %}
```

## ✅ Test After Deployment
- Health: `https://your-url.onrender.com/health`
- Should return: `{"status":"ok",...}`

---

**Full guide:** See `DEPLOY_TO_RENDER.md` for detailed steps.

