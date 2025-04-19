import { Offer } from '../types';
import { products } from './products';

export const offers: Offer[] = [
  {
    id: 'early-bird',
    title: 'Early Bird Special',
    description: 'Get 10% off on your first order when you place it 10 days in advance. Perfect for wedding invitations and special occasion preparations.',
    discountPercentage: 10,
    image: products.find(p => p.id === 'invitation-01')?.images[0] || '/images/admin_product/invitation.png',
    validUntil: '2023-12-31',
    minQuantity: 1,
    pricePerUnit: 1080, // After 10% discount on base price
    bestFor: ['Wedding invitations', 'Engagement cards', 'Announcements'],
    applicableProducts: ['invitation-01', 'nameboard-01', 'calligraphy-01']
  },
  {
    id: 'bundle-deal',
    title: 'Bundle & Save',
    description: 'Order 3 or more Faceless Artworks and get 15% off on your total order. Create a beautiful gallery wall with matching styles.',
    discountPercentage: 15,
    image: products.find(p => p.id === 'faceless-01')?.images[0] || '/images/admin_product/facelessportraits1.png',
    validUntil: '2023-12-31',
    minQuantity: 3,
    pricePerUnit: 2550, // After 15% discount on base price
    bestFor: ['Home decor', 'Gallery walls', 'Gift sets'],
    applicableProducts: ['faceless-01']
  },
  {
    id: 'wedding-season',
    title: 'Wedding Season Special',
    description: 'Special package deals on all wedding-related products including invitations, name boards, and hampers. Perfect for your big day!',
    image: products.find(p => p.id === 'engagement-hamper-01')?.images[0] || '/images/admin_product/engamenthampers.png',
    discountPercentage: 12,
    validUntil: '2024-03-31',
    minQuantity: 2,
    pricePerUnit: 0, // Varies by product
    bestFor: ['Wedding invitations', 'Bridal gifts', 'Wedding decor'],
    applicableProducts: ['invitation-01', 'nameboard-01', 'engagement-hamper-01', 'hijab-bouquet-01']
  },
  {
    id: 'corporate-gifting',
    title: 'Corporate Gifting Package',
    description: 'Special rates for bulk corporate orders. Custom branding available for name boards and acrylic artworks.',
    image: products.find(p => p.id === 'acrylic-01')?.images[0] || '/images/admin_product/acrylic.png',
    discountPercentage: 20,
    validUntil: '2024-06-30',
    minQuantity: 10,
    pricePerUnit: 2000, // After 20% discount on base price
    bestFor: ['Employee gifts', 'Client appreciation', 'Corporate events'],
    applicableProducts: ['acrylic-01', 'nameboard-01', 'calligraphy-01', 'custom-gift-01']
  },
  {
    id: 'eid-special',
    title: 'Eid Special Collection',
    description: 'Celebrate Eid with our specially curated collection of Islamic art and gifts at discounted prices.',
    image: products.find(p => p.id === 'calligraphy-01')?.images[0] || '/images/admin_product/arabiccalligraphy.png',
    discountPercentage: 15,
    validUntil: '2024-04-15',
    minQuantity: 1,
    pricePerUnit: 0, // Varies by product
    bestFor: ['Eid gifts', 'Home decor', 'Religious art'],
    applicableProducts: ['calligraphy-01', 'hijab-bouquet-01', 'nameboard-01']
  },
  {
    id: 'hampers-combo',
    title: 'His & Hers Hamper Combo',
    description: 'Special price when you order both vanity trolley and hijab bouquet together. Perfect for engagement gifts!',
    image: products.find(p => p.id === 'vanity-hamper-01')?.images[0] || '/images/admin_product/vanitytrooley.png',
    discountPercentage: 18,
    validUntil: '2023-12-31',
    minQuantity: 1,
    pricePerUnit: 3524, // Combined price after discount
    bestFor: ['Engagement gifts', 'Couple presents', 'Wedding favors'],
    applicableProducts: ['vanity-hamper-01', 'hijab-bouquet-01']
  }
];

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