export const serviceCategories = [
  { id: 'appliance-repair', name: 'Fridge Repair', icon: '❄️', providerCount: 23 },
  { id: 'plumbing', name: 'Plumbing', icon: '🔧', providerCount: 45 },
  { id: 'barber', name: 'Barber', icon: '💇‍♂️', providerCount: 32 },
  { id: 'electrical', name: 'Electrician', icon: '⚡', providerCount: 28 },
  { id: 'tailor', name: 'Tailor', icon: '🪡', providerCount: 19 },
  { id: 'hairdressing', name: 'Hairdressing', icon: '✂️', providerCount: 36 },
  { id: 'design', name: 'Interior Design', icon: '🎨', providerCount: 15 },
  { id: 'cleaning', name: 'Cleaning', icon: '🧽', providerCount: 41 },
  { id: 'gardening', name: 'Gardening', icon: '🌱', providerCount: 22 },
  { id: 'carpentry', name: 'Carpentry', icon: '🔨', providerCount: 18 },
  { id: 'painting', name: 'House Painting', icon: '🎨', providerCount: 25 },
  { id: 'ac-repair', name: 'AC Repair', icon: '❄️', providerCount: 12 }
];

export const serviceProviders = [
  {
    id: '1',
    name: 'John Smith',
    category: 'plumbing',
    services: ['Emergency Repairs', 'Pipe Installation', 'Bathroom Fitting'],
    rating: 4.8,
    reviewCount: 127,
    priceRange: '$50-100/hour',
    location: {
      address: '123 Main St, Downtown',
      lat: 40.7128,
      lng: -74.0060,
      distance: '0.5 miles'
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isAvailable: true,
    nextAvailable: 'Today 2:00 PM',
    description: 'Licensed plumber with 10+ years experience in residential and commercial plumbing.',
    portfolio: [
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=300&h=200&fit=crop'
    ]
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    category: 'hairdressing',
    services: ['Haircuts', 'Coloring', 'Styling', 'Bridal Hair'],
    rating: 4.9,
    reviewCount: 203,
    priceRange: '$30-80/service',
    location: {
      address: '456 Oak Ave, Midtown',
      lat: 40.7589,
      lng: -73.9851,
      distance: '1.2 miles'
    },
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c63d?w=150&h=150&fit=crop&crop=face',
    isAvailable: false,
    nextAvailable: 'Tomorrow 10:00 AM',
    description: 'Professional hairstylist specializing in modern cuts and color techniques.',
    portfolio: [
      'https://images.unsplash.com/photo-1560975286-5c870889b94d?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=200&fit=crop'
    ]
  },
  {
    id: '3',
    name: 'Mike Wilson',
    category: 'electrical',
    services: ['Wiring', 'Lighting Installation', 'Panel Upgrades'],
    rating: 4.7,
    reviewCount: 89,
    priceRange: '$75-150/hour',
    location: {
      address: '789 Pine St, Uptown',
      lat: 40.7831,
      lng: -73.9712,
      distance: '2.1 miles'
    },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isAvailable: true,
    nextAvailable: 'Today 4:00 PM',
    description: 'Certified electrician with expertise in residential and commercial electrical work.',
    portfolio: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop'
    ]
  },
  {
    id: '4',
    name: 'Emma Davis',
    category: 'design',
    services: ['Interior Design', 'Space Planning', 'Color Consultation'],
    rating: 5.0,
    reviewCount: 67,
    priceRange: '$100-200/hour',
    location: {
      address: '321 Elm St, Arts District',
      lat: 40.7282,
      lng: -74.0776,
      distance: '1.8 miles'
    },
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isAvailable: true,
    nextAvailable: 'Today 1:00 PM',
    description: 'Award-winning interior designer with a passion for creating beautiful, functional spaces.',
    portfolio: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop'
    ]
  }
];

export const reviews = [
  {
    id: '1',
    providerId: '1',
    userName: 'Alice Brown',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face',
    rating: 5,
    comment: 'Excellent work! Fixed my plumbing issue quickly and professionally.',
    date: '2023-12-01'
  },
  {
    id: '2',
    providerId: '1',
    userName: 'David Lee',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
    rating: 4,
    comment: 'Very knowledgeable and fair pricing. Would recommend.',
    date: '2023-11-28'
  },
  {
    id: '3',
    providerId: '2',
    userName: 'Lisa Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&crop=face',
    rating: 5,
    comment: 'Amazing haircut! Sarah really understood what I wanted.',
    date: '2023-12-02'
  }
];

export const messages = [
  {
    id: '1',
    conversationId: 'conv_1',
    senderId: 'user_1',
    receiverId: '1',
    message: 'Hi, I need help with a leaky faucet. Are you available today?',
    timestamp: '2023-12-03T10:30:00Z',
    isRead: true
  },
  {
    id: '2',
    conversationId: 'conv_1',
    senderId: '1',
    receiverId: 'user_1',
    message: 'Hello! Yes, I can help with that. I have availability this afternoon. Would 2 PM work for you?',
    timestamp: '2023-12-03T10:35:00Z',
    isRead: true
  },
  {
    id: '3',
    conversationId: 'conv_1',
    senderId: 'user_1',
    receiverId: '1',
    message: 'Perfect! What would be the estimated cost?',
    timestamp: '2023-12-03T10:40:00Z',
    isRead: false
  }
];

export const conversations = [
  {
    id: 'conv_1',
    participants: ['user_1', '1'],
    lastMessage: 'Perfect! What would be the estimated cost?',
    lastMessageTime: '2023-12-03T10:40:00Z',
    unreadCount: 1,
    providerName: 'John Smith',
    providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];

export const currentUser = {
  id: 'user_1',
  name: 'Jane Doe',
  email: 'jane@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c63d?w=150&h=150&fit=crop&crop=face',
  location: {
    lat: 40.7128,
    lng: -74.0060,
    address: 'New York, NY'
  },
  isProvider: false
};