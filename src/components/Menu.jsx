import React, { useState } from 'react';
import { Star } from 'lucide-react';

const Menu = ({ onOrderClick }) => {
  const [activeCategory, setActiveCategory] = useState('tea');

  const categories = [
    { id: 'tea', name: 'Traditional Tea', icon: '🍵' },
    { id: 'coffee', name: 'Sandwiches', icon: '☕' },
    { id: 'food', name: 'Snacks & Food', icon: '🥪' },
    { id: 'cold', name: 'Cold Beverages', icon: '🧊' }
  ];

  const menuItems = {
    tea: [
      { name: 'Desi Chai', price: 'Rs. 120', description: 'Traditional milk tea with cardamom and ginger', popular: true },
      { name: 'Kashmiri Chai', price: 'Rs. 180', description: 'Pink tea with almonds and pistachios', popular: false },
      { name: 'Green Tea', price: 'Rs. 150', description: 'Fresh green tea with mint leaves', popular: false },
      { name: 'Masala Chai', price: 'Rs. 140', description: 'Spiced tea with traditional masala blend', popular: true },
      { name: 'Earl Grey', price: 'Rs. 160', description: 'Classic English tea with bergamot', popular: false },
      { name: 'Lemon Tea', price: 'Rs. 130', description: 'Refreshing tea with fresh lemon and honey', popular: false },
      { name: 'Lemon Tea', price: 'Rs. 130', description: 'Refreshing tea with fresh lemon and honey', popular: false }
    ],
    coffee: [
      { name: 'Cappuccino', price: 'Rs. 250', description: 'Espresso with steamed milk and foam', popular: true },
      { name: 'Latte', price: 'Rs. 280', description: 'Smooth espresso with steamed milk', popular: true },
      { name: 'Americano', price: 'Rs. 220', description: 'Pure espresso with hot water', popular: false },
      { name: 'Mocha', price: 'Rs. 320', description: 'Espresso with chocolate and steamed milk', popular: false },
      { name: 'Turkish Coffee', price: 'Rs. 200', description: 'Traditional Turkish style coffee', popular: false },
      { name: 'Cold Brew', price: 'Rs. 300', description: 'Smooth cold extracted coffee', popular: false }
    ],
    food: [
      { name: 'Samosa (2 pcs)', price: 'Rs. 80', description: 'Crispy pastries filled with spiced potatoes', popular: true },
      { name: 'Pakora Plate', price: 'Rs. 150', description: 'Mixed vegetable fritters with chutney', popular: true },
      { name: 'Chicken Sandwich', price: 'Rs. 280', description: 'Grilled chicken with fresh vegetables', popular: false },
      { name: 'Club Sandwich', price: 'Rs. 320', description: 'Triple layer sandwich with chicken and veggies', popular: false },
      { name: 'Biscuits & Cookies', price: 'Rs. 100', description: 'Assorted traditional biscuits', popular: false },
      { name: 'Cake Slice', price: 'Rs. 180', description: 'Fresh homemade cake - ask for flavors', popular: false }
    ],
    cold: [
      { name: 'Iced Tea', price: 'Rs. 180', description: 'Chilled tea with ice and mint', popular: true },
      { name: 'Fresh Lime Soda', price: 'Rs. 120', description: 'Refreshing lime with soda water', popular: true },
      { name: 'Lassi (Sweet)', price: 'Rs. 150', description: 'Traditional yogurt drink', popular: false },
      { name: 'Mango Lassi', price: 'Rs. 200', description: 'Creamy mango yogurt drink', popular: false },
      { name: 'Fresh Juice', price: 'Rs. 180', description: 'Seasonal fresh fruit juice', popular: false },
      { name: 'Iced Coffee', price: 'Rs. 280', description: 'Cold coffee with ice and cream', popular: false }
    ]
  };

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Our <span className="text-amber-600">Menu</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our carefully curated selection of traditional teas, premium coffees, and delicious snacks
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-amber-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-amber-100 hover:text-amber-600'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems[activeCategory].map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative"
            >
              {item.popular && (
                <div className="absolute -top-2 -right-2 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  Popular
                </div>
              )}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                <span className="text-xl font-bold text-amber-600">{item.price}</span>
              </div>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
              <button 
                onClick={onOrderClick}
                className="mt-4 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300"
              >
                Add to Order
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Can't find what you're looking for? We also take custom orders!</p>
          <button 
            onClick={onOrderClick}
            className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transform hover:scale-105 transition-all duration-300"
          >
            Place Custom Order
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;