# 🚀 Quick Setup Guide - luximyvibes.shop

Your backend is live at: **https://sumup-shopify-backend.onrender.com/**

## ✅ Step 1: Upload the Snippet to Shopify

1. **Go to Shopify Admin:**
   - Visit: https://luximyvibes.shop/admin
   - Navigate to: **Online Store** → **Themes**

2. **Edit Your Theme:**
   - Find your active theme
   - Click **"Actions"** → **"Edit code"**

3. **Create the Snippet:**
   - In the left sidebar, click **"Snippets"**
   - Click **"Add a new snippet"**
   - Name it: `sumup-pay-button` (exactly this name)
   - Copy the ENTIRE content from: `shopify/snippets/sumup-pay-button.liquid`
   - Paste it into the snippet editor
   - Click **"Save"**

## ✅ Step 2: Add Button to Cart Page

### Option A: Edit cart.liquid Template (Recommended)

1. **Open cart template:**
   - In theme editor, go to **"Templates"** → `cart.liquid`

2. **Find the checkout button section:**
   - Look for code like:
     ```liquid
     <button type="submit" name="checkout">
       {{ 'cart.general.checkout' | t }}
     </button>
     ```
   - Or search for: `checkout`

3. **Add SumUp button AFTER the regular checkout button:**
   ```liquid
   <button type="submit" name="checkout">
     {{ 'cart.general.checkout' | t }}
   </button>
   
   {% comment %} SumUp Payment Button {% endcomment %}
   {% render 'sumup-pay-button' %}
   ```

4. **Save the template**

### Option B: Add via Theme Customizer (Easier)

1. **Go to Theme Customizer:**
   - **Online Store** → **Themes** → **"Customize"**

2. **Navigate to Cart page:**
   - Click on **"Cart"** in the left sidebar

3. **Add a custom HTML block:**
   - Click **"Add block"** or **"Add section"**
   - Look for **"Custom Liquid"** or **"HTML"** block
   - Add this code:
     ```liquid
     {% render 'sumup-pay-button' %}
     ```

4. **Save**

## ✅ Step 3: Test the Integration

1. **Add items to cart:**
   - Go to your store: https://luximyvibes.shop
   - Add products to cart
   - Go to cart page

2. **Click "Pay with SumUp" button:**
   - You should see the button
   - Click it
   - It should redirect to SumUp payment page

3. **Verify:**
   - Check browser console (F12) for any errors
   - Button should show loading state when clicked
   - Should redirect to SumUp checkout

## 🔧 Troubleshooting

### Button doesn't appear:
- ✅ Check snippet name is exactly: `sumup-pay-button`
- ✅ Check snippet was saved
- ✅ Check you added `{% render 'sumup-pay-button' %}` to cart template

### Button appears but doesn't work:
- ✅ Open browser console (F12) → Check for errors
- ✅ Verify backend URL: https://sumup-shopify-backend.onrender.com
- ✅ Test backend: Visit https://sumup-shopify-backend.onrender.com/health

### Payment redirect fails:
- ✅ Check SumUp API credentials in Render environment variables
- ✅ Verify merchant ID is correct
- ✅ Check Render logs for errors

## 📝 Current Configuration

- **Backend URL:** `https://sumup-shopify-backend.onrender.com`
- **Store URL:** `https://luximyvibes.shop`
- **Return URL:** `https://luximyvibes.shop/checkout/thank_you`
- **Currency:** EUR
- **Merchant ID:** MCW7KJQ8

## 🎯 Next Steps After Setup

1. Test with a small amount first
2. Verify payment flow end-to-end
3. Test return URL redirects correctly
4. Monitor Render logs for any issues

---

**Need Help?** Check the main README.md for detailed documentation.

