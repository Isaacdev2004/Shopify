// SumUp Checkout Redirect Script
// This intercepts the "Complete order" button and redirects to SumUp payment
// Backend URL - Update this if your backend URL changes
const SUMUP_BACKEND_URL = 'https://sumup-shopify-backend.onrender.com';

(function() {
  'use strict';
  
  console.log('SumUp: Checkout redirect script loaded');
  
  const BACKEND_URL = SUMUP_BACKEND_URL;
  let isProcessing = false;
  
  // Get checkout total from page
  function getCheckoutTotal() {
    // Try multiple selectors to find total
    const totalSelectors = [
      '[data-checkout-payment-due-target]',
      '[data-total-price]',
      '.total-line__price',
      '.order-summary__section--total .order-summary__emphasis',
      '.total-recap__final-price',
      '.payment-due__price',
      '.total-line-table__footer .total-line__price'
    ];
    
    for (const selector of totalSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.textContent || element.innerText;
        // Extract number from text (remove currency symbols, spaces, etc.)
        const match = text.match(/[\d,]+\.?\d*/);
        if (match) {
          const amount = parseFloat(match[0].replace(/,/g, ''));
          return Math.round(amount * 100); // Convert to cents
        }
      }
    }
    
    // Fallback: try to get from checkout object
    if (window.Shopify && window.Shopify.checkout) {
      const total = window.Shopify.checkout.total_price;
      if (total) {
        return Math.round(total / 100); // Shopify stores in cents, but we need to verify
      }
    }
    
    console.warn('SumUp: Could not find checkout total');
    return null;
  }
  
  // Get currency
  function getCurrency() {
    if (window.Shopify && window.Shopify.checkout) {
      return window.Shopify.checkout.currency || 'EUR';
    }
    return 'EUR';
  }
  
  // Get order ID if available
  function getOrderId() {
    if (window.Shopify && window.Shopify.checkout) {
      return window.Shopify.checkout.order_id || null;
    }
    return null;
  }
  
  // Get return URL (thank you page)
  function getReturnUrl() {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    return `${protocol}//${hostname}/checkout/thank_you`;
  }
  
  // Show error message
  function showError(message) {
    console.error('SumUp Error:', message);
    
    // Try to find error container or create one
    let errorDiv = document.getElementById('sumup-checkout-error');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.id = 'sumup-checkout-error';
      errorDiv.style.cssText = 'margin: 15px 0; padding: 15px; background-color: #fee; border: 1px solid #fcc; border-radius: 4px; color: #c33; font-size: 14px;';
      
      // Try to insert before submit button
      const submitButton = findSubmitButton();
      if (submitButton && submitButton.parentElement) {
        submitButton.parentElement.insertBefore(errorDiv, submitButton);
      } else {
        document.body.insertBefore(errorDiv, document.body.firstChild);
      }
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Hide after 10 seconds
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 10000);
  }
  
  // Find the submit/complete order button
  function findSubmitButton() {
    const selectors = [
      'button[type="submit"]',
      'input[type="submit"]',
      'button[name="complete"]',
      '[data-complete-order-button]',
      '.step__footer__continue-btn',
      '.order-summary__section .btn',
      'button.btn--primary',
      '.payment-button'
    ];
    
    for (const selector of selectors) {
      const buttons = document.querySelectorAll(selector);
      for (const button of buttons) {
        const text = (button.textContent || button.innerText || '').toLowerCase();
        if (text.includes('complete') || 
            text.includes('order') || 
            text.includes('voltooien') || 
            text.includes('afrekenen') ||
            text.includes('pay') ||
            text.includes('betalen')) {
          return button;
        }
      }
    }
    
    // Fallback: find any submit button in a form
    const forms = document.querySelectorAll('form');
    for (const form of forms) {
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      if (submitBtn) {
        return submitBtn;
      }
    }
    
    return null;
  }
  
  // Create SumUp checkout and redirect
  async function redirectToSumUp(event) {
    if (isProcessing) {
      return false;
    }
    
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    
    isProcessing = true;
    
    const submitButton = findSubmitButton();
    let originalText = '';
    if (submitButton) {
      submitButton.disabled = true;
      originalText = submitButton.textContent || submitButton.innerText;
      submitButton.textContent = 'Processing...';
    }
    
    try {
      const amount = getCheckoutTotal();
      if (!amount || amount <= 0) {
        throw new Error('Could not determine checkout total. Please refresh and try again.');
      }
      
      const currency = getCurrency();
      const orderId = getOrderId();
      const returnUrl = getReturnUrl();
      
      console.log('SumUp: Creating checkout with:', {
        amount,
        currency,
        orderId,
        returnUrl
      });
      
      const payload = {
        amount: amount,
        currency: currency,
        description: orderId ? `Shopify Order #${orderId}` : 'Shopify Checkout Payment',
        order_id: orderId,
        redirect_url: returnUrl
      };
      
      const response = await fetch(`${BACKEND_URL}/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }
      
      if (data.success && data.checkout_url) {
        console.log('SumUp: Checkout created, redirecting to:', data.checkout_url);
        // Redirect to SumUp payment page
        window.location.href = data.checkout_url;
      } else {
        throw new Error(data.error || 'Invalid response from server');
      }
      
    } catch (error) {
      console.error('SumUp: Error creating checkout:', error);
      
      let errorMessage = error.message || 'Failed to create payment session. Please try again.';
      
      if (errorMessage.includes('Unknown client')) {
        errorMessage = 'Payment service configuration error. Please contact store support.';
      }
      
      showError(errorMessage);
      
      // Re-enable button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText || 'Complete order';
      }
      
      isProcessing = false;
    }
    
    return false;
  }
  
  // Initialize
  function init() {
    console.log('SumUp: Initializing checkout redirect...');
    
    // Wait for page to fully load
    const initCheckout = () => {
      const submitButton = findSubmitButton();
      
      if (submitButton) {
        console.log('SumUp: Found submit button, attaching handler');
        
        // Prevent form submission
        const form = submitButton.closest('form');
        if (form) {
          form.addEventListener('submit', redirectToSumUp, true);
          console.log('SumUp: Form submit handler attached');
        }
        
        // Also handle button click directly
        submitButton.addEventListener('click', redirectToSumUp, true);
        console.log('SumUp: Button click handler attached');
        
      } else {
        console.warn('SumUp: Submit button not found, retrying...');
        // Retry after a delay
        setTimeout(initCheckout, 500);
      }
    };
    
    // Start initialization
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCheckout);
    } else {
      // DOM already ready, but wait a bit for dynamic content
      setTimeout(initCheckout, 100);
    }
  }
  
  // Start
  init();
  
})();

