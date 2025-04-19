import { Offer } from '../types';
import { products } from './products';

// Define default offers that will always be available
const defaultOffers: Offer[] = [
  {
    id: 'early-bird',
    title: 'Early Bird Special',
    description: 'Get 10% off on your first order when you place it 10 days in advance.',
    discountPercentage: 10,
    image: '/images/admin_product/invitation.png',
    validUntil: '2023-12-31',
    minQuantity: 1,
    pricePerUnit: 1080,
    bestFor: ['Wedding invitations', 'Engagement cards', 'Announcements'],
    applicableProducts: ['invitation-01', 'nameboard-01', 'calligraphy-01']
  },
  {
    id: 'bundle-deal',
    title: 'Bundle & Save',
    description: 'Order 3 or more Faceless Artworks and get 15% off on your total order.',
    discountPercentage: 15,
    image: '/images/admin_product/facelessportraits1.png',
    validUntil: '2023-12-31',
    minQuantity: 3,
    pricePerUnit: 2550,
    bestFor: ['Home decor', 'Gallery walls', 'Gift sets'],
    applicableProducts: ['faceless-01']
  },
  {
    id: 'wedding-season',
    title: 'Wedding Season Special',
    description: 'Special package deals on all wedding-related products.',
    image: '/images/admin_product/engamenthampers.png',
    discountPercentage: 12,
    validUntil: '2024-03-31',
    minQuantity: 2,
    bestFor: ['Wedding invitations', 'Bridal gifts', 'Wedding decor'],
    applicableProducts: ['invitation-01', 'nameboard-01', 'engagement-hamper-01']
  }
];

// Export the offers directly
export const offers: Offer[] = defaultOffers;

// Helper functions
export const getOfferById = (id: string): Offer | undefined => {
  return offers.find(offer => offer.id === id);
};

export const getActiveOffers = (): Offer[] => {
  const today = new Date();
  return offers.filter(offer => {
    if (!offer.validUntil) return true;
    return new Date(offer.validUntil) >= today;
  });
};

export const getOffersForProduct = (productId: string): Offer[] => {
  return getActiveOffers().filter(offer => 
    offer.applicableProducts?.includes(productId)
  );
};