# 🔧 Fixed: Button Redirect Issue

## ✅ What I Fixed

1. **Removed inline onclick handler** - Was causing conflicts
2. **Added form submission prevention** - Prevents Shopify checkout from submitting when SumUp button is clicked
3. **Improved error handling** - Better error messages for "Unknown client" error
4. **Added event capture** - Ensures SumUp button click is handled first

## ⚠️ Current Issue: "Unknown client" Error

The error you're seeing: **"Failed to create checkout: Failed to obtain SumUp token: Unknown client"**

This means:
- ✅ Your backend is working correctly
- ✅ The button is calling the backend
- ❌ SumUp API credentials are not valid or not activated

## 🔧 How to Fix "Unknown client" Error

### Option 1: Verify SumUp API Credentials

1. **Go to Render Dashboard:**
   - Visit: https://dashboard.render.com
   - Find your service: `sumup-shopify-backend`

2. **Check Environment Variables:**
   - Click on your service
   - Go to **"Environment"** tab
   - Verify these are set correctly:
     ```
     PUBLIC_API_KEY=sup_pk_T1CKKooeHzqTf1CIVlHPPH03l0OclA7ux
     SECRET_API_KEY=sup_sk_ILzwdB9aw3wnSIQcC11vdInQt9ev8uMje
     SUMUP_MERCHANT_ID=MCW7KJQ8
     ```

3. **Redeploy:**
   - After checking/updating, click **"Manual Deploy"** → **"Deploy latest commit"**

### Option 2: Activate SumUp API Access

The "Unknown client" error usually means:
- API keys need to be activated in SumUp dashboard
- API access needs to be enabled for your merchant account
- Keys might be for a different environment (test vs production)

**Contact SumUp Support:**
- Log into your SumUp merchant account
- Contact support to activate API access
- Verify the API keys are correct for your account

## 📝 Next Steps

1. **Update the snippet in Shopify:**
   - Go to: **Online Store** → **Themes** → **Edit code**
   - Open: **Snippets** → `sumup-pay-button.liquid`
   - Copy the updated content from: `shopify/snippets/sumup-pay-button.liquid`
   - Paste and **Save**

2. **Test again:**
   - Go to your store cart page
   - Click "Pay with SumUp" button
   - Should now prevent form submission
   - Will show better error message if API issue persists

3. **Fix SumUp API credentials:**
   - Verify credentials in Render
   - Contact SumUp to activate API access
   - Test again after credentials are fixed

## 🧪 Testing Checklist

After updating the snippet:

- [ ] Button appears on cart page
- [ ] Clicking button does NOT submit Shopify checkout form
- [ ] Button shows loading state when clicked
- [ ] Error message appears if API credentials invalid (instead of redirecting to thank you page)
- [ ] Once API credentials are fixed, button redirects to SumUp checkout

## 💡 What Changed in the Code

1. **Removed inline onclick** - Cleaner event handling
2. **Added form submission prevention** - Stops Shopify checkout from submitting
3. **Better error messages** - More user-friendly error display
4. **Event capture** - Ensures SumUp handler runs first

---

**Important:** The button will now prevent the Shopify checkout from submitting, but you still need to fix the SumUp API credentials to get the actual payment redirect working.

