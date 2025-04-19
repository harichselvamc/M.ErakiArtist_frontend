import React from 'react';
import { Tag, Clock } from 'lucide-react';
import { offers } from '../../data/offers';
import { motion } from 'framer-motion';

const OffersSection: React.FC = () => {
  return (
    <section className="py-16 bg-primary-50">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="section-title">Special Offers</h2>
          <p className="text-primary-600 max-w-2xl mx-auto">
            Take advantage of our limited-time offers and get the best value for your custom art pieces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div 
              key={offer.id}
              className="card overflow-hidden hover-lift"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-44 relative overflow-hidden">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover"
                />
                {offer.discountPercentage && (
                  <div className="absolute top-3 right-3 bg-accent-600 text-white font-bold rounded-full px-3 py-1 text-sm flex items-center">
                    <Tag className="w-3 h-3 mr-1" />
                    {offer.discountPercentage}% OFF
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold mb-2">{offer.title}</h3>
                <p className="text-primary-600 mb-3">{offer.description}</p>
                {offer.validUntil && (
                  <div className="text-sm text-primary-500 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Valid until {new Date(offer.validUntil).toLocaleDateString()}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;