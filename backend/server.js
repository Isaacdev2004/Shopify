/**
 * SumUp Payment Integration Backend for Shopify
 * 
 * This server handles:
 * - OAuth token management for SumUp API
 * - Creating hosted checkout sessions
 * - Returning checkout URLs to Shopify frontend
 */

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Environment variables validation
const requiredEnvVars = [
  'PUBLIC_API_KEY',
  'SECRET_API_KEY',
  'SUMUP_MERCHANT_ID',
  'SUMUP_API_BASE',
  'SUMUP_TOKEN_URL'
];

// Check for required environment variables
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Please check your .env file');
  process.exit(1);
}

// Token cache to avoid unnecessary API calls
let tokenCache = {
  accessToken: null,
  expiresAt: null
};

/**
 * Get OAuth token from SumUp using Client Credentials Flow
 * Uses token caching to minimize API calls
 */
async function getSumUpToken() {
  // Return cached token if still valid (with 5 minute buffer)
  if (tokenCache.accessToken && tokenCache.expiresAt > Date.now() + 300000) {
    return tokenCache.accessToken;
  }

  try {
    const credentials = Buffer.from(
      `${process.env.PUBLIC_API_KEY}:${process.env.SECRET_API_KEY}`
    ).toString('base64');

    const response = await axios.post(
      process.env.SUMUP_TOKEN_URL,
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    if (response.data && response.data.access_token) {
      // Cache the token
      const expiresIn = response.data.expires_in || 3600; // Default 1 hour
      tokenCache = {
        accessToken: response.data.access_token,
        expiresAt: Date.now() + (expiresIn * 1000)
      };
      
      console.log('✅ SumUp token obtained successfully');
      return tokenCache.accessToken;
    } else {
      throw new Error('Invalid token response from SumUp');
    }
  } catch (error) {
    console.error('❌ Error fetching SumUp token:');
    console.error('Status:', error.response?.status);
    console.error('Response:', error.response?.data);
    console.error('Request URL:', process.env.SUMUP_TOKEN_URL);
    console.error('Credentials format check:', {
      publicKey: process.env.PUBLIC_API_KEY?.substring(0, 10) + '...',
      secretKey: process.env.SECRET_API_KEY?.substring(0, 10) + '...',
      hasPublicKey: !!process.env.PUBLIC_API_KEY,
      hasSecretKey: !!process.env.SECRET_API_KEY
    });
    throw new Error(`Failed to obtain SumUp token: ${error.response?.data?.error_description || error.response?.data?.error || error.message}`);
  }
}

/**
 * Create a hosted checkout session with SumUp
 * @param {Object} checkoutData - Checkout data (amount, currency, description, redirect_url)
 * @returns {Promise<Object>} - Checkout response with checkout_url or checkout_reference
 */
async function createCheckout(checkoutData) {
  try {
    const token = await getSumUpToken();

    const payload = {
      checkout_reference: `SHOPIFY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      amount: checkoutData.amount, // Amount in cents
      currency: checkoutData.currency || 'EUR',
      description: checkoutData.description || 'Shopify Order Payment',
      merchant_code: process.env.SUMUP_MERCHANT_ID,
      redirect_url: checkoutData.redirect_url,
      return_url: checkoutData.return_url || checkoutData.redirect_url
    };

    const response = await axios.post(
      `${process.env.SUMUP_API_BASE}/checkouts`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Checkout created successfully:', response.data.id);
    return response.data;
  } catch (error) {
    console.error('❌ Error creating checkout:', error.response?.data || error.message);
    throw new Error(
      `Failed to create checkout: ${error.response?.data?.message || error.response?.data?.error || error.message}`
    );
  }
}

/**
 * Root endpoint - API information
 */
app.get('/', (req, res) => {
  res.json({
    service: 'SumUp Shopify Payment Integration',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      createCheckout: 'POST /create-checkout'
    },
    documentation: 'See README.md for API usage',
    timestamp: new Date().toISOString()
  });
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'SumUp Shopify Integration',
    timestamp: new Date().toISOString()
  });
});

/**
 * POST /create-checkout
 * 
 * Creates a SumUp hosted checkout session
 * 
 * Request body:
 * {
 *   "amount": 10000,           // Amount in cents (required)
 *   "currency": "EUR",         // Currency code (optional, defaults to EUR)
 *   "description": "Order #123", // Order description (optional)
 *   "order_id": "12345",       // Shopify order ID (optional, for reference)
 *   "redirect_url": "https://store.myshopify.com/checkout/thank_you" // Return URL (required)
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "checkout_url": "https://...",
 *   "checkout_reference": "...",
 *   "checkout_id": "..."
 * }
 */
app.post('/create-checkout', async (req, res) => {
  try {
    const { amount, currency, description, order_id, redirect_url } = req.body;

    // Validation
    if (!amount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: amount (in cents)'
      });
    }

    if (!redirect_url) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: redirect_url'
      });
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount: must be a positive number (in cents)'
      });
    }

    // Create checkout description
    const checkoutDescription = description || 
      (order_id ? `Shopify Order #${order_id}` : 'Shopify Order Payment');

    // Create checkout session
    const checkoutData = {
      amount: Math.round(amount), // Ensure integer
      currency: currency || 'EUR',
      description: checkoutDescription,
      redirect_url: redirect_url,
      return_url: redirect_url
    };

    const checkout = await createCheckout(checkoutData);

    // Return checkout URL or reference
    res.json({
      success: true,
      checkout_url: checkout.redirect_uri || checkout.checkout_url,
      checkout_reference: checkout.checkout_reference || checkout.id,
      checkout_id: checkout.id,
      amount: checkout.amount,
      currency: checkout.currency
    });

  } catch (error) {
    console.error('Error in /create-checkout:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

/**
 * Error handling middleware
 */
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SumUp Shopify Backend running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 Create checkout: POST http://localhost:${PORT}/create-checkout`);
});

module.exports = app;

