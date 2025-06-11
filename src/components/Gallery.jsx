import React from 'react';

const Gallery = () => {
  const images = [
    {
      url: "/public/images/1.png",
      alt: "Chainak's cozy interior with warm wooden seating"
    },
    {
      url: "/public/images/2.png",
      alt: "Modern cafe counter with vibrant blue and orange design"
    },
    {
      url: "/public/images/3.png",
      alt: "Evening ambiance with string lights and outdoor seating"
    },
    {
      url: "/public/images/4.png",
      alt: "Contemporary interior with blue lighting and modern decor"
    }
  ];

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/chainak.lhr/?hl=en', '_blank');
  };

  const handleFacebookClick = () => {
    // You can add Facebook link here if available
    window.open('https://www.facebook.com', '_blank');
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Our <span className="text-amber-600">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Step inside Chainak and experience our unique blend of traditional warmth and modern comfort
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-semibold text-lg mb-2">{image.alt}</p>
                  <div className="w-12 h-1 bg-amber-400 rounded-full"></div>
                </div>
              </div>
              
              {/* Decorative corner accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Enhanced call-to-action section */}
        <div className="text-center mt-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-12">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display' }}>
              Experience Chainak in Person
            </h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Our gallery captures just a glimpse of the Chainak experience. Follow us on social media for daily updates, 
              behind-the-scenes content, and special announcements about new menu items and events.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={handleInstagramClick}
                className="group bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Follow on Instagram</span>
                </span>
              </button>
              <button 
                onClick={handleFacebookClick}
                className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Like on Facebook</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Visit us section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-amber-100 px-6 py-3 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-amber-800 font-semibold">Open Now - Visit us at F73R+266 Block C1, Phase 1 Johar Town</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;