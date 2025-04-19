import React from 'react';
import { Calendar, Clock, CreditCard, Truck, ShoppingBag, MessageCircle } from 'lucide-react';

const InstructionsSection: React.FC = () => {
  const steps = [
    {
      icon: <ShoppingBag className="w-8 h-8 text-accent-600" />,
      title: 'Choose Your Art',
      description: 'Browse our collection and select the art piece that speaks to you.'
    },
    {
      icon: <Calendar className="w-8 h-8 text-accent-600" />,
      title: 'Plan Ahead',
      description: 'Please give us a minimum of 5 days to prepare your custom art. Avoid last-minute orders.'
    },
    {
      icon: <CreditCard className="w-8 h-8 text-accent-600" />,
      title: 'Payment',
      description: '50% advance payment is required to begin work. The remaining amount is due before shipping.'
    },
    {
      icon: <Clock className="w-8 h-8 text-accent-600" />,
      title: 'Production Time',
      description: 'We need 5 days to craft your personalized art with care and attention to detail.'
    },
    {
      icon: <Truck className="w-8 h-8 text-accent-600" />,
      title: 'Shipping',
      description: 'Shipping charges are extra and will be calculated based on your location.'
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-accent-600" />,
      title: 'Stay Connected',
      description: 'We\'ll contact you throughout the process to ensure your art is perfect.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="section-title">How It Works</h2>
          <p className="text-primary-600 max-w-2xl mx-auto">
            Follow these simple steps to get your custom art piece. Please note important instructions for a smooth experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="p-6 bg-primary-50 rounded-lg hover-lift">
              <div className="mb-4 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-sm">
                {step.icon}
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-primary-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-primary-100 p-6 rounded-lg">
          <h3 className="font-display text-xl font-semibold mb-3 text-center">Important Notes</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-accent-600 font-bold mr-2">•</span>
              <span>Please provide clear images and detailed instructions for custom artwork.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-600 font-bold mr-2">•</span>
              <span>Rush orders may be possible with an additional fee, subject to availability.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-600 font-bold mr-2">•</span>
              <span>We offer a 100% satisfaction guarantee—we'll work with you until you're happy with your art.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-600 font-bold mr-2">•</span>
              <span>For any questions or special requests, please contact us via WhatsApp at +91 7598068106.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default InstructionsSection;