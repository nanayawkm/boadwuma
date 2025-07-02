import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { User, Briefcase, ArrowRight, Star, Users, MessageCircle } from 'lucide-react';

export default function Auth() {
  const [userType, setUserType] = useState('customer');

  const features = {
    customer: [
      { icon: Users, text: 'Find trusted local service providers' },
      { icon: MessageCircle, text: 'Chat directly with professionals' },
      { icon: Star, text: 'Read reviews and ratings' },
    ],
    provider: [
      { icon: Briefcase, text: 'Showcase your services and skills' },
      { icon: Users, text: 'Connect with local customers' },
      { icon: MessageCircle, text: 'Manage bookings and communications' },
    ]
  };

  return (
    <>
      <Head>
        <title>Welcome to Boadwuma - Connect with Local Service Providers</title>
        <meta name="description" content="Join Boadwuma to find trusted service providers or offer your professional services to local customers." />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-primary-600">Boadwuma</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Already have an account?</span>
                <button className="btn-outline text-sm">Sign In</button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="max-w-4xl w-full">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to Boadwuma
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Connect with trusted local service providers or offer your professional services to customers in your area
              </p>
            </div>

            {/* User Type Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
                How do you want to use Boadwuma?
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Customer Option */}
                <div 
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    userType === 'customer' 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setUserType('customer')}
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-full ${
                      userType === 'customer' ? 'bg-primary-500' : 'bg-gray-100'
                    }`}>
                      <User 
                        size={24} 
                        className={userType === 'customer' ? 'text-white' : 'text-gray-600'}
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">I need services</h4>
                      <p className="text-gray-600">Find local professionals</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {features.customer.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <feature.icon size={16} className="mr-2 text-primary-500" />
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Provider Option */}
                <div 
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    userType === 'provider' 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setUserType('provider')}
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-full ${
                      userType === 'provider' ? 'bg-primary-500' : 'bg-gray-100'
                    }`}>
                      <Briefcase 
                        size={24} 
                        className={userType === 'provider' ? 'text-white' : 'text-gray-600'}
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">I offer services</h4>
                      <p className="text-gray-600">Grow your business</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {features.provider.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <feature.icon size={16} className="mr-2 text-primary-500" />
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Continue Button */}
              <div className="mt-8 text-center">
                <Link 
                  href={userType === 'customer' ? '/' : '/provider-dashboard'}
                  className="inline-flex items-center btn-primary text-lg px-8 py-3"
                >
                  Continue as {userType === 'customer' ? 'Customer' : 'Service Provider'}
                  <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">1,000+</div>
                <div className="text-gray-600">Service Providers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">5,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">4.8★</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-gray-600">
              © 2023 Boadwuma. Connecting communities with trusted professionals.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}