# 🔍 Verify SumUp API Credentials

## ⚠️ Still Getting "Unknown client" Error

The backend is working, but SumUp is rejecting the credentials. Let's verify:

## ✅ Step 1: Double-Check Credentials in Render

1. **Go to Render Dashboard:**
   - https://dashboard.render.com
   - Your service: `sumup-shopify-backend`
   - **Environment** tab

2. **Verify EXACT values (copy-paste to avoid typos):**

   ```
   PUBLIC_API_KEY
   Value: sup_pk_T1CKKooeHzqTf1CIVIHPPH0310OclA7ux
   
   SECRET_API_KEY
   Value: sup_sk_ILzwdB9aw3wnSIQcC11vdlnQt9ev8uMje
   ```

3. **Check for:**
   - ✅ No extra spaces before/after
   - ✅ No line breaks
   - ✅ Exact match (case-sensitive)
   - ✅ No hidden characters

## ✅ Step 2: Verify Credentials Format

**Public Key should start with:** `sup_pk_`
**Secret Key should start with:** `sup_sk_`

**Current values:**
- Public: `sup_pk_T1CKKooeHzqTf1CIVIHPPH0310OclA7ux` ✅
- Secret: `sup_sk_ILzwdB9aw3wnSIQcC11vdlnQt9ev8uMje` ✅

## ✅ Step 3: Check SumUp Account Status

The "Unknown client" error usually means:

1. **API access not activated:**
   - Credentials need to be activated in SumUp merchant dashboard
   - Contact SumUp support to activate API access

2. **Wrong environment:**
   - Credentials might be for test/sandbox, not production
   - Or vice versa

3. **Merchant account issue:**
   - Merchant ID might not match the API keys
   - Account might need verification

## ✅ Step 4: Contact SumUp Support

**What to ask:**
- "I need to verify my API credentials are active for merchant ID MCW7KJQ8"
- "I'm getting 'Unknown client' error when trying to authenticate"
- "Can you confirm these API keys are active: [provide the keys]"
- "Do I need to enable API access in my merchant dashboard?"

## 🔧 Alternative: Test with SumUp API Directly

You can test the credentials directly:

```bash
# Test token endpoint
curl -X POST https://api.sumup.com/token \
  -H "Authorization: Basic $(echo -n 'sup_pk_T1CKKooeHzqTf1CIVIHPPH0310OclA7ux:sup_sk_ILzwdB9aw3wnSIQcC11vdlnQt9ev8uMje' | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials"
```

If this also returns "Unknown client", the credentials themselves are the issue.

---

**Next Steps:**
1. Double-check credentials in Render (no typos)
2. Verify credentials are activated in SumUp
3. Contact SumUp support if still not working

