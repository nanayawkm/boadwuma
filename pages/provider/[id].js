import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useApp } from '../../contexts/AppContext';
import { 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle, 
  Clock,
  Award,
  Users,
  ArrowLeft,
  Send
} from 'lucide-react';
import { MOCK_PROVIDERS, formatDistance, calculateDistance } from '../../data/mockData';

export default function ProviderProfile() {
  const router = useRouter();
  const { id } = router.query;
  const { userLocation, addRequest, currentUser, isCustomer } = useApp();
  const [provider, setProvider] = useState(null);
  const [distance, setDistance] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const foundProvider = MOCK_PROVIDERS.find(p => p.id === id);
      if (foundProvider) {
        setProvider(foundProvider);
        const dist = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          foundProvider.location.lat,
          foundProvider.location.lng
        );
        setDistance(dist);
      }
    }
  }, [id, userLocation]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-neutral-300'
        }`}
      />
    ));
  };

  const handleSendRequest = async (e) => {
    e.preventDefault();
    if (!requestMessage.trim() || !selectedService) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newRequest = addRequest({
        userId: currentUser.id,
        providerId: provider.id,
        service: selectedService,
        message: requestMessage.trim(),
        location: userLocation
      });

      setLoading(false);
      setShowRequestForm(false);
      setRequestMessage('');
      setSelectedService('');
      
      // Redirect to chat
      router.push(`/chat/${newRequest.id}`);
    }, 1000);
  };

  if (!provider) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading provider...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{provider.name} - {provider.category} | Boadwuma</title>
        <meta name="description" content={`${provider.description} - ${provider.experience} experience`} />
      </Head>

      <div className="min-h-screen bg-background-50">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Provider Info Card */}
          <div className="bg-white rounded-xl shadow-card border border-neutral-100 p-6 mb-6">
            <div className="flex items-start space-x-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="w-24 h-24 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=2B4C7E&color=fff`;
                  }}
                />
                {provider.verified && (
                  <CheckCircle className="absolute -bottom-1 -right-1 w-7 h-7 text-success-600 bg-white rounded-full" />
                )}
              </div>

              {/* Provider Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-text-900 mb-2 font-display">
                      {provider.name}
                    </h1>
                    <div className="flex items-center mb-2">
                      {renderStars(provider.rating)}
                      <span className="ml-2 text-lg font-medium text-text-900">
                        {provider.rating}
                      </span>
                      <span className="ml-2 text-neutral-600">
                        ({provider.reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Availability Badge */}
                  <span className={`px-3 py-1 text-sm font-medium rounded-full border ${
                    provider.availability === 'available'
                      ? 'bg-success-50 text-success-700 border-success-200'
                      : 'bg-error-50 text-error-700 border-error-200'
                  }`}>
                    {provider.availability === 'available' ? 'Available' : 'Busy'}
                  </span>
                </div>

                {/* Location & Distance */}
                <div className="flex items-center text-neutral-600 mb-3">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{provider.location.name}</span>
                  {distance && (
                    <span className="ml-2 text-accent-600 font-medium">
                      • {formatDistance(distance)}
                    </span>
                  )}
                </div>

                {/* Experience & Jobs */}
                <div className="flex items-center space-x-6 text-sm text-neutral-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{provider.experience} experience</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    <span>{provider.completedJobs} jobs completed</span>
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-4">
                  <p className="text-lg font-semibold text-text-900">
                    Price Range: <span className="text-accent-600">{provider.priceRange}</span>
                  </p>
                  <p className="text-sm text-neutral-500">
                    Final price depends on the specific issue. Chat to discuss details.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowRequestForm(true)}
                    disabled={!isCustomer}
                    className="flex-1 bg-accent-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Request Service
                  </button>
                  <a
                    href={`tel:${provider.phone}`}
                    className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-card border border-neutral-100 p-6 mb-6">
            <h2 className="text-lg font-semibold text-text-900 mb-3 font-display">About</h2>
            <p className="text-neutral-700 leading-relaxed">{provider.description}</p>
          </div>

          {/* Services */}
          <div className="bg-white rounded-xl shadow-card border border-neutral-100 p-6 mb-6">
            <h2 className="text-lg font-semibold text-text-900 mb-4 font-display">Services Offered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {provider.services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-neutral-50 rounded-lg border border-neutral-200"
                >
                  <CheckCircle className="w-4 h-4 text-success-600 mr-3" />
                  <span className="text-neutral-900 font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mock Reviews */}
          <div className="bg-white rounded-xl shadow-card border border-neutral-100 p-6">
            <h2 className="text-lg font-semibold text-text-900 mb-4 font-display">Recent Reviews</h2>
            <div className="space-y-4">
              {/* Mock review 1 */}
              <div className="border-b border-neutral-200 pb-4">
                <div className="flex items-start space-x-3">
                  <img
                    src="https://i.pravatar.cc/40?img=10"
                    alt="Reviewer"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <span className="font-medium text-text-900 mr-2">Sarah K.</span>
                      <div className="flex">
                        {renderStars(5)}
                      </div>
                    </div>
                    <p className="text-neutral-700 text-sm">
                      "Excellent service! {provider.name} was professional, punctual, and did a great job. Highly recommend!"
                    </p>
                    <span className="text-xs text-neutral-500">2 days ago</span>
                  </div>
                </div>
              </div>

              {/* Mock review 2 */}
              <div className="border-b border-neutral-200 pb-4">
                <div className="flex items-start space-x-3">
                  <img
                    src="https://i.pravatar.cc/40?img=11"
                    alt="Reviewer"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <span className="font-medium text-text-900 mr-2">John M.</span>
                      <div className="flex">
                        {renderStars(4)}
                      </div>
                    </div>
                    <p className="text-neutral-700 text-sm">
                      "Good work and fair pricing. Communication was clear throughout the process."
                    </p>
                    <span className="text-xs text-neutral-500">1 week ago</span>
                  </div>
                </div>
              </div>

              <Link
                href="#"
                className="text-accent-600 hover:text-accent-700 font-medium text-sm"
              >
                View all reviews →
              </Link>
            </div>
          </div>
        </div>

        {/* Request Service Modal */}
        {showRequestForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-900 mb-4 font-display">
                  Request Service from {provider.name}
                </h3>

                <form onSubmit={handleSendRequest}>
                  {/* Service Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-text-900 mb-2">
                      Select Service *
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                      required
                    >
                      <option value="">Choose a service...</option>
                      {provider.services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-text-900 mb-2">
                      Describe your issue *
                    </label>
                    <textarea
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                      placeholder="Please describe what help you need. Be specific about the problem to get a better estimate."
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 h-24 resize-none"
                      required
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowRequestForm(false)}
                      className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !requestMessage.trim() || !selectedService}
                      className="flex-1 bg-accent-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Request
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}