# ✅ Setup: SumUp Checkout Redirect (Not Cart Button)

This setup intercepts the "Complete order" button on the checkout page and redirects to SumUp payment.

## 🎯 What This Does

- ✅ Customer goes through normal Shopify checkout
- ✅ Fills in shipping/billing information
- ✅ When they click **"Complete order"** (or "Bestelling voltooien")
- ✅ Instead of processing through Shopify, redirects to SumUp payment
- ✅ After SumUp payment, returns to Shopify thank you page

## 📍 Step 1: Upload the New Snippet

1. **Go to Shopify Admin:**
   - **Online Store** → **Themes** → **Edit code**

2. **Create the snippet:**
   - Click **"Snippets"** in left sidebar
   - Click **"Add a new snippet"**
   - Name it: `sumup-checkout-redirect` (exactly this name)
   - Copy ALL content from: `shopify/snippets/sumup-checkout-redirect.liquid`
   - Paste and **Save**

## 📍 Step 2: Add to Checkout Page

### Option A: Checkout Scripts (EASIEST - Recommended for Standard Stores)

1. **Go to Shopify Admin:**
   - **Settings** → **Checkout**

2. **Scroll to "Order processing" section:**
   - Find **"Additional scripts"** or **"Scripts"** section
   - Look for a text area where you can add scripts

3. **Add the script:**
   - Open the file: `shopify/assets/sumup-checkout-redirect.js`
   - Copy ALL the JavaScript code
   - Paste it into the "Additional scripts" field in Shopify
   - **Save**

4. **That's it!** The script will now load on all checkout pages

### Option B: Edit checkout.liquid Template (Shopify Plus Only)

**Note:** Standard Shopify plans cannot edit checkout.liquid. This only works on Shopify Plus.

1. **Open checkout template:**
   - In theme editor: **Templates** → `checkout.liquid` (or `checkout.json`)

2. **Add the snippet:**
   - Add this code at the very end of the file (before closing `</body>` or `</html>` tag):
     ```liquid
     {% comment %} SumUp Checkout Redirect {% endcomment %}
     {% render 'sumup-checkout-redirect' %}
     ```

3. **Save**

### Option C: Create JavaScript Asset File (Alternative)

1. **In theme editor:**
   - Go to **Assets** folder
   - Click **"Add a new asset"**
   - Name it: `sumup-checkout-redirect.js`
   - Copy the JavaScript code from the snippet (everything inside `<script>` tags, without the `<script>` tags themselves)
   - Paste and **Save**

2. **Add to checkout:**
   - Use Option A (Checkout Scripts) to load this file
   - Or add to theme.liquid before `</body>` tag (but this loads on all pages)

## 📍 Step 3: Remove Cart Button (Optional)

If you added the SumUp button to the cart page and don't want it anymore:

1. **Go to Theme Customizer:**
   - **Online Store** → **Themes** → **Customize**
   - Go to **Cart** page
   - Find the "Custom Liquid" block with SumUp button
   - Click **"Remove"** or **"Delete"**

2. **Or Edit cart.liquid:**
   - Remove: `{% render 'sumup-pay-button' %}`

## ✅ Step 4: Test

1. **Go to your store:** https://luximyvibes.shop
2. **Add items to cart**
3. **Go to checkout** (not cart page)
4. **Fill in checkout information**
5. **Click "Complete order"** (or "Bestelling voltooien")
6. **Should redirect to SumUp payment page**

## 🔧 How It Works

1. Script loads on checkout page
2. Finds the "Complete order" button
3. Intercepts the button click/form submission
4. Gets checkout total from the page
5. Calls your backend to create SumUp checkout
6. Redirects to SumUp payment page
7. After payment, returns to Shopify thank you page

## ⚠️ Important Notes

- **No visible button** - It intercepts the existing checkout button
- **Works on checkout page only** - Not on cart page
- **Requires checkout total** - Script automatically finds the total from checkout page
- **Handles errors** - Shows error message if SumUp API fails

## 🐛 Troubleshooting

### Button doesn't redirect:
- ✅ Check snippet is saved: `sumup-checkout-redirect`
- ✅ Check snippet is added to checkout.liquid
- ✅ Open browser console (F12) - look for "SumUp: Checkout redirect script loaded"
- ✅ Check for JavaScript errors in console

### Can't find checkout total:
- ✅ Script tries multiple selectors to find total
- ✅ Check console for warnings
- ✅ Verify checkout page structure matches standard Shopify checkout

### Still goes to Shopify checkout:
- ✅ Check form submission is being intercepted
- ✅ Look for "SumUp: Found submit button" in console
- ✅ Verify backend URL is correct in snippet

## 📝 Current Configuration

- **Backend URL:** `https://sumup-shopify-backend.onrender.com`
- **Return URL:** `https://luximyvibes.shop/checkout/thank_you`
- **Currency:** EUR (auto-detected from checkout)

---

**After setup:** The "Complete order" button will redirect to SumUp instead of processing through Shopify!

