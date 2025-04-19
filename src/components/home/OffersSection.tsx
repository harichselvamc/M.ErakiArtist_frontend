import React from 'react';
import { ArrowRight, ShoppingCart, Percent, Calendar, Package, Users, Sparkles } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Offer } from '../../types';
import { offers } from '../../data/offers';

const OffersSection: React.FC = () => {
  const navigate = useNavigate();
  const controls = useAnimation();

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

  const handleCustomQuoteClick = async () => {
    await controls.start({
      scale: 0.95,
      transition: { duration: 0.1 }
    });
    await controls.start({
      scale: 1,
      transition: { duration: 0.3, type: 'spring' }
    });
    
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
      y: -10,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }
  };

  return (
    <section className="relative py-28 overflow-hidden bg-[#fafafa]">
      {/* Glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[#fff0f0] blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full bg-[#f0f5ff] blur-3xl opacity-30"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent-500/10"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{
              y: [null, (Math.random() - 0.5) * 50],
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white shadow-sm border border-gray-100 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-5 h-5 mr-2 text-accent-500" />
            <span className="text-sm font-medium text-gray-700">Exclusive Offers</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-5 font-display bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Premium Bulk Deals
          </motion.h2>

          <motion.p
            className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Elevate your events with our exclusive bulk packages, designed for discerning clients who appreciate quality and value.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
              custom={i}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={cardVariants}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Ribbon */}
              {offer.discountPercentage && (
                <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden z-10">
                  <div className="absolute top-0 right-0 w-40 h-8 bg-accent-500 transform rotate-45 translate-y-4 translate-x-6 flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold text-white flex items-center">
                      <Percent className="w-3 h-3 mr-1" />
                      {offer.discountPercentage}% OFF
                    </span>
                  </div>
                </div>
              )}

              {/* Image */}
              <div className="relative h-64 overflow-hidden group">
                <motion.img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder-offer.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                
                {/* Expiry */}
                {offer.validUntil && (
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-xs flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5 text-gray-600" />
                    <span className="text-xs font-medium text-gray-700">
                      Until {new Date(offer.validUntil).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{offer.title}</h3>
                  {offer.pricePerUnit && (
                    <div className="text-right">
                      <span className="text-sm text-gray-500 block">From</span>
                      <span className="text-xl font-bold text-gray-900">
                        ₹{offer.pricePerUnit.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-gray-500 mb-6 leading-relaxed">{offer.description}</p>

                <div className="mb-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Package className="w-4 h-4 mr-2" />
                    <span className="font-medium">Includes:</span>
                  </div>
                  <ul className="space-y-2">
                    {offer.bestFor?.map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-500 mr-3"></div>
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-6">
                  {offer.minQuantity && (
                    <div className="flex items-center text-sm bg-gray-50 px-3 py-1.5 rounded-full">
                      <Users className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-600">Min. {offer.minQuantity}</span>
                    </div>
                  )}
                </div>

                <motion.button
                  className="w-full flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white py-3.5 px-6 rounded-xl transition-all duration-300 font-medium group"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOfferClick(offer)}
                >
                  <span className="relative z-10 flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-3" />
                    Get Offer
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 mb-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Need something beyond our standard offers? Let's create a custom solution just for you.
          </p>
          <motion.button
            className="relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white font-medium shadow-lg overflow-hidden group"
            animate={controls}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCustomQuoteClick}
          >
            <span className="relative z-10 flex items-center">
              <Sparkles className="w-5 h-5 mr-3" />
              Request Custom Quote
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default OffersSection;