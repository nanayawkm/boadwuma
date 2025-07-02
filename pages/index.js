import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '../contexts/AppContext';
import MobileDashboard from '../components/MobileDashboard';

export default function Home() {
  const { isAuthenticated, userRole, currentUser } = useApp();
  const router = useRouter();
  
  console.log('🔍 INDEX: isAuthenticated:', isAuthenticated, 'userRole:', userRole, 'currentUser:', currentUser);

  useEffect(() => {
    try {
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        router.push('/login');
      }
    } catch (error) {
      console.error('🔍 INDEX: Error in authentication check:', error);
    }
  }, [isAuthenticated, router]);

  // If not authenticated, show loading
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we redirect you</p>
        </div>
      </div>
    );
  }

  // If authenticated, show the mobile dashboard
  return <MobileDashboard />;
}