# SumUp Payment Integration for Shopify

A complete payment integration solution that allows Shopify stores to accept payments through SumUp's hosted checkout. This integration includes a Node.js backend service and a Shopify theme snippet for seamless payment processing.

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Shopify Integration](#shopify-integration)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [API Reference](#api-reference)

## ✨ Features

- ✅ **OAuth Token Management** - Automatic token fetching and caching using SumUp Client Credentials Flow
- ✅ **Hosted Checkout** - Secure redirect-based payment flow
- ✅ **EUR Support** - Configured for Italian merchants with EUR currency
- ✅ **Cart Integration** - Automatically reads cart total from Shopify
- ✅ **Error Handling** - Comprehensive error handling and user feedback
- ✅ **Production Ready** - Clean, structured, and well-documented code

## 🏗️ Architecture

```
┌─────────────────┐         ┌──────────────┐         ┌─────────────┐
│  Shopify Store  │ ──────> │   Backend    │ ──────> │   SumUp     │
│  (Frontend)     │         │  (Node.js)   │         │    API      │
└─────────────────┘         └──────────────┘         └─────────────┘
       │                            │
       │                            │
       └────────────────────────────┘
            (Checkout URL)
```

**Flow:**
1. Customer clicks "Pay with SumUp" button on cart page
2. Frontend calls backend `/create-checkout` endpoint
3. Backend fetches OAuth token from SumUp (if needed)
4. Backend creates hosted checkout session
5. Backend returns checkout URL to frontend
6. Customer is redirected to SumUp payment page
7. After payment, customer is redirected back to Shopify thank you page

## 📦 Prerequisites

- Node.js 14+ installed
- SumUp merchant account with API credentials
- Shopify store (standard or Plus)
- Backend hosting service (Render, Railway, Vercel, etc.)

## 🚀 Installation

### Step 1: Backend Setup

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   Copy the environment variables template and fill in your values:
   ```bash
   # Create .env file (copy from .env.example if available)
   ```

   Add the following to your `.env` file:
   ```env
   PUBLIC_API_KEY=sup_pk_T1CKKooeHzqTf1CIVlHPPH03l0OclA7ux
   SECRET_API_KEY=sup_sk_ILzwdB9aw3wnSIQcC11vdInQt9ev8uMje
   SUMUP_MERCHANT_ID=MCW7KJQ8
   PORT=3000
   SUMUP_API_BASE=https://api.sumup.com/v0.1
   SUMUP_TOKEN_URL=https://api.sumup.com/token
   SHOPIFY_STORE_URL=your-store.myshopify.com
   SHOPIFY_RETURN_URL=https://your-store.myshopify.com/checkout/thank_you
   ```

4. **Test locally:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

   Visit `http://localhost:3000/health` to verify the server is running.

### Step 2: Deploy Backend

Choose one of the following hosting options:

#### Option A: Render.com

1. Create a new account on [Render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository (or use manual deploy)
4. Configure:
   - **Name:** `sumup-shopify-backend`
   - **Environment:** `Node`
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Root Directory:** `backend`
5. Add environment variables in Render dashboard:
   - Copy all variables from your `.env` file
6. Deploy and note your service URL (e.g., `https://sumup-backend.onrender.com`)

#### Option B: Railway

1. Create account on [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Node.js
5. Set root directory to `backend`
6. Add environment variables in Railway dashboard
7. Deploy and get your service URL

#### Option C: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. In the `backend` folder, run: `vercel`
3. Follow prompts to deploy
4. Add environment variables in Vercel dashboard
5. Note your deployment URL

### Step 3: Shopify Theme Integration

#### A. Upload the Snippet

1. **Access your Shopify theme:**
   - Go to Shopify Admin → Online Store → Themes
   - Click "Actions" → "Edit code" on your active theme

2. **Create the snippet:**
   - Navigate to `snippets/` folder
   - Click "Add a new snippet"
   - Name it: `sumup-pay-button`
   - Copy the contents from `shopify/snippets/sumup-pay-button.liquid`
   - Save

#### B. Add to Cart Page

1. **Open cart template:**
   - In theme editor, go to `templates/` → `cart.liquid` (or `templates/cart.json`)

2. **For Liquid templates (`cart.liquid`):**
   
   Find the cart form or checkout button section and add:
   ```liquid
   {% render 'sumup-pay-button', backend_url: 'https://your-backend-url.com' %}
   ```
   
   Example placement (after the regular checkout button):
   ```liquid
   <div class="cart__checkout-wrapper">
     <button type="submit" name="checkout" class="cart__checkout">
       {{ 'cart.general.checkout' | t }}
     </button>
     
     {% comment %} SumUp Payment Button {% endcomment %}
     {% render 'sumup-pay-button', backend_url: 'https://your-backend-url.com' %}
   </div>
   ```

3. **For JSON templates (`cart.json`):**
   
   If your theme uses JSON templates, you'll need to:
   - Add the snippet to a section that's included in the cart template
   - Or create a custom section that includes the snippet
   
   Example section file (`sections/sumup-payment.liquid`):
   ```liquid
   {% schema %}
   {
     "name": "SumUp Payment",
     "settings": [
       {
         "type": "text",
         "id": "backend_url",
         "label": "Backend URL",
         "default": "https://your-backend-url.com"
       }
     ]
   }
   {% endschema %}
   
   {% render 'sumup-pay-button', backend_url: section.settings.backend_url %}
   ```
   
   Then add this section to your cart template in the theme customizer.

#### C. Configure Backend URL

**Option 1: Hardcode in snippet render (simplest)**
```liquid
{% render 'sumup-pay-button', backend_url: 'https://your-backend-url.com' %}
```

**Option 2: Use theme settings (recommended)**
1. In theme editor, go to `config/settings_schema.json`
2. Add a setting:
   ```json
   {
     "name": "SumUp Settings",
     "settings": [
       {
         "type": "text",
         "id": "sumup_backend_url",
         "label": "SumUp Backend URL",
         "default": "https://your-backend-url.com"
       }
     ]
   }
   ```
3. The snippet will automatically use `settings.sumup_backend_url`

#### D. Set Return URL

The return URL is automatically constructed from your store's domain. The default is:
```
https://your-store.myshopify.com/checkout/thank_you
```

If you need a custom return URL, you can modify the `getReturnUrl()` function in the snippet's JavaScript section.

## ⚙️ Configuration

### Backend Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PUBLIC_API_KEY` | SumUp Public API Key | Yes | `sup_pk_...` |
| `SECRET_API_KEY` | SumUp Secret API Key | Yes | `sup_sk_...` |
| `SUMUP_MERCHANT_ID` | SumUp Merchant Code | Yes | `MCW7KJQ8` |
| `PORT` | Server port | No | `3000` (default) |
| `SUMUP_API_BASE` | SumUp API base URL | Yes | `https://api.sumup.com/v0.1` |
| `SUMUP_TOKEN_URL` | SumUp OAuth token URL | Yes | `https://api.sumup.com/token` |
| `SHOPIFY_STORE_URL` | Your Shopify store URL | No | `store.myshopify.com` |
| `SHOPIFY_RETURN_URL` | Return URL after payment | No | Auto-constructed |

### Frontend Configuration

The snippet accepts the following parameters:

- `backend_url` - Your backend service URL (required)
- `button_text` - Custom button text (optional, default: "Pay with SumUp")
- `button_class` - Custom CSS class (optional)

## 🧪 Testing

### 1. Test Backend Locally

```bash
cd backend
npm start
```

**Test health endpoint:**
```bash
curl http://localhost:3000/health
```

**Test checkout creation:**
```bash
curl -X POST http://localhost:3000/create-checkout \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "currency": "EUR",
    "description": "Test Order",
    "redirect_url": "https://your-store.myshopify.com/checkout/thank_you"
  }'
```

### 2. Test in Shopify

1. Add items to cart
2. Go to cart page
3. Click "Pay with SumUp" button
4. Verify redirect to SumUp payment page
5. Complete test payment (use SumUp test credentials)
6. Verify redirect back to thank you page

### 3. Test Payment Flow

**Test Mode:**
- Use SumUp's test environment credentials
- Test with small amounts (e.g., 1 EUR)
- Verify webhook callbacks (if configured)

**Production Mode:**
- Use production SumUp credentials
- Test with real payment methods
- Monitor logs for errors

## 🔍 Troubleshooting

### Backend Issues

**Problem: "Missing required environment variables"**
- Solution: Check your `.env` file has all required variables
- Verify variable names match exactly (case-sensitive)

**Problem: "Failed to obtain SumUp token"**
- Solution: Verify your API credentials are correct
- Check SumUp API status
- Ensure credentials have proper permissions

**Problem: "Failed to create checkout"**
- Solution: Verify merchant ID is correct
- Check amount is valid (minimum 1 cent)
- Ensure redirect_url is a valid HTTPS URL

### Frontend Issues

**Problem: Button doesn't appear**
- Solution: Check snippet is properly uploaded
- Verify snippet is rendered in cart template
- Check browser console for JavaScript errors

**Problem: "Backend URL not configured"**
- Solution: Ensure `backend_url` parameter is passed to snippet
- Or configure in theme settings

**Problem: "Your cart is empty"**
- Solution: Add items to cart before testing
- Verify cart object is available in Liquid context

**Problem: Redirect doesn't work**
- Solution: Check CORS settings on backend
- Verify backend URL is accessible
- Check browser console for network errors

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `CORS error` | Backend not allowing requests | Ensure CORS middleware is enabled |
| `401 Unauthorized` | Invalid API credentials | Verify credentials in `.env` |
| `400 Bad Request` | Invalid request data | Check amount format (must be integer in cents) |
| `Network error` | Backend unreachable | Verify backend URL and deployment status |

## 📚 API Reference

### POST /create-checkout

Creates a SumUp hosted checkout session.

**Request:**
```json
{
  "amount": 10000,
  "currency": "EUR",
  "description": "Order #123",
  "order_id": "12345",
  "redirect_url": "https://store.myshopify.com/checkout/thank_you"
}
```

**Response (Success):**
```json
{
  "success": true,
  "checkout_url": "https://checkout.sumup.com/...",
  "checkout_reference": "SHOPIFY-1234567890-abc123",
  "checkout_id": "checkout-id-123",
  "amount": 10000,
  "currency": "EUR"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "service": "SumUp Shopify Integration",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔒 Security Considerations

1. **Never expose API keys in frontend code**
   - All sensitive credentials stay in backend `.env`
   - Frontend only receives checkout URLs

2. **Use HTTPS in production**
   - SumUp requires HTTPS for redirect URLs
   - Ensure backend is served over HTTPS

3. **Validate inputs**
   - Backend validates all request data
   - Amount must be positive integer
   - URLs must be valid HTTPS

4. **Token caching**
   - Tokens are cached to reduce API calls
   - Tokens automatically refresh before expiry

## 📝 Notes

- **Currency:** Currently configured for EUR (Italian merchants)
- **Minimum Amount:** SumUp typically requires minimum 0.01 EUR
- **Redirect Flow:** This uses SumUp's hosted checkout (redirect-based)
- **Order Completion:** After payment, customer returns to Shopify thank you page
- **Order Status:** You may need to handle order status updates via webhooks (not included in this integration)

## 🆘 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review SumUp API documentation: https://developer.sumup.com
3. Check backend logs for detailed error messages
4. Verify all configuration values are correct

## 📄 License

ISC

---

**Built for Shopify + SumUp Integration** 🚀

