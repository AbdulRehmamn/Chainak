import React, { useState, useRef, useEffect, useCallback } from 'react';

const Gallery = () => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [failedImages, setFailedImages] = useState(new Set());
  const [imagesInView, setImagesInView] = useState(new Set());
  const observerRef = useRef(null);
  const imageRefs = useRef({});

  const images = [
    {
      // Multiple format support with fallbacks
      sources: {
        avif: [
          { src: "/images/1-small.avif", width: 400 },
          { src: "/images/1-medium.avif", width: 800 },
          { src: "/images/1-large.avif", width: 1200 }
        ],
        webp: [
          { src: "/images/1-small.webp", width: 400 },
          { src: "/images/1-medium.webp", width: 800 },
          { src: "/images/1-large.webp", width: 1200 }
        ],
        jpg: [
          { src: "/images/1-small.jpg", width: 400 },
          { src: "/images/1-medium.jpg", width: 800 },
          { src: "/images/1-large.jpg", width: 1200 }
        ]
      },
      fallback: "/images/1.png",
      alt: "A dark background with a glowing sign, illuminated by warm hanging light bulbs",
      blurHash: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli2Gw0pQ7NjrBgW6SgCl3sPy6kkWh8LgDEgwT0l5F0KKJqgfgvQdEhg1SdRogpHGFIjnTCaLCdYoAWJ3LJUnNqMUGDtlNaDYZAIHwMJvIg1Y9iSQZ6jY6i8OJ1OC2Vg2t/XSKvLQYECj/9k="
    },
    {
      sources: {
        avif: [
          { src: "/images/3-small.avif", width: 400 },
          { src: "/images/3-medium.avif", width: 800 },
          { src: "/images/3-large.avif", width: 1200 }
        ],
        webp: [
          { src: "/images/3-small.webp", width: 400 },
          { src: "/images/3-medium.webp", width: 800 },
          { src: "/images/3-large.webp", width: 1200 }
        ],
        jpg: [
          { src: "/images/3-small.jpg", width: 400 },
          { src: "/images/3-medium.jpg", width: 800 },
          { src: "/images/3-large.jpg", width: 1200 }
        ]
      },
      fallback: "/images/3.png",
      alt: "A dimly lit brick wall framed by a wire grid, with a chair and potted plant in the foreground",
      blurHash: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli2Gw0pQ7NjrBgW6SgCl3sPy6kkWh8LgDEgwT0l5F0KKJqgfgvQdEhg1SdRogpHGFIjnTCaLCdYoAWJ3LJUnNqMUGDtlNaDYZAIHwMJvIg1Y9iSQZ6jY6i8OJ1OC2Vg2t/XSKvLQYECj/9k="
    },
    {
      sources: {
        avif: [
          { src: "/images/5-small.avif", width: 400 },
          { src: "/images/5-medium.avif", width: 800 },
          { src: "/images/5-large.avif", width: 1200 }
        ],
        webp: [
          { src: "/images/5-small.webp", width: 400 },
          { src: "/images/5-medium.webp", width: 800 },
          { src: "/images/5-large.webp", width: 1200 }
        ],
        jpg: [
          { src: "/images/5-small.jpg", width: 400 },
          { src: "/images/5-medium.jpg", width: 800 },
          { src: "/images/5-large.jpg", width: 1200 }
        ]
      },
      fallback: "/images/5.png",
      alt: "Evening ambiance with string lights and outdoor seating",
      blurHash: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli2Gw0pQ7NjrBgW6SgCl3sPy6kkWh8LgDEgwT0l5F0KKJqgfgvQdEhg1SdRogpHGFIjnTCaLCdYoAWJ3LJUnNqMUGDtlNaDYZAIHwMJvIg1Y9iSQZ6jY6i8OJ1OC2Vg2t/XSKvLQYECj/9k="
    },
    {
      sources: {
        avif: [
          { src: "/images/6-small.avif", width: 400 },
          { src: "/images/6-medium.avif", width: 800 },
          { src: "/images/6-large.avif", width: 1200 }
        ],
        webp: [
          { src: "/images/6-small.webp", width: 400 },
          { src: "/images/6-medium.webp", width: 800 },
          { src: "/images/6-large.webp", width: 1200 }
        ],
        jpg: [
          { src: "/images/6-small.jpg", width: 400 },
          { src: "/images/6-medium.jpg", width: 800 },
          { src: "/images/6-large.jpg", width: 1200 }
        ]
      },
      fallback: "/images/6.png",
      alt: "Contemporary interior with white lighting and modern decor",
      blurHash: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli2Gw0pQ7NjrBgW6SgCl3sPy6kkWh8LgDEgwT0l5F0KKJqgfgvQdEhg1SdRogpHGFIjnTCaLCdYoAWJ3LJUnNqMUGDtlNaDYZAIHwMJvIg1Y9iSQZ6jY6i8OJ1OC2Vg2t/XSKvLQYECj/9k="
    },
    {
      sources: {
        avif: [
          { src: "/images/7-small.avif", width: 400 },
          { src: "/images/7-medium.avif", width: 800 },
          { src: "/images/7-large.avif", width: 1200 }
        ],
        webp: [
          { src: "/images/7-small.webp", width: 400 },
          { src: "/images/7-medium.webp", width: 800 },
          { src: "/images/7-large.webp", width: 1200 }
        ],
        jpg: [
          { src: "/images/7-small.jpg", width: 400 },
          { src: "/images/7-medium.jpg", width: 800 },
          { src: "/images/7-large.jpg", width: 1200 }
        ]
      },
      fallback: "/images/7.png",
      alt: "Indoor scene with a brick wall mural of a guitarist, a potted plant with string lights, and wooden furniture",
      blurHash: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli2Gw0pQ7NjrBgW6SgCl3sPy6kkWh8LgDEgwT0l5F0KKJqgfgvQdEhg1SdRogpHGFIjnTCaLCdYoAWJ3LJUnNqMUGDtlNaDYZAIHwMJvIg1Y9iSQZ6jY6i8OJ1OC2Vg2t/XSKvLQYECj/9k="
    }
  ];

  // Preload critical images (first two)
  useEffect(() => {
    const preloadCriticalImages = () => {
      images.slice(0, 2).forEach((image, index) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = image.fallback;
        link.onload = () => handleImageLoad(index);
        document.head.appendChild(link);
      });
    };

    preloadCriticalImages();
  }, []);

  // Enhanced Intersection Observer with adaptive loading
  useEffect(() => {
    const isSlowConnection = navigator.connection && 
      (navigator.connection.effectiveType === 'slow-2g' || 
       navigator.connection.effectiveType === '2g' ||
       navigator.connection.saveData);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setImagesInView(prev => new Set([...prev, index]));
          }
        });
      },
      {
        rootMargin: isSlowConnection ? '50px' : '200px', // Smaller margin for slow connections
        threshold: 0.1
      }
    );

    const imageContainers = document.querySelectorAll('[data-index]');
    imageContainers.forEach(container => {
      observerRef.current?.observe(container);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleImageLoad = useCallback((index) => {
    setLoadedImages(prev => new Set([...prev, index]));
  }, []);

  const handleImageError = useCallback((index) => {
    setFailedImages(prev => new Set([...prev, index]));
    console.error(`Failed to load image at index ${index}`);
  }, []);

  // Generate srcSet string for responsive images
  const generateSrcSet = (sources, format) => {
    return sources[format]?.map(source => `${source.src} ${source.width}w`).join(', ') || '';
  };

  // Adaptive image quality based on connection
  const getImageFormat = () => {
    const isSlowConnection = navigator.connection && 
      (navigator.connection.effectiveType === 'slow-2g' || 
       navigator.connection.effectiveType === '2g');
    
    if (isSlowConnection) return 'jpg'; // Use smaller JPGs for slow connections
    
    // Check browser support for modern formats
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Check AVIF support
    if (canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0) {
      return 'avif';
    }
    
    // Check WebP support
    if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
      return 'webp';
    }
    
    return 'jpg';
  };

  const OptimizedImage = ({ image, index }) => {
    const format = getImageFormat();
    const sources = image.sources;
    
    return (
      <picture className="w-full h-full">
        {/* AVIF sources (best compression) */}
        <source
          srcSet={generateSrcSet(sources, 'avif')}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          type="image/avif"
        />
        
        {/* WebP sources (good compression, wide support) */}
        <source
          srcSet={generateSrcSet(sources, 'webp')}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          type="image/webp"
        />
        
        {/* JPEG sources (fallback) */}
        <source
          srcSet={generateSrcSet(sources, 'jpg')}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          type="image/jpeg"
        />
        
        {/* Final fallback */}
        <img
          ref={el => imageRefs.current[index] = el}
          src={image.fallback}
          alt={image.alt}
          className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${
            loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => handleImageLoad(index)}
          onError={() => handleImageError(index)}
          loading={index < 2 ? 'eager' : 'lazy'} // Eager load first 2 images
          decoding="async"
          fetchPriority={index < 2 ? 'high' : 'low'}
        />
      </picture>
    );
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/chainak.lhr/?hl=en', '_blank');
  };

  const handleFacebookClick = () => {
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
              data-index={index}
              className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                {/* BlurHash placeholder */}
                {!loadedImages.has(index) && !failedImages.has(index) && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
                    style={{ 
                      backgroundImage: `url(${image.blurHash})`,
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    <div className="absolute inset-0 bg-gray-100/80 flex items-center justify-center">
                      <div className="text-gray-400 text-center">
                        <div className="w-12 h-12 mx-auto mb-2 border-2 border-gray-300 border-t-amber-500 rounded-full animate-spin"></div>
                        <span className="text-sm font-medium">Loading...</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Failed loading state */}
                {failedImages.has(index) && (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span className="text-sm">Failed to load</span>
                    </div>
                  </div>
                )}
                
                {/* Optimized Image */}
                {imagesInView.has(index) && !failedImages.has(index) && (
                  <OptimizedImage image={image} index={index} />
                )}
              </div>
              
              {/* Overlay - only show when image is loaded */}
              {loadedImages.has(index) && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="font-semibold text-lg mb-2">{image.alt}</p>
                    <div className="w-12 h-1 bg-amber-400 rounded-full"></div>
                  </div>
                </div>
              )}
              
              {/* Decorative corner accent */}
              {loadedImages.has(index) && (
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              )}
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
