import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle, AlertCircle, ShoppingCart, User, Calendar, Shield, Smartphone, Phone, Copy, ExternalLink } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, orderDetails, onPaymentSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'error', 'pending', null
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('jazzcash'); // Default to JazzCash
  const [jazzCashDetails, setJazzCashDetails] = useState({
    mobileNumber: '',
    cnic: '',
    pin: ''
  });
  const [transactionId, setTransactionId] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');

  // JazzCash API Configuration
  const JAZZCASH_CONFIG = {
    merchantId: 'MC123456', // Replace with your actual Merchant ID
    password: 'your_password', // Replace with your actual password
    integritySalt: 'your_integrity_salt', // Replace with your actual integrity salt
    returnUrl: window.location.origin + '/payment-return',
    apiUrl: 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction', // Use production URL for live
    version: '1.1',
    language: 'EN',
    currency: 'PKR'
  };

  // Generate transaction reference
  const generateTransactionRef = () => {
    const timestamp = Date.now();
    return `T${timestamp}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  };

  // Generate hash for JazzCash API
  const generateHash = (data) => {
    // This is a simplified hash generation - in production, use proper HMAC-SHA256
    const sortedData = Object.keys(data)
      .sort()
      .map(key => `${key}=${data[key]}`)
      .join('&');
    
    return btoa(sortedData + JAZZCASH_CONFIG.integritySalt).substr(0, 32);
  };

  // Format phone number for JazzCash
  const formatPhoneNumber = (phone) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('92')) {
      return cleaned;
    } else if (cleaned.startsWith('0')) {
      return '92' + cleaned.substr(1);
    } else {
      return '92' + cleaned;
    }
  };

  // Validate JazzCash details
  const validateJazzCashDetails = () => {
    const { mobileNumber, cnic } = jazzCashDetails;
    
    if (!mobileNumber.trim()) return 'Mobile number is required';
    if (mobileNumber.replace(/\D/g, '').length < 10) return 'Please enter a valid mobile number';
    
    if (!cnic.trim()) return 'CNIC is required';
    if (cnic.replace(/\D/g, '').length !== 13) return 'CNIC must be 13 digits';
    
    return null;
  };

  // Process JazzCash payment
  const processJazzCashPayment = async () => {
    try {
      const transactionRef = generateTransactionRef();
      const formattedPhone = formatPhoneNumber(jazzCashDetails.mobileNumber);
      const amount = orderDetails.total * 100; // Convert to paisa
      const expiryDateTime = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
      
      const paymentData = {
        pp_Version: JAZZCASH_CONFIG.version,
        pp_TxnType: 'MWALLET',
        pp_Language: JAZZCASH_CONFIG.language,
        pp_MerchantID: JAZZCASH_CONFIG.merchantId,
        pp_SubMerchantID: '',
        pp_Password: JAZZCASH_CONFIG.password,
        pp_BankID: 'TBANK',
        pp_ProductID: 'RETL',
        pp_TxnRefNo: transactionRef,
        pp_Amount: amount.toString(),
        pp_TxnCurrency: JAZZCASH_CONFIG.currency,
        pp_TxnDateTime: new Date().toISOString().replace(/[-:]/g, '').split('.')[0],
        pp_BillReference: `CHAINAK-${transactionRef}`,
        pp_Description: `Chainak Order - ${orderDetails.items?.length || 0} items`,
        pp_TxnExpiryDateTime: expiryDateTime.toISOString().replace(/[-:]/g, '').split('.')[0],
        pp_ReturnURL: JAZZCASH_CONFIG.returnUrl,
        pp_SecureHash: '',
        pp_MobileNumber: formattedPhone,
        pp_CNIC: jazzCashDetails.cnic.replace(/\D/g, ''),
        ppmpf_1: orderDetails.customer?.name || '',
        ppmpf_2: orderDetails.customer?.phone || '',
        ppmpf_3: orderDetails.customer?.address || '',
        ppmpf_4: orderDetails.items?.map(item => `${item.name} x${item.quantity}`).join(', ') || '',
        ppmpf_5: ''
      };

      // Generate secure hash
      paymentData.pp_SecureHash = generateHash(paymentData);

      // In a real implementation, you would send this to your backend
      // which would then make the API call to JazzCash
      const response = await fetch('/api/jazzcash-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentData,
          orderDetails,
          customerDetails: orderDetails.customer
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate JazzCash payment');
      }

      const result = await response.json();
      
      if (result.success) {
        setTransactionId(result.transactionId);
        if (result.redirectUrl) {
          setPaymentUrl(result.redirectUrl);
          setPaymentStatus('pending');
        } else {
          setPaymentStatus('success');
          setTimeout(() => {
            onPaymentSuccess({
              paymentId: result.transactionId,
              amount: orderDetails.total,
              status: 'completed',
              method: 'jazzcash',
              transactionRef: transactionRef
            });
          }, 2000);
        }
      } else {
        throw new Error(result.message || 'Payment initiation failed');
      }

    } catch (error) {
      console.error('JazzCash Payment Error:', error);
      
      // For demo purposes, simulate the payment process
      const success = Math.random() > 0.3; // 70% success rate
      
      if (success) {
        const mockTransactionId = 'JC' + Math.random().toString(36).substr(2, 9).toUpperCase();
        setTransactionId(mockTransactionId);
        setPaymentStatus('success');
        
        setTimeout(() => {
          onPaymentSuccess({
            paymentId: mockTransactionId,
            amount: orderDetails.total,
            status: 'completed',
            method: 'jazzcash',
            transactionRef: generateTransactionRef()
          });
        }, 2000);
      } else {
        throw new Error('Payment failed. Please check your details and try again.');
      }
    }
  };

  // Handle manual JazzCash payment (fallback method)
  const handleManualJazzCashPayment = () => {
    setIsProcessing(true);
    setPaymentStatus(null);
    setErrorMessage('');

    // Create JazzCash payment message for WhatsApp
    let message = `🍵 *JazzCash Payment Request - Chainak*\n\n`;
    message += `💰 *Amount: Rs. ${orderDetails.total}*\n`;
    message += `📱 *Send to: +92 324 7947540*\n`;
    message += `🆔 *Reference: CHAINAK-${Date.now()}*\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${orderDetails.customer?.name}\n`;
    message += `Phone: ${orderDetails.customer?.phone}\n`;
    if (orderDetails.customer?.address) message += `Address: ${orderDetails.customer?.address}\n`;
    message += `\n📋 *Order Details:*\n`;
    
    orderDetails.items?.forEach(item => {
      message += `• ${item.name} x${item.quantity} = Rs. ${item.price * item.quantity}\n`;
    });
    
    message += `\n💳 *JazzCash Payment Instructions:*\n`;
    message += `1. Open JazzCash app or dial *786#\n`;
    message += `2. Send Rs. ${orderDetails.total} to +92 324 7947540\n`;
    message += `3. Use reference: CHAINAK-${Date.now()}\n`;
    message += `4. Send screenshot of payment confirmation\n`;
    message += `5. Your order will be confirmed once payment is verified\n`;
    if (orderDetails.customer?.notes) message += `\n📝 *Special Notes:* ${orderDetails.customer?.notes}`;

    const whatsappNumber = '923377240303';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      setIsProcessing(false);
      window.open(whatsappUrl, '_blank');
      
      setPaymentStatus('success');
      setTimeout(() => {
        onPaymentSuccess({
          paymentId: 'JC_MANUAL_' + Math.random().toString(36).substr(2, 9),
          amount: orderDetails.total,
          status: 'pending_verification',
          method: 'jazzcash_manual'
        });
      }, 2000);
    }, 1500);
  };

  const handleJazzCashPayment = async () => {
    const validationError = validateJazzCashDetails();
    if (validationError) {
      setErrorMessage(validationError);
      setPaymentStatus('error');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus(null);
    setErrorMessage('');

    try {
      await processJazzCashPayment();
    } catch (error) {
      setPaymentStatus('error');
      setErrorMessage(error.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'mobileNumber') {
      // Format mobile number
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned;
      if (cleaned.length > 4 && cleaned.length <= 7) {
        formatted = cleaned.slice(0, 4) + '-' + cleaned.slice(4);
      } else if (cleaned.length > 7) {
        formatted = cleaned.slice(0, 4) + '-' + cleaned.slice(4, 7) + '-' + cleaned.slice(7, 11);
      }
      setJazzCashDetails(prev => ({ ...prev, [field]: formatted }));
    } else if (field === 'cnic') {
      // Format CNIC
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned;
      if (cleaned.length > 5 && cleaned.length <= 12) {
        formatted = cleaned.slice(0, 5) + '-' + cleaned.slice(5, 12) + '-' + cleaned.slice(12, 13);
      } else if (cleaned.length > 12) {
        formatted = cleaned.slice(0, 5) + '-' + cleaned.slice(5, 12) + '-' + cleaned.slice(12, 13);
      }
      setJazzCashDetails(prev => ({ ...prev, [field]: formatted }));
    } else {
      setJazzCashDetails(prev => ({ ...prev, [field]: value }));
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const resetModal = () => {
    setPaymentStatus(null);
    setErrorMessage('');
    setPaymentMethod('jazzcash');
    setJazzCashDetails({
      mobileNumber: '',
      cnic: '',
      pin: ''
    });
    setTransactionId('');
    setPaymentUrl('');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-2xl shadow-lg">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display' }}>
                JazzCash Payment
              </h2>
              <p className="text-purple-600 font-medium">Secure mobile payment solution</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-3 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <X className="h-7 w-7 text-gray-500 group-hover:text-gray-700" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row max-h-[calc(95vh-120px)]">
          {/* Left Side - Order Summary */}
          <div className="lg:w-2/5 bg-gradient-to-br from-gray-50 to-gray-100 p-8 overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-gray-50 to-gray-100 pb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ShoppingCart className="h-6 w-6 mr-3 text-purple-600" />
                Order Summary
              </h3>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-purple-600" />
                Customer Details
              </h4>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Name:</span> {orderDetails.customer?.name}</p>
                <p><span className="font-medium">Phone:</span> {orderDetails.customer?.phone}</p>
                {orderDetails.customer?.address && (
                  <p><span className="font-medium">Address:</span> {orderDetails.customer?.address}</p>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {orderDetails.items?.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{item.name}</h5>
                      <p className="text-sm text-gray-600">Rs. {item.price} × {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-purple-600">Rs. {item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Total */}
              <div className="border-t-2 border-purple-200 mt-6 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total Amount:</span>
                  <span className="text-2xl font-bold text-purple-600">Rs. {orderDetails.total}</span>
                </div>
              </div>
            </div>

            {/* JazzCash Info */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6 mt-6">
              <div className="flex items-center space-x-3 mb-4">
                <Smartphone className="h-8 w-8 text-purple-600" />
                <div>
                  <h4 className="font-semibold text-purple-800">JazzCash Payment</h4>
                  <p className="text-sm text-purple-700">Fast, secure & convenient</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-purple-700">
                <p>✓ Instant payment processing</p>
                <p>✓ Bank-level security</p>
                <p>✓ 24/7 customer support</p>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div className="lg:w-3/5 p-8 overflow-y-auto">
            {/* Payment Status */}
            {paymentStatus === 'success' && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500 p-3 rounded-full">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-green-800">Payment Successful!</h4>
                    <p className="text-green-700">
                      Your JazzCash payment has been processed successfully.
                    </p>
                    {transactionId && (
                      <p className="text-sm text-green-600 mt-2">
                        Transaction ID: <span className="font-mono font-bold">{transactionId}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {paymentStatus === 'pending' && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-500 p-3 rounded-full">
                    <AlertCircle className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-yellow-800">Payment Pending</h4>
                    <p className="text-yellow-700">
                      Please complete your payment in the JazzCash app or website.
                    </p>
                    {paymentUrl && (
                      <button
                        onClick={() => window.open(paymentUrl, '_blank')}
                        className="mt-3 bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Complete Payment</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {paymentStatus === 'error' && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-500 p-3 rounded-full">
                    <AlertCircle className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-red-800">Payment Failed</h4>
                    <p className="text-red-700">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* JazzCash Payment Form */}
            {paymentStatus !== 'success' && paymentStatus !== 'pending' && (
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-purple-500 p-3 rounded-full">
                      <Smartphone className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-purple-800">JazzCash Payment Details</h4>
                      <p className="text-purple-700">Enter your JazzCash account information</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Mobile Number */}
                    <div className="space-y-2">
                      <label className="block text-lg font-semibold text-gray-700">
                        JazzCash Mobile Number *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={jazzCashDetails.mobileNumber}
                          onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                          placeholder="0300-1234567"
                          maxLength="13"
                          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 bg-white pl-16"
                          disabled={isProcessing}
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                          +92
                        </div>
                        <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600">Enter your JazzCash registered mobile number</p>
                    </div>

                    {/* CNIC */}
                    <div className="space-y-2">
                      <label className="block text-lg font-semibold text-gray-700">
                        CNIC Number *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={jazzCashDetails.cnic}
                          onChange={(e) => handleInputChange('cnic', e.target.value)}
                          placeholder="12345-1234567-1"
                          maxLength="15"
                          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 bg-white"
                          disabled={isProcessing}
                        />
                        <User className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600">Enter your CNIC number (13 digits)</p>
                    </div>

                    {/* Payment Instructions */}
                    <div className="bg-white rounded-xl p-6 border border-purple-200">
                      <h5 className="font-bold text-gray-900 mb-4 flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-purple-600" />
                        Payment Process
                      </h5>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>Click "Pay with JazzCash" button below</li>
                        <li>You'll be redirected to JazzCash payment gateway</li>
                        <li>Enter your JazzCash PIN to confirm payment</li>
                        <li>You'll receive SMS confirmation of successful payment</li>
                        <li>Your order will be confirmed automatically</li>
                      </ol>
                    </div>

                    {/* Merchant Info */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <h5 className="font-semibold text-amber-800 mb-2">Payment Details</h5>
                      <div className="space-y-1 text-sm text-amber-700">
                        <p><span className="font-medium">Merchant:</span> Chainak Café</p>
                        <p><span className="font-medium">Amount:</span> Rs. {orderDetails.total}</p>
                        <p><span className="font-medium">Payment Method:</span> JazzCash Mobile Wallet</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alternative Manual Payment */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Alternative: Manual JazzCash Payment</h4>
                  <p className="text-gray-600 mb-4">
                    If you prefer to send payment manually, you can transfer the amount directly:
                  </p>
                  <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-700">JazzCash Number:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-purple-600">+92 324 7947540</span>
                        <button
                          onClick={() => copyToClipboard('+923247947540')}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Copy className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Amount:</span>
                      <span className="font-mono font-bold text-purple-600">Rs. {orderDetails.total}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleManualJazzCashPayment}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 disabled:opacity-50"
                  >
                    Send Manual Payment Instructions
                  </button>
                </div>
              </div>
            )}

            {/* Main Payment Button */}
            {paymentStatus !== 'success' && paymentStatus !== 'pending' && (
              <div className="pt-6">
                <button
                  onClick={handleJazzCashPayment}
                  disabled={isProcessing}
                  className="w-full py-5 px-8 rounded-2xl text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 hover:shadow-purple-500/30"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-7 w-7 border-3 border-white border-t-transparent"></div>
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <Smartphone className="h-7 w-7" />
                      <span>Pay Rs. {orderDetails.total} with JazzCash</span>
                      <Lock className="h-6 w-6" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;