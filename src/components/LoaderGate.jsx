import React, { useState, useEffect } from 'react';
import { Coffee, ChevronRight, Clock, MapPin, Phone, Star, Heart } from 'lucide-react';

const LoaderGate = ({ onEnter }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Check if cafe is open (12 PM to 2 AM)
    const checkIfOpen = () => {
      const now = new Date();
      const currentHour = now.getHours();
      
      // Open from 12 PM (12) to 2 AM (2) - includes 12:00-23:59 and 0:00-1:59
      const isCurrentlyOpen = currentHour >= 12 || currentHour < 2;
      setIsOpen(isCurrentlyOpen);
    };

    checkIfOpen();
    return () => clearInterval(timer);
  }, []);

  const handleOpen = () => {
    if (!isOpen) {
      // If closed, show contact options instead
      return;
    }
    
    setIsOpening(true);
    // Extended delay to show the slower gate opening animation
    setTimeout(() => {
      onEnter();
    }, 4500); // Increased from 2000ms to 4500ms for slower animation
  };

  const handleCallNow = () => {
    const whatsappNumber = '923377240303';
    const message = 'Hi! I saw that Chainak is currently closed. Can you let me know when you\'ll be open next?';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getNextOpeningTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    
    if (currentHour >= 2 && currentHour < 12) {
      // Currently closed, opens at 12 PM today
      return "12:00 PM Today";
    } else {
      // Currently open or will open at 12 PM tomorrow
      return "Open Now";
    }
  };

  const formatCurrentTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-amber-900 via-orange-900 to-red-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #fbbf24 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #f59e0b 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
      </div>

      {/* Elegant Gate Doors */}
      <div className="relative h-full flex">
        {/* Left Door */}
        <div 
          className={`w-1/2 h-full bg-gradient-to-br from-amber-800 via-amber-700 to-orange-800 transform transition-all ease-out relative overflow-hidden ${
            (isOpening && isOpen) 
              ? '-translate-x-full opacity-90 duration-[4000ms]' 
              : 'translate-x-0 duration-300'
          }`}
          style={{
            transitionTimingFunction: isOpening ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'ease-out'
          }}
        >
          {/* Elegant Door Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-600/20 to-orange-600/30"></div>
          
          {/* Door Frame */}
          <div className="absolute inset-6 border-4 border-amber-400/40 rounded-2xl">
            <div className="absolute inset-4 border-2 border-amber-300/30 rounded-xl">
              {/* Decorative Elements */}
              <div className="absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"></div>
              <div className="absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"></div>
              <div className="absolute top-3/4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"></div>
              
              {/* Central Ornament - Moved down */}
              <div className="absolute top-3/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 border-2 border-amber-300/40 rounded-full flex items-center justify-center">
                  <Coffee className="h-8 w-8 text-amber-300/60" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Elegant Handle */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-20 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-full shadow-2xl"></div>
            <div className="w-6 h-6 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full shadow-lg -mt-2 -ml-1"></div>
          </div>

          {/* Door Opening Sound Effect Visual */}
          {isOpening && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent animate-pulse"></div>
          )}
        </div>

        {/* Right Door */}
        <div 
          className={`w-1/2 h-full bg-gradient-to-bl from-amber-800 via-amber-700 to-orange-800 transform transition-all ease-out relative overflow-hidden ${
            (isOpening && isOpen) 
              ? 'translate-x-full opacity-90 duration-[4000ms]' 
              : 'translate-x-0 duration-300'
          }`}
          style={{
            transitionTimingFunction: isOpening ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'ease-out'
          }}
        >
          {/* Elegant Door Pattern */}
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-amber-600/20 to-orange-600/30"></div>
          
          {/* Door Frame */}
          <div className="absolute inset-6 border-4 border-amber-400/40 rounded-2xl">
            <div className="absolute inset-4 border-2 border-amber-300/30 rounded-xl">
              {/* Decorative Elements */}
              <div className="absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"></div>
              <div className="absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"></div>
              <div className="absolute top-3/4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"></div>
              
              {/* Central Ornament */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 border-2 border-amber-300/40 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-amber-300/60" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Elegant Handle */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-20 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-full shadow-2xl"></div>
            <div className="w-6 h-6 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full shadow-lg -mt-2 ml-1"></div>
          </div>

          {/* Door Opening Sound Effect Visual */}
          {isOpening && (
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-amber-400/10 to-transparent animate-pulse"></div>
          )}
        </div>
      </div>

      {/* Center Content - Split into two sections */}
      <div className="absolute inset-0 flex flex-col">
        {/* Top Section - Logo and Chainak title (moved up) */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-white z-10 max-w-3xl mx-auto px-6 transform -translate-y-8">
            {/* Elegant Logo Section */}
            <div className="mb-8">
              <div className="relative mb-8">
                {/* Logo Background Circle - Enhanced with opening animation */}
                <div className={`w-32 h-32 mx-auto bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-amber-300/30 shadow-2xl transform translate-y-4 transition-all duration-1000 ${
                  isOpening ? 'scale-110 shadow-amber-400/50' : ''
                }`}>
                  <Coffee className={`h-16 w-16 text-amber-200 transition-all duration-1000 ${
                    isOpening ? 'rotate-12 text-amber-100' : ''
                  }`} />
                </div>
              </div>
              
              <h1 className={`text-7xl md:text-8xl font-bold bg-gradient-to-r from-amber-200 via-yellow-200 to-orange-200 bg-clip-text text-transparent transition-all duration-1000 ${
                isOpening ? 'scale-105' : ''
              }`} style={{ fontFamily: 'Playfair Display' }}>
                Chainak
              </h1>
            </div>
          </div>
        </div>

        {/* Bottom Section - Tagline and Actions (positioned near door handles) */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-white z-10 max-w-3xl mx-auto px-6">
            <p className={`text-2xl md:text-3xl mb-8 text-amber-100 font-light tracking-wide transition-all duration-1000 ${
              isOpening ? 'text-yellow-100' : ''
            }`}>
              Chaska Chai Ka
            </p>

            {/* Action Section */}
            {isOpen ? (
              // When Open - Show Enter Button
              !isOpening ? (
                <div className="space-y-4 mb-4">
                  <button
                    onClick={handleOpen}
                    className="group bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white px-12 py-5 rounded-2xl text-xl font-bold hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-amber-500/30 border border-amber-400/30"
                  >
                    <span className="flex items-center space-x-3">
                      <span>Welcome To Chainak</span>
                      <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-6 mb-4">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-400 border-t-transparent"></div>
                    <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-pulse"></div>
                  </div>
                  <p className="text-amber-200 text-xl font-semibold">Opening the gates to excellence...</p>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )
            ) : (
              // When Closed - Show Contact Options
              <div className="space-y-6 mb-4">
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-red-300/20">
                  <p className="text-red-200 text-xl mb-6 leading-relaxed">
                    We're currently closed, but you can still reach us for inquiries and advance orders!
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <button
                      onClick={handleCallNow}
                      className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                    >
                      <Phone className="h-5 w-5" />
                      <span>Contact Us</span>
                    </button>
                    
                    <div className="bg-black/30 backdrop-blur-sm px-6 py-4 rounded-xl border border-amber-300/20 hidden sm:block">
                      <div className="flex items-center space-x-2 text-amber-200">
                        <MapPin className="h-5 w-5" />
                        <span className="font-medium">Johar Town, Lahore</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-amber-300/80 text-base">
                  <p>💡 Bookmark this page and visit us during our operating hours for the full Chainak experience!</p>
                </div>
              </div>
            )}

            {/* Elegant Decorative Elements */}
            <div className="flex justify-center space-x-3">
              <div className={`w-3 h-3 bg-amber-400 rounded-full animate-bounce shadow-lg shadow-amber-400/50 transition-all duration-1000 ${
                isOpening ? 'scale-125' : ''
              }`}></div>
              <div className={`w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-100 shadow-lg shadow-orange-400/50 transition-all duration-1000 ${
                isOpening ? 'scale-125' : ''
              }`}></div>
              <div className={`w-3 h-3 bg-amber-400 rounded-full animate-bounce delay-200 shadow-lg shadow-amber-400/50 transition-all duration-1000 ${
                isOpening ? 'scale-125' : ''
              }`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Border Accents */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 via-yellow-400 to-amber-400"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 via-yellow-400 to-amber-400"></div>
      
      {/* Floating Ambient Elements - Enhanced during opening */}
      <div className={`absolute top-20 left-20 w-6 h-6 bg-amber-400/20 rounded-full animate-float blur-sm transition-all duration-1000 ${
        isOpening ? 'scale-150 bg-amber-400/40' : ''
      }`}></div>
      <div className={`absolute bottom-32 right-16 w-8 h-8 bg-orange-400/15 rounded-full animate-bounce delay-1000 blur-sm transition-all duration-1000 ${
        isOpening ? 'scale-150 bg-orange-400/30' : ''
      }`}></div>
      <div className={`absolute top-1/3 right-1/4 w-4 h-4 bg-yellow-400/25 rounded-full animate-pulse delay-500 blur-sm transition-all duration-1000 ${
        isOpening ? 'scale-150 bg-yellow-400/50' : ''
      }`}></div>
      <div className={`absolute bottom-1/4 left-1/3 w-7 h-7 bg-amber-300/15 rounded-full animate-float delay-700 blur-sm transition-all duration-1000 ${
        isOpening ? 'scale-150 bg-amber-300/30' : ''
      }`}></div>
    </div>
  );
};

export default LoaderGate;