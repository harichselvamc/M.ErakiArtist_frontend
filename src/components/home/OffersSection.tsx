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
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Offer } from '../../types';
import { offers } from '../../data/offers';

const badgeTypes = [
  {
    icon: <Flame className="w-3 h-3 mr-1 text-red-600" />,
    label: 'Hot Deal',
    color: 'bg-red-100 text-red-700',
  },
  {
    icon: <Star className="w-3 h-3 mr-1 text-yellow-500" />,
    label: 'Top Pick',
    color: 'bg-yellow-100 text-yellow-700',
  },
  {
    icon: <AlarmClock className="w-3 h-3 mr-1 text-blue-500" />,
    label: 'Limited Time',
    color: 'bg-blue-100 text-blue-700',
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
      y: -5,
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    },
  };

  return (
    <section className="py-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 mb-4">
            <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Special Offers</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Exclusive Bulk Deals
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our limited-time offers for weddings, corporate events and special occasions
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              className="mt-6 bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
              custom={i}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={cardVariants}
              viewport={{ once: true }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Discount Ribbon */}
              {offer.discountPercentage && (
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 transform rotate-6">
                  <Percent className="w-3 h-3 inline-block mr-1" />
                  {offer.discountPercentage}% OFF
                </div>
              )}

              {/* Marketing Badge */}
              <div
                className={`absolute top-4 left-4 text-xs font-semibold px-2 py-1 rounded flex items-center shadow-md ${badgeTypes[i % badgeTypes.length].color}`}
              >
                {badgeTypes[i % badgeTypes.length].icon}
                {badgeTypes[i % badgeTypes.length].label}
              </div>

              {/* Image */}
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder-offer.jpg';
                  }}
                />
                {offer.validUntil && (
                  <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded text-xs flex items-center">
                    <Calendar className="w-3 h-3 mr-1 text-gray-600" />
                    <span className="text-gray-700">
                      Until {new Date(offer.validUntil).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>

                {offer.bestFor && (
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Package className="w-4 h-4 mr-2" />
                      <span>Perfect for:</span>
                    </div>
                    <ul className="space-y-1">
                      {offer.bestFor.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  {offer.minQuantity && (
                    <div className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
                      <Users className="w-4 h-4 mr-1 text-gray-500" />
                      <span className="text-gray-700">Min. {offer.minQuantity}</span>
                    </div>
                  )}
                  {offer.pricePerUnit && (
                    <div className="text-lg font-bold text-gray-900">
                      ₹{offer.pricePerUnit.toLocaleString()}
                    </div>
                  )}
                </div>

                <button
                  className="w-full flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium"
                  onClick={() => handleOfferClick(offer)}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Get This Offer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Need a custom solution? We can create personalized offers for your specific requirements.
          </p>
          <button
            className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white py-3 px-8 rounded-full shadow-lg transition-all duration-300 font-semibold tracking-wide"
            onClick={handleCustomQuoteClick}
          >
            Request Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
