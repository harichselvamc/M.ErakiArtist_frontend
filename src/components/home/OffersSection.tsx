import React from 'react';
import { Tag, Clock, ArrowRight, ShoppingCart, Users, Percent, Calendar } from 'lucide-react';
import { offers } from '../../data/offers';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const OffersSection: React.FC = () => {
  const navigate = useNavigate();

  const handleOfferClick = (offerTitle: string) => {
    navigate('/contact', {
      state: {
        prefill: {
          subject: `Bulk Order Inquiry: ${offerTitle}`,
          message: `I'm interested in your "${offerTitle}" offer. Please provide more details about:\n\n- Minimum order quantity\n- Available customization options\n- Exact pricing for bulk orders\n- Production timeline\n\nThank you!`
        }
      }
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="container-custom">
        <div className="mb-16 text-center">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Exclusive Bulk Offers
          </motion.h2>
          <motion.p 
            className="text-primary-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Special discounts for bulk orders and corporate gifting. Perfect for weddings, events, and businesses.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div 
              key={offer.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-primary-100 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleOfferClick(offer.title)}
            >
              <div className="relative h-56 overflow-hidden group">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {offer.discountPercentage && (
                  <div className="absolute top-4 right-4 bg-accent-600 text-white font-bold rounded-full px-4 py-2 text-sm flex items-center shadow-lg">
                    <Percent className="w-4 h-4 mr-1" />
                    {offer.discountPercentage}% OFF
                  </div>
                )}
                
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-display text-xl font-bold mb-1">{offer.title}</h3>
                  {offer.validUntil && (
                    <div className="text-sm flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Until {new Date(offer.validUntil).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex-grow">
                  <p className="text-primary-600 mb-4">{offer.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2 text-primary-800">Ideal For:</h4>
                    <ul className="space-y-1 text-sm text-primary-600">
                      {offer.bestFor.map((useCase, i) => (
                        <li key={i} className="flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-600 mr-2"></span>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-primary-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span>Min. Qty: {offer.minQuantity || 10}</span>
                    </div>
                    {offer.pricePerUnit && (
                      <div className="text-primary-800 font-medium">
                        ₹{offer.pricePerUnit.toLocaleString()}/unit
                      </div>
                    )}
                  </div>
                  
                  <button 
                    className="w-full flex items-center justify-center bg-primary-800 hover:bg-primary-900 text-white py-3 px-4 rounded-lg transition-colors duration-300 font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOfferClick(offer.title);
                    }}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Inquire Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-primary-600 mb-6 max-w-2xl mx-auto">
            Need a custom bulk order solution? We can tailor an offer specifically for your requirements.
          </p>
          <button 
            className="btn btn-primary mx-auto"
            onClick={() => navigate('/contact', {
              state: {
                prefill: {
                  subject: "Custom Bulk Order Request",
                  message: "I would like to discuss a custom bulk order solution. Here are my requirements:\n\n- Product type:\n- Quantity needed:\n- Desired specifications:\n- Budget range:\n- Deadline:\n\nPlease contact me to discuss further."
                }
              }
            })}
          >
            Request Custom Quote
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default OffersSection;