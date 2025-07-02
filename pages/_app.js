import '../styles/globals.css';
import { AppProvider } from '../contexts/AppContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useApp } from '../contexts/AppContext';

function AppContent({ Component, pageProps }) {
  const router = useRouter();
  const { isAuthenticated } = useApp();

  useEffect(() => {
    // Redirect to login if not authenticated and not already on login page
    if (!isAuthenticated && router.pathname !== '/login' && router.pathname !== '/test-auth') {
      router.push('/login');
    }
  }, [isAuthenticated, router.pathname, router]);

  // Don't show layout for login page or other standalone pages
  if (router.pathname === '/login' || router.pathname === '/test-auth' || router.pathname.startsWith('/chat/') || router.pathname.startsWith('/provider/')) {
    return <Component {...pageProps} />;
  }

  // For all other pages, show the component directly (mobile dashboard handles layout)
  return <Component {...pageProps} />;
}

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <AppContent Component={Component} pageProps={pageProps} />
    </AppProvider>
  );
}