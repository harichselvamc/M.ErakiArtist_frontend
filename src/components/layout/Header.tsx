import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Brush, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;

  const logoText = (
    <div className="flex items-center gap-2">
      <PenTool className="h-7 w-7" />
      <div>
        <h1 className="text-xl font-display font-bold leading-none">M.ErakiArtist</h1>
        <p className="text-xs font-light tracking-wider">memories into painting</p>
      </div>
    </div>
  );

  return (
    <header className={headerClasses}>
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="z-50">
          {logoText}
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="font-medium hover:text-accent-700 transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/contact" 
            className="font-medium hover:text-accent-700 transition-colors"
          >
            Contact
          </Link>
          <Link 
            to="https://wa.me/7598068106" 
            target="_blank" 
            className="btn btn-primary"
          >
            <Brush className="w-4 h-4 mr-2" />
            Order Now
          </Link>
        </nav>

        <button 
          className="md:hidden z-50 focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col items-center space-y-8 text-xl">
                <Link 
                  to="/" 
                  className="font-medium hover:text-accent-700 transition-colors"
                >
                  Home
                </Link>
                <Link 
                  to="/contact" 
                  className="font-medium hover:text-accent-700 transition-colors"
                >
                  Contact
                </Link>
                <Link 
                  to="https://wa.me/7598068106" 
                  target="_blank" 
                  className="btn btn-primary mt-4"
                >
                  <Brush className="w-4 h-4 mr-2" />
                  Order Now
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;