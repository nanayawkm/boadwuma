import { useState } from 'react';
import Head from 'next/head';
import { Search } from 'lucide-react';
import CategoryGrid from '../components/CategoryGrid';
import TopRatedProviders from '../components/TopRatedProviders';
import { serviceProviders } from '../data/mockData';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategorySelect = (categoryId) => {
    // Navigate to category results page or filter results
    console.log('Selected category:', categoryId);
    // For now, just log - in a real app you'd navigate or filter
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log('Searching for:', searchTerm);
      // Handle search functionality
    }
  };

  return (
    <>
      <Head>
        <title>Boadwuma - Find Local Service Providers</title>
        <meta name="description" content="Find trusted local service providers - from fridge repair to plumbing, barbers to electricians. Book instantly!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-gray-50 min-h-screen pb-20 lg:pb-4">
        {/* Header with Search */}
        <div className="bg-white px-4 pt-4 sm:pt-6 pb-4 border-b border-gray-100">
          <div className="mb-3 sm:mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              Good morning! 👋
            </h1>
            <p className="text-sm sm:text-base text-gray-600">What service do you need today?</p>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Search size={18} className="sm:w-5 sm:h-5 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Find a service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-gray-100 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 text-sm sm:text-base"
              />
            </div>
          </form>
        </div>

        {/* Category Grid */}
        <div className="pt-4 sm:pt-6">
          <CategoryGrid onCategorySelect={handleCategorySelect} />
        </div>

        {/* Top Rated Providers */}
        <TopRatedProviders providers={serviceProviders} />

        {/* Quick Actions */}
        <div className="px-4 mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white">
            <h3 className="text-base sm:text-lg font-bold mb-2">Need help right now?</h3>
            <p className="text-blue-100 mb-3 sm:mb-4 text-xs sm:text-sm">
              Connect with available providers instantly
            </p>
            <button className="bg-white text-blue-600 font-semibold py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm hover:bg-blue-50 transition-colors">
              Find Available Now
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="px-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Your Recent Activity</h2>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-center py-6 sm:py-8">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🔍</div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Start exploring services</h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                Browse categories above to find the perfect service provider
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}