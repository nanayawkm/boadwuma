import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useApp } from '../../contexts/AppContext';
import ServiceProviderCard from '../../components/ServiceProviderCard';
import { ArrowLeft, MapPin, Filter } from 'lucide-react';
import { 
  SERVICE_CATEGORIES, 
  getProvidersNearLocation, 
  getProvidersByCategory 
} from '../../data/mockData';

export default function ServiceCategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const { userLocation } = useApp();
  const [categoryData, setCategoryData] = useState(null);
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [sortBy, setSortBy] = useState('distance');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  useEffect(() => {
    if (category) {
      const cat = SERVICE_CATEGORIES.find(c => c.id === category);
      setCategoryData(cat);
      
      if (cat) {
        // Get providers for this category with distance
        const categoryProviders = getProvidersByCategory(category);
        const providersWithDistance = categoryProviders.map(provider => ({
          ...provider,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            provider.location.lat,
            provider.location.lng
          )
        }));
        
        setProviders(providersWithDistance);
        setFilteredProviders(providersWithDistance);
      }
    }
  }, [category, userLocation]);

  useEffect(() => {
    let filtered = [...providers];

    // Filter by availability
    if (availabilityFilter !== 'all') {
      filtered = filtered.filter(p => p.availability === availabilityFilter);
    }

    // Sort providers
    switch (sortBy) {
      case 'distance':
        filtered.sort((a, b) => a.distance - b.distance);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_low':
        filtered.sort((a, b) => {
          const aPrice = parseInt(a.priceRange.split(' - ')[0].replace('₵', ''));
          const bPrice = parseInt(b.priceRange.split(' - ')[0].replace('₵', ''));
          return aPrice - bPrice;
        });
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    setFilteredProviders(filtered);
  }, [providers, sortBy, availabilityFilter]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return Math.round(distance * 10) / 10;
  };

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{categoryData.name} Services | Boadwuma</title>
        <meta name="description" content={`Find trusted ${categoryData.name.toLowerCase()} service providers near you in Ghana`} />
      </Head>

      <div className="min-h-screen bg-background-50">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.back()}
                  className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{categoryData.icon}</div>
                  <div>
                    <h1 className="text-xl font-semibold text-text-900 font-display">
                      {categoryData.name}
                    </h1>
                    <div className="flex items-center text-sm text-neutral-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{userLocation.name}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-neutral-600">
                {filteredProviders.length} providers found
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Service Types */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-text-900 mb-3 font-display">Available Services</h2>
            <div className="flex flex-wrap gap-2">
              {categoryData.services.map((service, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white text-neutral-700 rounded-full border border-neutral-200 text-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="bg-white rounded-xl shadow-card border border-neutral-100 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm font-medium text-text-900">Filters:</span>
                </div>
                
                <select
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                  className="px-3 py-1 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                >
                  <option value="all">All Providers</option>
                  <option value="available">Available Now</option>
                  <option value="busy">Busy</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-text-900">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                >
                  <option value="distance">Distance</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>
          </div>

          {/* Providers List */}
          {filteredProviders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-card border border-neutral-100 p-12 text-center">
              <div className="text-4xl mb-4">{categoryData.icon}</div>
              <h3 className="text-lg font-medium text-text-900 mb-2">No providers found</h3>
              <p className="text-neutral-600">
                Try adjusting your filters or check back later for more {categoryData.name.toLowerCase()} providers.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {filteredProviders.map((provider) => (
                <ServiceProviderCard
                  key={provider.id}
                  provider={provider}
                  distance={provider.distance}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}