import { useState, useEffect } from 'react';
import Head from 'next/head';
import SearchBar from '../components/SearchBar';
import ServiceProviderCard from '../components/ServiceProviderCard';
import { serviceProviders, serviceCategories } from '../data/mockData';
import { Zap, Wrench, Scissors, Palette } from 'lucide-react';

export default function Home() {
  const [providers, setProviders] = useState(serviceProviders);
  const [filteredProviders, setFilteredProviders] = useState(serviceProviders);
  const [loading, setLoading] = useState(false);

  const handleSearch = ({ searchTerm, location, category }) => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let filtered = providers;

      if (searchTerm) {
        filtered = filtered.filter(provider =>
          provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.services.some(service =>
            service.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }

      if (category) {
        filtered = filtered.filter(provider => provider.category === category);
      }

      setFilteredProviders(filtered);
      setLoading(false);
    }, 500);
  };

  const featuredCategories = [
    { ...serviceCategories.find(cat => cat.id === 'electrical'), icon: Zap },
    { ...serviceCategories.find(cat => cat.id === 'plumbing'), icon: Wrench },
    { ...serviceCategories.find(cat => cat.id === 'hairdressing'), icon: Scissors },
    { ...serviceCategories.find(cat => cat.id === 'design'), icon: Palette },
  ];

  return (
    <>
      <Head>
        <title>Boadwuma - Connect with Local Service Providers</title>
        <meta name="description" content="Find trusted local service providers for all your needs - plumbers, electricians, hairdressers, designers and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="p-4 pb-20 lg:pb-4">
        {/* Hero Section */}
        <div className="text-center py-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Find Local Service Providers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with trusted professionals in your area for all your service needs
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Featured Categories */}
        <div className="max-w-6xl mx-auto mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleSearch({ category: category.id })}
                  className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-2">
                    <Icon size={24} className="text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredProviders.length === providers.length 
                ? 'Available Service Providers' 
                : `${filteredProviders.length} Results Found`}
            </h2>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>Sort by: Relevance</option>
              <option>Sort by: Rating</option>
              <option>Sort by: Distance</option>
              <option>Sort by: Price</option>
            </select>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <p className="mt-2 text-gray-600">Searching for providers...</p>
            </div>
          )}

          {/* Providers Grid */}
          {!loading && (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredProviders.map((provider) => (
                <ServiceProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && filteredProviders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No providers found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or location.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}