import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  Banknote,
} from 'lucide-react';

const OrderModal = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [activeCategory, setActiveCategory] = useState('all');

  // Categories with icons
  const categories = [
    { id: 'all', name: 'All Items', icon: '📋' },
    { id: 'breakfast', name: 'Breakfast', icon: '🍳' },
    { id: 'tea', name: 'Tea', icon: '🍵' },
    { id: 'starter', name: 'Starters', icon: '🥟' },
    { id: 'sandwiches', name: 'Sandwiches', icon: '🥪' },
    { id: 'pasta', name: 'Pasta', icon: '🍝' },
    { id: 'burgers', name: 'Burgers', icon: '🍔' },
    { id: 'pancakes', name: 'Pancakes', icon: '🥞' },
    { id: 'shakes', name: 'Shakes', icon: '🥤' },
    { id: 'fries', name: 'Fries', icon: '🍟' },
    { id: 'parathaRoll', name: 'Paratha Roll', icon: '🌯' },
    { id: 'drinks', name: 'Drinks', icon: '🧋' },
    { id: 'dessert', name: 'Dessert', icon: '🍦' },
    { id: 'soup', name: 'Soup', icon: '🥣' },
    { id: 'chainakSpecialties', name: 'Chainak Specialties', icon: '🍽️' },
    { id: 'deals', name: 'Deals', icon: '💰' },
  ];

  // Menu items grouped by category
  const menuItems = {
    breakfast: [
      { id: 1, name: 'Paratha', price: 80, description: 'Paratha', popular: false, category: 'breakfast' },
      { id: 2, name: 'Paratha Anda', price: 280, description: 'Paratha with egg', popular: false, category: 'breakfast' },
      { id: 3, name: 'French Toast (+Slice+Tea)', price: 250, description: 'French toast with tea', popular: false, category: 'breakfast' },
      { id: 4, name: 'Omelette + Egg Fry', price: 220, description: 'Omelette with egg fry', popular: false, category: 'breakfast' },
      { id: 5, name: 'Chese Omelette', price: 200, description: 'Chesse omelette', popular: false, category: 'breakfast' },
      { id: 6, name: 'Plain Bread + Omelette Egg Fry', price: 200, description: 'Bread with omelette and egg fry', popular: false, category: 'breakfast' },
      { id: 7, name: 'Lassi', price: 250, description: 'Traditional yogurt drink', popular: false, category: 'breakfast' },
    ],
    tea: [
      { id: 8, name: 'Karak Chai', price: 200, description: 'Strong spiced tea', popular: false, category: 'tea' },
      { id: 9, name: 'Doodh Pati', price: 200, description: 'Milky tea', popular: false, category: 'tea' },
      { id: 10, name: 'Elachi Chai', price: 200, description: 'Elachi Tea', popular: false, category: 'tea' },
      { id: 11, name: 'Chainak Special', price: 250, description: 'Special blend tea', popular: true, category: 'tea' },
      { id: 12, name: 'Chocolate Tea', price: 250, description: 'Tea with chocolate flavor', popular: false, category: 'tea' },
      { id: 13, name: 'Coffee', price: 350, description: 'Coffee', popular: false, category: 'tea' },
      { id: 14, name: 'Kehwa', price: 200, description: 'Traditional Kashmiri green tea', popular: false, category: 'tea' }
    ],
    starter: [
      { id: 15, name: 'Samosa (6 pcs)', price: 350, description: 'Crispy samosas', popular: false, category: 'starter' },
      { id: 16, name: 'Nuggets(6 pcs)', price: 350, description: 'Crispy Nuggets', popular: false, category: 'starter' },
      { id: 17, name: 'Chicken Strips (5 pcs)', price: 450, description: 'Fried chicken strips', popular: false, category: 'starter' },
      { id: 18, name: 'Chicken Roll (5 pcs)', price: 350, description: 'Crispy fried chicken rolls', popular: false, category: 'starter' },
      { id: 19, name: 'Hot Shots', price: 400, description: 'Spicy chicken bites', popular: false, category: 'starter' },
      { id: 20, name: 'Cheese Ball', price: 450, description: 'Cheesy fried balls', popular: false, category: 'starter' },
    ],
    sandwiches: [
      { id: 21, name: 'Club Sandwich', price: 500, description: 'Chicken, lettuce, tomato', popular: false, category: 'sandwiches' },
      { id: 22, name: 'Grill Sandwich', price: 500, description: 'Grilled cheese sandwich', popular: false, category: 'sandwiches' },
      { id: 23, name: 'Cheese Sandwich', price: 549, description: 'Double layer with cheese and mayo', popular: false, category: 'sandwiches' },
      { id: 24, name: 'Mexican Sandwich', price: 650, description: 'Spicy Mexican style', popular: false, category: 'sandwiches' },
      { id: 25, name: 'Chainak Special', price: 700, description: 'Special sandwich', popular: false, category: 'sandwiches' },
      { id: 26, name: 'Student Sandwich', price: 349, description: 'Affordable option', popular: true, category: 'sandwiches' },
    ],
    pasta: [
      { id: 27, name: 'Alfredo Pasta', price: 600, description: 'Creamy pasta', popular: false, category: 'pasta' },
      { id: 28, name: 'Spicy Alfredo Pasta', price: 650, description: 'Spicy creamy pasta', popular: false, category: 'pasta' },
      { id: 29, name: 'Arrabiata Pasta', price: 750, description: 'Spicy tomato pasta', popular: false, category: 'pasta' },
    ],
    burgers: [
      { id: 30, name: 'Chicken Patty Burger', price: 450, description: 'Chicken patty with lettuce, tomato, sauce', popular: false, category: 'burgers' },
      { id: 31, name: 'Grilled Chicken Burger', price: 500, description: 'Grilled chicken with spicy sauce', popular: false, category: 'burgers' },
      { id: 32, name: 'Zinger Burger', price: 550, description: 'Spicy zinger with special sauce', popular: true, category: 'burgers' },
    ],
    pancakes: [
      { id: 1, name: 'Pancakes', price: 450, description: 'Fluffy pancakes served with maple syrup and butter', category: 'pancakes' },
    ],
    shakes: [
      { id: 33, name: 'Oreo Shake', price: 450, description: 'Oreo cookie shake', popular: false, category: 'shakes' },
      { id: 34, name: 'Kitkat Shake', price: 450, description: 'Kitkat chocolate shake', popular: false, category: 'shakes' },
      { id: 35, name: 'Vanilla Shake', price: 400, description: 'Classic vanilla shake', popular: false, category: 'shakes' },
      { id: 36, name: 'Strawberry Shake', price: 350, description: 'Fresh strawberry shake', popular: false, category: 'shakes' },
      { id: 37, name: 'Mango Shake (seasonal)', price: 350, description: 'Seasonal mango shake', popular: false, category: 'shakes' },
      { id: 38, name: 'Nutella Blast', price: 400, description: 'Nutella flavored shake', popular: false, category: 'shakes' },
    ],
    fries: [
      { id: 39, name: 'Regular Fries', price: 280, description: 'Classic fries', popular: false, category: 'fries' },
      { id: 40, name: 'Masala Fries', price: 300, description: 'Spiced fries', popular: false, category: 'fries' },
      { id: 41, name: 'Garlic Mayo Fries', price: 320, description: 'Fries with garlic mayo', popular: false, category: 'fries' },
      { id: 42, name: 'BBQ Fries', price: 320, description: 'BBQ flavored fries', popular: false, category: 'fries' },
      { id: 43, name: 'Loaded Fries', price: 550, description: 'Loaded with toppings', popular: true, category: 'fries' },
    ],
    parathaRoll: [
      { id: 44, name: 'Chicken Tikka Roll', price: 280, description: 'Chicken tikka in paratha', popular: false, category: 'parathaRoll' },
      { id: 45, name: 'Chicken Poisson Cheese Roll', price: 300, description: 'Chicken with cheese in paratha', popular: false, category: 'parathaRoll' },
      { id: 46, name: 'Kathi Roll', price: 350, description: 'Spicy chicken and cheese wrapped in a soft paratha', popular: false, category: 'parathaRoll' },
      { id: 47, name: 'Zinger Paratha Roll', price: 330, description: 'Zinger in paratha', popular: false, category: 'parathaRoll' },
      { id: 48, name: 'Spicy Jalapeno Wrap', price: 500, description: 'Spicy jalapeno wrap', popular: false, category: 'parathaRoll' },
    ],
    drinks: [
      { id: 49, name: 'Mint Margarita', price: 250, description: 'Refreshing mint drink', popular: false, category: 'drinks' },
      { id: 50, name: 'Pina Colada', price: 400, description: 'A creamy blend of pineapple and coconut with a hint of rum flavor, served chilled', popular: false, category: 'drinks' },
      { id: 51, name: 'Fresh Lime', price: 250, description: 'Fresh lime soda', popular: false, category: 'drinks' },
      { id: 52, name: 'Mint Lemonade', price: 320, description: 'A refreshing blend of fresh lemon juice, mint, and a touch of sweetness, served over ice', popular: false, category: 'drinks' },
      { id: 53, name: 'Cold Coffee', price: 450, description: 'Iced coffee', popular: false, category: 'drinks' },
      { id: 54, name: 'Doodh Soda', price: 250, description: 'Milk soda', popular: false, category: 'drinks' },
      { id: 55, name: 'Lassi', price: 250, description: 'Yogurt and Milk', popular: false, category: 'drinks' },
      { id: 56, name: 'Cold Drink (345ml/500ml)', price: 150, description: 'Cold Drink', popular: false, category: 'drinks' },
      { id: 57, name: 'Mineral Water (500ml)', price: 100, description: 'Bottled water', popular: false, category: 'drinks' },
      { id: 58, name: 'Sting', price: 250, description: 'Energy drink', popular: false, category: 'drinks' },
      { id: 59, name: 'Red Lime', price: 250, description: 'Red flavored drink', popular: false, category: 'drinks' },
    ],
    dessert: [
      { id: 60, name: 'Brownie With Ice Cream', price: 349, description: 'Brownie with ice cream', popular: false, category: 'dessert' },
      { id: 61, name: 'Brownie', price: 249, description: 'Brownie', popular: false, category: 'dessert' },
      { id: 62, name: 'Gulab Jamun (3 pcs)', price: 249, description: 'Sweet gulab jamun', popular: false, category: 'dessert' },
      { id: 63, name: 'Chainak Special Bun', price: 249, description: 'Special bun dessert', popular: false, category: 'dessert' },
      { id: 64, name: 'Nutella Bun', price: 249, description: 'Nutella filled bun', popular: false, category: 'dessert' },
    ],
    soup: [
      { id: 65, name: 'Hot & Sour (Bowl)', price: 299, description: 'Spicy hot and sour soup', popular: false, category: 'soup' },
    ],
    chainakSpecialties: [
      { id: 66, name: 'Chilli Dry', price: 800, description: 'Spicy dry chili chicken', popular: false, category: 'chainakSpecialties' },
      { id: 67, name: 'Chicken Manchurian', price: 800, description: 'Manchurian style chicken', popular: false, category: 'chainakSpecialties' },
      { id: 68, name: 'Spinach Manano', price: 1150, description: 'Spinach specialty', popular: false, category: 'chainakSpecialties' },
      { id: 69, name: 'Manano Spicy', price: 999, description: 'Spicy manano dish', popular: false, category: 'chainakSpecialties' },
      { id: 70, name: 'Mushroom Steak', price: 1050, description: 'Mushroom steak', popular: false, category: 'chainakSpecialties' },
      { id: 71, name: 'Jalapeno Steak', price: 1050, description: 'Jalapeno flavored steak', popular: false, category: 'chainakSpecialties' },
      { id: 72, name: 'White Chicken', price: 1000, description: 'White chicken dish', popular: false, category: 'chainakSpecialties' },
    ],
    deals: [
      { id: 73, name: 'Deal 1', price: 700, description: '1 Chicken Cheese Sandwich + 1 FreshLime', popular: false, category: 'deals' },
      { id: 74, name: 'Deal 2', price: 600, description: '1 Grill Burger + 1 Mint', popular: false, category: 'deals' },
      { id: 75, name: 'Deal 3', price: 400, description: '1 Truck Chai + 1 Chainak Bun', popular: false, category: 'deals' },
      { id: 76, name: 'Deal 4', price: 700, description: '1 Alfredo Pasta + 1 Drink (345ml)', popular: false, category: 'deals' },
      { id: 77, name: 'Deal 5', price: 650, description: '1 Zinger Burger + 1 Drink (345ml)', popular: false, category: 'deals' },
      { id: 78, name: 'Deal 6', price: 600, description: '1 Regular Fries + 1 Karak Chai', popular: false, category: 'deals' },
      { id: 79, name: 'Deal 7', price: 1750, description: '2 Mint Margarita + 2 Ginger Burger + 1 Regular Fries', popular: false, category: 'deals' },
      { id: 80, name: 'Deal 8', price: 1300, description: '1 Alfredo Pasta + 1 Club Sandwich + 1 Drink (500ml)', popular: false, category: 'deals' },
      { id: 81, name: 'Deal 9', price: 2500, description: '2 Zinger Burger + 2 Mint Margarita + 1 Regular Fries', popular: false, category: 'deals' },
    ],
  };

  const allItems = Object.values(menuItems).flat();

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(ci =>
        ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find(item => item.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      setCart(cart.filter(item => item.id !== itemId));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmitOrder = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    let message = `*New Order from Chainak Website*\n`;
    message += `*Customer Details*\n`;
    message += `Name: ${customerInfo.name}\nPhone: ${customerInfo.phone}\n`;
    if (customerInfo.address) message += `Address: ${customerInfo.address}\n`;

    message += `\n*Order Details*\n`;
    cart.forEach(item => {
      message += `• ${item.name} x${item.quantity} = Rs. ${item.price * item.quantity}\n`;
    });

    message += `\n*Total:* Rs. ${getTotalPrice()}\n`;
    message += `*Payment Method:* ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}\n`;

    if (customerInfo.notes) message += `\n*Notes:* ${customerInfo.notes}`;

    const whatsappNumber = '923377240303';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setCart([]);
    setCustomerInfo({ name: '', phone: '', address: '', notes: '' });
    setPaymentMethod('cod');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b">
          <h2 className="text-3xl font-bold">Place Your Order</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-full overflow-y-auto">
          {/* Left Side - Menu */}
          <div className="flex-1 p-8 overflow-y-auto max-h-[75vh] scroll-smooth">
            <h3 className="text-xl font-semibold mb-6">Select Items</h3>
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-3 rounded-xl flex items-center space-x-2 ${
                    activeCategory === cat.id
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(activeCategory === 'all' ? allItems : menuItems[activeCategory])?.map(item => (
                <div key={item.id} className="border rounded-xl p-6 hover:shadow-lg">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <span className="text-amber-600 font-bold text-lg">Rs. {item.price}</span>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 flex items-center justify-center space-x-2"
                  >
                    <Plus size={18} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Cart & Info */}
          <div className="w-full lg:w-96 border-l bg-gray-50 p-8 overflow-y-auto max-h-[80vh] scroll-smooth">
            <h3 className="text-xl font-semibold mb-6">Your Order Summary</h3>
            {/* Cart Items */}
            <div className="space-y-4 mb-8">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-6">🛒 Your cart is empty</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex-1 pr-2">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">Rs. {item.price} each</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => removeFromCart(item.id)} className="p-1 hover:bg-gray-100 rounded">
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="p-1 hover:bg-gray-100 rounded">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Total */}
            {cart.length > 0 && (
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-amber-600">Rs. {getTotalPrice()}</span>
                </div>
              </div>
            )}

            {/* Customer Form */}
            <div className="space-y-5 mb-6">
              <h4 className="font-semibold text-lg">Customer Info</h4>
              <input
                type="text"
                placeholder="Full Name *"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                required
              />
              <input
                type="text"
                placeholder="Delivery Address (Optional)"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
              />
              <textarea
                placeholder="Any special instructions?"
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 resize-none"
              />
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h4 className="font-semibold text-lg mb-4">Payment Method</h4>
              <label className="flex items-center space-x-4 cursor-pointer mb-4">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-amber-600 focus:ring-amber-500"
                />
                <div className="flex items-center space-x-3">
                  <Banknote size={20} className="text-green-600" />
                  <span>Cash on Delivery (COD)</span>
                </div>
              </label>
              <label className="flex items-center space-x-4 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-amber-600 focus:ring-amber-500"
                />
                <div className="flex items-center space-x-3">
                  <CreditCard size={20} className="text-blue-600" />
                  <span>Online Payment</span>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitOrder}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 flex items-center justify-center space-x-3"
            >
              <ShoppingCart size={20} />
              <span>Send Order via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;