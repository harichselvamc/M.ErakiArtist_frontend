import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brush, ChevronRight, Palette, Sparkles, Gift, Mail, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Style options
const STYLE_VARIANTS = {
  MODERN: {
    name: 'Modern',
    bgClass: 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600',
    textClass: 'text-white',
    buttonClass: 'bg-white text-black hover:bg-transparent hover:text-white',
    borderClass: 'border-white'
  },
  VINTAGE: {
    name: 'Vintage',
    bgClass: 'bg-amber-900',
    textClass: 'text-amber-50',
    buttonClass: 'bg-amber-700 text-amber-50 hover:bg-amber-800',
    borderClass: 'border-amber-600'
  },
  MINIMAL: {
    name: 'Minimal',
    bgClass: 'bg-white',
    textClass: 'text-gray-900',
    buttonClass: 'bg-gray-900 text-white hover:bg-gray-700',
    borderClass: 'border-gray-900'
  },
  DARK: {
    name: 'Dark',
    bgClass: 'bg-gray-900',
    textClass: 'text-emerald-400',
    buttonClass: 'bg-emerald-600 text-white hover:bg-emerald-700',
    borderClass: 'border-emerald-500'
  }
};

const Hero: React.FC = () => {
  const [currentStyle, setCurrentStyle] = useState(STYLE_VARIANTS.MODERN);
  const [showStylePicker, setShowStylePicker] = useState(false);

  return (
    <section className={`relative min-h-screen flex items-center pt-16 overflow-hidden ${currentStyle.bgClass} ${currentStyle.textClass}`}>
      {/* Background Pattern (optional based on style) */}
      {currentStyle.name === 'MINIMAL' && (
        <div className="absolute inset-0 opacity-5 bg-[url('https://assets.website-files.com/5e51b3b0337309d672efd94c/5e51b3b03373093d1a2efda0_pattern-white.svg')]"></div>
      )}
      
      {currentStyle.name === 'VINTAGE' && (
        <div className="absolute inset-0 opacity-10 bg-[url('https://assets.website-files.com/5e51b3b0337309d672efd94c/5e51b3b03373093d1a2efda0_pattern-white.svg')]"></div>
      )}

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-opacity-20 bg-white blur-xl"></div>
      <div className="absolute bottom-1/3 right-20 w-24 h-24 rounded-full bg-opacity-20 bg-purple-500 blur-xl"></div>
      <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-opacity-10 bg-yellow-400 blur-xl"></div>

      {/* Content */}
      <div className="relative z-20 w-full px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {currentStyle.name === 'VINTAGE' ? (
              <>
                Preserve Your <span className="italic font-serif">Moments</span><br />
                As Cherished Heirlooms
              </>
            ) : currentStyle.name === 'MINIMAL' ? (
              <>
                Elegant Art<br />
                For <span className="font-light">Meaningful Moments</span>
              </>
            ) : currentStyle.name === 'DARK' ? (
              <>
                Crafted With <span className="text-emerald-300">Shadow</span><br />
                And <span className="text-emerald-300">Light</span>
              </>
            ) : (
              <>
                Transform Your <span className="underline underline-offset-4">Memories</span><br />
                Into Timeless Art
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={`text-lg mb-8 leading-relaxed max-w-2xl mx-auto ${
              currentStyle.name === 'MINIMAL' ? 'text-gray-600' : 'text-opacity-80'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {currentStyle.name === 'VINTAGE' ? (
              "Handcrafted with traditional techniques, each piece carries the warmth of time-honored artistry and the patina of cherished memories."
            ) : currentStyle.name === 'MINIMAL' ? (
              "Clean lines, thoughtful design. Our creations speak volumes through subtlety and precision."
            ) : currentStyle.name === 'DARK' ? (
              "Mysterious and profound. Our dark-themed creations reveal their beauty upon closer inspection."
            ) : (
              "Custom faceless art, calligraphy, hampers, and invitations crafted with precision and emotion. Every creation is a story painted in shades of legacy."
            )}
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
              className={`inline-flex items-center px-6 py-3 font-medium rounded-full transition-all duration-300 ${currentStyle.buttonClass} border ${currentStyle.borderClass}`}
            >
              <Brush className="w-4 h-4 mr-2" />
              Explore Our Art
            </a>

            <Link
              to="/contact"
              className={`inline-flex items-center px-6 py-3 border font-medium rounded-full transition-all duration-300 ${currentStyle.borderClass} hover:${currentStyle.buttonClass}`}
            >
              Contact Us
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>

            <button
              onClick={() => setShowStylePicker(!showStylePicker)}
              className={`inline-flex items-center px-4 py-2 rounded-full transition-all duration-300 border ${currentStyle.borderClass} bg-opacity-20 hover:bg-opacity-30`}
            >
              <Palette className="w-4 h-4 mr-2" />
              Change Style
            </button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { icon: <Brush size={20} />, text: "Custom Art" },
              { icon: <Sparkles size={20} />, text: "Unique Designs" },
              { icon: <Gift size={20} />, text: "Gift Hampers" },
              { icon: <Mail size={20} />, text: "Invitations" }
            ].map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${currentStyle.borderClass} bg-opacity-10 backdrop-blur-sm`}
              >
                <div className="flex flex-col items-center">
                  <div className="mb-2">{item.icon}</div>
                  <span className="text-sm">{item.text}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
        <a
          href="#products"
          className={`opacity-50 hover:opacity-100 transition-opacity animate-bounce ${currentStyle.textClass}`}
          aria-label="Scroll down"
        >
          <ChevronRight className="w-8 h-8 transform rotate-90" />
        </a>
      </div>

      {/* Style Picker Modal */}
      <AnimatePresence>
        {showStylePicker && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`relative p-8 rounded-2xl max-w-md w-full ${currentStyle.name === 'MINIMAL' ? 'bg-white' : 'bg-gray-900'}`}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button
                onClick={() => setShowStylePicker(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-bold mb-6">Choose a Style</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.values(STYLE_VARIANTS).map((variant) => (
                  <button
                    key={variant.name}
                    onClick={() => {
                      setCurrentStyle(variant);
                      setShowStylePicker(false);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      currentStyle.name === variant.name
                        ? `${variant.borderClass} border-opacity-100 scale-105`
                        : 'border-opacity-0 hover:border-opacity-50'
                    } ${variant.bgClass}`}
                  >
                    <span className={`font-medium ${variant.textClass}`}>{variant.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;