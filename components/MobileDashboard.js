import { useState } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '../contexts/AppContext';
import { Home, MessageSquare, FileText, User, Plus, Search } from 'lucide-react';
import CustomerDashboard from './dashboard/CustomerDashboard';
import ProviderDashboard from './dashboard/ProviderDashboard';
import RequestsTab from './dashboard/RequestsTab';
import MessagesTab from './dashboard/MessagesTab';
import ProfileTab from './dashboard/ProfileTab';

export default function MobileDashboard() {
  const { userRole, currentUser } = useApp();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  
  console.log('🔍 MOBILE DASHBOARD: userRole:', userRole, 'currentUser:', currentUser, 'activeTab:', activeTab);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'requests', label: 'Requests', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return userRole === 'provider' ? <ProviderDashboard /> : <CustomerDashboard />;
      case 'requests':
        return <RequestsTab />;
      case 'messages':
        return <MessagesTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return userRole === 'provider' ? <ProviderDashboard /> : <CustomerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">Boadwuma</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Search size={20} />
            </button>
            {userRole === 'customer' && (
              <button 
                onClick={() => router.push('/post-request')}
                className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                <Plus size={20} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {renderTabContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1 font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
} 