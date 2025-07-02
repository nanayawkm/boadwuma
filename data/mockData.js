// Mock data for Boadwuma - Ghanaian Service Platform

// Major Ghanaian locations with coordinates
export const GHANA_LOCATIONS = {
  ACCRA: { lat: 5.6037, lng: -0.1870, name: 'Accra' },
  KUMASI: { lat: 6.6885, lng: -1.6244, name: 'Kumasi' },
  TAMALE: { lat: 9.4034, lng: -0.8424, name: 'Tamale' },
  TEMA: { lat: 5.6698, lng: 0.0166, name: 'Tema' },
  CAPE_COAST: { lat: 5.1053, lng: -1.2466, name: 'Cape Coast' },
  SEKONDI_TAKORADI: { lat: 4.9344, lng: -1.7713, name: 'Sekondi-Takoradi' },
  EAST_LEGON: { lat: 5.6499, lng: -0.1436, name: 'East Legon, Accra' },
  OSU: { lat: 5.5515, lng: -0.1736, name: 'Osu, Accra' },
  ADENTA: { lat: 5.7094, lng: -0.1724, name: 'Adenta, Accra' },
  LAPAZ: { lat: 5.6106, lng: -0.2528, name: 'Lapaz, Accra' },
};

// Service categories
export const SERVICE_CATEGORIES = [
  {
    id: 'appliance_repair',
    name: 'Appliance Repair',
    icon: '🔧',
    services: ['Fridge Repair', 'Washing Machine', 'Microwave', 'Air Conditioner', 'TV Repair']
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: '🚿',
    services: ['Pipe Repair', 'Toilet Fix', 'Water Heater', 'Drain Cleaning', 'Faucet Installation']
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: '⚡',
    services: ['Wiring', 'Fan Installation', 'Power Issues', 'Socket Repair', 'Circuit Breaker']
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    icon: '🧹',
    services: ['House Cleaning', 'Office Cleaning', 'Deep Cleaning', 'Carpet Cleaning', 'Window Cleaning']
  },
  {
    id: 'handyman',
    name: 'Handyman',
    icon: '🔨',
    services: ['Furniture Assembly', 'Wall Mounting', 'Door Repair', 'Painting', 'General Repairs']
  },
  {
    id: 'automotive',
    name: 'Auto Repair',
    icon: '🚗',
    services: ['Engine Repair', 'Tire Service', 'Oil Change', 'Battery', 'AC Repair']
  }
];

// Mock service providers
export const MOCK_PROVIDERS = [
  {
    id: 'provider-1',
    name: 'Kwame Asante',
    avatar: 'https://i.pravatar.cc/150?img=1',
    phone: '+233 24 123 4567',
    rating: 4.8,
    reviewCount: 127,
    category: 'appliance_repair',
    services: ['Fridge Repair', 'Washing Machine', 'Air Conditioner'],
    priceRange: '₵80 - ₵300',
    location: GHANA_LOCATIONS.EAST_LEGON,
    experience: '5 years',
    description: 'Expert in all home appliances. Quick and reliable service.',
    availability: 'available',
    verified: true,
    completedJobs: 240
  },
  {
    id: 'provider-2',
    name: 'Ama Darko',
    avatar: 'https://i.pravatar.cc/150?img=2',
    phone: '+233 20 987 6543',
    rating: 4.9,
    reviewCount: 89,
    category: 'cleaning',
    services: ['House Cleaning', 'Office Cleaning', 'Deep Cleaning'],
    priceRange: '₵150 - ₵500',
    location: GHANA_LOCATIONS.OSU,
    experience: '3 years',
    description: 'Professional cleaning services for homes and offices.',
    availability: 'available',
    verified: true,
    completedJobs: 156
  },
  {
    id: 'provider-3',
    name: 'Kofi Mensah',
    avatar: 'https://i.pravatar.cc/150?img=3',
    phone: '+233 26 555 7777',
    rating: 4.7,
    reviewCount: 203,
    category: 'plumbing',
    services: ['Pipe Repair', 'Toilet Fix', 'Water Heater'],
    priceRange: '₵120 - ₵450',
    location: GHANA_LOCATIONS.ADENTA,
    experience: '7 years',
    description: 'Licensed plumber with years of experience.',
    availability: 'busy',
    verified: true,
    completedJobs: 312
  },
  {
    id: 'provider-4',
    name: 'Akosua Osei',
    avatar: 'https://i.pravatar.cc/150?img=4',
    phone: '+233 23 444 8888',
    rating: 4.6,
    reviewCount: 156,
    category: 'electrical',
    services: ['Wiring', 'Fan Installation', 'Power Issues'],
    priceRange: '₵100 - ₵400',
    location: GHANA_LOCATIONS.LAPAZ,
    experience: '4 years',
    description: 'Certified electrician for residential and commercial work.',
    availability: 'available',
    verified: true,
    completedJobs: 189
  },
  {
    id: 'provider-5',
    name: 'Yaw Boateng',
    avatar: 'https://i.pravatar.cc/150?img=5',
    phone: '+233 24 777 9999',
    rating: 4.9,
    reviewCount: 78,
    category: 'handyman',
    services: ['Furniture Assembly', 'Wall Mounting', 'Door Repair'],
    priceRange: '₵60 - ₵250',
    location: GHANA_LOCATIONS.TEMA,
    experience: '6 years',
    description: 'Skilled handyman for all your home repair needs.',
    availability: 'available',
    verified: true,
    completedJobs: 134
  },
  {
    id: 'provider-6',
    name: 'Efua Asiedu',
    avatar: 'https://i.pravatar.cc/150?img=6',
    phone: '+233 20 333 2222',
    rating: 4.8,
    reviewCount: 91,
    category: 'automotive',
    services: ['Engine Repair', 'Tire Service', 'Oil Change'],
    priceRange: '₵200 - ₵800',
    location: GHANA_LOCATIONS.KUMASI,
    experience: '8 years',
    description: 'Auto mechanic with expertise in all vehicle types.',
    availability: 'available',
    verified: true,
    completedJobs: 267
  }
];

// Mock users
export const MOCK_USERS = [
  {
    id: 'user-1',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=7',
    phone: '+233 24 111 2222',
    location: GHANA_LOCATIONS.ACCRA,
    verified: true
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=8',
    phone: '+233 20 333 4444',
    location: GHANA_LOCATIONS.EAST_LEGON,
    verified: true
  }
];

// Mock service requests
export const MOCK_REQUESTS = [
  {
    id: 'req-1',
    userId: 'user-1',
    providerId: 'provider-1',
    service: 'Fridge Repair',
    message: 'My fridge is not cooling properly. It was working fine yesterday but now the temperature is not cold enough.',
    status: 'pending', // pending, accepted, en_route, completed, rated
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    location: GHANA_LOCATIONS.ACCRA,
    estimatedPrice: null,
    actualPrice: null,
    paymentMethod: null,
    rating: null,
    review: null
  },
  {
    id: 'req-2',
    userId: 'user-2',
    providerId: 'provider-2',
    service: 'House Cleaning',
    message: 'Need deep cleaning for 3-bedroom house. Kitchen and bathrooms need special attention.',
    status: 'accepted',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    location: GHANA_LOCATIONS.EAST_LEGON,
    estimatedPrice: '₵300',
    actualPrice: null,
    paymentMethod: null,
    rating: null,
    review: null,
    acceptedAt: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
  },
  {
    id: 'req-3',
    userId: 'user-1',
    providerId: 'provider-3',
    service: 'AC Repair',
    message: 'AC unit not cooling properly. Need urgent repair.',
    status: 'en_route',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    location: GHANA_LOCATIONS.TEMA,
    estimatedPrice: '₵250',
    actualPrice: null,
    paymentMethod: null,
    rating: null,
    review: null,
    acceptedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    enRouteAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    eta: 18,
    providerLocation: {
      lat: 5.6698 + (Math.random() - 0.5) * 0.01,
      lng: 0.0166 + (Math.random() - 0.5) * 0.01
    }
  },
  {
    id: 'req-4',
    userId: 'user-2',
    providerId: 'provider-4',
    service: 'Electrical Repair',
    message: 'Power outlet not working in living room. Need electrician.',
    status: 'completed',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    location: GHANA_LOCATIONS.OSU,
    estimatedPrice: '₵150',
    actualPrice: '₵150',
    paymentMethod: 'cash',
    rating: null,
    review: null,
    acceptedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    enRouteAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  }
];

// Mock chat messages
export const MOCK_CHAT_MESSAGES = {
  'req-1': [
    {
      id: 'msg-1',
      senderId: 'user-1',
      senderType: 'user',
      message: 'My fridge is not cooling properly. It was working fine yesterday but now the temperature is not cold enough.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'text'
    },
    {
      id: 'msg-2',
      senderId: 'provider-1',
      senderType: 'provider',
      message: 'Hello! I can help you with that. What brand is your fridge and how old is it?',
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      type: 'text'
    },
    {
      id: 'msg-3',
      senderId: 'user-1',
      senderType: 'user',
      message: 'It\'s a Samsung, about 3 years old. The freezer section is working but the main compartment is warm.',
      timestamp: new Date(Date.now() - 1.2 * 60 * 60 * 1000),
      type: 'text'
    },
    {
      id: 'msg-4',
      senderId: 'provider-1',
      senderType: 'provider',
      message: 'Sounds like a thermostat or compressor issue. I can come check it today. My rate is ₵150-₵250 depending on the problem.',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      type: 'text'
    }
  ],
  'req-2': [
    {
      id: 'msg-5',
      senderId: 'user-2',
      senderType: 'user',
      message: 'Need deep cleaning for 3-bedroom house. Kitchen and bathrooms need special attention.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      type: 'text'
    },
    {
      id: 'msg-6',
      senderId: 'provider-2',
      senderType: 'provider',
      message: 'I can help! For a 3-bedroom deep clean with kitchen and bathrooms, it\'s ₵300. I have availability today.',
      timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
      type: 'text'
    },
    {
      id: 'msg-7',
      senderId: 'user-2',
      senderType: 'user',
      message: 'That sounds good. When can you come?',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      type: 'text'
    },
    {
      id: 'msg-8',
      senderId: 'provider-2',
      senderType: 'provider',
      message: 'I can start at 2 PM today. I\'ll bring all cleaning supplies.',
      timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
      type: 'text'
    },
    {
      id: 'msg-9',
      senderId: 'provider-2',
      senderType: 'provider',
      message: 'On my way now! ETA 15 minutes.',
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      type: 'status'
    }
  ]
};

// Utility functions
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in km
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

export function getProvidersNearLocation(userLocation, maxDistance = 50) {
  return MOCK_PROVIDERS.map(provider => ({
    ...provider,
    distance: calculateDistance(
      userLocation.lat, 
      userLocation.lng, 
      provider.location.lat, 
      provider.location.lng
    )
  }))
  .filter(provider => provider.distance <= maxDistance)
  .sort((a, b) => a.distance - b.distance);
}

export function formatDistance(distance) {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m away`;
  }
  return `${distance}km away`;
}

export function formatTimeAgo(timestamp) {
  const now = new Date();
  const diff = Math.floor((now - timestamp) / 1000);
  
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// Payment methods available in Ghana
export const PAYMENT_METHODS = [
  { id: 'cash', name: 'Cash', icon: '💵' },
  { id: 'momo', name: 'Mobile Money', icon: '📱' },
  { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
  { id: 'not_paid', name: 'Not Paid Yet', icon: '⏳' }
];

// Legacy exports for compatibility
export const serviceCategories = SERVICE_CATEGORIES;
export const serviceProviders = MOCK_PROVIDERS;


export const getProvidersByCategory = (categoryId) => {
  return MOCK_PROVIDERS.filter(provider => provider.category === categoryId);
};

export const getProviderById = (providerId) => {
  return MOCK_PROVIDERS.find(provider => provider.id === providerId);
};

export const getCategoryById = (categoryId) => {
  return SERVICE_CATEGORIES.find(category => category.id === categoryId);
};