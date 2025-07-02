import { useState } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '../../contexts/AppContext';
import { Edit, Camera, Star, MapPin, Phone, Mail, Settings, LogOut, Plus, Trash2 } from 'lucide-react';

export default function ProfileTab() {
  const { userRole, currentUser, logout } = useApp();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || 'John Doe',
    email: currentUser?.email || 'john@example.com',
    phone: currentUser?.phone || '+233 20 123 4567',
    location: 'Accra, Ghana',
    bio: userRole === 'provider' ? 'Professional plumber with 5+ years experience' : 'Homeowner looking for reliable services'
  });

  // Mock portfolio data for providers
  const portfolioItems = [
    {
      id: 1,
      image: 'https://source.unsplash.com/random/300x300?plumbing',
      title: 'Kitchen Sink Installation',
      description: 'Modern kitchen sink with new faucet',
      date: '2024-01-10'
    },
    {
      id: 2,
      image: 'https://source.unsplash.com/random/300x300?bathroom',
      title: 'Bathroom Renovation',
      description: 'Complete bathroom plumbing overhaul',
      date: '2024-01-05'
    },
    {
      id: 3,
      image: 'https://source.unsplash.com/random/300x300?pipe',
      title: 'Pipe Repair',
      description: 'Emergency pipe burst repair',
      date: '2024-01-01'
    }
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Mock save - in real app would update user data
    console.log('Profile saved:', profileData);
  };

  const handleImageUpload = () => {
    // Mock image upload - in real app would handle file upload
    console.log('Image upload triggered');
  };

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-2xl">
                  {profileData.name.charAt(0)}
                </span>
              </div>
              <button
                onClick={handleImageUpload}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Camera size={16} className="text-white" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{profileData.name}</h2>
              <p className="text-gray-600 text-sm">{userRole === 'provider' ? 'Service Provider' : 'Customer'}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">4.8 (24 reviews)</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit size={20} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail size={16} className="text-gray-400" />
            <span className="text-gray-700">{profileData.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone size={16} className="text-gray-400" />
            <span className="text-gray-700">{profileData.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin size={16} className="text-gray-400" />
            <span className="text-gray-700">
              {(() => {
                console.log('Rendering location:', profileData.location);
                if (!profileData.location) return 'No location set';
                if (typeof profileData.location === 'string') return profileData.location;
                if (Array.isArray(profileData.location)) return profileData.location.join(', ');
                if (typeof profileData.location === 'object') {
                  if ('name' in profileData.location && typeof profileData.location.name === 'string') {
                    return profileData.location.name;
                  }
                  // fallback: stringify safely
                  try {
                    return JSON.stringify(profileData.location);
                  } catch {
                    return 'Invalid location';
                  }
                }
                return String(profileData.location);
              })()}
            </span>
          </div>
        </div>

        {/* Edit Mode */}
        {isEditing && (
          <div className="mt-4 space-y-3">
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Full Name"
            />
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Email"
            />
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Phone"
            />
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Bio"
              rows={3}
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSaveProfile}
                className="flex-1 bg-primary-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Provider-specific sections */}
      {userRole === 'provider' && (
        <>
          {/* Services & Pricing */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Services & Pricing</h3>
              <button className="text-primary-600 text-sm font-medium">Edit</button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Plumbing</span>
                <span className="text-primary-600 font-semibold">₵150 - ₵500</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Pipe Repair</span>
                <span className="text-primary-600 font-semibold">₵100 - ₵300</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Installation</span>
                <span className="text-primary-600 font-semibold">₵200 - ₵800</span>
              </div>
            </div>
          </div>

          {/* Portfolio Gallery */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Portfolio</h3>
              <button className="text-primary-600 text-sm font-medium">Add Photo</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {portfolioItems.map((item) => (
                <div key={item.id} className="relative group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                    <button className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-gray-600 text-xs">{item.description}</p>
                  </div>
                </div>
              ))}
              <button
                onClick={handleImageUpload}
                className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-primary-500 hover:bg-primary-50 transition-colors"
              >
                <Plus size={24} className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Add Photo</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Customer-specific sections */}
      {userRole === 'customer' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 text-sm font-medium">P</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Plumbing request completed</p>
                <p className="text-xs text-gray-600">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm font-medium">E</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Electrical service scheduled</p>
                <p className="text-xs text-gray-600">1 week ago</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings & Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings size={20} className="text-gray-400" />
            <span className="text-gray-700">Account Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <MapPin size={20} className="text-gray-400" />
            <span className="text-gray-700">Location Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <Phone size={20} className="text-gray-400" />
            <span className="text-gray-700">Notification Preferences</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 hover:bg-red-50 rounded-lg transition-colors text-red-600"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
} 