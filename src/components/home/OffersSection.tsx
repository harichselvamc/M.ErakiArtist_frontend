import React from 'react';
import { ArrowRight, ShoppingCart, Percent, Calendar, Package, Users, Sparkles, BadgeCheck, Gift, Clock, Tag } from 'lucide-react';
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        type: 'spring',
        stiffness: 100
      }
    }),
    hover: {
      y: -5,
      boxShadow: '0 15px 30px rgba(0,0,0,0.12)'
    }
  };

  // Add marketing badges to some offers
  const getMarketingBadge = (offer: Offer) => {
    if (offer.discountPercentage && offer.discountPercentage >= 30) {
      return (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center z-10">
          <Gift className="w-3 h-3 mr-1" />
          <span>HOT DEAL!</span>
        </div>
      );
    }
    if (offer.discountPercentage && offer.discountPercentage >= 20) {
      return (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center z-10">
          <Tag className="w-3 h-3 mr-1" />
          <span>POPULAR!</span>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2 rounded-full shadow-lg mb-4"
          >
            <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
            <span className="text-sm font-bold text-white">LIMITED TIME OFFERS</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              Exclusive Bulk Deals
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our limited-time offers for weddings, corporate events and special occasions. 
            <span className="block text-sm text-blue-600 font-medium mt-1">
              Order today and save up to 30% on bulk purchases!
            </span>
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 relative"
              custom={i}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={cardVariants}
              viewport={{ once: true }}
            >
              {/* Marketing Badge */}
              {getMarketingBadge(offer)}

              {/* Discount Badge */}
              {offer.discountPercentage && (
                <div className={`absolute top-4 right-4 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center z-10
                  ${offer.discountPercentage >= 30 ? 'bg-gradient-to-r from-red-600 to-red-500' : 
                    offer.discountPercentage >= 20 ? 'bg-gradient-to-r from-orange-500 to-amber-500' : 
                    'bg-gradient-to-r from-green-500 to-emerald-500'}`}>
                  <Percent className="w-3 h-3 mr-1" />
                  {offer.discountPercentage}% OFF
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden group">
                <img 
                  src={offer.image} 
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder-offer.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                {offer.validUntil && (
                  <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1.5 rounded-full text-xs flex items-center shadow-sm">
                    <Clock className="w-3 h-3 mr-1 text-gray-600" />
                    <span className="text-gray-700 font-medium">Ends in {Math.ceil((new Date(offer.validUntil).getTime() - Date.now()) / (1000 * 60 * 60 * 24)} days</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{offer.title}</h3>
                  {offer.isBestSeller && (
                    <span className="flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      <BadgeCheck className="w-3 h-3 mr-1" />
                      Best Seller
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4">{offer.description}</p>

                {offer.bestFor && (
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Package className="w-4 h-4 mr-2" />
                      <span className="font-medium">Perfect for:</span>
                    </div>
                    <ul className="space-y-1">
                      {offer.bestFor.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  {offer.minQuantity && (
                    <div className="flex items-center text-sm bg-gray-100 px-3 py-1.5 rounded-full">
                      <Users className="w-4 h-4 mr-1 text-gray-500" />
                      <span className="text-gray-700 font-medium">Min. {offer.minQuantity} units</span>
                    </div>
                  )}
                  {offer.pricePerUnit && (
                    <div className="flex flex-col items-end">
                      {offer.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">₹{offer.originalPrice.toLocaleString()}</span>
                      )}
                      <span className="text-lg font-bold text-blue-600">
                        ₹{offer.pricePerUnit.toLocaleString()}
                        {offer.discountPercentage && (
                          <span className="text-xs font-normal text-gray-500 ml-1">/unit</span>
                        )}
                      </span>
                    </div>
                  )}
                </div>

                <button 
                  className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                  onClick={() => handleOfferClick(offer)}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Get This Deal
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-inner border border-blue-100"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Don't see what you need?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We specialize in custom bulk orders! Get a personalized quote with competitive pricing for your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 px-8 rounded-lg shadow-md transition-all duration-300 font-medium flex items-center justify-center"
              onClick={handleCustomQuoteClick}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Request Custom Quote
            </button>
            <button 
              className="bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 py-3 px-8 rounded-lg shadow-sm transition-all duration-300 font-medium flex items-center justify-center"
              onClick={() => navigate('/products')}
            >
              <Package className="w-5 h-5 mr-2" />
              Browse All Products
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            <Clock className="inline w-3 h-3 mr-1" />
            Custom quotes typically delivered within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OffersSection;