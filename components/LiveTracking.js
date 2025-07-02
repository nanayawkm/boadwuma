import { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, User } from 'lucide-react';

export default function LiveTracking({ request, provider }) {
  const [currentEta, setCurrentEta] = useState(request.eta || 0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Simulate ETA countdown
  useEffect(() => {
    if (request.status === 'en_route' && currentEta > 0) {
      const interval = setInterval(() => {
        setCurrentEta(prev => Math.max(0, prev - 1));
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [request.status, currentEta]);

  if (request.status !== 'en_route') {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Navigation size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Live Tracking</h3>
              <p className="text-purple-100 text-sm">
                {provider?.name || 'Provider'} is on the way
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium">
              {isExpanded ? 'Hide' : 'Show'} Map
            </span>
          </button>
        </div>
      </div>

      {/* ETA and Status */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <User size={24} className="text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">
                {provider?.name || 'Provider'}
              </h4>
              <p className="text-sm text-gray-600">
                {request.service} • {request.location?.name || request.location}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <Clock size={20} className="text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {currentEta}
                </p>
                <p className="text-xs text-gray-600">minutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Provider Location</span>
            <span>Your Location</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(20, 100 - (currentEta / (request.eta || 1)) * 80)}%` }}
            ></div>
          </div>
        </div>

        {/* Status Updates */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Provider accepted your request</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-gray-700">Provider is en route to your location</span>
          </div>
          {currentEta <= 5 && (
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700">Provider will arrive soon</span>
            </div>
          )}
        </div>
      </div>

      {/* Map Section (Collapsible) */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          <div className="p-4">
            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center relative overflow-hidden">
              {/* Mock Map */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200"></div>
              
              {/* Provider Location (Moving Dot) */}
              <div 
                className="absolute w-4 h-4 bg-purple-600 rounded-full shadow-lg animate-pulse"
                style={{
                  left: `${20 + (currentEta / (request.eta || 1)) * 60}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="w-4 h-4 bg-purple-400 rounded-full animate-ping"></div>
              </div>
              
              {/* Customer Location */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 bg-green-600 rounded-full shadow-lg">
                  <MapPin size={12} className="text-white ml-0.5 mt-0.5" />
                </div>
              </div>
              
              {/* Route Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-purple-300 transform -translate-y-1/2"></div>
              
              <div className="relative z-10 text-center">
                <MapPin size={24} className="text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Live Location Tracking</p>
                <p className="text-xs text-gray-500 mt-1">
                  Provider is {currentEta} minutes away
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex space-x-2">
          <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
            <MapPin size={16} className="mr-1" />
            View Route
          </button>
          <button className="flex-1 bg-purple-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors flex items-center justify-center">
            <Navigation size={16} className="mr-1" />
            Contact
          </button>
        </div>
      </div>
    </div>
  );
} 