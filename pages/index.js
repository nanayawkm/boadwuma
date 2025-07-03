import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '../contexts/AppContext';
import Layout from '../components/Layout';
import MobileDashboard from '../components/MobileDashboard';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, userRole, currentUser } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('🔍 INDEX: isAuthenticated:', isAuthenticated, 'userRole:', userRole, 'currentUser:', currentUser);
    
    // Handle authentication redirect on client side
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, userRole, currentUser, router]);

  // Show loading state while checking authentication
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Loading...</h3>
          <p className="text-gray-600 text-sm">Please wait while we redirect you</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <MobileDashboard />
    </Layout>
  );
}