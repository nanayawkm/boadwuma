import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { User, MapPin, Phone, Mail, Edit, Star, Calendar, Settings } from 'lucide-react';
import { currentUser } from '../data/mockData';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(currentUser);

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'bookings', name: 'Bookings', icon: Calendar },
    { id: 'reviews', name: 'My Reviews', icon: Star },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const handleSave = () => {
    // Save profile changes
    setIsEditing(false);
  };

  const mockBookings = [
    {
      id: '1',
      providerName: 'John Smith',
      service: 'Plumbing Repair',
      date: '2023-12-05',
      status: 'upcoming',
      price: '$75'
    },
    {
      id: '2',
      providerName: 'Sarah Johnson',
      service: 'Haircut & Styling',
      date: '2023-11-28',
      status: 'completed',
      price: '$45'
    }
  ];

  const mockReviews = [
    {
      id: '1',
      providerName: 'John Smith',
      service: 'Emergency Plumbing',
      rating: 5,
      comment: 'Excellent service! Very professional and quick.',
      date: '2023-11-28'
    }
  ];

  return (
    <>
      <Head>
        <title>Profile - Boadwuma</title>
      </Head>

      <div className="pb-20 lg:pb-4">
        {/* Profile Header */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col md:flex-row md:items-center space-y-3 sm:space-y-4 md:space-y-0 md:space-x-4 lg:space-x-6">
              <div className="relative">
                <Image
                  src={profileData.avatar}
                  alt={profileData.name}
                  width={100}
                  height={100}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover"
                />
                <button className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-primary-500 text-white p-1.5 sm:p-2 rounded-full hover:bg-primary-600 touch-target">
                  <Edit size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                  <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{profileData.name}</h1>
                    <p className="text-sm sm:text-base text-gray-600 flex items-center mt-1">
                      <Mail size={14} className="sm:w-4 sm:h-4 mr-2" />
                      {profileData.email}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 flex items-center mt-1">
                      <MapPin size={14} className="sm:w-4 sm:h-4 mr-2" />
                      {profileData.location.address}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-outline w-full sm:w-auto flex items-center justify-center py-2 px-3 sm:px-4 text-sm sm:text-base"
                  >
                    <Edit size={14} className="sm:w-4 sm:h-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-3 sm:py-4 px-2 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap touch-target ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={14} className="sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
          {activeTab === 'profile' && (
            <div className="space-y-4 sm:space-y-6">
              {isEditing ? (
                <div className="card">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Edit Profile</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="input-field text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="input-field text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profileData.location.address}
                        onChange={(e) => setProfileData({
                          ...profileData, 
                          location: {...profileData.location, address: e.target.value}
                        })}
                        className="input-field text-sm sm:text-base"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <button onClick={handleSave} className="btn-primary text-sm sm:text-base">
                        Save Changes
                      </button>
                      <button 
                        onClick={() => setIsEditing(false)} 
                        className="btn-outline text-sm sm:text-base"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Profile Information</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="text-xs sm:text-sm text-gray-600">Name:</span>
                      <span className="font-medium text-sm sm:text-base">{profileData.name}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="text-xs sm:text-sm text-gray-600">Email:</span>
                      <span className="font-medium text-sm sm:text-base">{profileData.email}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="text-xs sm:text-sm text-gray-600">Location:</span>
                      <span className="font-medium text-sm sm:text-base">{profileData.location.address}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Bookings</h3>
              <div className="space-y-3 sm:space-y-4">
                {mockBookings.map((booking) => (
                  <div key={booking.id} className="card">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{booking.providerName}</h4>
                        <p className="text-sm text-gray-600">{booking.service}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{booking.date}</p>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end space-x-4">
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">{booking.price}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'upcoming' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">My Reviews</h3>
              <div className="space-y-3 sm:space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="card">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{review.providerName}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`sm:w-4 sm:h-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.service}</p>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Settings</h3>
              <div className="card">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm sm:text-base mb-2 sm:mb-3">Notifications</h4>
                    <div className="space-y-2 sm:space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm sm:text-base">Email notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm sm:text-base">Push notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm sm:text-base">SMS notifications</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm sm:text-base mb-2 sm:mb-3">Privacy</h4>
                    <div className="space-y-2 sm:space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm sm:text-base">Show my profile to providers</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm sm:text-base">Allow location sharing</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}