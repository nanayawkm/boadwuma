import { useState } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '../../contexts/AppContext';
import { 
  User, 
  Settings, 
  LogOut, 
  Edit, 
  Camera, 
  Plus,
  Star,
  MapPin,
  Phone,
  Mail,
  Award,
  TrendingUp,
  Users,
  Calendar,
  Save,
  X
} from 'lucide-react';

export default function ProfileTab() {
  const router = useRouter();
  const { currentUser, userRole, logout, updateUserProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    location: currentUser?.location || '',
    bio: currentUser?.bio || ''
  });
  const [portfolioImages, setPortfolioImages] = useState([
    '/api/placeholder/300/300/1',
    '/api/placeholder/300/300/2',
    '/api/placeholder/300/300/3',
    '/api/placeholder/300/300/4',
    '/api/placeholder/300/300/5',
    '/api/placeholder/300/300/6'
  ]);

  const stats = [
    {
      icon: TrendingUp,
      label: 'Total Earnings',
      value: '₵12,450',
      color: 'text-primary-600'
    },
    {
      icon: Users,
      label: 'Customers Served',
      value: '48',
      color: 'text-accent-600'
    },
    {
      icon: Star,
      label: 'Average Rating',
      value: '4.8',
      color: 'text-success-600'
    }
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateUserProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      location: currentUser?.location || '',
      bio: currentUser?.bio || ''
    });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddPortfolioImage = () => {
    // Mock function - in real app, this would open file picker
    const newImage = `/api/placeholder/300/300/${portfolioImages.length + 1}`;
    setPortfolioImages(prev => [...prev, newImage]);
  };

  const handleRemovePortfolioImage = (index) => {
    setPortfolioImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-2xl">
                  {currentUser?.name?.charAt(0) || 'U'}
                </span>
              </div>
              {isEditing && (
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                  <Camera size={16} />
                </button>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input text-2xl font-bold p-0 border-0 bg-transparent focus:ring-0"
                  />
                ) : (
                  currentUser?.name || 'User Name'
                )}
              </h1>
              <p className="text-gray-600">
                {userRole === 'customer' ? 'Customer' : 'Service Provider'}
              </p>
              {userRole === 'provider' && (
                <div className="flex items-center space-x-1 mt-1">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">4.8 (24 reviews)</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="btn-primary flex items-center"
                >
                  <Save size={16} className="mr-1" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="btn-secondary flex items-center"
                >
                  <X size={16} className="mr-1" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="btn-secondary flex items-center"
              >
                <Edit size={16} className="mr-1" />
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail size={16} className="text-gray-400" />
            <span className="text-gray-600">
              {isEditing ? (
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="input text-gray-600 p-0 border-0 bg-transparent focus:ring-0"
                />
              ) : (
                currentUser?.email || 'user@example.com'
              )}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone size={16} className="text-gray-400" />
            <span className="text-gray-600">
              {isEditing ? (
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="input text-gray-600 p-0 border-0 bg-transparent focus:ring-0"
                />
              ) : (
                currentUser?.phone || '+233 20 123 4567'
              )}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin size={16} className="text-gray-400" />
            <span className="text-gray-600">
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="input text-gray-600 p-0 border-0 bg-transparent focus:ring-0"
                />
              ) : (
                typeof currentUser?.location === 'object' && currentUser?.location?.name
                  ? currentUser.location.name
                  : currentUser?.location || 'Accra, Ghana'
              )}
            </span>
          </div>
        </div>

        {/* Bio */}
        {userRole === 'provider' && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            {isEditing ? (
              <textarea
                value={editForm.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
                className="input resize-none"
                placeholder="Tell customers about your experience and expertise..."
              />
            ) : (
              <p className="text-gray-600">
                {currentUser?.bio || 'Experienced service provider with 5+ years of expertise in various home services. Committed to delivering quality work and excellent customer satisfaction.'}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Stats */}
      {userRole === 'provider' && (
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card p-4 text-center">
                <Icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Portfolio (Providers Only) */}
      {userRole === 'provider' && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Portfolio</h2>
            {isEditing && (
              <button
                onClick={handleAddPortfolioImage}
                className="fab"
              >
                <Plus size={24} />
              </button>
            )}
          </div>
          
          <div className="portfolio-grid">
            {portfolioImages.map((image, index) => (
              <div key={index} className="portfolio-item relative group">
                <img
                  src={image}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-full h-full bg-gray-200 flex items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <span className="text-gray-400 text-sm">Image {index + 1}</span>
                </div>
                {isEditing && (
                  <button
                    onClick={() => handleRemovePortfolioImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {portfolioImages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No portfolio images</h3>
              <p className="text-gray-600 text-sm mb-4">Add photos of your work to showcase your expertise</p>
              {isEditing && (
                <button
                  onClick={handleAddPortfolioImage}
                  className="btn-primary"
                >
                  <Plus size={16} className="mr-2" />
                  Add Images
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Settings */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-xl transition-colors">
            <div className="flex items-center space-x-3">
              <Settings size={20} className="text-gray-400" />
              <span className="text-gray-900">Account Settings</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-xl transition-colors">
            <div className="flex items-center space-x-3">
              <Award size={20} className="text-gray-400" />
              <span className="text-gray-900">Privacy & Security</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-xl transition-colors">
            <div className="flex items-center space-x-3">
              <Calendar size={20} className="text-gray-400" />
              <span className="text-gray-900">Notifications</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="card p-6">
        <button
          onClick={handleLogout}
          className="w-full btn-danger flex items-center justify-center"
        >
          <LogOut size={16} className="mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
} 