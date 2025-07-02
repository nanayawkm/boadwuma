import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useApp } from '../contexts/AppContext';
import { ArrowLeft, MapPin, Calendar, DollarSign } from 'lucide-react';

export default function PostRequest() {
  const router = useRouter();
  const { addRequest, currentUser, userLocation } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    budget: '',
    urgency: 'normal',
    contact: ''
  });

  const categories = [
    'Fridge Repair', 'Plumbing', 'Electrical', 'Barber', 'Cleaning',
    'Carpentry', 'Painting', 'Gardening', 'Tailoring', 'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new request using AppContext
    const newRequest = addRequest({
      userId: currentUser.id,
      providerId: null, // Will be assigned when provider accepts
      service: formData.title,
      message: formData.description,
      location: userLocation,
      category: formData.category,
      budget: formData.budget,
      urgency: formData.urgency
    });
    
    // Redirect to chat
    router.push(`/chat/${newRequest.id}`);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Head>
        <title>Post a Request - Boadwuma</title>
        <meta name="description" content="Post your service request and get quotes from local providers" />
      </Head>

      <div className="bg-gray-50 min-h-screen pb-20">
        {/* Header */}
        <div className="bg-white px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">✍️ Post a Request</h1>
              <p className="text-sm text-gray-600">Get quotes from local providers</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-4 pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What do you need help with?
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Fix my fridge, Need a barber, etc."
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your request
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide more details about what you need..."
                rows={4}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-1" />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your location (e.g. East Legon, Accra)"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign size={16} className="inline mr-1" />
                Budget (Optional)
              </label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g. ₵200 - ₵500"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-1" />
                When do you need this?
              </label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="urgent">Urgent (Today)</option>
                <option value="normal">Within a few days</option>
                <option value="flexible">I'm flexible</option>
              </select>
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Post Request
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 bg-blue-50 rounded-xl p-4">
            <h3 className="font-medium text-blue-900 mb-2">How it works:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Post your request for free</li>
              <li>• Local providers will send you quotes</li>
              <li>• Compare prices and choose the best option</li>
              <li>• Get the job done!</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}