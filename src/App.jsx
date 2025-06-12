import React, { useState } from 'react';
import LoaderGate from './components/LoaderGate.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Menu from './components/Menu.jsx';
import Gallery from './components/Gallery.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import OrderModal from './components/OrderModal.jsx';

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleEnterSite = () => {
    setShowLoader(false);
  };

  if (showLoader) {
    return <LoaderGate onEnter={handleEnterSite} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Header onOrderClick={() => setIsOrderModalOpen(true)} />
      <Hero onOrderClick={() => setIsOrderModalOpen(true)} />
      <About />
      <Menu onOrderClick={() => setIsOrderModalOpen(true)} />
      <Gallery />
      <Contact />
      <Footer />
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
      />
    </div>
  );
}

export default App;