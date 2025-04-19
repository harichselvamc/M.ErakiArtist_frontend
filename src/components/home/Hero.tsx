import React from 'react';
import { Link } from 'react-router-dom';
import { Brush, ChevronRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Hero: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const backgroundVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 0.2,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 0.5,
      y: [0, 10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-black text-white"
      ref={ref}
    >
      {/* Background Image Layer */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial="hidden"
        animate={controls}
        variants={backgroundVariants}
      >
        <img
          src="https://images.pexels.com/photos/6712018/pexels-photo-6712018.jpeg"
          alt="Artistic background"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10 backdrop-blur-sm" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-20 w-full px-6 md:px-10"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight text-white drop-shadow-lg"
            variants={itemVariants}
          >
            Transform Your <span className="underline underline-offset-4 decoration-primary">Memories</span><br />
            Into Timeless Art
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-gray-300 mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Custom faceless art, calligraphy, hampers, and invitations crafted with precision and emotion.
            Every creation is a story painted in shades of legacy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={itemVariants}
          >
            <motion.a
              href="#products"
              className="inline-flex items-center px-6 py-3 bg-white text-black font-medium rounded-full transition-all duration-300 hover:bg-black hover:text-white border border-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Brush className="w-4 h-4 mr-2" />
              Explore Our Art
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border border-white text-white font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                Contact Us
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex justify-center z-20"
        initial="hidden"
        animate={controls}
        variants={scrollIndicatorVariants}
      >
        <a
          href="#products"
          className="text-white hover:opacity-100 transition-opacity"
          aria-label="Scroll down"
        >
          <ChevronRight className="w-8 h-8 transform rotate-90" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;