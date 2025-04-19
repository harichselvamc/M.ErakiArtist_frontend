import React from 'react';
import { Tag, Clock, ArrowRight, ShoppingCart, Users, Percent, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Offer } from '../../types';
import { offers } from '../../data/offers';

const OffersSection: React.FC = () => {
  const navigate = useNavigate();

  const handleOfferClick = (offer: Offer) => {
    const productList = offer.applicableProducts?.join(', ') || 'your selected products';
    const discountInfo = offer.discountPercentage ? `${offer.discountPercentage}% discount` : 'special price';
    
    const defaultMessage = `I'm interested in your "${offer.title}" offer (${discountInfo}). Please provide more details about:

- Product type: ${productList}
- Quantity needed: ${offer.minQuantity ? `(Minimum ${offer.minQuantity})` : ''}
- Desired specifications:
- Color preferences:
- Custom text requirements:
- Budget range:
- Delivery deadline:

Additional notes or special requests:`;

    navigate('/contact', {
      state: {
        prefill: {
          subject: `Bulk Order Inquiry: ${offer.title}`,
          message: defaultMessage,
          offerId: offer.id,
          isBulkOrder: true
        }
      }
    });
  };

  const handleCustomQuoteClick = () => {
    navigate('/contact', {
      state: {
        prefill: {
          subject: "Custom Bulk Order Request",
          message: `I would like to discuss a custom bulk order solution. Here are my requirements:

- Product type:
- Quantity needed:
- Desired specifications:
- Color preferences:
- Custom text requirements:
- Budget range:
- Delivery deadline:

Please contact me to discuss further.`,
          isBulkOrder: true
        }
      }
    });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-primary-50/30 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-accent-100/30 blur-3xl"></div>
        <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-primary-100/20 blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="mb-16 text-center px-4">
          <motion.div 
            className="inline-flex items-center justify-center bg-accent-100/20 rounded-full px-6 py-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Gift className="w-5 h-5 mr-2 text-accent-600" />
            <span className="text-sm font-medium text-accent-600">Special Offers</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Exclusive Bulk <span className="text-accent-600">Offers</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover our limited-time special packages and volume discounts perfect for weddings, corporate events, and special occasions.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {offers.map((offer, index) => (
            <motion.div 
              key={offer.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Offer Ribbon */}
              {offer.discountPercentage && (
                <div className="absolute top-0 right-0 w-32 overflow-hidden h-32 z-10">
                  <div className="absolute top-0 right-0 w-32 h-8 bg-accent-600 transform rotate-45 translate-y-4 translate-x-8 flex items-center justify-center">
                    <span className="text-xs font-bold text-white flex items-center">
                      <Percent className="w-3 h-3 mr-1" />
                      {offer.discountPercentage}% OFF
                    </span>
                  </div>
                </div>
              )}
              
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden group">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder-offer.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                
                {/* Expiry Badge */}
                {offer.validUntil && (
                  <div className="absolute bottom-4 left-4 text-white text-xs flex items-center bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <Clock className="w-3 h-3 mr-1.5" />
                    <span>Until {new Date(offer.validUntil).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              {/* Content Section */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex-grow">
                  <h3 className="font-display text-2xl font-bold mb-3 text-gray-900">{offer.title}</h3>
                  <p className="text-gray-600 mb-5 leading-relaxed">{offer.description}</p>
                  
                  {offer.bestFor && offer.bestFor.length > 0 && (
                    <div className="mb-5">
                      <h4 className="font-medium mb-2.5 text-gray-800 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-accent-600 mr-2"></span>
                        Ideal For
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {offer.bestFor.map((useCase, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-600 mr-2.5"></span>
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Footer Section */}
                <div className="mt-auto pt-5 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-5">
                    {offer.minQuantity && (
                      <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                        <Users className="w-4 h-4 mr-1.5 text-gray-500" />
                        <span>Min. {offer.minQuantity}</span>
                      </div>
                    )}
                    {offer.pricePerUnit && (
                      <div className="text-gray-900 font-bold text-lg">
                        ₹{offer.pricePerUnit.toLocaleString()}<span className="text-sm font-medium text-gray-500">/unit</span>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    className="w-full flex items-center justify-center bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white py-3.5 px-6 rounded-xl transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                    onClick={() => handleOfferClick(offer)}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2.5" />
                    Get This Offer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-20 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Don't see what you're looking for? We specialize in custom bulk solutions tailored to your exact needs.
          </p>
          <button 
            className="btn btn-primary mx-auto group"
            onClick={handleCustomQuoteClick}
          >
            <span className="relative z-10">Request Custom Quote</span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default OffersSection;