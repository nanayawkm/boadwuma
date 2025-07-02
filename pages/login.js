

import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useApp } from '../contexts/AppContext';
import { User, Briefcase, ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const { login, isAuthenticated } = useApp();
  
  const [selectedRole, setSelectedRole] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push('/');
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      console.log('🔍 LOGIN: Form submitted with data:', formData, 'selectedRole:', selectedRole);
      
      if (!selectedRole) {
        console.error('🔍 LOGIN: No role selected');
        return;
      }
      
      // Mock authentication
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name || 'Guest User',
        email: formData.email,
        phone: formData.phone,
        role: selectedRole
      };
      
      console.log('🔍 LOGIN: Mock user created:', mockUser);
      
      login(mockUser);
      
      // Redirect to mobile dashboard
      router.push('/');
    } catch (error) {
      console.error('🔍 LOGIN: Error during login:', error);
    }
  };

  const features = {
    customer: [
      'Find trusted local service providers',
      'Chat directly with professionals',
      'Read reviews and ratings',
      'Track your service requests'
    ],
    provider: [
      'Showcase your services and skills',
      'Connect with local customers',
      'Manage requests and communications',
      'Track your earnings and ratings'
    ]
  };

  return (
    <>
      <Head>
        <title>{isSignUp ? 'Sign Up' : 'Sign In'} - Boadwuma</title>
        <meta name="description" content="Join Boadwuma to find trusted service providers in Ghana or offer your professional services to local customers." />
      </Head>

      <div className="min-h-screen bg-background-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <h1 className="text-2xl font-semibold text-primary-500 font-display">
                  Boadwuma
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-neutral-600">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}
                </span>
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="bg-neutral-100 text-neutral-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="max-w-4xl w-full">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-text-900 mb-4">
                {isSignUp ? 'Join Boadwuma' : 'Welcome Back!'}
              </h2>
              <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto">
                {isSignUp 
                  ? 'Connect with trusted local service providers or offer your professional services'
                  : 'Sign in to continue with your account'
                }
              </p>
            </div>

            {/* Role Selection */}
            {!selectedRole ? (
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
                <div className="text-center mb-8">
                  <h3 className="text-xl sm:text-2xl font-semibold text-text-900 mb-2">
                    What type of account do you want to create?
                  </h3>
                  <p className="text-neutral-600">
                    Choose how you'll use Boadwuma
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Customer Option */}
                  <button
                    onClick={() => setSelectedRole('customer')}
                    className="p-6 rounded-xl border-2 border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-full bg-primary-100 mr-4 group-hover:bg-primary-200 transition-colors">
                        <User size={24} className="text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-900 text-lg">Continue as Customer</h4>
                        <p className="text-sm text-neutral-600">Find local professionals</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {features.customer.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-neutral-600">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </button>

                  {/* Provider Option */}
                  <button
                    onClick={() => setSelectedRole('provider')}
                    className="p-6 rounded-xl border-2 border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-full bg-primary-100 mr-4 group-hover:bg-primary-200 transition-colors">
                        <Briefcase size={24} className="text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-900 text-lg">Continue as Service Provider</h4>
                        <p className="text-sm text-neutral-600">Grow your business</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {features.provider.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-neutral-600">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </button>
                </div>
              </div>
            ) : (
              /* Authentication Form */
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary-100 mr-4">
                      {selectedRole === 'customer' ? (
                        <User size={24} className="text-primary-600" />
                      ) : (
                        <Briefcase size={24} className="text-primary-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-text-900">
                        {isSignUp ? 'Create Account' : 'Sign In'} as {selectedRole === 'customer' ? 'Customer' : 'Provider'}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    ← Choose different role
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {isSignUp && (
                    <div>
                      <label className="block text-sm font-medium text-text-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required={isSignUp}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-text-700 mb-2">
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
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  {isSignUp && (
                    <div>
                      <label className="block text-sm font-medium text-text-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-text-700 mb-2">
                      <Lock size={16} className="inline mr-1" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        required
                        className="w-full px-4 py-3 pr-12 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff size={20} className="text-neutral-400" />
                        ) : (
                          <Eye size={20} className="text-neutral-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-primary-600 transition-colors flex items-center justify-center"
                  >
                    {isSignUp ? 'Create Account' : 'Sign In'}
                    <ArrowRight size={20} className="ml-2" />
                  </button>
                </form>

                {!isSignUp && (
                  <div className="mt-6 text-center">
                    <button className="text-sm text-neutral-600 hover:text-neutral-800">
                      Forgot your password?
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
} 