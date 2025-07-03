import React from 'react';
import { useApp } from '../contexts/AppContext';
import BottomNavigation from './BottomNavigation';
import ProtectedRoute from './ProtectedRoute';
import { User, Settings, LogOut } from 'lucide-react';

export default function Layout({ children }) {
  const { userRole, currentUser, switchRole, logout, isAuthenticated } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <div className="mobile-container safe-area">
        <main className="pb-20">
          {isAuthenticated ? (
            <ProtectedRoute>
              {children}
            </ProtectedRoute>
          ) : (
            children
          )}
        </main>
        
        {isAuthenticated && <BottomNavigation />}
      </div>
    </div>
  );
}