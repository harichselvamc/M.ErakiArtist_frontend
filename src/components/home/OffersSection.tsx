import React from 'react';
import {
  ArrowRight,
  ShoppingCart,
  Calendar,
  Package,
  Users,
  Sparkles,
  BadgeCheck,
  Flame,
  Star,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Offer } from '../../types';
import { offers } from '../../data/offers';

// Monochrome badge styles
const badgeTypes = [
  {
    icon: <Flame className="w-5 h-5 mr-1 text-black" />,
    label: 'Hot Deal',
    color: 'bg-white border border-black text-black',
  },
  {
    icon: <Star className="w-5 h-5 mr-1 text-black" />,
    label: 'Top Pick',
    color: 'bg-white border border-black text-black',
  },
  {
    icon: <Zap className="w-5 h-5 mr-1 text-black" />,
    label: 'Limited Time',
    color: 'bg-white border border-black text-black',
  },
  {
    icon: <BadgeCheck className="w-5 h-5 mr-1 text-black" />,
    label: 'Best Value',
    color: 'bg-white border border-black text-black',
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
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <section className="py-20 min-h-screen bg-white text-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center border border-black px-6 py-2 rounded-full shadow-sm mb-6"
          >
            <Sparkles className="w-5 h-5 mr-2 text-black" />
            <span className="text-sm font-semibold text-black">Exclusive Offers</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Premium Bulk Deals
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-700 max-w-3xl mx-auto"
          >
            Limited-time exclusive offers for weddings, corporate events, and special occasions. Save big when you order in bulk!
          </motion.p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              className="mt-6 bg-white rounded-xl overflow-hidden border border-black shadow-sm hover:shadow-md transition-all duration-300 relative group"
              custom={i}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={cardVariants}
              viewport={{ once: true }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Badge */}
              <div className={`absolute top-4 left-4 text-sm font-bold px-3 py-2 rounded-full flex items-center shadow-sm ${badgeTypes[i % badgeTypes.length].color}`}>
                {badgeTypes[i % badgeTypes.length].icon}
                {badgeTypes[i % badgeTypes.length].label}
              </div>

              {/* Image */}
              <div className="relative h-[22rem] overflow-hidden rounded-t-xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent z-10" />
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder-offer.jpg';
                  }}
                />
                {offer.validUntil && (
                  <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-2 rounded-xl text-sm flex items-center shadow-sm">
                    <Calendar className="w-5 h-5 mr-2 text-black" />
                    <span className="font-semibold">
                      Until {new Date(offer.validUntil).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4 z-20 bg-black text-white px-4 py-2 rounded-xl font-bold text-lg shadow-sm">
                  {offer.title}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{offer.title}</h3>
                  {offer.pricePerUnit && (
                    <div className="text-xl font-bold bg-gray-100 px-3 py-1 rounded-lg border border-black">
                      ₹{offer.pricePerUnit.toLocaleString()}
                      <span className="text-sm font-normal text-gray-500">/unit</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-800 mb-5">{offer.description}</p>

                {offer.bestFor && (
                  <div className="mb-5">
                    <div className="flex items-center text-sm text-black font-semibold mb-2">
                      <Package className="w-5 h-5 mr-2" />
                      Perfect for:
                    </div>
                    <ul className="space-y-2">
                      {offer.bestFor.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-800">
                          <span className="w-2 h-2 rounded-full bg-black mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {offer.minQuantity && (
                  <div className="flex items-center border border-black px-4 py-2 rounded-lg mb-5 bg-white">
                    <Users className="w-5 h-5 mr-2 text-black" />
                    <span className="text-sm font-medium">
                      Minimum order: {offer.minQuantity} units
                    </span>
                  </div>
                )}

                <button
                  className="w-full flex items-center justify-center bg-black text-white py-3 px-6 rounded-lg transition-all duration-300 font-semibold shadow hover:shadow-md"
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
          className="text-center mt-20"
        >
          <div className="bg-white border border-black p-8 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-bold mb-3">Need a custom solution?</h3>
            <p className="text-gray-800 mb-6 max-w-2xl mx-auto text-lg">
              We specialize in creating personalized offers tailored to your specific requirements and budget.
            </p>
            <button
              className="bg-black text-white py-4 px-10 rounded-full shadow transition-all duration-300 font-semibold text-lg hover:scale-105"
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
