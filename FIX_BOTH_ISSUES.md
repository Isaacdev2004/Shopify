# 🔧 FIX BOTH ISSUES: Not Redirecting to SumUp

## ⚠️ TWO PROBLEMS:

### Problem 1: Backend Still Shows "Unknown client"
**This means Render doesn't have the new credentials yet**

### Problem 2: Script Not Preventing Form Submission
**Fixed in updated script - need to reinstall**

---

## 🚀 FIX 1: Update Render (CRITICAL - Do This First!)

### Step 1: Go to Render
1. **Visit:** https://dashboard.render.com
2. **Click:** Service `sumup-shopify-backend`
3. **Click:** "Environment" tab

### Step 2: Update Credentials
**Update these EXACT values:**

```
PUBLIC_API_KEY = sup_pk_T1CKKooeHzqTf1CIVlHPPH03l0OclA7ux
SECRET_API_KEY = sup_sk_dirH4P2Pmb5IprwRzKC9HKZHfcQpECjf9
```

**Steps:**
1. Find `PUBLIC_API_KEY` → Click "Edit" → Paste new value → Save
2. Find `SECRET_API_KEY` → Click "Edit" → Paste new value → Save
3. **Redeploy:** Events tab → Manual Deploy → Deploy latest commit
4. **Wait 2 minutes** for deployment

### Step 3: Verify Backend Works
**Test in browser console:**
```javascript
fetch('https://sumup-shopify-backend.onrender.com/create-checkout', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    amount: 4990,
    currency: 'EUR',
    description: 'Test',
    redirect_url: 'https://luximyvibes.shop/checkout/thank_you'
  })
})
.then(r => r.json())
.then(data => {
  console.log('RESULT:', data);
  if(data.success && data.checkout_url) {
    console.log('✅ BACKEND WORKS!');
  } else {
    console.log('❌ ERROR:', data.error);
  }
});
```

**If still "Unknown client":**
- Double-check values in Render (no typos, no spaces)
- Contact SumUp to activate "payments" scope

---

## 🚀 FIX 2: Update Script in Shopify

### Step 1: Update the Snippet
1. **Go to:** Online Store → Themes → Edit code
2. **Click:** Snippets → `sumup-checkout-redirect`
3. **Open on your computer:** `shopify/snippets/sumup-checkout-redirect.liquid`
4. **Copy ALL content** (updated version - more aggressive)
5. **Paste into snippet** (replace everything)
6. **Save**

### Step 2: Clear Cache
1. **Go to:** Online Store → Themes
2. **Click:** "..." on your theme → "Edit code"
3. **Make a small change** (add a space somewhere) and save
4. **This forces Shopify to reload**

### Step 3: Test
1. **Go to checkout page**
2. **Press F12** → Console
3. **Look for:** "SumUp: Checkout redirect script loaded"
4. **Click "Complete order"**
5. **Watch console** - should see:
   ```
   SumUp: Button click intercepted!
   SumUp: Processing started, preventing form submission
   SumUp: Creating checkout with: {...}
   ```

---

## 🔍 DEBUGGING: What to Check

### In Browser Console (F12):

**When page loads:**
- ✅ See: "SumUp: Checkout redirect script loaded"
- ✅ See: "SumUp: Found submit button, attaching handler"

**When you click "Complete order":**
- ✅ See: "SumUp: Button click intercepted!"
- ✅ See: "SumUp: Processing started"
- ✅ See: "SumUp: Creating checkout with: {...}"

**If you see errors:**
- Share the error message
- Check if backend URL is correct

**If nothing happens:**
- Script not installed properly
- Reinstall snippet

---

## 📋 COMPLETE CHECKLIST

- [ ] Render environment variables updated with NEW keys
- [ ] Render redeployed
- [ ] Backend test shows SUCCESS (not "Unknown client")
- [ ] Snippet updated in Shopify
- [ ] Theme saved
- [ ] Browser console shows script loading
- [ ] Clicking button shows intercept messages
- [ ] Redirects to SumUp (not thank you page)

---

## 🎯 AFTER BOTH FIXES:

1. **Backend works** → Returns checkout_url
2. **Script intercepts** → Prevents form submission
3. **Redirects to SumUp** → Payment page loads ✅

---

**Do BOTH fixes, then test!**

