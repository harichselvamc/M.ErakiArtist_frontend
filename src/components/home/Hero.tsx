import React from 'react';
import { Link } from 'react-router-dom';
import { Brush, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-black text-white">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/6712018/pexels-photo-6712018.jpeg"
          alt="Artistic background"
          className="w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Transform Your <span className="underline underline-offset-4">Memories</span><br />
            Into Timeless Art
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Custom faceless art, calligraphy, hampers, and invitations crafted with precision and emotion.
            Every creation is a story painted in shades of legacy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="#products"
              className="inline-flex items-center px-6 py-3 bg-white text-black font-medium rounded-full transition-all duration-300 hover:bg-black hover:text-white border border-white"
            >
              <Brush className="w-4 h-4 mr-2" />
              Explore Our Art
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-white text-white font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              Contact Us
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
        <a
          href="#products"
          className="text-white opacity-50 hover:opacity-100 transition-opacity animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronRight className="w-8 h-8 transform rotate-90" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
