import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { ArrowLeft, Search, Star, MapPin } from 'lucide-react';
import { MOCK_PROVIDERS, getProvidersNearLocation } from '../data/mockData';

export default function SearchResults() {
  const router = useRouter();
  const { q } = router.query;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProviders, setFilteredProviders] = useState([]);

  useEffect(() => {
    if (q) {
      setSearchTerm(q);
      performSearch(q);
    }
  }, [q]);

  const performSearch = (term) => {
    if (!term.trim()) {
      setFilteredProviders([]);
      return;
    }

    const lowerTerm = term.toLowerCase();
    const results = MOCK_PROVIDERS.filter(provider => 
      provider.name.toLowerCase().includes(lowerTerm) ||
      provider.category.toLowerCase().includes(lowerTerm) ||
      provider.services.some(service => service.toLowerCase().includes(lowerTerm)) ||
      provider.description.toLowerCase().includes(lowerTerm)
    );

    setFilteredProviders(results);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <Head>
        <title>{q ? `Search results for "${q}"` : 'Search'} - Boadwuma</title>
        <meta name="description" content="Search for local service providers in Ghana" />
      </Head>

      <div className="bg-gray-50 min-h-screen pb-20">
        {/* Header */}
        <div className="bg-white px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-gray-900">Search Results</h1>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a service (e.g. fix fridge, barber)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200"
              />
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="px-4 pt-6">
          {q && (
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Showing results for "<span className="font-medium text-gray-900">{q}</span>"
              </p>
              <p className="text-sm text-gray-500">
                {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''} found
              </p>
            </div>
          )}

          {filteredProviders.length === 0 && q ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">
                Try searching with different keywords or browse our categories.
              </p>
              <button
                onClick={() => router.push('/')}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Browse Categories
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProviders.map((provider) => (
                <div key={provider.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={provider.avatar}
                        alt={provider.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-sm truncate">
                            {provider.name}
                          </h3>
                          <p className="text-xs text-gray-600 truncate">
                            {provider.services.join(', ')}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star size={12} className="text-yellow-400 fill-current" />
                              <span className="text-xs font-medium">{provider.rating}</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {provider.priceRange}
                            </span>
                            <div className="flex items-center gap-1">
                              <MapPin size={10} className="text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {typeof provider.location === 'object' && provider.location?.name 
                                  ? provider.location.name 
                                  : 'Location unavailable'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-2">
                          <button
                            onClick={() => router.push(`/provider/${provider.id}`)}
                            className="bg-gray-100 text-gray-700 py-1.5 px-3 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => router.push(`/provider/${provider.id}`)}
                            className="bg-primary-600 text-white py-1.5 px-3 rounded-lg text-xs font-medium hover:bg-primary-700 transition-colors"
                          >
                            Request
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!q && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-semibold text-gray-900 mb-2">Start searching</h3>
              <p className="text-gray-600">
                Use the search bar above to find local service providers.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}