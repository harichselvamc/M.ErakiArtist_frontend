import { Offer } from '../types';

export const offers: Offer[] = [
  {
    id: 'early-bird',
    title: 'Early Bird Special',
    description: 'Get 10% off on your first order when you place it 10 days in advance.',
    discountPercentage: 10,
    image: 'https://images.pexels.com/photos/5778899/pexels-photo-5778899.jpeg'
  },
  {
    id: 'bundle-deal',
    title: 'Bundle & Save',
    description: 'Order 3 or more Faceless Artworks and get 15% off on your total order.',
    discountPercentage: 15,
    image: 'https://images.pexels.com/photos/4207791/pexels-photo-4207791.jpeg'
  },
  {
    id: 'seasonal-special',
    title: 'Wedding Season Special',
    description: 'Special prices on all wedding invitations and Nikkah Nama designs.',
    image: 'https://images.pexels.com/photos/5409757/pexels-photo-5409757.jpeg'
  }
];