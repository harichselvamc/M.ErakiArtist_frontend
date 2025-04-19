import React from 'react';
import Hero from '../components/home/Hero';
import ProductGrid from '../components/home/ProductGrid';
import OffersSection from '../components/home/OffersSection';
import InstructionsSection from '../components/home/InstructionsSection';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <div id="products">
      <ProductGrid title="Featured Artworks" featuredOnly={true} />
    </div>

      <OffersSection />
      <InstructionsSection />
    </>
  );
};

export default HomePage;