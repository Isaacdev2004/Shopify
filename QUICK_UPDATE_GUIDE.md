# ⚡ Quick Update: New SumUp API Credentials

## ✅ What's Been Updated Locally

- ✅ Local `.env` file updated with new credentials
- ✅ Ready to test locally

## 🚀 CRITICAL: Update Render (Production Backend)

Your production backend on Render still has the old credentials. **You MUST update them:**

### Quick Steps:

1. **Go to:** https://dashboard.render.com
2. **Click:** Your service `sumup-shopify-backend`
3. **Click:** "Environment" tab
4. **Update these 2 variables:**

   ```
   PUBLIC_API_KEY = sup_pk_T1CKKooeHzqTf1CIVIHPPH0310OclA7ux
   SECRET_API_KEY = sup_sk_ILzwdB9aw3wnSIQcC11vdlnQt9ev8uMje
   ```

5. **Save** each variable
6. **Redeploy:** Click "Manual Deploy" → "Deploy latest commit"
7. **Wait 1-2 minutes** for deployment

## ✅ After Render Update

1. **Test backend:** https://sumup-shopify-backend.onrender.com/health
2. **Test from store:** Try the checkout flow
3. **Should work:** No more "Unknown client" error!

## 📋 New Credentials

```
PUBLIC_API_KEY: sup_pk_T1CKKooeHzqTf1CIVIHPPH0310OclA7ux
SECRET_API_KEY: sup_sk_ILzwdB9aw3wnSIQcC11vdlnQt9ev8uMje
MERCHANT_ID: MCW7KJQ8 (unchanged)
```

---

**Next:** Update Render environment variables, then test!

