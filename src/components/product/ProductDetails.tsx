import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Clock, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { Product } from '../../types';
import { motion } from 'framer-motion';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  
  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const calculatePrice = () => {
    return product.price + selectedSize.priceModifier;
  };

  const features = [
    'Customized to your specifications',
    'Handcrafted with premium materials',
    'Expert detailing and precision',
    'Elegant packaging',
    'Free design consultation'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden bg-primary-50" style={{ height: '500px' }}>
              <motion.img 
                key={selectedImageIndex}
                src={product.images[selectedImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
                      selectedImageIndex === index ? 'ring-2 ring-accent-600' : 'opacity-70'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl text-primary-800 font-medium mb-4">
              ₹{calculatePrice().toLocaleString()}
            </p>
            
            <div className="border-t border-b border-primary-200 py-6 my-6">
              <p className="text-primary-600 mb-6">{product.description}</p>
              
              <div className="space-y-6">
                {/* Size Options */}
                <div>
                  <h3 className="font-medium mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-md text-sm ${
                          selectedSize.id === size.id 
                            ? 'border-primary-950 bg-primary-950 text-white' 
                            : 'border-primary-300 text-primary-700 hover:border-primary-950'
                        }`}
                      >
                        {size.name} ({size.dimensions})
                        {size.priceModifier > 0 && ` +₹${size.priceModifier}`}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Color Options */}
                <div>
                  <h3 className="font-medium mb-3">Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedColor.id === color.id ? 'ring-2 ring-offset-2 ring-primary-950' : ''
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor.id === color.id && <Check className="text-white w-5 h-5" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                to={`/order/${product.id}`} 
                className="btn btn-primary flex-1 text-center"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Place Order
              </Link>
              <a 
                href="https://wa.me/7598068106" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline flex-1 text-center"
              >
                Ask Questions
              </a>
            </div>
            
            <div className="bg-primary-50 p-4 rounded-md mb-6 flex items-center">
              <Clock className="w-5 h-5 text-primary-700 mr-3 flex-shrink-0" />
              <p className="text-sm text-primary-700">
                <strong>Important:</strong> Please allow a minimum of 5 days for production time. 
                Shipping is extra and will be calculated during checkout.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Features</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-primary-600">
                    <Check className="w-4 h-4 text-accent-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;