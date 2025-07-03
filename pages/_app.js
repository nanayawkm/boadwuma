import '../styles/globals.css';
import { AppProvider } from '../contexts/AppContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function AppContent({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Only handle client-side redirects for specific pages
    // Authentication checks should be handled in individual pages
    console.log('🔍 APP: Current pathname:', router.pathname);
  }, [router.pathname]);

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