import React, { useState } from 'react';
import { Star } from 'lucide-react';

const Menu = ({ onOrderClick }) => {
  const [activeCategory, setActiveCategory] = useState('breakfast');

  const categories = [
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

  const menuItems = {
    breakfast: [
      { name: 'Paratha', price: 'Rs. 80', description: 'Paratha', popular: false },
      { name: 'Paratha Anda', price: 'Rs. 280', description: 'Paratha with egg', popular: false },
      { name: 'French Toast (+Slice+Tea)', price: 'Rs. 250', description: 'French toast with tea', popular: false },
      { name: 'Omelette + Egg Fry', price: 'Rs. 220', description: 'Omelette with egg fry', popular: false },
      { name: 'Chese Omelette', price: 'Rs. 200', description: 'Chesse omelette', popular: false },
      { name: 'Plain Bread + Omelette Egg Fry', price: 'Rs. 200', description: 'Bread with omelette and egg fry', popular: false },
      { name: 'Lassi', price: 'Rs. 250', description: 'Traditional yogurt drink', popular: false },
    ],
    tea: [
      { name: 'Karak Chai', price: 'Rs. 200', description: 'Strong spiced tea', popular: false },
      { name: 'Doodh Pati', price: 'Rs. 200', description: 'Milky tea', popular: false },
      { name: 'Elachi Chai', price: 'Rs. 200', description: 'Elachi Tea', popular: false },
      { name: 'Chainak Special', price: 'Rs. 250', description: 'Special blend tea', popular: true },
      { name: 'Chocolate Tea', price: 'Rs. 250', description: 'Tea with chocolate flavor', popular: false },
      { name: 'Coffee', price: 'Rs. 350', description: 'Coffee', popular: false },
      { name: 'Kehwa', price: 'Rs. 200', description: 'Traditional Kashmiri green tea', popular: false },
    ],
    starter: [
      { name: 'Samosa (6 pcs)', price: 'Rs. 350', description: 'Crispy samosas', popular: false },
      { name: 'Nuggets(6 pcs)', price: 'Rs. 350', description: 'Crispy Nuggets', popular: false },
      { name: 'Chicken Strips (5 pcs)', price: 'Rs. 450', description: 'Fried chicken strips', popular: false },
      { name: 'Chicken Roll (5 pcs)', price: 'Rs. 350', description: 'Crispy fried chicken rolls', popular: false },
      { name: 'Hot Shots', price: 'Rs. 400', description: 'Spicy chicken bites', popular: false },
      { name: 'Cheese Ball', price: 'Rs. 450', description: 'Cheesy fried balls', popular: false },
    ],
    sandwiches: [
      { name: 'Club Sandwich', price: 'Rs. 500', description: 'Chicken, lettuce, tomato', popular: false },
      { name: 'Grill Sandwich', price: 'Rs. 500', description: 'Grilled cheese sandwich', popular: false },
      { name: 'Cheese Sandwich', price: 'Rs. 549', description: 'Double layer with cheese and mayo', popular: false },
      { name: 'Mexican Sandwich', price: 'Rs. 650', description: 'Spicy Mexican style', popular: false },
      { name: 'Chainak Special', price: 'Rs. 700', description: 'Special sandwich', popular: false },
      { name: 'Student Sandwich', price: 'Rs. 349', description: 'Affordable option', popular: true },
    ],
    pasta: [
      { name: 'Alfredo Pasta', price: 'Rs. 600', description: 'Creamy pasta', popular: false },
      { name: 'Spicy Alfredo Pasta', price: 'Rs. 650', description: 'Spicy creamy pasta', popular: false },
      { name: 'Arrabiata Pasta', price: 'Rs. 750', description: 'Spicy tomato pasta', popular: false },
    ],
    burgers: [
      { name: 'Chicken Patty Burger', price: 'Rs. 450', description: 'Chicken patty with lettuce, tomato, sauce', popular: false },
      { name: 'Grilled Chicken Burger', price: 'Rs. 500', description: 'Grilled chicken with spicy sauce', popular: false },
      { name: 'Zinger Burger', price: 'Rs. 550', description: 'Spicy zinger with special sauce', popular: true },
    ],
    pancakes: [
      { id: 1, name: 'Pan Cake', price: 'Rs. 450', description: 'Fluffy pancakes served with maple syrup and butter', popular: false },
    ],
    shakes: [
      { name: 'Oreo Shake', price: 'Rs. 450', description: 'Oreo cookie shake', popular: false },
      { name: 'Kitkat Shake', price: 'Rs. 450', description: 'Kitkat chocolate shake', popular: false },
      { name: 'Vanilla Shake', price: 'Rs. 400', description: 'Classic vanilla shake', popular: false },
      { name: 'Strawberry Shake', price: 'Rs. 350', description: 'Fresh strawberry shake', popular: false },
      { name: 'Mango Shake (seasonal)', price: 'Rs. 350', description: 'Seasonal mango shake', popular: false },
      { name: 'Nutella Blast', price: 'Rs. 400', description: 'Nutella flavored shake', popular: false },
    ],
    fries: [
      { name: 'Regular Fries', price: 'Rs. 280', description: 'Classic fries', popular: false },
      { name: 'Masala Fries', price: 'Rs. 300', description: 'Spiced fries', popular: false },
      { name: 'Garlic Mayo Fries', price: 'Rs. 320', description: 'Fries with garlic mayo', popular: false },
      { name: 'BBQ Fries', price: 'Rs. 320', description: 'BBQ flavored fries', popular: false },
      { name: 'Loaded Fries', price: 'Rs. 550', description: 'Loaded with toppings', popular: true },
    ],
    parathaRoll: [
      { name: 'Chicken Tikka Roll', price: 'Rs. 280', description: 'Chicken tikka in paratha', popular: false },
      { name: 'Chicken Cheese Roll', price: 'Rs. 300', description: 'Chicken with cheese in paratha', popular: false },
      { name: 'Kathi Roll', price: 'Rs. 350', description: 'Spicy chicken and cheese wrapped in a soft paratha', popular: false },
      { name: 'Zinger Paratha Roll', price: 'Rs. 330', description: 'Zinger in paratha', popular: false },
      { name: 'Spicy Jalapeno Wrap', price: 'Rs. 500', description: 'Spicy jalapeno wrap', popular: false },
    ],
    drinks: [
      { name: 'Mint Margarita', price: 'Rs. 250', description: 'Refreshing mint drink', popular: false },
      { name: 'Pina Colada', price: 'Rs. 400', description: 'A creamy blend of pineapple and coconut with a hint of rum flavor, served chilled', popular: false },
      { name: 'Fresh Lime', price: 'Rs. 250', description: 'Fresh lime soda', popular: false },
      { name: 'Mint Lemonade', price: 'Rs. 320', description: 'A refreshing blend of fresh lemon juice, mint, and a touch of sweetness, served over ice', popular: false },
      { name: 'Cold Coffee', price: 'Rs. 450', description: 'Iced coffee', popular: false },
      { name: 'Doodh Soda', price: 'Rs. 250', description: 'Milk soda', popular: false },
      { name: 'Lassi', price: 'Rs. 250', description: 'Yogurt and Milk', popular: false },
      { name: 'Cold Drink (345ml/500ml)', price: 'Rs. 150/250', description: 'Cold Drink', popular: false },
      { name: 'Mineral Water (500ml)', price: 'Rs. 100', description: 'Bottled water', popular: false },
      { name: 'Sting', price: 'Rs. 250', description: 'Energy drink', popular: false },
      { name: 'Red Lime', price: 'Rs. 250', description: 'Red flavored drink', popular: false },
    ],
    dessert: [
      { name: 'Brownie With Ice Cream', price: 'Rs. 349', description: 'Brownie with ice cream', popular: false },
      { name: 'Brownie', price: 'Rs. 249', description: 'Brownie', popular: false },
      { name: 'Gulab Jamun (3 pcs)', price: 'Rs. 249', description: 'Sweet gulab jamun', popular: false },
      { name: 'Chainak Special Bun', price: 'Rs. 249', description: 'Special bun dessert', popular: false },
      { name: 'Nutella Bun', price: 'Rs. 249', description: 'Nutella filled bun', popular: false },
    ],
    soup: [
      { name: 'Hot & Sour (Bowl)', price: 'Rs. 299', description: 'Spicy hot and sour soup', popular: false },
    ],
    chainakSpecialties: [
      { name: 'Chilli Dry', price: 'Rs. 800', description: 'Spicy dry chili chicken', popular: false },
      { name: 'Chicken Manchurian', price: 'Rs. 800', description: 'Manchurian style chicken', popular: false },
      { name: 'Spinach Manano', price: 'Rs. 1150', description: 'Spinach specialty', popular: false },
      { name: 'Manano Spicy', price: 'Rs. 999', description: 'Spicy manano dish', popular: false },
      { name: 'Mushroom Steak', price: 'Rs. 1050', description: 'Mushroom steak', popular: false },
      { name: 'Jalapeno Steak', price: 'Rs. 1050', description: 'Jalapeno flavored steak', popular: false },
      { name: 'White Chicken', price: 'Rs. 1000', description: 'White chicken dish', popular: false },
    ],
    deals: [
      { name: 'Deal 1', price: 'Rs. 700', description: '1 Chicken Cheese Sandwich + 1 FreshLime', popular: false },
      { name: 'Deal 2', price: 'Rs. 600', description: '1 Grill Burger + 1 Mint', popular: false },
      { name: 'Deal 3', price: 'Rs. 400', description: '1 Truck Chai + 1 Chainak Bun', popular: false },
      { name: 'Deal 4', price: 'Rs. 700', description: '1 Alfredo Pasta + 1 Drink (345ml)', popular: false },
      { name: 'Deal 5', price: 'Rs. 650', description: '1 Zinger Burger + 1 Drink (345ml)', popular: false },
      { name: 'Deal 6', price: 'Rs. 600', description: '1 Regular Fries + 1 Karak Chai', popular: false },
      { name: 'Deal 7', price: 'Rs. 1750', description: '2 Mint Margarita + 2 Ginger Burger + 1 Regular Fries', popular: false },
      { name: 'Deal 8', price: 'Rs. 1300', description: '1 Alfredo Pasta + 1 Club Sandwich + 1 Drink (500ml)', popular: false },
      { name: 'Deal 9', price: 'Rs. 2500', description: '2 Zinger Burger + 2 Mint Margarita + 1 Regular Fries', popular: false },
    ],
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