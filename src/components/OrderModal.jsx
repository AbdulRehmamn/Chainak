import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Phone, CreditCard, Banknote, Search, Star, Clock, User, Smartphone } from 'lucide-react';
import PaymentModal from './PaymentModal.jsx';

const OrderModal = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod', 'jazzcash'
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Items', icon: '🍽️', color: 'bg-gray-100 text-gray-700' },
    { id: 'tea', name: 'Traditional Tea', icon: '🍵', color: 'bg-amber-100 text-amber-700' },
    { id: 'coffee', name: 'Premium Coffee', icon: '☕', color: 'bg-orange-100 text-orange-700' },
    { id: 'food', name: 'Snacks & Food', icon: '🥪', color: 'bg-green-100 text-green-700' }
  ];

  const menuItems = {
    tea: [
      { id: 1, name: 'Desi Chai', price: 1, category: 'tea', description: 'Traditional milk tea with cardamom and ginger', popular: true, prepTime: '5 min', rating: 4.8 },
      { id: 2, name: 'Kashmiri Chai', price: 180, category: 'tea', description: 'Pink tea with almonds and pistachios', popular: false, prepTime: '8 min', rating: 4.6 },
      { id: 3, name: 'Green Tea', price: 150, category: 'tea', description: 'Fresh green tea with mint leaves', popular: false, prepTime: '4 min', rating: 4.4 },
      { id: 4, name: 'Masala Chai', price: 140, category: 'tea', description: 'Spiced tea with traditional masala blend', popular: true, prepTime: '6 min', rating: 4.7 },
      { id: 5, name: 'Earl Grey', price: 160, category: 'tea', description: 'Classic English tea with bergamot', popular: false, prepTime: '5 min', rating: 4.3 },
      { id: 6, name: 'Lemon Tea', price: 130, category: 'tea', description: 'Refreshing tea with fresh lemon and honey', popular: false, prepTime: '4 min', rating: 4.5 }
    ],
    coffee: [
      { id: 7, name: 'Cappuccino', price: 250, category: 'coffee', description: 'Espresso with steamed milk and foam', popular: true, prepTime: '7 min', rating: 4.9 },
      { id: 8, name: 'Latte', price: 280, category: 'coffee', description: 'Smooth espresso with steamed milk', popular: true, prepTime: '6 min', rating: 4.8 },
      { id: 9, name: 'Americano', price: 220, category: 'coffee', description: 'Pure espresso with hot water', popular: false, prepTime: '4 min', rating: 4.5 },
      { id: 10, name: 'Mocha', price: 320, category: 'coffee', description: 'Espresso with chocolate and steamed milk', popular: false, prepTime: '8 min', rating: 4.6 },
      { id: 11, name: 'Turkish Coffee', price: 200, category: 'coffee', description: 'Traditional Turkish style coffee', popular: false, prepTime: '10 min', rating: 4.4 },
      { id: 12, name: 'Cold Brew', price: 300, category: 'coffee', description: 'Smooth cold extracted coffee', popular: false, prepTime: '2 min', rating: 4.7 }
    ],
    food: [
      { id: 13, name: 'Samosa (2 pcs)', price: 80, category: 'food', description: 'Crispy pastries filled with spiced potatoes', popular: true, prepTime: '3 min', rating: 4.6 },
      { id: 14, name: 'Pakora Plate', price: 150, category: 'food', description: 'Mixed vegetable fritters with chutney', popular: true, prepTime: '5 min', rating: 4.5 },
      { id: 15, name: 'Chicken Sandwich', price: 280, category: 'food', description: 'Grilled chicken with fresh vegetables', popular: false, prepTime: '12 min', rating: 4.4 },
      { id: 16, name: 'Club Sandwich', price: 320, category: 'food', description: 'Triple layer sandwich with chicken and veggies', popular: false, prepTime: '15 min', rating: 4.7 },
      { id: 17, name: 'Biscuits & Cookies', price: 100, category: 'food', description: 'Assorted traditional biscuits', popular: false, prepTime: '1 min', rating: 4.2 },
      { id: 18, name: 'Cake Slice', price: 180, category: 'food', description: 'Fresh homemade cake - ask for flavors', popular: false, prepTime: '2 min', rating: 4.8 }
    ]
  };

  const allItems = [...menuItems.tea, ...menuItems.coffee, ...menuItems.food];

  const getFilteredItems = () => {
    let items = activeCategory === 'all' ? allItems : menuItems[activeCategory] || [];
    
    if (searchTerm) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return items;
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem => 
        cartItem.id === itemId 
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSubmitOrder = () => {
    if (cart.length === 0) {
      alert('Please add items to your cart first!');
      return;
    }

    if (!customerInfo.name || !customerInfo.phone) {
      alert('Please fill in your name and phone number!');
      return;
    }

    if (paymentMethod === 'jazzcash') {
      setShowPaymentModal(true);
    } else {
      handleCODOrder();
    }
  };

  const handleCODOrder = () => {
    let message = `🍵 *New Order from Chainak Website*\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${customerInfo.name}\n`;
    message += `Phone: ${customerInfo.phone}\n`;
    if (customerInfo.address) message += `Address: ${customerInfo.address}\n`;
    message += `\n📋 *Order Details:*\n`;
    
    cart.forEach(item => {
      message += `• ${item.name} x${item.quantity} = Rs. ${item.price * item.quantity}\n`;
    });
    
    message += `\n💰 *Total: Rs. ${getTotalPrice()}*\n`;
    message += `💳 *Payment Method: Cash on Delivery*\n`;
    if (customerInfo.notes) message += `\n📝 *Special Notes:* ${customerInfo.notes}`;

    const whatsappNumber = '923377240303';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    resetForm();
    onClose();
  };

  const handlePaymentSuccess = (paymentDetails) => {
    let message = `🍵 *New PAID Order from Chainak Website*\n\n`;
    message += `✅ *Payment Status: CONFIRMED*\n`;
    message += `💳 *Payment ID: ${paymentDetails.paymentId}*\n`;
    message += `💳 *Payment Method: JazzCash*\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${customerInfo.name}\n`;
    message += `Phone: ${customerInfo.phone}\n`;
    if (customerInfo.address) message += `Address: ${customerInfo.address}\n`;
    message += `\n📋 *Order Details:*\n`;
    
    cart.forEach(item => {
      message += `• ${item.name} x${item.quantity} = Rs. ${item.price * item.quantity}\n`;
    });
    
    message += `\n💰 *Total Paid: Rs. ${getTotalPrice()}*\n`;
    if (customerInfo.notes) message += `\n📝 *Special Notes:* ${customerInfo.notes}`;

    const whatsappNumber = '923377240303';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    resetForm();
    setShowPaymentModal(false);
  };

  const resetForm = () => {
    setCart([]);
    setCustomerInfo({ name: '', phone: '', address: '', notes: '' });
    setPaymentMethod('cod');
    setSearchTerm('');
    setActiveCategory('all');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-3xl w-full max-w-7xl h-[95vh] overflow-hidden shadow-2xl">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b-2 border-gray-100 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-4 rounded-2xl shadow-lg">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display' }}>
                  Place Your Order
                </h2>
                <p className="text-amber-600 font-medium text-lg">Choose from our delicious menu</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-100 rounded-full transition-colors group"
            >
              <X className="h-8 w-8 text-gray-500 group-hover:text-gray-700" />
            </button>
          </div>

          <div className="flex flex-col xl:flex-row h-[calc(95vh-120px)]">
            {/* Left Side - Menu Items (Larger) */}
            <div className="flex-1 xl:w-3/5 p-6 sm:p-8 overflow-y-auto">
              {/* Search and Filter Section */}
              <div className="mb-8 space-y-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for your favorite items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 bg-gray-50"
                  />
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center space-x-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                        activeCategory === category.id
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                          : `${category.color} hover:shadow-md`
                      }`}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="text-base">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu Items Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {getFilteredItems().map(item => (
                  <div key={item.id} className="bg-white border-2 border-gray-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative group">
                    {/* Popular Badge */}
                    {item.popular && (
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        Popular
                      </div>
                    )}

                    {/* Item Header */}
                    <div className="mb-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-2xl font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                          Rs. {item.price}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-base mb-4">{item.description}</p>
                      
                      {/* Item Details */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{item.prepTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-current text-yellow-400" />
                          <span className="font-medium">{item.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 px-6 rounded-2xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <Plus className="h-5 w-5" />
                      <span className="text-lg">Add to Cart</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* No Results Message */}
              {getFilteredItems().length === 0 && (
                <div className="text-center py-16">
                  <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-2">No items found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>

            {/* Right Side - Cart and Customer Info */}
            <div className="xl:w-2/5 border-l-2 border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 overflow-y-auto">
              {/* Cart Header */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <ShoppingCart className="h-7 w-7 mr-3 text-amber-600" />
                  Your Order
                </h3>
                {cart.length > 0 && (
                  <div className="bg-amber-500 text-white px-4 py-2 rounded-full font-bold">
                    {getTotalItems()} items
                  </div>
                )}
              </div>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-8">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <ShoppingCart className="h-10 w-10 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
                    <p className="text-gray-400">Add some delicious items to get started!</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg">{item.name}</h4>
                          <p className="text-amber-600 font-semibold">Rs. {item.price} each</p>
                        </div>
                        <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                          >
                            <Minus className="h-5 w-5 text-red-500 group-hover:text-red-600" />
                          </button>
                          <span className="w-12 text-center font-bold text-lg text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="p-2 hover:bg-green-100 rounded-lg transition-colors group"
                          >
                            <Plus className="h-5 w-5 text-green-500 group-hover:text-green-600" />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-bold text-xl text-amber-600">Rs. {item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total Section */}
              {cart.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">Total Amount:</span>
                    <span className="text-3xl font-bold text-amber-600">Rs. {getTotalPrice()}</span>
                  </div>
                </div>
              )}

              {/* Customer Information */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="h-6 w-6 mr-2 text-amber-600" />
                  Customer Information
                </h4>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="+92 337 7240303"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address</label>
                    <input
                      type="text"
                      placeholder="Enter your delivery address (optional)"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Special Instructions</label>
                    <textarea
                      placeholder="Any special requests or notes for your order..."
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 resize-none text-lg"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h4>
                <div className="space-y-4">
                  <label className="flex items-center space-x-4 cursor-pointer p-4 border-2 border-gray-200 rounded-xl hover:border-green-300 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-green-600 focus:ring-green-500 w-5 h-5"
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="bg-green-100 p-3 rounded-xl">
                        <Banknote className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 text-lg">Cash on Delivery (COD)</span>
                        <p className="text-gray-600 text-sm">Pay with cash when your order arrives</p>
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-4 cursor-pointer p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="jazzcash"
                      checked={paymentMethod === 'jazzcash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-purple-600 focus:ring-purple-500 w-5 h-5"
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="bg-purple-100 p-3 rounded-xl">
                        <Smartphone className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 text-lg">JazzCash Payment</span>
                        <p className="text-gray-600 text-sm">Secure payment with JazzCash mobile wallet</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitOrder}
                disabled={cart.length === 0}
                className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white py-5 px-8 rounded-2xl text-xl font-bold hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 shadow-2xl"
              >
                {paymentMethod === 'jazzcash' ? (
                  <>
                    <Smartphone className="h-6 w-6" />
                    <span>Pay with JazzCash</span>
                  </>
                ) : (
                  <>
                    <Phone className="h-6 w-6" />
                    <span>Send Order via WhatsApp</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        orderDetails={{
          items: cart,
          total: getTotalPrice(),
          customer: customerInfo
        }}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default OrderModal;