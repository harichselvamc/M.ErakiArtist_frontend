import React from 'react';
import { Link } from 'react-router-dom';
import { Brush, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-primary-950">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950 to-primary-900/70 z-10"></div>
        <img 
          src="https://images.pexels.com/photos/6712018/pexels-photo-6712018.jpeg" 
          alt="Art background" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-2xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Transform Your <span className="text-accent-400">Memories</span> Into Timeless Art
          </motion.h1>
          
          <motion.p 
            className="text-lg text-primary-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Custom faceless art, calligraphy, hampers, and invitations crafted with love and artistry. 
            Each piece tells a unique story that lasts a lifetime.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="#products" className="btn btn-accent">
              <Brush className="w-4 h-4 mr-2" />
              Explore Our Art
            </a>

            <Link to="/contact" className="btn btn-outline text-white border-white hover:bg-white hover:text-primary-950">
              Contact Us
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a 
          href="#products" 
          className="text-white opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Scroll down"
        >
          <ChevronRight className="w-10 h-10 transform rotate-90" />
        </a>
      </div>
    </section>
  );
};

export default Hero;