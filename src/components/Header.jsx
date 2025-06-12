import React, { useState, useEffect } from 'react';
import { Menu, X, Coffee, Phone } from 'lucide-react';

const Header = ({ onOrderClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleCallNow = () => {
    // Updated WhatsApp number for Chainak
    const whatsappNumber = '923377240303';
    const message = 'Hi! I would like to place an order or make an inquiry.';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-amber-600" />
            <span className="text-2xl font-bold text-amber-800" style={{ fontFamily: 'Playfair Display' }}>
              Chainak
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Home', 'About', 'Menu', 'Gallery', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleCallNow}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </button>
            <button
              onClick={onOrderClick}
              className="bg-amber-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-amber-700 transform hover:scale-105 transition-all duration-300 "
            >
              Order Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-amber-600 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <nav className="py-4 space-y-2">
            {['Home', 'About', 'Menu', 'Gallery', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors duration-200"
              >
                {item}
              </button>
            ))}
            <div className="flex flex-col space-y-2 px-4 pt-2">
              <button
                onClick={handleCallNow}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </button>
              {/* <button
                onClick={onOrderClick}
                className="bg-amber-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-amber-700 transition-colors"
              >
                Order Now
              </button> */}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;