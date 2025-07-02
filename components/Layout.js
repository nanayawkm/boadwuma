import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Search, Menu, X, MessageCircle, User, Home, Settings } from 'lucide-react';

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Messages', href: '/messages', icon: MessageCircle },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const providerNavigation = [
    { name: 'Dashboard', href: '/provider-dashboard', icon: Home },
    { name: 'Messages', href: '/messages', icon: MessageCircle },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  // Simple check to determine if we're on a provider page
  const isProviderPage = router.pathname.includes('provider');
  const currentNavigation = isProviderPage ? providerNavigation : navigation;

  const isActive = (path) => router.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="text-lg sm:text-xl font-bold text-primary-600">
            Boadwuma
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 touch-target"
          >
            {isMobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t bg-white">
            <div className="px-4 py-2 space-y-1">
              {currentNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium touch-target ${
                      isActive(item.href)
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon size={18} className="mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <div className="lg:flex">
        {/* Desktop Sidebar */}
        <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:border-gray-200">
          <div className="flex items-center h-16 px-6 border-b">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Boadwuma
            </Link>
          </div>
          <div className="flex-1 px-4 py-6 space-y-1">
            {currentNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium ${
                    isActive(item.href)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="lg:pl-64 flex-1">
          <div className="min-h-screen">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="flex justify-around py-1 sm:py-2 safe-area-inset-bottom">
          {currentNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center py-2 sm:py-3 px-2 sm:px-4 min-w-0 flex-1 transition-colors duration-200 touch-target ${
                  isActive(item.href)
                    ? 'text-blue-600'
                    : 'text-gray-600 active:text-blue-600'
                }`}
              >
                <Icon size={20} className="sm:w-5 sm:h-5" />
                <span className={`text-xs mt-1 font-medium ${isActive(item.href) ? 'text-blue-600' : 'text-gray-600'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}