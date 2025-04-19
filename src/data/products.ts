import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'invitation-01',
    name: 'Custom Invitation Cards',
    description: 'Elegant and personalized invitation cards for weddings, engagements, and special occasions. Each design is carefully crafted to reflect your unique style.',
    category: 'invitations',
    price: 1200,
    images: [
      '/images/admin_product/invitation2.png',
      '/images/admin_product/invitation.png',
      '/images/admin_product/invitation1.png',
    ],
    sizes: [
      { id: 'standard', name: 'Standard', dimensions: '5" x 7"', priceModifier: 0 },
      { id: 'premium', name: 'Premium', dimensions: '6" x 8"', priceModifier: 300 },
      { id: 'luxury', name: 'Luxury', dimensions: '7" x 9"', priceModifier: 600 }
    ],
    colors: [
      { id: 'ivory', name: 'Ivory', hex: '#FFFFF0' },
      { id: 'gold', name: 'Gold', hex: '#FFD700' },
      { id: 'rose-gold', name: 'Rose Gold', hex: '#E0BFB8' }
    ],
    requiresText: true,
    requiresImage: false,
    featured: true,
    tags: ['wedding invitations', 'engagement cards', 'special occasion']
  },
  {
    id: 'acrylic-01',
    name: 'Acrylic on Canvas Art',
    description: 'A4 size acrylic paintings on premium canvas sheet with elegant frame. Custom designs available for home decor or special gifts.',
    category: 'wall-art',
    price: 2500,
    images: [
      '/images/admin_product/acrylic.png',
      '/images/admin_product/acrylic1.png'
    ],
    sizes: [
      { id: 'a4', name: 'A4', dimensions: '8.3" x 11.7"', priceModifier: 0 },
      { id: 'a3', name: 'A3', dimensions: '11.7" x 16.5"', priceModifier: 800 }
    ],
    colors: [],
    requiresText: false,
    requiresImage: true,
    maxImages: 1,
    featured: true,
    tags: ['home decor', 'acrylic painting', 'custom art']
  },
  {
    id: 'nameboard-01',
    name: 'Arabic Name Board',
    description: 'Elegant acrylic name boards perfect for weddings, home decor, or as thoughtful gifts. Custom Arabic calligraphy with your desired names.',
    category: 'name-boards',
    price: 1800,
    images: [
      '/images/admin_product/arabicnameboard.png'
    ],
    sizes: [
      { id: 'small', name: 'Small', dimensions: '10" x 12"', priceModifier: 0 },
      { id: 'medium', name: 'Medium', dimensions: '12" x 16"', priceModifier: 500 },
      { id: 'large', name: 'Large', dimensions: '16" x 20"', priceModifier: 900 }
    ],
    colors: [
      { id: 'gold', name: 'Gold', hex: '#D4AF37' },
      { id: 'silver', name: 'Silver', hex: '#C0C0C0' },
      { id: 'rose-gold', name: 'Rose Gold', hex: '#E0BFB8' }
    ],
    requiresText: true,
    requiresImage: false,
    featured: true,
    tags: ['arabic name boards', 'wedding gift', 'name plate', 'home decor']
  },
  {
    id: 'hijab-bouquet-01',
    name: 'Hijab Bouquet',
    description: 'Beautifully crafted hijab bouquets - a unique and thoughtful gift for special occasions, Ramadan, or Eid celebrations.',
    category: 'gifts',
    price: 1500,
    images: [
      '/images/admin_product/hijab bouquets.png'
    ],
    sizes: [
      { id: 'standard', name: 'Standard', dimensions: '12" arrangement', priceModifier: 0 },
      { id: 'premium', name: 'Premium', dimensions: '16" arrangement', priceModifier: 500 }
    ],
    colors: [
      { id: 'pink', name: 'Pink', hex: '#FFC0CB' },
      { id: 'white', name: 'White', hex: '#FFFFFF' },
      { id: 'blue', name: 'Blue', hex: '#0000FF' }
    ],
    requiresText: false,
    requiresImage: false,
    featured: true,
    tags: ['hijab bouquets', 'Ramadan gifts', 'for her', 'Eid gifts']
  },
  {
    id: 'engagement-hamper-01',
    name: 'Engagement Hamper',
    description: 'Luxurious engagement hampers filled with carefully selected items for the perfect pre-wedding celebration. Customizable contents available.',
    category: 'hampers',
    price: 3500,
    images: [
      '/images/admin_product/engamenthampers.png',
      '/images/admin_product/engamenthampers1.png',
      '/images/admin_product/engamenthampers2.png',
      '/images/admin_product/engamenthampers3.png',
      '/images/admin_product/engamenthampers4.png'
    ],
    sizes: [
      { id: 'standard', name: 'Standard', dimensions: 'Medium Basket', priceModifier: 0 },
      { id: 'premium', name: 'Premium', dimensions: 'Large Basket', priceModifier: 1000 },
      { id: 'luxury', name: 'Luxury', dimensions: 'XL Basket', priceModifier: 2000 }
    ],
    colors: [],
    requiresText: true,
    requiresImage: false,
    featured: true,
    tags: ['engagement hampers', 'bridal gifts', 'wedding hampers']
  },
  {
    id: 'vanity-hamper-01',
    name: 'Vanity Trolley Hamper',
    description: 'Stylish vanity trolley hampers perfect for him - a thoughtful gift containing grooming essentials in a beautiful presentation.',
    category: 'hampers',
    price: 2800,
    images: [
      '/images/admin_product/vanity trooley.png'
    ],
    sizes: [
      { id: 'standard', name: 'Standard', dimensions: 'Small Trolley', priceModifier: 0 },
      { id: 'premium', name: 'Premium', dimensions: 'Medium Trolley', priceModifier: 800 }
    ],
    colors: [
      { id: 'black', name: 'Black', hex: '#000000' },
      { id: 'brown', name: 'Brown', hex: '#964B00' }
    ],
    requiresText: false,
    requiresImage: false,
    featured: true,
    tags: ['vanity trolley', 'for him', 'grooming gifts']
  },
  {
    id: 'calligraphy-01',
    name: 'Arabic Calligraphy Art',
    description: 'Hand-painted Arabic calligraphy on canvas sheet with A3 frame. Custom verses, names, or quotes available in various styles.',
    category: 'calligraphy',
    price: 2200,
    images: [
      '/images/admin_product/arabic calligraphy.png',
      '/images/admin_product/arabic calligraphy (2).png'
    ],
    sizes: [
      { id: 'a3', name: 'A3', dimensions: '11.7" x 16.5"', priceModifier: 0 },
      { id: 'a2', name: 'A2', dimensions: '16.5" x 23.4"', priceModifier: 1000 }
    ],
    colors: [
      { id: 'gold', name: 'Gold', hex: '#D4AF37' },
      { id: 'black', name: 'Black', hex: '#000000' },
      { id: 'blue', name: 'Blue', hex: '#0000FF' }
    ],
    requiresText: true,
    requiresImage: false,
    featured: true,
    tags: ['arabic calligraphy', 'islamic art', 'hand painted']
  },
  {
    id: 'faceless-01',
    name: 'Faceless Portrait',
    description: 'Unique faceless portraits that capture the essence of your special moments without facial details. Perfect for modest art lovers.',
    category: 'faceless-art',
    price: 3000,
    images: [
      '/images/admin_product/faceless portraits (1).png',
      '/images/admin_product/faceless portraits (2).png',
      '/images/admin_product/faceless portraits (3).png',
      '/images/admin_product/faceless portraits (4).png',
      '/images/admin_product/faceless portraits (5).png',
      '/images/admin_product/faceless portraits (6).png'
    ],
    sizes: [
      { id: 'small', name: 'Small', dimensions: '8" x 10"', priceModifier: 0 },
      { id: 'medium', name: 'Medium', dimensions: '12" x 16"', priceModifier: 800 },
      { id: 'large', name: 'Large', dimensions: '16" x 20"', priceModifier: 1500 }
    ],
    colors: [
      { id: 'pastel', name: 'Pastel', hex: '#F8C8DC' },
      { id: 'vibrant', name: 'Vibrant', hex: '#FF5733' },
      { id: 'monochrome', name: 'Monochrome', hex: '#36454F' }
    ],
    requiresText: false,
    requiresImage: true,
    maxImages: 2,
    featured: true,
    tags: ['faceless art', 'custom portraits', 'modest art']
  },
  {
    id: 'custom-gift-01',
    name: 'Custom Gift Package',
    description: 'Completely personalized gift packages tailored to your recipient\'s preferences. We work with you to create the perfect thoughtful gift.',
    category: 'gifts',
    price: 2000,
    images: [
      '/images/admin_product/custom gifts.png'
    ],
    sizes: [],
    colors: [],
    requiresText: true,
    requiresImage: false,
    featured: true,
    tags: ['custom gifts', 'personalized presents', 'thoughtful gifting']
  }
];

// Helper functions remain the same
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};