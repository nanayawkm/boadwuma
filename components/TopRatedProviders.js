import { Star, MapPin, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function TopRatedProviders({ providers }) {
  const topRatedProviders = providers
    .filter(provider => provider.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-xl font-bold text-gray-900">Top Rated Near You</h2>
        <button className="flex items-center text-blue-600 font-medium text-sm">
          View all
          <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 px-4 scrollbar-hide">
        {topRatedProviders.map((provider) => (
          <button
            key={provider.id}
            className="flex-shrink-0 bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 w-64 sm:w-72 md:w-80 hover:shadow-md transition-all duration-200 active:scale-95"
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-blue-100">
                <Image
                  src={provider.avatar}
                  alt={provider.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                  {provider.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 truncate mb-1 sm:mb-2">
                  {provider.services[0]}
                </p>
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="sm:w-3.5 sm:h-3.5 text-yellow-400 fill-current" />
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      {provider.rating}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500">
                      ({provider.reviewCount})
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <MapPin size={10} className="sm:w-3 sm:h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {provider.location.distance}
                    </span>
                  </div>
                  <span className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                    provider.isAvailable 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {provider.isAvailable ? '• Available' : '• Busy'}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}