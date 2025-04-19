import React from 'react';
import { Link } from 'react-router-dom';
import { Brush, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-primary-950">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/6712018/pexels-photo-6712018.jpeg" 
          alt="Artistic background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-primary-950/80 to-black/60 z-10 backdrop-blur-sm" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white leading-tight drop-shadow-xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Transform Your <span className="text-accent-400 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400">Memories</span><br />
            Into Timeless Art
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-primary-100/90 mb-8 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Custom faceless art, calligraphy, hampers, and invitations—crafted with emotion and elegance.
            Every stroke tells a story worth preserving forever.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="#products"
              className="inline-flex items-center px-6 py-3 text-white bg-gradient-to-r from-pink-500 to-orange-500 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 font-medium"
            >
              <Brush className="w-5 h-5 mr-2" />
              Explore Our Art
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 text-white border border-white rounded-full hover:bg-white hover:text-primary-950 transition-all duration-300 font-medium"
            >
              Contact Us
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
        <a
          href="#products"
          className="text-white opacity-60 hover:opacity-100 transition-opacity animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronRight className="w-10 h-10 transform rotate-90" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
