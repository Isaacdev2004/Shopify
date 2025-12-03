# 🔧 FIX: Widget Not Showing / Still Redirecting

## ⚠️ Problem

The payment widget isn't showing and it's still redirecting to thank you page. This means:

1. **Old redirect script is still active** - Need to remove it
2. **Widget not replacing checkout button** - Need to hide Shopify button
3. **Widget not loading** - Need to check installation

---

## 🚀 COMPLETE FIX (Do All Steps)

### Step 1: Remove Old Redirect Script

1. **Go to:** Online Store → Themes → Edit code
2. **Check theme.liquid:**
   - Layout → `theme.liquid`
   - Find: `{% render 'sumup-checkout-redirect' %}`
   - **DELETE this line** (or comment it out)
   - Save

3. **Check if snippet exists:**
   - Snippets → `sumup-checkout-redirect`
   - If it exists, you can delete it or leave it (won't be used)

### Step 2: Install/Update Payment Widget

1. **Go to:** Online Store → Themes → Edit code
2. **Snippets → `sumup-payment-widget`**
   - If it doesn't exist: Create it
   - If it exists: Open it
3. **Open on your computer:** `shopify/snippets/sumup-payment-widget.liquid`
4. **Copy ALL content** (updated version - hides Shopify button)
5. **Paste into snippet** (replace everything)
6. **Save**

### Step 3: Add Widget to Theme

1. **Still in theme editor:**
2. **Layout → `theme.liquid`**
3. **Find:** `</body>` tag (near the end)
4. **Add BEFORE `</body>`:**
   ```liquid
   {% if template.name == 'checkout' %}
   {% render 'sumup-payment-widget' %}
   {% endif %}
   ```
5. **Save**

### Step 4: Clear Cache & Test

1. **Clear browser cache:** Ctrl+F5 (or Cmd+Shift+R on Mac)
2. **Go to checkout page**
3. **Press F12 → Console**
4. **Look for:**
   - "SumUp: Payment Widget script loaded"
   - "SumUp: Hiding Shopify checkout button"
   - "SumUp: Checkout created, mounting widget"

---

## ✅ What Should Happen

**On checkout page:**
- ✅ Shopify's "Complete order" button is HIDDEN
- ✅ SumUp payment widget appears (card form)
- ✅ Customer can enter card details
- ✅ Payment processes on the page
- ✅ On success → redirects to thank you page

---

## 🔍 Debugging

### Check Console (F12):

**If you see:**
- "SumUp: Payment Widget script loaded" → ✅ Script installed
- "SumUp: Hiding Shopify checkout button" → ✅ Button hiding works
- "SumUp: Checkout created" → ✅ Backend works
- "SumUp Payment Widget loaded" → ✅ Widget mounted

**If you DON'T see:**
- Script loading message → Script not installed
- Widget loaded message → Backend error or SDK issue

### Check Page:

**Look for:**
- Box with "Pay with SumUp" heading
- Card input fields (card number, expiry, CVV)
- "Pay [amount] €" button
- "Powered by SumUp" footer

**If you see Shopify button instead:**
- Widget not installed
- Or old redirect script still active

---

## 📋 Complete Checklist

- [ ] Removed `{% render 'sumup-checkout-redirect' %}` from theme.liquid
- [ ] Created/updated `sumup-payment-widget` snippet
- [ ] Added `{% render 'sumup-payment-widget' %}` to theme.liquid
- [ ] Theme saved
- [ ] Browser cache cleared
- [ ] Console shows widget loading messages
- [ ] Shopify button is hidden
- [ ] SumUp widget is visible

---

## 🎯 Quick Test

1. **Go to checkout**
2. **F12 → Console**
3. **Should see:** "SumUp: Payment Widget script loaded"
4. **Should see:** "SumUp: Hiding Shopify checkout button"
5. **Should see:** SumUp card form on page
6. **Should NOT see:** Shopify "Complete order" button

---

**Do all steps above and test!**

