import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useApp } from '../contexts/AppContext';
import { Home, MessageCircle, ClipboardList, User } from 'lucide-react';

export default function BottomNavigation() {
  const router = useRouter();
  const { userRole, isAuthenticated } = useApp();

  // Don't show navigation if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Both customer and provider use the same navigation structure now
  // The content is handled by the MobileDashboard component based on role
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Requests', href: '/', icon: ClipboardList }, // All navigation goes to dashboard
    { name: 'Chat', href: '/', icon: MessageCircle }, // All navigation goes to dashboard
    { name: 'Profile', href: '/', icon: User }, // All navigation goes to dashboard
  ];

  const isActive = (path) => {
    // Since all navigation goes to the dashboard, we need to determine active state
    // based on the current tab in the dashboard
    if (path === '/') {
      return router.pathname === path;
    }
    return router.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-50">
      <div className="flex justify-around py-2 safe-area-inset-bottom">
        {navigation.map((item, index) => {
          const Icon = item.icon;
          // For now, all tabs are considered active when on the dashboard
          const active = router.pathname === '/';
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center px-3 py-2 min-w-0 flex-1 transition-colors duration-200 ${
                active
                  ? 'text-accent-500'
                  : 'text-neutral-500 hover:text-accent-500'
              }`}
            >
              <Icon 
                className={`w-5 h-5 mb-1 ${active ? 'text-accent-500' : 'text-neutral-500'}`} 
                strokeWidth={active ? 2.5 : 2}
              />
              <span className={`text-xs font-medium ${
                active ? 'text-accent-500' : 'text-neutral-500'
              }`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}