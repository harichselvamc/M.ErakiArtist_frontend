import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import OrderForm from '../components/order/OrderForm';
import { getProductById } from '../data/products';

const OrderFormPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductById(productId) : undefined;
  
  if (!product) {
    return <Navigate to="/" />;
  }
  
  return (
    <OrderForm product={product} />
  );
};

export default OrderFormPage;