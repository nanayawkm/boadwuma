import { useState } from 'react';
import Head from 'next/head';
import { Bell, Shield, Globe, HelpCircle, LogOut, User, CreditCard } from 'lucide-react';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    showLocation: true,
    allowContact: true,
    showProfile: true
  });

  const settingSections = [
    {
      id: 'account',
      title: 'Account',
      icon: User,
      items: [
        { name: 'Personal Information', description: 'Update your name, email, and phone number' },
        { name: 'Change Password', description: 'Keep your account secure' },
        { name: 'Two-Factor Authentication', description: 'Add an extra layer of security' }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      items: [
        { name: 'Email Notifications', description: 'Receive updates via email', toggle: 'email' },
        { name: 'SMS Notifications', description: 'Get text message alerts', toggle: 'sms' },
        { name: 'Push Notifications', description: 'Mobile app notifications', toggle: 'push' },
        { name: 'Marketing Emails', description: 'Promotional content and tips', toggle: 'marketing' }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Safety',
      icon: Shield,
      items: [
        { name: 'Location Sharing', description: 'Allow service providers to see your location', toggle: 'showLocation', privacy: true },
        { name: 'Contact Permissions', description: 'Allow providers to contact you directly', toggle: 'allowContact', privacy: true },
        { name: 'Public Profile', description: 'Make your profile visible to providers', toggle: 'showProfile', privacy: true }
      ]
    },
    {
      id: 'language',
      title: 'Language & Region',
      icon: Globe,
      items: [
        { name: 'Language', description: 'Choose your preferred language' },
        { name: 'Region', description: 'Set your location for better service matching' },
        { name: 'Currency', description: 'Select your preferred currency' }
      ]
    },
    {
      id: 'billing',
      title: 'Billing',
      icon: CreditCard,
      items: [
        { name: 'Payment Methods', description: 'Manage your saved payment options' },
        { name: 'Transaction History', description: 'View your past payments' },
        { name: 'Billing Address', description: 'Update your billing information' }
      ]
    },
    {
      id: 'support',
      title: 'Support',
      icon: HelpCircle,
      items: [
        { name: 'Help Center', description: 'Find answers to common questions' },
        { name: 'Contact Support', description: 'Get help from our team' },
        { name: 'Report an Issue', description: 'Report bugs or problems' }
      ]
    }
  ];

  const handleToggle = (setting, section = 'notifications') => {
    if (section === 'privacy') {
      setPrivacy(prev => ({ ...prev, [setting]: !prev[setting] }));
    } else {
      setNotifications(prev => ({ ...prev, [setting]: !prev[setting] }));
    }
  };

  return (
    <>
      <Head>
        <title>Settings - Boadwuma</title>
      </Head>

      <div className="pb-20 lg:pb-4 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account preferences and settings</p>
          </div>

          <div className="space-y-6">
            {settingSections.map((section) => (
              <div key={section.id} className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center">
                    <section.icon size={20} className="text-primary-600 mr-3" />
                    <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {section.items.map((item, index) => (
                    <div key={index} className="p-6 flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                      
                      {item.toggle ? (
                        <button
                          onClick={() => handleToggle(item.toggle, item.privacy ? 'privacy' : 'notifications')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            (item.privacy ? privacy[item.toggle] : notifications[item.toggle])
                              ? 'bg-primary-500' 
                              : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            (item.privacy ? privacy[item.toggle] : notifications[item.toggle])
                              ? 'translate-x-6' 
                              : 'translate-x-1'
                          }`} />
                        </button>
                      ) : (
                        <button className="text-primary-600 hover:text-primary-700 font-medium">
                          Manage
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Danger Zone */}
            <div className="bg-white rounded-lg shadow-sm border border-red-200">
              <div className="p-6 border-b border-red-100">
                <h2 className="text-lg font-semibold text-red-900">Danger Zone</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Deactivate Account</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Temporarily disable your account. You can reactivate it anytime.
                    </p>
                  </div>
                  <button className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50">
                    Deactivate
                  </button>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <h3 className="font-medium text-red-900">Delete Account</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Permanently delete your account and all data. This cannot be undone.
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>

            {/* Sign Out */}
            <div className="bg-white rounded-lg shadow-sm">
              <button className="w-full p-6 flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                <LogOut size={20} className="mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}