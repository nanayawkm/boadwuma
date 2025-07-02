import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '../contexts/AppContext';

export default function TestAuth() {
  const { isAuthenticated, userRole, currentUser, login } = useApp();
  const router = useRouter();

  useEffect(() => {
    console.log('🔍 TEST AUTH: Component mounted');
    console.log('🔍 TEST AUTH: isAuthenticated:', isAuthenticated);
    console.log('🔍 TEST AUTH: userRole:', userRole);
    console.log('🔍 TEST AUTH: currentUser:', currentUser);
  }, [isAuthenticated, userRole, currentUser]);

  const handleCustomerLogin = () => {
    console.log('🔍 TEST AUTH: Customer login clicked');
    const mockUser = {
      id: 'test-customer-1',
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '+233 24 123 4567',
      role: 'customer'
    };
    
    console.log('🔍 TEST AUTH: Mock user created:', mockUser);
    login(mockUser);
    
    // Wait a moment then redirect
    setTimeout(() => {
      console.log('🔍 TEST AUTH: Redirecting to dashboard...');
      router.push('/');
    }, 1000);
  };

  const handleProviderLogin = () => {
    console.log('🔍 TEST AUTH: Provider login clicked');
    const mockUser = {
      id: 'test-provider-1',
      name: 'Test Provider',
      email: 'provider@example.com',
      phone: '+233 20 987 6543',
      role: 'provider'
    };
    
    console.log('🔍 TEST AUTH: Mock user created:', mockUser);
    login(mockUser);
    
    // Wait a moment then redirect
    setTimeout(() => {
      console.log('🔍 TEST AUTH: Redirecting to dashboard...');
      router.push('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Auth Test</h1>
        
        <div className="space-y-4 mb-6">
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">Authentication Status:</p>
            <p className="font-medium">isAuthenticated: {isAuthenticated ? 'true' : 'false'}</p>
            <p className="font-medium">userRole: {userRole}</p>
            <p className="font-medium">currentUser: {currentUser ? currentUser.name : 'null'}</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleCustomerLogin}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Login as Customer
          </button>
          
          <button
            onClick={handleProviderLogin}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Login as Provider
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
} 