import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const ThankYouPage: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom max-w-3xl">
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-sm border border-primary-100 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle className="w-20 h-20 text-accent-600 mx-auto mb-6" />
          
          <h1 className="text-3xl font-display font-bold mb-4">Thank You for Your Order!</h1>
          
          <p className="text-lg text-primary-600 mb-8">
            Your order has been successfully placed. We've sent a confirmation email with all the details.
          </p>
          
          <div className="bg-primary-50 p-6 rounded-lg mb-8">
            <h2 className="font-semibold text-xl mb-4">What Happens Next?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-sm mb-3">
                  <span className="font-display font-bold text-xl">1</span>
                </div>
                <p className="text-sm text-center">
                  We'll review your order details and requirements.
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-sm mb-3">
                  <span className="font-display font-bold text-xl">2</span>
                </div>
                <p className="text-sm text-center">
                  Our artist will begin working on your custom art piece.
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-sm mb-3">
                  <span className="font-display font-bold text-xl">3</span>
                </div>
                <p className="text-sm text-center">
                  We'll contact you for the remaining payment before shipping.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="bg-primary-50 p-4 rounded-lg flex items-center">
              <Clock className="w-5 h-5 text-primary-700 mr-3" />
              <p className="text-sm text-primary-700">
                Your artwork will be ready in approximately 5 working days.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn btn-primary">
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Link>
            <a 
              href="https://wa.me/7598068106" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Contact Us on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThankYouPage;