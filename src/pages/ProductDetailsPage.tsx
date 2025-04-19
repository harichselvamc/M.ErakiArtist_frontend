import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ProductDetails from '../components/product/ProductDetails';
import ProductGrid from '../components/home/ProductGrid';
import { getProductById } from '../data/products';

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductById(productId) : undefined;
  
  if (!product) {
    return <Navigate to="/" />;
  }
  
  return (
    <>
      <ProductDetails product={product} />
      <ProductGrid title="You Might Also Like" showFilter={false} />
    </>
  );
};

export default ProductDetailsPage;