export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  images: string[];
  sizes: SizeOption[];
  colors: ColorOption[];
  requiresText: boolean;
  requiresImage: boolean;
  maxImages?: number;
  featured: boolean;
}

export type ProductCategory = 
  | 'faceless-art'
  | 'calligraphy'
  | 'hampers'
  | 'invitations'
  | 'nikkah-nama'
  | 'resin-art';

export interface SizeOption {
  id: string;
  name: string;
  dimensions: string;
  priceModifier: number;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  size: SizeOption;
  color: ColorOption;
  deliveryDate: Date;
  text?: string;
  notes?: string;
  images?: File[];
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  paymentScreenshot?: File;
  totalAmount: number;
  advanceAmount: number;
  createdAt: Date;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discountPercentage?: number;
  validUntil?: Date;
  image?: string;
}