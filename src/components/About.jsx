import React from 'react';
import { Heart, Users, Award, Clock } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every cup is crafted with passion and care'
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'Bringing people together over great drinks'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Only the finest ingredients and blends'
    },
    {
      icon: Clock,
      title: 'Fresh Daily',
      description: 'Prepared fresh every single day'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display' }}>
            About <span className="text-amber-600">Chainak</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nestled in the heart of Lahore, Chainak is more than just a café – it's a celebration of 
            traditional flavors and modern comfort. We bring you the authentic taste of desi chai 
            and premium coffee in an atmosphere that feels like home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300">
                <feature.icon className="h-10 w-10 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display' }}>
              Our Story
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded with a passion for bringing authentic Pakistani tea culture to the modern world, 
              Chainak started as a small dream and has grown into Lahore's beloved tea destination.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We believe that the perfect cup of chai is not just about the blend, but about the 
              experience, the company, and the moment of peace it brings to your day. That's why 
              every cup at Chainak is prepared with the utmost care and served with genuine warmth.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <span className="text-3xl font-bold text-amber-600">5+</span>
                <p className="text-gray-600">Years Serving</p>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-amber-600">10k+</span>
                <p className="text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Tea preparation" 
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute -bottom-4 -right-4 bg-amber-600 text-white p-4 rounded-xl shadow-lg">
              <p className="font-semibold">Traditional Recipes</p>
              <p className="text-sm">Passed down generations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;