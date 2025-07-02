import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function ServiceProviderCard({ provider }) {
  const { 
    id, 
    name, 
    services, 
    rating, 
    reviewCount, 
    priceRange, 
    location, 
    avatar, 
    isAvailable, 
    nextAvailable 
  } = provider;

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start space-x-3 sm:space-x-4">
        {/* Avatar */}
        <div className="relative">
          <Image
            src={avatar}
            alt={name}
            width={56}
            height={56}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white ${
            isAvailable ? 'bg-green-500' : 'bg-gray-400'
          }`}></div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                {name}
              </h3>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-xs sm:text-sm font-medium text-gray-900">
                    {rating}
                  </span>
                </div>
                <span className="ml-2 text-xs sm:text-sm text-gray-500">
                  ({reviewCount} reviews)
                </span>
              </div>
            </div>
            <div className="text-right text-xs sm:text-sm">
              <div className="font-semibold text-gray-900">{priceRange}</div>
              <div className="text-gray-500">{location.distance}</div>
            </div>
          </div>

          {/* Services */}
          <div className="mt-2 sm:mt-3">
            <div className="flex flex-wrap gap-1">
              {services.slice(0, 3).map((service, index) => (
                <span
                  key={index}
                  className="inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                >
                  {service}
                </span>
              ))}
              {services.length > 3 && (
                <span className="inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                  +{services.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center mt-2 text-xs sm:text-sm text-gray-600">
            <MapPin size={12} className="sm:w-3.5 sm:h-3.5 mr-1" />
            <span className="truncate">{location.address}</span>
          </div>

          {/* Availability */}
          <div className="flex items-center mt-2 text-xs sm:text-sm">
            <Clock size={12} className="sm:w-3.5 sm:h-3.5 mr-1" />
            <span className={isAvailable ? 'text-green-600' : 'text-gray-600'}>
              {isAvailable ? 'Available now' : `Next: ${nextAvailable}`}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 mt-3 sm:mt-4">
            <Link
              href={`/provider/${id}`}
              className="flex-1 btn-primary text-center text-xs sm:text-sm py-2"
            >
              View Profile
            </Link>
            <Link
              href={`/messages?provider=${id}`}
              className="btn-outline flex items-center justify-center px-2 sm:px-3 py-2"
            >
              <MessageCircle size={14} className="sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}