import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Phone, CreditCard, Banknote } from 'lucide-react';

const OrderModal = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'online'

  const menuItems = {
    tea: [
      { id: 1, name: 'Desi Chai', price: 120, category: 'tea' },
      { id: 2, name: 'Kashmiri Chai', price: 180, category: 'tea' },
      { id: 3, name: 'Green Tea', price: 150, category: 'tea' },
      { id: 4, name: 'Masala Chai', price: 140, category: 'tea' },
      { id: 5, name: 'Earl Grey', price: 160, category: 'tea' },
      { id: 6, name: 'Lemon Tea', price: 130, category: 'tea' }
    ],
    coffee: [
      { id: 7, name: 'Cappuccino', price: 250, category: 'coffee' },
      { id: 8, name: 'Latte', price: 280, category: 'coffee' },
      { id: 9, name: 'Americano', price: 220, category: 'coffee' },
      { id: 10, name: 'Mocha', price: 320, category: 'coffee' },
      { id: 11, name: 'Turkish Coffee', price: 200, category: 'coffee' },
      { id: 12, name: 'Cold Brew', price: 300, category: 'coffee' }
    ],
    food: [
      { id: 13, name: 'Samosa (2 pcs)', price: 80, category: 'food' },
      { id: 14, name: 'Pakora Plate', price: 150, category: 'food' },
      { id: 15, name: 'Chicken Sandwich', price: 280, category: 'food' },
      { id: 16, name: 'Club Sandwich', price: 320, category: 'food' },
      { id: 17, name: 'Biscuits & Cookies', price: 100, category: 'food' },
      { id: 18, name: 'Cake Slice', price: 180, category: 'food' }
    ]
  };

  const allItems = [...menuItems.tea, ...menuItems.coffee, ...menuItems.food];

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

  const handleSubmitOrder = () => {
    if (cart.length === 0) {
      alert('Please add items to your cart first!');
      return;
    }

    if (!customerInfo.name || !customerInfo.phone) {
      alert('Please fill in your name and phone number!');
      return;
    }

    // Create WhatsApp message
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
    message += `💳 *Payment Method: ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}*\n`;
    if (customerInfo.notes) message += `\n📝 *Special Notes:* ${customerInfo.notes}`;

    // Updated WhatsApp number for Chainak
    const whatsappNumber = '923377240303';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setCart([]);
    setCustomerInfo({ name: '', phone: '', address: '', notes: '' });
    setPaymentMethod('cod');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display' }}>
            Place Your Order
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
          {/* Menu Items */}
          <div className="flex-1 p-6 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Select Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allItems.map(item => (
                <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{item.name}</h4>
                    <span className="text-amber-600 font-bold">Rs. {item.price}</span>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart and Customer Info */}
          <div className="w-full lg:w-96 border-l bg-gray-50 p-6 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Your Order</h3>
            
            {/* Cart Items */}
            <div className="space-y-3 mb-6">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Your cart is empty</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">Rs. {item.price} each</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Total */}
            {cart.length > 0 && (
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-amber-600">Rs. {getTotalPrice()}</span>
                </div>
              </div>
            )}

            {/* Customer Information */}
            <div className="space-y-4 mb-6">
              <h4 className="font-semibold">Customer Information</h4>
              <input
                type="text"
                placeholder="Your Name *"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="Delivery Address (Optional)"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <textarea
                placeholder="Special Instructions (Optional)"
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Payment Method</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <div className="flex items-center space-x-2">
                    <Banknote className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Cash on Delivery (COD)</span>
                  </div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Online Payment</span>
                  </div>
                </label>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {paymentMethod === 'cod' ? (
                  <p>💰 Pay with cash when your order is delivered</p>
                ) : (
                  <p>💳 We'll send you payment details via WhatsApp</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitOrder}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Send Order via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;