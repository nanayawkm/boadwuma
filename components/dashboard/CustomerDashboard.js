import { useState } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '../../contexts/AppContext';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Plus,
  ArrowRight,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';
import ServiceCategoryGrid from '../ServiceCategoryGrid';
import TopRatedProviders from '../TopRatedProviders';

export default function CustomerDashboard() {
  const router = useRouter();
  const { currentUser } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    {
      icon: TrendingUp,
      label: 'Services Used',
      value: '12',
      color: 'text-primary-600'
    },
    {
      icon: Users,
      label: 'Providers',
      value: '8',
      color: 'text-accent-600'
    },
    {
      icon: Award,
      label: 'Rating',
      value: '4.8',
      color: 'text-success-600'
    }
  ];

  const recentServices = [
    {
      id: 1,
      service: 'Plumbing',
      provider: 'Kwame Asante',
      date: '2 days ago',
      status: 'completed',
      price: '₵150'
    },
    {
      id: 2,
      service: 'Electrical',
      provider: 'Ama Darko',
      date: '1 week ago',
      status: 'completed',
      price: '₵200'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {currentUser?.name?.split(' ')[0] || 'User'}!
            </h1>
            <p className="text-gray-600 mt-1">What service do you need today?</p>
          </div>
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-bold text-lg">
              {currentUser?.name?.charAt(0) || 'U'}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pr-12"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <Search size={20} />
          </button>
        </form>
      </div>

      {/* Quick Stats */}
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

      {/* Service Categories */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Service Categories</h2>
          <button className="text-primary-600 text-sm font-medium">View All</button>
        </div>
        <ServiceCategoryGrid />
      </div>

      {/* Recent Services */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Services</h2>
          <button 
            onClick={() => router.push('/?tab=requests')}
            className="text-primary-600 text-sm font-medium"
          >
            View All
          </button>
        </div>
        
        {recentServices.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recent services</h3>
            <p className="text-gray-600 text-sm mb-4">Start by requesting a service</p>
            <button 
              onClick={() => router.push('/post-request')}
              className="btn-primary"
            >
              <Plus size={16} className="mr-2" />
              Request Service
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentServices.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium text-sm">
                      {service.service.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{service.service}</h4>
                    <p className="text-sm text-gray-600">{service.provider}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{service.price}</div>
                  <div className="text-xs text-gray-500">{service.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Rated Providers */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Top Rated Providers</h2>
          <button className="text-primary-600 text-sm font-medium">View All</button>
        </div>
        <TopRatedProviders />
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => router.push('/post-request')}
            className="btn-primary flex items-center justify-center"
          >
            <Plus size={16} className="mr-2" />
            New Request
          </button>
          <button 
            onClick={() => router.push('/search')}
            className="btn-secondary flex items-center justify-center"
          >
            <Search size={16} className="mr-2" />
            Find Provider
          </button>
        </div>
      </div>
    </div>
  );
} 