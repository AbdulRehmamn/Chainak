import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = ({ onOrderClick }) => {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-amber-400/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-orange-400/20 rounded-full animate-bounce delay-1000"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-yellow-400/20 rounded-full animate-pulse delay-500"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up" style={{ fontFamily: 'Playfair Display' }}>
          Welcome to <span className="text-amber-400">Chainak</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in-up delay-300">
          Experience the authentic taste of traditional tea & coffee in Lahore
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
          <button 
            onClick={scrollToMenu}
            className="bg-amber-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Explore Menu
          </button>
          <button 
            onClick={onOrderClick}
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-amber-600 transform hover:scale-105 transition-all duration-300"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-8 w-8 text-white/70" />
      </div>
    </section>
  );
};

export default Hero;