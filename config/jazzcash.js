// JazzCash API Configuration
export const JAZZCASH_CONFIG = {
  // Replace these with your actual JazzCash merchant credentials
  merchantId: 'MC123456', // Your Merchant ID from JazzCash
  password: 'your_password', // Your merchant password
  integritySalt: 'your_integrity_salt', // Your integrity salt key
  
  // API URLs
  sandboxUrl: 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction',
  productionUrl: 'https://payments.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction',
  
  // Configuration
  version: '1.1',
  language: 'EN',
  currency: 'PKR',
  
  // Return URLs (update these to match your domain)
  returnUrl: window.location.origin + '/payment-return',
  cancelUrl: window.location.origin + '/payment-cancel',
  
  // Payment settings
  expiryMinutes: 30, // Payment expiry time in minutes
  
  // Supported transaction types
  transactionTypes: {
    MWALLET: 'MWALLET', // Mobile Wallet
    OTC: 'OTC', // Over The Counter
    CARD: 'CARD' // Credit/Debit Card
  },
  
  // Bank/Product IDs
  bankId: 'TBANK',
  productId: 'RETL'
};

// Utility functions for JazzCash integration
export const JazzCashUtils = {
  // Generate transaction reference
  generateTransactionRef: () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `CHAINAK_${timestamp}_${random}`;
  },

  // Format phone number for JazzCash
  formatPhoneNumber: (phone) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('92')) {
      return cleaned;
    } else if (cleaned.startsWith('0')) {
      return '92' + cleaned.substr(1);
    } else {
      return '92' + cleaned;
    }
  },

  // Format CNIC
  formatCNIC: (cnic) => {
    return cnic.replace(/\D/g, '');
  },

  // Generate date time string for JazzCash API
  generateDateTime: (date = new Date()) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0];
  },

  // Generate expiry date time
  generateExpiryDateTime: (minutes = JAZZCASH_CONFIG.expiryMinutes) => {
    const expiryDate = new Date(Date.now() + minutes * 60 * 1000);
    return JazzCashUtils.generateDateTime(expiryDate);
  },

  // Convert amount to paisa (JazzCash uses paisa as base unit)
  convertToPaisa: (amount) => {
    return Math.round(amount * 100);
  },

  // Generate secure hash (simplified version - use proper HMAC-SHA256 in production)
  generateSecureHash: (data, integritySalt) => {
    // Sort the data keys alphabetically
    const sortedKeys = Object.keys(data).sort();
    
    // Create the string to hash
    let hashString = '';
    sortedKeys.forEach(key => {
      if (data[key] !== '' && key !== 'pp_SecureHash') {
        hashString += `${key}=${data[key]}&`;
      }
    });
    
    // Remove the last '&' and add integrity salt
    hashString = hashString.slice(0, -1) + integritySalt;
    
    // In production, use proper HMAC-SHA256 hashing
    // For demo purposes, using a simple base64 encoding
    return btoa(hashString).substr(0, 32);
  },

  // Validate JazzCash response
  validateResponse: (response) => {
    const requiredFields = ['pp_ResponseCode', 'pp_ResponseMessage', 'pp_TxnRefNo'];
    
    for (const field of requiredFields) {
      if (!response[field]) {
        return {
          isValid: false,
          error: `Missing required field: ${field}`
        };
      }
    }

    // Check if transaction was successful
    if (response.pp_ResponseCode === '000') {
      return {
        isValid: true,
        isSuccess: true,
        message: response.pp_ResponseMessage
      };
    } else {
      return {
        isValid: true,
        isSuccess: false,
        error: response.pp_ResponseMessage || 'Transaction failed'
      };
    }
  }
};

export default JAZZCASH_CONFIG;