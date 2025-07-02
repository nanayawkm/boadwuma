# Boadwuma - Local Service Provider Platform

A responsive web application that connects everyday users with local service providers like plumbers, electricians, hairdressers, designers, and more.

## Features

### For End Users
- **Location-based search**: Find service providers near your location
- **Service browsing**: Browse by categories (plumbing, electrical, hairdressing, design, etc.)
- **Provider profiles**: View detailed profiles with ratings, reviews, and portfolio
- **In-app messaging**: Direct communication with service providers
- **Review system**: Read and write reviews for service providers
- **Mobile-responsive design**: Optimized for mobile-first experience

### For Service Providers
- **Provider dashboard**: Manage your business profile and bookings
- **Service management**: List and manage your services and pricing
- **Booking management**: Track upcoming and completed appointments
- **Messaging system**: Communicate with potential clients
- **Earnings tracking**: Monitor your income and transaction history
- **Availability control**: Set your availability status

## Technology Stack

- **Frontend**: Next.js 14, React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Images**: Next.js Image optimization with Unsplash
- **Data**: Mock JSON data (no database required)

## Project Structure

```
boadwuma/
├── components/
│   ├── Layout.js              # Main layout with navigation
│   ├── SearchBar.js           # Search functionality
│   └── ServiceProviderCard.js # Provider card component
├── data/
│   └── mockData.js           # Mock data for the application
├── pages/
│   ├── _app.js               # Next.js app configuration
│   ├── index.js              # Homepage with search and provider listings
│   ├── auth.js               # User type selection page
│   ├── messages/
│   │   └── index.js          # Messaging interface
│   ├── provider/
│   │   └── [id].js           # Individual provider profile page
│   ├── provider-dashboard.js  # Service provider dashboard
│   ├── profile.js            # User profile management
│   └── settings.js           # Application settings
├── styles/
│   └── globals.css           # Global styles and Tailwind components
└── data/
    └── mockData.js           # Mock data for development
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd boadwuma
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Pages Overview

### 1. Authentication Page (`/auth`)
- User type selection (Customer vs Service Provider)
- Feature highlights for each user type
- Onboarding flow

### 2. Homepage (`/`)
- Search functionality with location and category filters
- Featured service categories
- Service provider listings with ratings and availability
- Mobile-responsive design

### 3. Provider Profile (`/provider/[id]`)
- Detailed provider information
- Service listings and pricing
- Portfolio gallery
- Reviews and ratings
- Action buttons (Message, Call, Book)

### 4. Messages (`/messages`)
- Real-time-style messaging interface
- Conversation list
- Chat interface with message history
- Mobile-responsive design

### 5. Provider Dashboard (`/provider-dashboard`)
- Business overview with key metrics
- Booking management
- Service management
- Earnings tracking
- Message management

### 6. Profile (`/profile`)
- User profile management
- Booking history
- Review history
- Account settings

### 7. Settings (`/settings`)
- Notification preferences
- Privacy settings
- Account management
- Billing information

## Key Components

### SearchBar
- Location-based search with geolocation support
- Category filtering
- Real-time search functionality

### ServiceProviderCard
- Provider information display
- Rating and review summary
- Availability status
- Quick action buttons

### Layout
- Responsive navigation
- Mobile bottom navigation
- Desktop sidebar
- Dynamic navigation based on user type

## Mock Data

The application uses comprehensive mock data including:
- Service providers with ratings, services, and locations
- User reviews and ratings
- Message conversations
- Service categories
- User profiles

## Responsive Design

- **Mobile-first approach**: Optimized for mobile devices
- **Breakpoint system**: Uses Tailwind's responsive utilities
- **Touch-friendly**: Large tap targets and swipe gestures
- **Progressive enhancement**: Works well on all screen sizes

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom components**: Pre-built button, card, and input styles
- **Color scheme**: Primary blue with secondary orange accent
- **Typography**: System font stack for optimal performance

## Future Enhancements

- User authentication system
- Real-time messaging with WebSocket
- Payment integration
- GPS tracking for service requests
- Push notifications
- Database integration
- API development
- Advanced search filters
- Booking calendar integration

## Development Notes

- Uses Next.js 14 with App Router patterns
- Implements responsive design principles
- Follows React best practices
- Uses TypeScript-ready structure
- Optimized for SEO with proper meta tags
- Implements loading states and error handling

## Contributing

This project is set up for easy development and expansion. Key areas for contribution:
- Additional service categories
- Enhanced UI components
- Mobile app development
- Backend API integration
- Testing suite implementation

---

Built with ❤️ using Next.js and Tailwind CSS