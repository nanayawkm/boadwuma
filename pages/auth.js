import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { User, Briefcase, ArrowRight, Star, Users, MessageCircle, Phone, Mail } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function Auth() {
  const router = useRouter();
  const { switchRole, currentUser } = useApp();
  const [userRole, setUserRole] = useState('customer');
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAuth = (e) => {
    e.preventDefault();
    
    // Switch to selected role
    if (userRole === 'provider') {
      switchRole();
    }
    
    console.log('Mock Auth Success:', { role: userRole });
    
    // Redirect to mobile dashboard
    router.push('/');
  };

  const features = {
    customer: [
      { icon: Users, text: 'Find trusted local service providers' },
      { icon: MessageCircle, text: 'Chat directly with professionals' },
      { icon: Star, text: 'Read reviews and ratings' },
    ],
    provider: [
      { icon: Briefcase, text: 'Showcase your services and skills' },
      { icon: Users, text: 'Connect with local customers' },
      { icon: MessageCircle, text: 'Manage requests and communications' },
    ]
  };

  return (
    <>
      <Head>
        <title>{isLogin ? 'Sign In' : 'Join'} - Boadwuma</title>
        <meta name="description" content="Join Boadwuma to find trusted service providers in Ghana or offer your professional services to local customers." />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-blue-600">Boadwuma</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </span>
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="max-w-4xl w-full">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {isLogin ? 'Welcome Back!' : 'Join Boadwuma'}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                {isLogin 
                  ? 'Sign in to connect with trusted local service providers in Ghana'
                  : 'Connect with trusted local service providers or offer your professional services'
                }
              </p>
            </div>

            {/* Auth Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
              <form onSubmit={handleAuth} className="space-y-6">
                {/* Role Selection Question */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 text-center mb-6">
                    What will you use Boadwuma for?
                  </h3>

                  {/* Role Selection Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Customer Button */}
                    <button
                      type="button"
                      onClick={() => setUserRole('customer')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        userRole === 'customer' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full mr-3 ${
                          userRole === 'customer' ? 'bg-blue-500' : 'bg-gray-100'
                        }`}>
                          <User 
                            size={20} 
                            className={userRole === 'customer' ? 'text-white' : 'text-gray-600'}
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">I want to find services</h4>
                          <p className="text-sm text-gray-600">Find local professionals</p>
                        </div>
                      </div>
                    </button>

                    {/* Provider Button */}
                    <button
                      type="button"
                      onClick={() => setUserRole('provider')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        userRole === 'provider' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full mr-3 ${
                          userRole === 'provider' ? 'bg-blue-500' : 'bg-gray-100'
                        }`}>
                          <Briefcase 
                            size={20} 
                            className={userRole === 'provider' ? 'text-white' : 'text-gray-600'}
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">I want to offer services</h4>
                          <p className="text-sm text-gray-600">Grow your business</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required={!isLogin}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} className="inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone size={16} className="inline mr-1" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required={!isLogin}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  {isLogin ? 'Sign In' : 'Create Account'} as {userRole === 'customer' ? 'Customer' : 'Service Provider'}
                  <ArrowRight size={18} />
                </button>
              </form>

              {/* Role Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-2">
                  {userRole === 'customer' ? '👤 As a Customer:' : '💼 As a Service Provider:'}
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {features[userRole].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <feature.icon size={14} className="mr-2 text-blue-500" />
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">1,000+</div>
                <div className="text-sm sm:text-base text-gray-600">Service Providers</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">5,000+</div>
                <div className="text-sm sm:text-base text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">4.8★</div>
                <div className="text-sm sm:text-base text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t py-6 sm:py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-sm sm:text-base text-gray-600">
              © 2024 Boadwuma. Connecting communities with trusted professionals in Ghana.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}