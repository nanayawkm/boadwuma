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
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Provider not found</h2>
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
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ChevronLeft size={20} className="mr-1" />
              Back
            </button>

            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <Image
                  src={provider.avatar}
                  alt={provider.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
                <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white ${
                  provider.isAvailable ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{provider.name}</h1>
                    <p className="text-lg text-gray-600 capitalize mb-2">{provider.category}</p>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold text-gray-900">{provider.rating}</span>
                      </div>
                      <span className="ml-2 text-gray-600">({provider.reviewCount} reviews)</span>
                    </div>

                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin size={16} className="mr-2" />
                      <span>{provider.location.address}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Clock size={16} className="mr-2" />
                      <span className={provider.isAvailable ? 'text-green-600' : 'text-gray-600'}>
                        {provider.isAvailable ? 'Available now' : `Next: ${provider.nextAvailable}`}
                      </span>
                    </div>
                  </div>

                  <div className="text-right mt-4 md:mt-0">
                    <div className="text-xl font-bold text-gray-900 mb-2">{provider.priceRange}</div>
                    <div className="text-sm text-gray-600">{provider.location.distance}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white border-b px-4 py-4">
          <div className="max-w-6xl mx-auto flex space-x-3">
            <Link
              href={`/messages?provider=${provider.id}`}
              className="flex-1 btn-primary flex items-center justify-center"
            >
              <MessageCircle size={18} className="mr-2" />
              Message
            </Link>
            <button className="btn-outline flex items-center justify-center px-6">
              <Phone size={18} className="mr-2" />
              Call
            </button>
            <button className="btn-outline flex items-center justify-center px-6">
              <Calendar size={18} className="mr-2" />
              Book
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
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
        <div className="max-w-6xl mx-auto px-4 py-6">
          {activeTab === 'about' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
              <p className="text-gray-700 leading-relaxed">{provider.description}</p>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h3>
              <div className="grid gap-3">
                {provider.services.map((service, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle size={20} className="text-green-500 mr-3" />
                    <span className="font-medium text-gray-900">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio</h3>
              {provider.portfolio && provider.portfolio.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                <div className="text-center py-8">
                  <Camera size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No portfolio images available</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Reviews ({providerReviews.length})
              </h3>
              <div className="space-y-6">
                {providerReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={review.userAvatar}
                        alt={review.userName}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{review.userName}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={`${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}