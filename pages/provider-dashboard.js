import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { 
  User, 
  Star, 
  Calendar, 
  DollarSign, 
  MessageCircle, 
  Settings,
  Plus,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAvailable, setIsAvailable] = useState(true);
  
  // Mock provider data
  const providerData = {
    id: '1',
    name: 'John Smith',
    category: 'Plumbing',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 127,
    services: ['Emergency Repairs', 'Pipe Installation', 'Bathroom Fitting'],
    priceRange: '$50-100/hour',
    description: 'Licensed plumber with 10+ years experience in residential and commercial plumbing.',
    totalEarnings: '$12,450',
    monthlyBookings: 23,
    responseRate: '98%'
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'bookings', name: 'Bookings', icon: Calendar },
    { id: 'services', name: 'Services', icon: Settings },
    { id: 'messages', name: 'Messages', icon: MessageCircle },
    { id: 'earnings', name: 'Earnings', icon: DollarSign },
  ];

  const mockBookings = [
    {
      id: '1',
      clientName: 'Alice Brown',
      service: 'Emergency Pipe Repair',
      date: '2023-12-05',
      time: '2:00 PM',
      status: 'upcoming',
      price: '$85'
    },
    {
      id: '2',
      clientName: 'David Lee',
      service: 'Bathroom Installation',
      date: '2023-12-03',
      time: '10:00 AM',
      status: 'completed',
      price: '$450'
    }
  ];

  const mockMessages = [
    {
      id: '1',
      clientName: 'Alice Brown',
      lastMessage: 'What time can you come today?',
      time: '10:30 AM',
      unread: true
    },
    {
      id: '2',
      clientName: 'Mike Wilson',
      lastMessage: 'Thank you for the great service!',
      time: 'Yesterday',
      unread: false
    }
  ];

  return (
    <>
      <Head>
        <title>Provider Dashboard - Boadwuma</title>
      </Head>

      <div className="pb-20 lg:pb-4">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <Image
                  src={providerData.avatar}
                  alt={providerData.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{providerData.name}</h1>
                  <p className="text-gray-600">{providerData.category} Professional</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Available</span>
                  <button
                    onClick={() => setIsAvailable(!isAvailable)}
                    className={`${isAvailable ? 'text-green-500' : 'text-gray-400'}`}
                  >
                    {isAvailable ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                  </button>
                </div>
                <button className="btn-primary">
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="text-yellow-400 fill-current" size={24} />
                <span className="ml-1 text-2xl font-bold">{providerData.rating}</span>
              </div>
              <p className="text-sm text-gray-600">Rating ({providerData.reviewCount} reviews)</p>
            </div>
            
            <div className="card text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">{providerData.monthlyBookings}</div>
              <p className="text-sm text-gray-600">This Month's Bookings</p>
            </div>
            
            <div className="card text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{providerData.totalEarnings}</div>
              <p className="text-sm text-gray-600">Total Earnings</p>
            </div>
            
            <div className="card text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{providerData.responseRate}</div>
              <p className="text-sm text-gray-600">Response Rate</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b mb-6">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-3 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
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

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                <div className="space-y-3">
                  {mockBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{booking.clientName}</div>
                        <div className="text-sm text-gray-600">{booking.service}</div>
                        <div className="text-sm text-gray-500">{booking.date} at {booking.time}</div>
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
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
                <div className="space-y-3">
                  {mockMessages.map((message) => (
                    <div key={message.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{message.clientName}</div>
                        <div className="text-sm text-gray-600 truncate">{message.lastMessage}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{message.time}</div>
                        {message.unread && (
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-1 ml-auto"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">All Bookings</h3>
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option>All Status</option>
                  <option>Upcoming</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <div key={booking.id} className="card">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{booking.clientName}</h4>
                        <p className="text-gray-600">{booking.service}</p>
                        <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
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
                    <div className="flex space-x-2 mt-4">
                      <button className="btn-primary text-sm">Contact Client</button>
                      <button className="btn-outline text-sm">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">My Services</h3>
                <button className="btn-primary">
                  <Plus size={16} className="mr-2" />
                  Add Service
                </button>
              </div>
              <div className="space-y-4">
                {providerData.services.map((service, index) => (
                  <div key={index} className="card">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900">{service}</h4>
                        <p className="text-gray-600">Starting at {providerData.priceRange}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-600 hover:text-primary-600">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="card text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">$2,340</div>
                  <p className="text-sm text-gray-600">This Month</p>
                </div>
                <div className="card text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">$8,920</div>
                  <p className="text-sm text-gray-600">Last 3 Months</p>
                </div>
                <div className="card text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">{providerData.totalEarnings}</div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                </div>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <div className="font-medium text-gray-900">Emergency Repair - Alice Brown</div>
                      <div className="text-sm text-gray-500">Dec 3, 2023</div>
                    </div>
                    <div className="text-green-600 font-semibold">+$85</div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <div className="font-medium text-gray-900">Bathroom Installation - David Lee</div>
                      <div className="text-sm text-gray-500">Dec 1, 2023</div>
                    </div>
                    <div className="text-green-600 font-semibold">+$450</div>
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