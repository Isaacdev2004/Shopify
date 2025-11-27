# Environment Variables Setup

Create a `.env` file in the `backend` folder with the following variables:

```env
# SumUp API Credentials
PUBLIC_API_KEY=sup_pk_T1CKKooeHzqTf1CIVlHPPH03l0OclA7ux
SECRET_API_KEY=sup_sk_ILzwdB9aw3wnSIQcC11vdInQt9ev8uMje
SUMUP_MERCHANT_ID=MCW7KJQ8

# Server Configuration
PORT=3000

# SumUp API URLs
SUMUP_API_BASE=https://api.sumup.com/v0.1
SUMUP_TOKEN_URL=https://api.sumup.com/token

# Shopify Configuration (for return URL)
SHOPIFY_STORE_URL=your-store.myshopify.com
SHOPIFY_RETURN_URL=https://your-store.myshopify.com/checkout/thank_you
```

## Important Notes

- **Never commit the `.env` file** to version control
- Replace `your-store.myshopify.com` with your actual Shopify store URL
- The API keys provided are for the merchant account specified
- For production, use environment variables provided by your hosting service

