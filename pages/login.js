import { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  const validateForm = () => {
    const errors = {};
    
    if (!selectedRole) {
      errors.role = 'Please select whether you are a customer or provider';
    }
    
    if (!formData.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear field-specific error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
    setError(''); // Clear general error when user types
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    if (fieldErrors.role) {
      setFieldErrors(prev => ({
        ...prev,
        role: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate form before submission
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      console.log('🔍 LOGIN: Form submitted with data:', formData, 'selectedRole:', selectedRole);
      
      // Create mock user object for demo
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: selectedRole === 'customer' ? 'John Doe' : 'Kwame Asante',
        email: formData.email,
        phone: '+233 20 123 4567',
        role: selectedRole,
        location: 'Accra, Ghana'
      };
      
      login(mockUser);
      router.push('/');
    } catch (error) {
      console.error('🔍 LOGIN: Error during login:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
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

      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Boadwuma Logo" width={64} height={64} className="mx-auto mb-4 rounded-2xl shadow" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your Boadwuma account</p>
          </div>

          {/* Login Form */}
          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am a... <span className="text-error-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleRoleSelection('customer')}
                    className={`p-3 rounded-xl border-2 transition-colors ${
                      selectedRole === 'customer'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : fieldErrors.role 
                          ? 'border-error-300 bg-error-50'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                    aria-pressed={selectedRole === 'customer'}
                  >
                    <div className="text-center">
                      <User size={24} className="mx-auto mb-2" />
                      <span className="font-medium">Customer</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSelection('provider')}
                    className={`p-3 rounded-xl border-2 transition-colors ${
                      selectedRole === 'provider'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : fieldErrors.role 
                          ? 'border-error-300 bg-error-50'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                    aria-pressed={selectedRole === 'provider'}
                  >
                    <div className="text-center">
                      <User size={24} className="mx-auto mb-2" />
                      <span className="font-medium">Provider</span>
                    </div>
                  </button>
                </div>
                {fieldErrors.role && (
                  <p className="mt-2 text-sm text-error-600">{fieldErrors.role}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 pl-12 pr-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${fieldErrors.email ? 'border-error-300 focus:ring-error-500 focus:border-error-500' : ''}`}
                    placeholder="Enter your email"
                    required
                    aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                    aria-invalid={fieldErrors.email ? 'true' : 'false'}
                  />
                </div>
                {fieldErrors.email && (
                  <p id="email-error" className="mt-2 text-sm text-error-600">{fieldErrors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full px-4 py-3 pl-12 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${fieldErrors.password ? 'border-error-300 focus:ring-error-500 focus:border-error-500' : ''}`}
                    placeholder="Enter your password"
                    required
                    aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                    aria-invalid={fieldErrors.password ? 'true' : 'false'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p id="password-error" className="mt-2 text-sm text-error-600">{fieldErrors.password}</p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-error-50 border border-error-200 rounded-xl p-3" role="alert">
                  <p className="text-error-700 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                aria-describedby={Object.keys(fieldErrors).length > 0 ? 'form-errors' : undefined}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
              
              {/* Form errors summary for screen readers */}
              {Object.keys(fieldErrors).length > 0 && (
                <div id="form-errors" className="sr-only" role="alert">
                  Please fix the following errors: {Object.values(fieldErrors).join(', ')}
                </div>
              )}
            </form>

            {/* Demo Login */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center mb-4">Demo Login</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    handleRoleSelection('customer');
                    setFormData({ email: 'customer@demo.com', password: 'demo123' });
                    setFieldErrors({});
                    setError('');
                  }}
                  className="btn-secondary text-sm"
                >
                  Customer Demo
                </button>
                <button
                  onClick={() => {
                    handleRoleSelection('provider');
                    setFormData({ email: 'provider@demo.com', password: 'demo123' });
                    setFieldErrors({});
                    setError('');
                  }}
                  className="btn-secondary text-sm"
                >
                  Provider Demo
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button className="text-primary-600 font-medium hover:text-primary-700">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 