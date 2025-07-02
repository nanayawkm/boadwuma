import React from 'react';
import Link from 'next/link';
import { Star, MapPin, Phone, CheckCircle, Clock } from 'lucide-react';
import { formatDistance } from '../data/mockData';

export default function ServiceProviderCard({ provider, distance, showDistance = true }) {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-neutral-300'
        }`}
      />
    ));
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available':
        return 'text-success-600 bg-success-50 border-success-200';
      case 'busy':
        return 'text-error-600 bg-error-50 border-error-200';
      default:
        return 'text-neutral-600 bg-neutral-50 border-neutral-200';
    }
  };

  const getAvailabilityText = (availability) => {
    switch (availability) {
      case 'available':
        return 'Available';
      case 'busy':
        return 'Busy';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-200 p-6 border border-neutral-100">
      {/* Provider Header */}
      <div className="flex items-start space-x-4 mb-4">
        {/* Avatar */}
        <div className="relative">
          <img
            src={provider.avatar}
            alt={provider.name}
            className="w-16 h-16 rounded-full object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=2B4C7E&color=fff`;
            }}
          />
          {provider.verified && (
            <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-success-600 bg-white rounded-full" />
          )}
        </div>

        {/* Provider Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-text-900 mb-1">
                {provider.name}
              </h3>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center">
                  {renderStars(provider.rating)}
                  <span className="ml-2 text-sm text-neutral-600">
                    {provider.rating} ({provider.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Availability Badge */}
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getAvailabilityColor(provider.availability)}`}>
              {getAvailabilityText(provider.availability)}
            </span>
          </div>

          {/* Location & Distance */}
          <div className="flex items-center text-sm text-neutral-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{provider.location.name}</span>
            {showDistance && distance && (
              <span className="ml-2 text-accent-600 font-medium">
                • {formatDistance(distance)}
              </span>
            )}
          </div>

          {/* Experience */}
          <div className="flex items-center text-sm text-neutral-600 mb-3">
            <Clock className="w-4 h-4 mr-1" />
            <span>{provider.experience} experience • {provider.completedJobs} jobs completed</span>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mb-4">
        <p className="text-sm text-neutral-600 mb-2">Services:</p>
        <div className="flex flex-wrap gap-2">
          {provider.services.slice(0, 3).map((service, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-neutral-100 text-neutral-700 rounded-md"
            >
              {service}
            </span>
          ))}
          {provider.services.length > 3 && (
            <span className="px-2 py-1 text-xs bg-neutral-100 text-neutral-700 rounded-md">
              +{provider.services.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <p className="text-sm font-medium text-text-900">
          Price Range: <span className="text-accent-600">{provider.priceRange}</span>
        </p>
        <p className="text-xs text-neutral-500 mt-1">
          Final price depends on issue. Please chat to confirm.
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-600 mb-6">
        {provider.description}
      </p>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Link
          href={`/provider/${provider.id}`}
          className="flex-1 bg-accent-500 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-accent-600 transition-colors duration-200"
        >
          Request Service
        </Link>
        <a
          href={`tel:${provider.phone}`}
          className="px-4 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}