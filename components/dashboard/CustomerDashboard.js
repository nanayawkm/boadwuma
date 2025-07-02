import { useState } from 'react';
import { useRouter } from 'next/router';
import { MapPin, Star, Clock, ArrowRight, Plus, Search } from 'lucide-react';
import { serviceCategories, serviceProviders } from '../../data/mockData';

export default function CustomerDashboard() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  console.log('🔍 CUSTOMER DASHBOARD: Component rendered');

  const topRatedProviders = serviceProviders
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    router.push(`/services/${category.toLowerCase()}`);
  };

  const handleProviderSelect = (providerId) => {
    router.push(`/provider/${providerId}`);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-4 text-white">
        <h2 className="text-lg font-semibold mb-1">Welcome back!</h2>
        <p className="text-primary-100 text-sm">What service do you need today?</p>
      </div>

      {/* Service Categories */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Categories</h3>
        <div className="grid grid-cols-2 gap-3">
          {serviceCategories.slice(0, 6).map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.name)}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"
            >
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-primary-600 font-bold text-lg">
                  {category.icon}
                </span>
              </div>
              <h4 className="font-medium text-gray-900 text-sm">{category.name}</h4>
              <p className="text-gray-500 text-xs mt-1">{category.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Top Rated Providers */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Top Rated Providers</h3>
          <button className="text-primary-600 text-sm font-medium">View all</button>
        </div>
        <div className="space-y-3">
          {topRatedProviders.map((provider) => (
            <div
              key={provider.id}
              onClick={() => handleProviderSelect(provider.id)}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">
                    {provider.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{provider.name}</h4>
                  <p className="text-gray-500 text-sm">{provider.services.join(', ')}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{provider.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600 ml-1">
                        {typeof provider.location === 'object' 
                          ? provider.location?.name || JSON.stringify(provider.location)
                          : provider.location}
                      </span>
                    </div>
                  </div>
                </div>
                <ArrowRight size={16} className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => router.push('/post-request')}
            className="bg-primary-500 text-white p-4 rounded-xl hover:bg-primary-600 transition-colors"
          >
            <div className="text-center">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Plus size={20} />
              </div>
              <span className="font-medium text-sm">New Request</span>
            </div>
          </button>
          <button
            onClick={() => router.push('/search')}
            className="bg-gray-100 text-gray-700 p-4 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <div className="text-center">
              <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Search size={20} />
              </div>
              <span className="font-medium text-sm">Find Provider</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
} 