import React from 'react';
import { Coffee, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/chainak.lhr/?hl=en', '_blank');
  };

  const handleFacebookClick = () => {
    // You can add Facebook link here if available
    window.open('https://www.facebook.com', '_blank');
  };

  const handleTwitterClick = () => {
    // You can add Twitter link here if available
    window.open('https://www.twitter.com', '_blank');
  };

  return (
    <footer className="bg-amber-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Coffee className="h-8 w-8 text-amber-400" />
              <span className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display' }}>
                Chainak
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Experience the authentic taste of traditional tea & coffee in the heart of Lahore. 
              Every cup tells a story of tradition and quality.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={handleInstagramClick}
                className="bg-gradient-to-r from-pink-500 to-red-500 p-2 rounded-full hover:from-pink-600 hover:to-red-600 transform hover:scale-110 transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </button>
              <button 
                onClick={handleFacebookClick}
                className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-full hover:from-blue-600 hover:to-blue-700 transform hover:scale-110 transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </button>
              <button 
                onClick={handleTwitterClick}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 p-2 rounded-full hover:from-blue-500 hover:to-cyan-600 transform hover:scale-110 transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Menu', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <button 
                    onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-200"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Items</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Desi Chai - Rs. 120</li>
              <li>Cappuccino - Rs. 250</li>
              <li>Kashmiri Chai - Rs. 180</li>
              <li>Masala Chai - Rs. 140</li>
              <li>Fresh Samosas - Rs. 80</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-amber-400 mt-0.5" />
                <div className="text-gray-300">
                  <p>F73R+266 Block C1</p>
                  <p>Phase 1 Johar Town</p>
                  <p>Lahore, Punjab</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-amber-400" />
                <span className="text-gray-300">+92 337 7240303</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-amber-400" />
                <span className="text-gray-300">info@chainak.lhr</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2020 Chainak Café. All rights reserved. Made with ❤️ in Lahore.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;