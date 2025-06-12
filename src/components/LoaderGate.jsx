import React, { useState, useEffect } from 'react';
import { Coffee, ChevronRight, Clock, MapPin, Phone } from 'lucide-react';

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
      
      // Open from 12 PM (12) to 2 AM (2) next day
      // This means open from 12:00 to 23:59, and 00:00 to 01:59
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
    // Delay to show the gate opening animation
    setTimeout(() => {
      onEnter();
    }, 1500);
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
      // Currently in the late night period, opens at 12 PM tomorrow
      return "12:00 PM Tomorrow";
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
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Gate Doors */}
      <div className="relative h-full flex">
        {/* Left Door */}
        <div 
          className={`w-1/2 h-full bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 transform transition-transform duration-1500 ease-in-out ${
            (isOpening && isOpen) ? '-translate-x-full' : 'translate-x-0'
          }`}
          style={{
            backgroundImage: 'linear-gradient(45deg, #92400e 25%, transparent 25%), linear-gradient(-45deg, #92400e 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #92400e 75%), linear-gradient(-45deg, transparent 75%, #92400e 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        >
          {/* Door Handle */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-16 bg-yellow-600 rounded-full shadow-lg"></div>
          </div>
          
          {/* Door Decorations */}
          <div className="absolute inset-4 border-4 border-yellow-600/30 rounded-lg">
            <div className="absolute top-1/4 left-1/4 right-1/4 h-px bg-yellow-600/20"></div>
            <div className="absolute top-1/2 left-1/4 right-1/4 h-px bg-yellow-600/20"></div>
            <div className="absolute top-3/4 left-1/4 right-1/4 h-px bg-yellow-600/20"></div>
          </div>
        </div>

        {/* Right Door */}
        <div 
          className={`w-1/2 h-full bg-gradient-to-l from-amber-900 via-amber-800 to-amber-700 transform transition-transform duration-1500 ease-in-out ${
            (isOpening && isOpen) ? 'translate-x-full' : 'translate-x-0'
          }`}
          style={{
            backgroundImage: 'linear-gradient(45deg, #92400e 25%, transparent 25%), linear-gradient(-45deg, #92400e 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #92400e 75%), linear-gradient(-45deg, transparent 75%, #92400e 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        >
          {/* Door Handle */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-16 bg-yellow-600 rounded-full shadow-lg"></div>
          </div>
          
          {/* Door Decorations */}
          <div className="absolute inset-4 border-4 border-yellow-600/30 rounded-lg">
            <div className="absolute top-1/4 left-1/4 right-1/4 h-px bg-yellow-600/20"></div>
            <div className="absolute top-1/2 left-1/4 right-1/4 h-px bg-yellow-600/20"></div>
            <div className="absolute top-3/4 left-1/4 right-1/4 h-px bg-yellow-600/20"></div>
          </div>
        </div>
      </div>

      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white z-10 max-w-2xl mx-auto px-4">
          {/* Logo */}
          <div className="mb-8 animate-pulse">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Coffee className="h-16 w-16 text-amber-400" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-2" style={{ fontFamily: 'Playfair Display' }}>
              <span className="text-amber-400">Chainak</span>
            </h1>
            <p className="text-xl md:text-2xl text-amber-200 font-light">
              Premium Tea & Coffee Experience
            </p>
          </div>

          {/* Current Time Display */}
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock className="h-5 w-5 text-amber-400" />
              <span className="text-amber-200 font-medium">Current Time: {formatCurrentTime()}</span>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="mb-8">
            <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full ${
              isOpen 
                ? 'bg-green-600/20 border-2 border-green-400' 
                : 'bg-red-600/20 border-2 border-red-400'
            }`}>
              <div className={`w-4 h-4 rounded-full ${
                isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'
              }`}></div>
              <span className={`font-bold text-lg ${
                isOpen ? 'text-green-300' : 'text-red-300'
              }`}>
                {isOpen ? 'WE\'RE OPEN!' : 'CURRENTLY CLOSED'}
              </span>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="mb-8 bg-black/30 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-amber-300 mb-4">Operating Hours</h3>
            <div className="space-y-2 text-amber-100">
              <p className="text-lg font-medium">Daily: 12:00 PM - 2:00 AM</p>
              {!isOpen && (
                <p className="text-amber-300 font-semibold">
                  Next Opening: {getNextOpeningTime()}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isOpen ? (
            // When Open - Show Enter Button
            !isOpening ? (
              <button
                onClick={handleOpen}
                className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-12 py-4 rounded-full text-xl font-bold hover:from-amber-600 hover:to-orange-600 transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-amber-500/25"
              >
                <span className="flex items-center space-x-3">
                  <span>Enter Chainak</span>
                  <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-400 border-t-transparent"></div>
                <p className="text-amber-200 text-lg font-semibold">Opening the gates...</p>
              </div>
            )
          ) : (
            // When Closed - Show Contact Options
            <div className="space-y-4">
              <p className="text-amber-200 text-lg mb-6">
                We're currently closed, but you can still reach us!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleCallNow}
                  className="group bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>Contact Us</span>
                </button>
                
                <div className="bg-black/30 backdrop-blur-sm px-6 py-4 rounded-full">
                  <div className="flex items-center space-x-2 text-amber-200">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">F73R+266 Block C1, Johar Town</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-amber-300 text-sm">
                <p>💡 Tip: Bookmark this page and visit us during our operating hours!</p>
              </div>
            </div>
          )}

          {/* Decorative Elements */}
          <div className="flex justify-center space-x-4 mt-8">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-200"></div>
          </div>

          {/* Floating Particles */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-amber-400/30 rounded-full animate-float"></div>
          <div className="absolute bottom-32 right-16 w-6 h-6 bg-orange-400/20 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-yellow-400/40 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-amber-300/25 rounded-full animate-float delay-700"></div>
        </div>
      </div>

      {/* Bottom Decorative Border */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600"></div>
      
      {/* Top Decorative Border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600"></div>
    </div>
  );
};

export default LoaderGate;