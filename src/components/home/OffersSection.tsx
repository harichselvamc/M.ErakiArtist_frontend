import React from 'react';
import {
  ArrowRight,
  ShoppingCart,
  Percent,
  Calendar,
  Package,
  Users,
  Sparkles,
  Flame,
  Star,
  AlarmClock,
  Zap,
  BadgeCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Offer } from '../../types';
import { offers } from '../../data/offers';

const badgeTypes = [
  {
    icon: <Flame className="w-5 h-5 mr-1 text-red-600" />,
    label: 'Hot Deal',
    color: 'bg-gradient-to-br from-red-50 to-red-100 text-red-700 border border-red-200',
  },
  {
    icon: <Star className="w-5 h-5 mr-1 text-yellow-600" />,
    label: 'Top Pick',
    color: 'bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-700 border border-yellow-200',
  },
  {
    icon: <Zap className="w-5 h-5 mr-1 text-blue-600" />,
    label: 'Limited Time',
    color: 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 border border-blue-200',
  },
  {
    icon: <BadgeCheck className="w-5 h-5 mr-1 text-green-600" />,
    label: 'Best Value',
    color: 'bg-gradient-to-br from-green-50 to-green-100 text-green-700 border border-green-200',
  },
];

const OffersSection: React.FC = () => {
  const navigate = useNavigate();

  const handleOfferClick = (offer: Offer) => {
    const productList = offer.applicableProducts?.join(', ') || 'your selected products';
    const discountInfo = offer.discountPercentage
      ? `${offer.discountPercentage}% discount`
      : 'special price';

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
          isBulkOrder: true,
        },
      },
    });
  };

  const handleCustomQuoteClick = () => {
    navigate('/contact', {
      state: {
        prefill: {
          subject: 'Custom Bulk Order Request',
          message: `I would like to discuss a custom bulk order solution. Here are my requirements:

- Product type:
- Quantity needed:
- Desired specifications:
- Color preferences:
- Custom text requirements:
- Budget range:
- Delivery deadline:

Please contact me to discuss further.`,
          isBulkOrder: true,
        },
      },
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
        stiffness: 100,
      },
    }),
    hover: {
      y: -8,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
  };

  return (
    <section className="py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-2 rounded-full shadow-lg mb-6"
          >
            <Sparkles className="w-5 h-5 mr-2 text-white" />
            <span className="text-sm font-semibold text-white">Exclusive Offers</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Premium <span className="bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">Bulk Deals</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Limited-time exclusive offers for weddings, corporate events and special occasions. Save big when you order in bulk!
          </motion.p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              className="mt-6 bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 relative group"
              custom={i}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={cardVariants}
              viewport={{ once: true }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Super Prominent Discount Ribbon */}
              {offer.discountPercentage && (
                <div className="absolute -top-5 -right-5 bg-gradient-to-br from-green-500 to-emerald-600 text-white text-xl font-extrabold px-6 py-3 rounded-full shadow-2xl z-10 transform rotate-12 flex items-center">
                  <div className="relative">
                    <Percent className="w-6 h-6 mr-2 text-white" />
                    <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm"></div>
                  </div>
                  <span className="text-xl font-black">{offer.discountPercentage}% OFF</span>
                </div>
              )}

              {/* Marketing Badge */}
              <div
                className={`absolute top-4 left-4 text-sm font-bold px-3 py-2 rounded-full flex items-center shadow-lg ${badgeTypes[i % badgeTypes.length].color} z-10`}
              >
                {badgeTypes[i % badgeTypes.length].icon}
                {badgeTypes[i % badgeTypes.length].label}
              </div>

              {/* Image - Larger Container */}
              <div className="relative h-[22rem] overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0"></div>
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder-offer.jpg';
                  }}
                />
                {offer.validUntil && (
                  <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-2 rounded-lg text-sm flex items-center shadow-md">
                    <Calendar className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="text-gray-700 font-semibold">
                      Until {new Date(offer.validUntil).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{offer.title}</h3>
                  {offer.pricePerUnit && (
                    <div className="text-xl font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
                      ₹{offer.pricePerUnit.toLocaleString()}
                      <span className="text-sm font-normal text-gray-500">/unit</span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 mb-5">{offer.description}</p>

                {offer.bestFor && (
                  <div className="mb-5">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Package className="w-5 h-5 mr-2 text-pink-500" />
                      <span className="font-medium">Perfect for:</span>
                    </div>
                    <ul className="space-y-2">
                      {offer.bestFor.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <span className="w-2 h-2 rounded-full bg-pink-500 mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {offer.minQuantity && (
                  <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg mb-5">
                    <Users className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Minimum order: {offer.minQuantity} units
                    </span>
                  </div>
                )}

                <button
                  className="w-full flex items-center justify-center bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg group-hover:scale-[1.02]"
                  onClick={() => handleOfferClick(offer)}
                >
                  <ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Get This Deal
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Need a custom solution?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-lg">
              We specialize in creating personalized offers tailored to your specific requirements and budget.
            </p>
            <button
              className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white py-4 px-10 rounded-full shadow-lg transition-all duration-300 font-semibold text-lg tracking-wide hover:shadow-xl hover:scale-105"
              onClick={handleCustomQuoteClick}
            >
              Request Custom Quote
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OffersSection;