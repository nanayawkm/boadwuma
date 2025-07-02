import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Phone, 
  Calendar,
  ChevronLeft,
  CheckCircle,
  Camera
} from 'lucide-react';
import { serviceProviders, reviews } from '../../data/mockData';

export default function ProviderProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState('about');

  const provider = serviceProviders.find(p => p.id === id);
  const providerReviews = reviews.filter(r => r.providerId === id);

  if (!provider) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Provider not found</h2>
          <Link href="/" className="text-primary-600 hover:text-primary-700">
            Return to search
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', name: 'About' },
    { id: 'services', name: 'Services' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'reviews', name: `Reviews (${providerReviews.length})` },
  ];

  return (
    <>
      <Head>
        <title>{provider.name} - {provider.category} | Boadwuma</title>
        <meta name="description" content={provider.description} />
      </Head>

      <div className="pb-20 lg:pb-4">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base"
            >
              <ChevronLeft size={18} className="sm:w-5 sm:h-5 mr-1" />
              Back
            </button>

            <div className="flex flex-col md:flex-row md:items-start space-y-3 sm:space-y-4 md:space-y-0 md:space-x-4 lg:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <Image
                  src={provider.avatar}
                  alt={provider.name}
                  width={100}
                  height={100}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 sm:border-3 md:border-4 border-white ${
                  provider.isAvailable ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{provider.name}</h1>
                    <p className="text-base sm:text-lg text-gray-600 capitalize mb-2">{provider.category}</p>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm sm:text-base font-semibold text-gray-900">{provider.rating}</span>
                      </div>
                      <span className="ml-2 text-sm sm:text-base text-gray-600">({provider.reviewCount} reviews)</span>
                    </div>

                    <div className="flex items-center text-gray-600 mb-2 text-sm sm:text-base">
                      <MapPin size={14} className="sm:w-4 sm:h-4 mr-2" />
                      <span>{provider.location.address}</span>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm sm:text-base">
                      <Clock size={14} className="sm:w-4 sm:h-4 mr-2" />
                      <span className={provider.isAvailable ? 'text-green-600' : 'text-gray-600'}>
                        {provider.isAvailable ? 'Available now' : `Next: ${provider.nextAvailable}`}
                      </span>
                    </div>
                  </div>

                  <div className="text-right mt-3 sm:mt-4 md:mt-0">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{provider.priceRange}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{provider.location.distance}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white border-b px-4 py-3 sm:py-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Link
              href={`/messages?provider=${provider.id}`}
              className="flex-1 btn-primary flex items-center justify-center py-2.5 sm:py-3 text-sm sm:text-base"
            >
              <MessageCircle size={16} className="sm:w-4 sm:h-4 mr-2" />
              Message
            </Link>
            <button className="btn-outline flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base">
              <Phone size={16} className="sm:w-4 sm:h-4 mr-2" />
              Call
            </button>
            <button className="btn-outline flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base">
              <Calendar size={16} className="sm:w-4 sm:h-4 mr-2" />
              Book
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 sm:py-4 px-2 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap touch-target ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
          {activeTab === 'about' && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">About</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{provider.description}</p>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Services Offered</h3>
              <div className="grid gap-2 sm:gap-3">
                {provider.services.map((service, index) => (
                  <div key={index} className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <CheckCircle size={18} className="sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3" />
                    <span className="font-medium text-gray-900 text-sm sm:text-base">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Portfolio</h3>
              {provider.portfolio && provider.portfolio.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {provider.portfolio.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={image}
                        alt={`Portfolio ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <Camera size={48} className="mx-auto text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No portfolio yet</h4>
                  <p className="text-gray-500 text-sm sm:text-base">
                    This provider hasn't uploaded any portfolio images yet.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Reviews</h3>
              {providerReviews.length > 0 ? (
                <div className="space-y-4 sm:space-y-6">
                  {providerReviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-lg p-4 sm:p-6 border border-gray-100">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <Image
                          src={review.userAvatar}
                          alt={review.userName}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{review.userName}</h4>
                            <div className="flex items-center">
                              <Star size={14} className="sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm sm:text-base font-medium">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{review.comment}</p>
                          <p className="text-gray-500 text-xs sm:text-sm mt-2">{review.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <Star size={48} className="mx-auto text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h4>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Be the first to review this provider.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}