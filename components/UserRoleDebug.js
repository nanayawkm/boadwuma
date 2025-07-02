import { useApp } from '../contexts/AppContext';

export default function UserRoleDebug() {
  const { currentUser, userRole, isCustomer, isProvider, switchRole, isAuthenticated, logout } = useApp();

  return (
    <div className="fixed bottom-4 right-4 bg-secondary-100 border border-secondary-200 rounded-lg p-4 shadow-lg z-50 max-w-xs">
      <h3 className="font-semibold text-primary-600 mb-2">🔧 Debug Info</h3>
      <div className="text-sm space-y-1 text-gray-700">
        <div><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</div>
        <div><strong>User Role:</strong> {userRole || 'None'}</div>
        <div><strong>Is Customer:</strong> {isCustomer ? 'Yes' : 'No'}</div>
        <div><strong>Is Provider:</strong> {isProvider ? 'Yes' : 'No'}</div>
        {currentUser && (
          <div><strong>User:</strong> {currentUser.name || 'Unknown'}</div>
        )}
      </div>
      
      <div className="mt-3 space-y-2">
        <button
          onClick={switchRole}
          className="w-full py-2 px-3 rounded text-sm font-medium transition-colors bg-primary-500 text-white hover:bg-primary-600"
        >
          Switch to {userRole === 'customer' ? 'Provider' : 'Customer'}
        </button>
        
        <button
          onClick={() => window.location.href = '/profile'}
          className="w-full py-2 px-3 rounded text-sm font-medium transition-colors bg-accent-500 text-white hover:bg-accent-600"
        >
          Profile
        </button>
        
        <button
          onClick={logout}
          className="w-full py-2 px-3 rounded text-sm font-medium transition-colors bg-error-500 text-white hover:bg-error-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}