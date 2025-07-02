import React from 'react';
import { useApp } from '../contexts/AppContext';
import BottomNavigation from './BottomNavigation';
import { User, Settings, LogOut } from 'lucide-react';

export default function Layout({ children, showBottomNav = true }) {
  const { userRole, currentUser, switchRole, logout, isAuthenticated } = useApp();

  return (
    <div className="min-h-screen bg-background-50 font-sans">
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <h1 className="text-2xl font-semibold text-primary-500 font-display">
                Boadwuma
              </h1>
            </div>

            {/* User Profile & Actions */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  {/* Role Switcher - Development Only */}
                  <button
                    onClick={switchRole}
                    className="text-xs px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full border border-neutral-200 hover:bg-neutral-200 transition-colors"
                    title="Switch between customer and provider view"
                  >
                    {userRole === 'customer' ? 'Customer' : 'Provider'}
                  </button>

                  {/* User Avatar */}
                  <div className="flex items-center space-x-2">
                    {currentUser?.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center"
                      style={{ display: currentUser?.avatar ? 'none' : 'flex' }}
                    >
                      <User className="w-4 h-4 text-neutral-500" />
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={logout}
                    className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                    title="Sign out"
                  >
                    <LogOut size={16} />
                  </button>
                </>
              ) : (
                <a
                  href="/login"
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                >
                  Sign In
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      {showBottomNav && <BottomNavigation />}
    </div>
  );
}