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
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

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

    setIsSearching(true);
    setSearchError('');

    // Simulate search delay for better UX
    setTimeout(() => {
      try {
        const lowerTerm = term.toLowerCase();
        const results = MOCK_PROVIDERS.filter(provider => 
          provider.name.toLowerCase().includes(lowerTerm) ||
          provider.category.toLowerCase().includes(lowerTerm) ||
          provider.services.some(service => service.toLowerCase().includes(lowerTerm)) ||
          provider.description.toLowerCase().includes(lowerTerm)
        );

        setFilteredProviders(results);
      } catch (error) {
        console.error('Search error:', error);
        setSearchError('An error occurred while searching. Please try again.');
      } finally {
        setIsSearching(false);
      }
    }, 300);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (searchError) {
      setSearchError('');
    }
  };

  return (
    <>
      <Head>
        <title>{q ? `Search results for "${q}"` : 'Search'} - Boadwuma</title>
        <meta name="description" content="Search for local service providers in Ghana" />
      </Head>

      <div className="bg-background-50 min-h-screen pb-20">
        {/* Header */}
        <div className="bg-white px-4 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-3 mb-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-text-900">Search Results</h1>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search for a service (e.g. fix fridge, barber)"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 bg-neutral-100 border-0 rounded-xl text-text-900 placeholder-neutral-500 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200"
                aria-label="Search for services"
                disabled={isSearching}
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="px-4 pt-6">
          {q && (
            <div className="mb-4">
              <p className="text-sm text-neutral-600">
                Showing results for "<span className="font-medium text-text-900">{q}</span>"
              </p>
              <p className="text-sm text-neutral-500">
                {isSearching ? 'Searching...' : `${filteredProviders.length} provider${filteredProviders.length !== 1 ? 's' : ''} found`}
              </p>
            </div>
          )}

          {searchError && (
            <div className="bg-error-50 border border-error-200 rounded-xl p-3 mb-4" role="alert">
              <p className="text-error-700 text-sm">{searchError}</p>
            </div>
          )}

          {!isSearching && filteredProviders.length === 0 && q ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-semibold text-text-900 mb-2">No results found</h3>
              <p className="text-neutral-600 mb-4">
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
                <div key={provider.id} className="bg-white rounded-2xl p-4 shadow-card border border-neutral-100 hover:shadow-card-hover transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={provider.avatar}
                        alt={provider.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=2B4C7E&color=fff`;
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-text-900 text-sm truncate">
                            {provider.name}
                          </h3>
                          <p className="text-xs text-neutral-600 truncate">
                            {provider.services.join(', ')}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star size={12} className="text-yellow-400 fill-current" />
                              <span className="text-xs font-medium">{provider.rating}</span>
                            </div>
                            <span className="text-xs text-neutral-500">
                              {provider.priceRange}
                            </span>
                            <div className="flex items-center gap-1">
                              <MapPin size={10} className="text-neutral-400" />
                              <span className="text-xs text-neutral-500">
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
                            className="bg-neutral-100 text-neutral-700 py-1.5 px-3 rounded-lg text-xs font-medium hover:bg-neutral-200 transition-colors"
                            aria-label={`View ${provider.name}'s profile`}
                          >
                            View
                          </button>
                          <button
                            onClick={() => router.push(`/provider/${provider.id}`)}
                            className="bg-primary-600 text-white py-1.5 px-3 rounded-lg text-xs font-medium hover:bg-primary-700 transition-colors"
                            aria-label={`Request service from ${provider.name}`}
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
              <h3 className="font-semibold text-text-900 mb-2">Start searching</h3>
              <p className="text-neutral-600">
                Use the search bar above to find local service providers.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}