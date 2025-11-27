# Deployment Checklist

Use this checklist to ensure everything is properly configured before going live.

## ✅ Backend Deployment

### Pre-Deployment
- [ ] All environment variables are set in hosting platform
- [ ] Backend URL is accessible (test with `/health` endpoint)
- [ ] CORS is enabled (should work by default with the code)
- [ ] SumUp API credentials are correct
- [ ] Merchant ID is correct (`MCW7KJQ8`)
- [ ] Backend is running on HTTPS (required for production)

### Testing
- [ ] Health endpoint returns 200: `GET /health`
- [ ] Create checkout endpoint works: `POST /create-checkout`
- [ ] Token fetching works (check logs)
- [ ] Checkout creation returns valid URL

### Environment Variables to Set
```
PUBLIC_API_KEY=sup_pk_T1CKKooeHzqTf1CIVlHPPH03l0OclA7ux
SECRET_API_KEY=sup_sk_ILzwdB9aw3wnSIQcC11vdInQt9ev8uMje
SUMUP_MERCHANT_ID=MCW7KJQ8
PORT=3000
SUMUP_API_BASE=https://api.sumup.com/v0.1
SUMUP_TOKEN_URL=https://api.sumup.com/token
SHOPIFY_STORE_URL=your-store.myshopify.com
SHOPIFY_RETURN_URL=https://your-store.myshopify.com/checkout/thank_you
```

## ✅ Shopify Integration

### Theme Setup
- [ ] Snippet `sumup-pay-button.liquid` is uploaded
- [ ] Snippet is added to cart template
- [ ] Backend URL is configured (hardcoded or in settings)
- [ ] Button appears on cart page
- [ ] Button is enabled when cart has items

### Testing
- [ ] Add items to cart
- [ ] Button appears and is clickable
- [ ] Clicking button redirects to SumUp
- [ ] Payment can be completed
- [ ] Redirect back to thank you page works
- [ ] Error messages display correctly (if any)

## ✅ Production Readiness

### Security
- [ ] API keys are not exposed in frontend code
- [ ] Backend uses HTTPS
- [ ] Environment variables are secure
- [ ] No sensitive data in logs

### Functionality
- [ ] Currency is set to EUR (or correct currency)
- [ ] Minimum amount validation works
- [ ] Error handling works correctly
- [ ] Loading states display properly

### Monitoring
- [ ] Backend logs are accessible
- [ ] Error tracking is set up (optional)
- [ ] Uptime monitoring is configured (optional)

## 🧪 Test Scenarios

### Scenario 1: Happy Path
1. [ ] Customer adds items to cart
2. [ ] Customer clicks "Pay with SumUp"
3. [ ] Redirects to SumUp payment page
4. [ ] Customer completes payment
5. [ ] Redirects to Shopify thank you page

### Scenario 2: Empty Cart
1. [ ] Customer goes to cart with no items
2. [ ] Button is disabled
3. [ ] Appropriate message shown (if any)

### Scenario 3: Backend Error
1. [ ] Simulate backend downtime
2. [ ] Click "Pay with SumUp"
3. [ ] Error message displays correctly
4. [ ] Customer can retry

### Scenario 4: Network Error
1. [ ] Simulate network failure
2. [ ] Error handling works
3. [ ] User experience is acceptable

## 📋 Post-Deployment

- [ ] Monitor first few transactions
- [ ] Check backend logs for errors
- [ ] Verify payment processing
- [ ] Test on different devices/browsers
- [ ] Document any issues encountered

## 🆘 Rollback Plan

If issues occur:
1. [ ] Remove snippet from cart template
2. [ ] Keep backend running (for investigation)
3. [ ] Check logs for root cause
4. [ ] Fix issues before re-enabling

---

**Ready to go live?** ✅ Check all items above before enabling in production.

