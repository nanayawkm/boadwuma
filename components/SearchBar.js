import { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { serviceCategories } from '../data/mockData';

export default function SearchBar({ onSearch, onLocationChange, onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim() && !location.trim() && !selectedCategory) {
      return; // Don't submit if all fields are empty
    }
    onSearch && onSearch({ searchTerm, location, category: selectedCategory });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      setIsLoadingLocation(true);
      setLocationError('');
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation('Current Location');
          onLocationChange && onLocationChange({ lat: latitude, lng: longitude });
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to get your location. Please enter it manually.');
          setIsLoadingLocation(false);
        },
        {
          timeout: 10000,
          enableHighAccuracy: true
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    if (locationError) {
      setLocationError('');
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilterChange && onFilterChange(e.target.value);
  };

  return (
    <div className="bg-white rounded-xl shadow-card border border-neutral-100 p-4 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
          <input
            type="text"
            placeholder="What service do you need?"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
            aria-label="Search for services"
          />
        </div>

        {/* Location Input */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={handleLocationChange}
            className="w-full pl-10 pr-12 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
            aria-label="Enter your location"
            aria-describedby={locationError ? 'location-error' : undefined}
          />
          <button
            type="button"
            onClick={handleLocationClick}
            disabled={isLoadingLocation}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Use current location"
          >
            {isLoadingLocation ? (
              <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <MapPin size={16} />
            )}
          </button>
        </div>
        
        {locationError && (
          <p id="location-error" className="text-sm text-error-600">{locationError}</p>
        )}

        {/* Mobile Layout */}
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-neutral-200 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
            aria-expanded={showFilters}
            aria-controls="filters-section"
          >
            <Filter size={16} className="mr-2" />
            Filters
          </button>
          <button
            type="submit"
            className="flex-1 btn-primary"
            disabled={!searchTerm.trim() && !location.trim() && !selectedCategory}
          >
            Search
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div id="filters-section" className="border-t border-neutral-200 pt-4">
            <label htmlFor="category-select" className="block text-sm font-medium text-neutral-700 mb-2">
              Service Category
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full border border-neutral-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
            >
              <option value="">All Categories</option>
              {serviceCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </form>
    </div>
  );
}