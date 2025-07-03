import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '../contexts/AppContext';
import { Home, MessageSquare, FileText, User, Plus, Search } from 'lucide-react';
import CustomerDashboard from './dashboard/CustomerDashboard';
import ProviderDashboard from './dashboard/ProviderDashboard';
import RequestsTab from './dashboard/RequestsTab';
import MessagesTab from './dashboard/MessagesTab';
import ProfileTab from './dashboard/ProfileTab';

export default function MobileDashboard() {
  const { userRole } = useApp();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  
  console.log('🔍 MOBILE DASHBOARD: userRole:', userRole, 'activeTab:', activeTab);

  // Initialize active tab based on URL parameter
  useEffect(() => {
    if (router.isReady) {
      const urlParams = new URLSearchParams(router.asPath.split('?')[1] || '');
      const tab = urlParams.get('tab');
      if (tab && ['home', 'requests', 'messages', 'profile'].includes(tab)) {
        setActiveTab(tab);
      } else {
        setActiveTab('home');
      }
    }
  }, [router.isReady, router.asPath]);

  // Listen for navigation events from bottom navigation
  useEffect(() => {
    const handleRouteChange = (url) => {
      // If we're on the home page, check if there's a tab parameter
      if (url === '/') {
        const urlParams = new URLSearchParams(window.location.search);
        const tab = urlParams.get('tab');
        if (tab && ['home', 'requests', 'messages', 'profile'].includes(tab)) {
          setActiveTab(tab);
        } else {
          setActiveTab('home');
        }
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'requests', label: 'Requests' },
    { id: 'messages', label: 'Messages' },
    { id: 'profile', label: 'Profile' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return userRole === 'customer' ? <CustomerDashboard /> : <ProviderDashboard />;
      case 'requests':
        return <RequestsTab />;
      case 'messages':
        return <MessagesTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return userRole === 'customer' ? <CustomerDashboard /> : <ProviderDashboard />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {renderTabContent()}
      </div>
    </div>
  );
} 