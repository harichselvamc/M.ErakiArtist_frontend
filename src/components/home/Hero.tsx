import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Brush, ChevronRight } from 'lucide-react';
import anime from 'animejs';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      anime({
        targets: titleRef.current,
        translateY: [40, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1000,
      });
    }

    if (paraRef.current) {
      anime({
        targets: paraRef.current,
        delay: 300,
        opacity: [0, 1],
        scale: [0.95, 1],
        easing: 'easeOutExpo',
        duration: 800,
      });
    }

    if (buttonsRef.current) {
      anime({
        targets: buttonsRef.current.children,
        delay: anime.stagger(150, { start: 500 }),
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 800,
      });
    }

    if (scrollRef.current) {
      anime({
        targets: scrollRef.current,
        translateY: [0, -10],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        duration: 1000,
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-black text-white">
      {/* Background */}
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
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight text-white drop-shadow-lg"
          >
            Transform Your <span className="underline underline-offset-4">Memories</span><br />
            Into Timeless Art
          </h1>

          <p
            ref={paraRef}
            className="text-lg text-gray-300 mb-8 leading-relaxed"
          >
            Custom faceless art, calligraphy, hampers, and invitations crafted with precision and emotion.
            Every creation is a story painted in shades of legacy.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-wrap justify-center gap-4"
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
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
        <a
          ref={scrollRef}
          href="#products"
          className="text-white opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Scroll down"
        >
          <ChevronRight className="w-8 h-8 transform rotate-90" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
