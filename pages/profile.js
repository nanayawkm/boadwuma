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
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Image
                  src={profileData.avatar}
                  alt={profileData.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
                <button className="absolute bottom-2 right-2 bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600">
                  <Edit size={16} />
                </button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                    <p className="text-gray-600 flex items-center mt-1">
                      <Mail size={16} className="mr-2" />
                      {profileData.email}
                    </p>
                    <p className="text-gray-600 flex items-center mt-1">
                      <MapPin size={16} className="mr-2" />
                      {profileData.location.address}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-outline"
                  >
                    <Edit size={16} className="mr-2" />
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
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={16} className="mr-2" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {isEditing ? (
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Profile</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profileData.location.address}
                        onChange={(e) => setProfileData({
                          ...profileData, 
                          location: {...profileData.location, address: e.target.value}
                        })}
                        className="input-field"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button onClick={handleSave} className="btn-primary">
                        Save Changes
                      </button>
                      <button 
                        onClick={() => setIsEditing(false)} 
                        className="btn-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{profileData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{profileData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{profileData.location.address}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">My Bookings</h3>
              {mockBookings.map((booking) => (
                <div key={booking.id} className="card">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{booking.service}</h4>
                      <p className="text-gray-600">with {booking.providerName}</p>
                      <p className="text-sm text-gray-500">{booking.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{booking.price}</div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        booking.status === 'upcoming' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Reviews I've Written</h3>
              {mockReviews.map((review) => (
                <div key={review.id} className="card">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.providerName}</h4>
                      <p className="text-gray-600">{review.service}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                    <span className="ml-2 text-gray-700">Email notifications for messages</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                    <span className="ml-2 text-gray-700">SMS notifications for bookings</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                    <span className="ml-2 text-gray-700">Marketing emails</span>
                  </label>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                    <span className="ml-2 text-gray-700">Show my location to service providers</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                    <span className="ml-2 text-gray-700">Allow providers to contact me</span>
                  </label>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
                <div className="space-y-3">
                  <button className="text-left text-gray-700 hover:text-gray-900">
                    Change password
                  </button>
                  <button className="text-left text-red-600 hover:text-red-700">
                    Delete account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}