# Shopify Integration Guide - Quick Start

This guide provides step-by-step instructions for integrating the SumUp payment button into your Shopify store.

## 📍 Step 1: Upload the Snippet

1. **Access Theme Editor:**
   - Go to Shopify Admin → **Online Store** → **Themes**
   - Click **Actions** → **Edit code** on your active theme

2. **Create Snippet:**
   - In the left sidebar, click **Snippets**
   - Click **Add a new snippet**
   - Name it: `sumup-pay-button`
   - Copy the entire contents from `shopify/snippets/sumup-pay-button.liquid`
   - Click **Save**

## 📍 Step 2: Add to Cart Page

### For Liquid Templates (cart.liquid)

1. **Open cart template:**
   - Go to **Templates** → `cart.liquid`

2. **Find the checkout button section** (usually around line 50-100, look for):
   ```liquid
   <button type="submit" name="checkout">
     {{ 'cart.general.checkout' | t }}
   </button>
   ```

3. **Add the SumUp button** right after the checkout button:
   ```liquid
   <div class="cart__checkout-wrapper">
     <button type="submit" name="checkout" class="cart__checkout">
       {{ 'cart.general.checkout' | t }}
     </button>
     
     {% comment %} SumUp Payment Button {% endcomment %}
     {% render 'sumup-pay-button', backend_url: 'https://your-backend-url.com' %}
   </div>
   ```

   **Replace `https://your-backend-url.com` with your actual backend URL** (e.g., `https://sumup-backend.onrender.com`)

4. **Save the file**

### For JSON Templates (Dawn, Debut, etc.)

1. **Open cart template:**
   - Go to **Templates** → `cart.json`

2. **Create a custom section** (optional but recommended):
   - Go to **Sections** → **Add a new section**
   - Name it: `sumup-payment.liquid`
   - Add this content:
   ```liquid
   {% schema %}
   {
     "name": "SumUp Payment",
     "settings": [
       {
         "type": "text",
         "id": "backend_url",
         "label": "SumUp Backend URL",
         "default": "https://your-backend-url.com",
         "info": "Enter your deployed backend URL"
       }
     ]
   }
   {% endschema %}
   
   <div class="sumup-payment-section">
     {% render 'sumup-pay-button', backend_url: section.settings.backend_url %}
   </div>
   ```

3. **Add section to cart template:**
   - In `cart.json`, find the `sections` object
   - Add your new section:
   ```json
   {
     "sections": {
       "main": {
         "type": "main-cart",
         "settings": {}
       },
       "sumup_payment": {
         "type": "sumup-payment",
         "settings": {
           "backend_url": "https://your-backend-url.com"
         }
       }
     },
     "order": ["main", "sumup_payment"]
   }
   ```

4. **Save the file**

## 📍 Step 3: Configure Backend URL

You have three options:

### Option 1: Hardcode in Snippet Render (Simplest)
```liquid
{% render 'sumup-pay-button', backend_url: 'https://sumup-backend.onrender.com' %}
```

### Option 2: Use Theme Settings (Recommended)

1. **Open theme settings:**
   - Go to **config** → `settings_schema.json`

2. **Add SumUp settings section:**
   ```json
   {
     "name": "SumUp Settings",
     "settings": [
       {
         "type": "text",
         "id": "sumup_backend_url",
         "label": "SumUp Backend URL",
         "default": "https://your-backend-url.com",
         "info": "Enter your deployed backend service URL"
       }
     ]
   }
   ```

3. **The snippet will automatically use this setting**

### Option 3: Use Section Settings (For JSON Templates)
As shown in Step 2, you can configure it in the section settings.

## 📍 Step 4: Test the Integration

1. **Add items to cart:**
   - Go to your storefront
   - Add products to cart
   - Go to cart page

2. **Verify button appears:**
   - You should see "Pay with SumUp" button
   - Button should be enabled (not grayed out)

3. **Test payment flow:**
   - Click "Pay with SumUp"
   - Should redirect to SumUp payment page
   - Complete test payment
   - Should redirect back to thank you page

## 🎨 Customization

### Change Button Text
```liquid
{% render 'sumup-pay-button', 
   backend_url: 'https://your-backend-url.com',
   button_text: 'Pay Now with SumUp' %}
```

### Add Custom CSS Class
```liquid
{% render 'sumup-pay-button', 
   backend_url: 'https://your-backend-url.com',
   button_class: 'custom-sumup-btn' %}
```

### Style the Button
The button uses the class `sumup-pay-button`. You can add custom CSS in your theme's CSS file:

```css
.sumup-pay-button {
  background-color: #6366f1;
  color: white;
  /* Add your custom styles */
}
```

## 🔧 Troubleshooting

### Button doesn't appear
- ✅ Check snippet is saved correctly
- ✅ Verify snippet is rendered in cart template
- ✅ Check browser console for errors

### "Backend URL not configured" error
- ✅ Ensure `backend_url` parameter is passed
- ✅ Verify URL is correct and accessible
- ✅ Check backend is deployed and running

### Button is disabled
- ✅ Add items to cart first
- ✅ Ensure cart total is greater than 0

### Redirect doesn't work
- ✅ Check backend CORS settings
- ✅ Verify backend URL is accessible
- ✅ Check browser console for network errors

## 📝 Notes

- The button automatically reads cart total from Shopify
- Currency is automatically detected from cart
- Return URL is automatically set to your store's thank you page
- Button is disabled if cart is empty

## ✅ Checklist

- [ ] Snippet uploaded to theme
- [ ] Snippet added to cart template
- [ ] Backend URL configured
- [ ] Backend deployed and accessible
- [ ] Tested with items in cart
- [ ] Tested payment redirect
- [ ] Verified return to thank you page

---

**Need help?** Check the main README.md for detailed documentation.

