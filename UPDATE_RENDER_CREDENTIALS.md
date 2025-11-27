# 🔄 Update SumUp API Credentials in Render

## ✅ Step 1: Go to Render Dashboard

1. Visit: https://dashboard.render.com
2. Log in to your account
3. Find your service: **sumup-shopify-backend**
4. Click on it

## ✅ Step 2: Update Environment Variables

1. **Click on "Environment" tab** (in the left sidebar)

2. **Update these two variables:**

   **PUBLIC_API_KEY:**
   - Find `PUBLIC_API_KEY` in the list
   - Click on it or click "Edit"
   - Change value to: `sup_pk_T1CKKooeHzqTf1CIVIHPPH0310OclA7ux`
   - Click "Save"

   **SECRET_API_KEY:**
   - Find `SECRET_API_KEY` in the list
   - Click on it or click "Edit"
   - Change value to: `sup_sk_ILzwdB9aw3wnSIQcC11vdlnQt9ev8uMje`
   - Click "Save"

## ✅ Step 3: Redeploy

After updating the environment variables:

1. **Go to "Events" or "Deploys" tab**
2. Click **"Manual Deploy"** → **"Deploy latest commit"**
   - OR the service will auto-redeploy (wait 1-2 minutes)

## ✅ Step 4: Verify

1. **Wait for deployment to complete** (usually 1-2 minutes)
2. **Test the backend:**
   - Visit: https://sumup-shopify-backend.onrender.com/health
   - Should return: `{"status":"ok",...}`

3. **Test checkout creation:**
   - Use the test page or test from your store
   - Should no longer show "Unknown client" error

## 📋 New Credentials Summary

```
PUBLIC_API_KEY=sup_pk_T1CKKooeHzqTf1CIVIHPPH0310OclA7ux
SECRET_API_KEY=sup_sk_ILzwdB9aw3wnSIQcC11vdlnQt9ev8uMje
SUMUP_MERCHANT_ID=MCW7KJQ8
```

---

**After updating:** The backend will automatically use the new credentials on the next request!

