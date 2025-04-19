import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';
import { Product, ProductCategory } from '../../types';
import { products } from '../../data/products';
import { motion } from 'framer-motion';

interface ProductGridProps {
  title?: string;
  showFilter?: boolean;
  featuredOnly?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  title = "Our Artworks", 
  showFilter = true,
  featuredOnly = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'faceless-art', name: 'Faceless Art' },
    { id: 'calligraphy', name: 'Calligraphy' },
    { id: 'hampers', name: 'Hampers' },
    { id: 'invitations', name: 'Invitations' },
    // { id: 'nikkah-nama', name: 'Nikkah Nama' },
    // { id: 'resin-art', name: 'Resin Art' }
  ];
  
  const filteredProducts = products
    .filter(product => featuredOnly ? product.featured : true)
    .filter(product => selectedCategory === 'all' ? true : product.category === selectedCategory);

  return (
    <section id="products" className="py-20 bg-white">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="section-title">{title}</h2>
          
          {showFilter && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <div className="flex items-center text-sm text-primary-600 mr-2">
                <Filter className="w-4 h-4 mr-1" /> Filter:
              </div>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as ProductCategory | 'all')}
                  className={`px-4 py-1 rounded-full text-sm transition-all ${
                    selectedCategory === category.id
                    ? 'bg-primary-950 text-white'
                    : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-primary-500">No products found in this category.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <motion.div 
      className="card hover-lift group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative overflow-hidden" style={{ paddingBottom: '75%' }}>
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-primary-600 mb-2">
          <span>Starting at ₹{product.price.toLocaleString()}</span>
        </p>
        <p className="text-sm text-primary-500 line-clamp-2 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <Link 
            to={`/product/${product.id}`} 
            className="text-primary-950 font-medium flex items-center hover:text-accent-700 transition-colors"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductGrid;