import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS, MOCK_PROVIDERS, GHANA_LOCATIONS } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('customer');
  const [currentUser, setCurrentUser] = useState(null);
  
  // User location for proximity-based matching
  const [userLocation, setUserLocation] = useState(GHANA_LOCATIONS.ACCRA);
  
  // Service requests with enhanced status tracking
  const [requests, setRequests] = useState([]);
  
  // Chat messages
  const [chatMessages, setChatMessages] = useState({});
  
  // Tracking state for active requests
  const [trackingData, setTrackingData] = useState({});
  
  // Initialize user based on role (only if authenticated)
  useEffect(() => {
    if (isAuthenticated && !currentUser) {
      if (userRole === 'customer') {
        setCurrentUser(MOCK_USERS[0]);
      } else {
        setCurrentUser(MOCK_PROVIDERS[0]);
      }
    }
  }, [userRole, isAuthenticated, currentUser]);

  // Authentication functions
  const login = (user) => {
    console.log('🔍 APPCONTEXT: Login called with user:', user);
    
    // Set user role first
    setUserRole(user.role);
    
    // Set current user
    setCurrentUser(user);
    
    // Set authentication status last
    setIsAuthenticated(true);
    
    console.log('🔍 APPCONTEXT: Authentication state updated - isAuthenticated: true, userRole:', user.role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUserRole('customer');
  };

  // Toggle user role for testing (only when authenticated)
  const switchRole = () => {
    if (isAuthenticated) {
      setUserRole(userRole === 'customer' ? 'provider' : 'customer');
    }
  };

  // Add a new service request
  const addRequest = (request) => {
    const newRequest = {
      ...request,
      id: `req-${Date.now()}`,
      timestamp: new Date(),
      status: 'pending',
      acceptedAt: null,
      enRouteAt: null,
      completedAt: null,
      eta: null,
      providerLocation: null
    };
    setRequests(prev => [newRequest, ...prev]);
    return newRequest;
  };

  // Update request status with enhanced workflow
  const updateRequestStatus = (requestId, status, updates = {}) => {
    const timestamp = new Date();
    let statusUpdates = { status };
    
    // Add timestamp based on status
    switch (status) {
      case 'accepted':
        statusUpdates.acceptedAt = timestamp;
        // Clear any existing tracking data when accepted
        statusUpdates.eta = null;
        statusUpdates.providerLocation = null;
        break;
      case 'en_route':
        statusUpdates.enRouteAt = timestamp;
        // Generate random ETA between 10-30 minutes
        statusUpdates.eta = Math.floor(Math.random() * 20) + 10;
        // Set mock provider location
        statusUpdates.providerLocation = {
          lat: GHANA_LOCATIONS.ACCRA.lat + (Math.random() - 0.5) * 0.01,
          lng: GHANA_LOCATIONS.ACCRA.lng + (Math.random() - 0.5) * 0.01
        };
        break;
      case 'completed':
        statusUpdates.completedAt = timestamp;
        // Stop tracking when completed
        stopTracking(requestId);
        break;
    }
    
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, ...statusUpdates, ...updates }
          : req
      )
    );
    
    console.log(`🔍 REQUEST: Status updated to ${status} for request ${requestId}`);
  };

  // Start tracking for a request (enables live location and ETA)
  const startTracking = (requestId) => {
    const request = requests.find(req => req.id === requestId);
    if (!request || request.status !== 'accepted') {
      console.log(`🔍 TRACKING: Cannot start tracking - request ${requestId} is not in 'accepted' status`);
      return false;
    }
    
    console.log(`🔍 TRACKING: Starting job for request ${requestId} - changing status to 'en_route'`);
    
    // Update status to en_route
    updateRequestStatus(requestId, 'en_route');
    
    // Initialize tracking data
    setTrackingData(prev => ({
      ...prev,
      [requestId]: {
        isActive: true,
        startTime: new Date(),
        eta: Math.floor(Math.random() * 20) + 10,
        currentLocation: {
          lat: GHANA_LOCATIONS.ACCRA.lat + (Math.random() - 0.5) * 0.01,
          lng: GHANA_LOCATIONS.ACCRA.lng + (Math.random() - 0.5) * 0.01
        }
      }
    }));
    
    console.log(`🔍 TRACKING: Successfully started tracking for request ${requestId}`);
    return true;
  };

  // Stop tracking for a request
  const stopTracking = (requestId) => {
    setTrackingData(prev => ({
      ...prev,
      [requestId]: {
        ...prev[requestId],
        isActive: false
      }
    }));
    
    console.log(`🔍 TRACKING: Stopped tracking for request ${requestId}`);
  };

  // Add chat message
  const addChatMessage = (requestId, message) => {
    setChatMessages(prev => ({
      ...prev,
      [requestId]: [
        ...(prev[requestId] || []),
        {
          ...message,
          id: `msg-${Date.now()}`,
          timestamp: new Date()
        }
      ]
    }));
  };

  // Get requests for current user
  const getUserRequests = () => {
    if (!currentUser?.id) {
      console.log('🔍 APPCONTEXT: No current user ID, returning empty requests');
      return [];
    }
    
    if (userRole === 'customer') {
      return requests.filter(req => req.userId === currentUser.id);
    } else {
      return requests.filter(req => req.providerId === currentUser.id);
    }
  };

  // Get tracking data for a request
  const getTrackingData = (requestId) => {
    return trackingData[requestId] || null;
  };

  // Check if request is being tracked
  const isRequestTracked = (requestId) => {
    return trackingData[requestId]?.isActive || false;
  };

  // Get a specific request by ID
  const getRequestById = (requestId) => {
    return requests.find(req => req.id === requestId) || null;
  };

  // Get chat messages for a request
  const getChatMessages = (requestId) => {
    return chatMessages[requestId] || [];
  };

  // Get request status (alias for getRequestById)
  const getRequestStatus = (requestId) => {
    const request = getRequestById(requestId);
    return request ? request.status : null;
  };

  // Update user profile
  const updateUserProfile = (profileData) => {
    setCurrentUser(prev => ({
      ...prev,
      ...profileData
    }));
    console.log('🔍 APPCONTEXT: User profile updated:', profileData);
  };

  const value = {
    // Authentication state
    isAuthenticated,
    login,
    logout,
    
    // User state
    userRole,
    currentUser,
    userLocation,
    setUserLocation,
    switchRole,
    updateUserProfile,
    
    // Requests
    requests,
    addRequest,
    updateRequestStatus,
    getUserRequests,
    getRequestById,
    getRequestStatus,
    
    // Tracking
    trackingData,
    startTracking,
    stopTracking,
    getTrackingData,
    isRequestTracked,
    
    // Chat
    chatMessages,
    addChatMessage,
    getChatMessages,
    
    // Utility
    isCustomer: userRole === 'customer',
    isProvider: userRole === 'provider'
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};