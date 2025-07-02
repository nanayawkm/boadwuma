import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '../../contexts/AppContext';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  MessageSquare, 
  MapPin, 
  Calendar, 
  FileText, 
  Navigation,
  Play,
  StopCircle,
  Star,
  User
} from 'lucide-react';
import LiveTracking from '../LiveTracking';
import StartJobPrompt from '../StartJobPrompt';
import JobCompletionModal from '../JobCompletionModal';

export default function RequestsTab() {
  const { 
    userRole, 
    currentUser, 
    getUserRequests, 
    updateRequestStatus, 
    startTracking, 
    stopTracking,
    getTrackingData,
    isRequestTracked,
    addChatMessage 
  } = useApp();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');
  const [requests, setRequests] = useState([]);
  const [showStartPrompt, setShowStartPrompt] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedRequest, setCompletedRequest] = useState(null);

  // Load user requests
  useEffect(() => {
    try {
      const userRequests = getUserRequests();
      setRequests(userRequests);
    } catch (error) {
      console.error('🔍 REQUESTS TAB: Error loading requests:', error);
      setRequests([]);
    }
  }, [getUserRequests]);

    // Mock data for demonstration (remove this when real data is available)
  useEffect(() => {
    try {
      if (requests.length === 0 && currentUser?.id) {
        const mockRequests = [
          {
            id: 'req-1',
            service: 'Plumbing',
            description: 'Leaking faucet in kitchen needs repair',
            status: 'pending',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            location: 'Accra Central',
            price: '₵150',
            userId: userRole === 'customer' ? currentUser?.id : 'customer-1',
            providerId: userRole === 'provider' ? currentUser?.id : 'provider-1',
            provider: userRole === 'customer' ? 'Kwame Plumbing' : 'Kwame Asante',
            customer: userRole === 'provider' ? 'John Doe' : 'You',
            acceptedAt: null,
            enRouteAt: null,
            completedAt: null,
            eta: null,
            providerLocation: null
          },
          {
            id: 'req-2',
            service: 'Electrical',
            description: 'Power outlet not working in living room',
            status: 'accepted',
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
            location: 'East Legon',
            price: '₵200',
            userId: userRole === 'customer' ? currentUser?.id : 'customer-2',
            providerId: userRole === 'provider' ? currentUser?.id : 'provider-2',
            provider: userRole === 'customer' ? 'Ama Electrical' : 'Ama Osei',
            customer: userRole === 'provider' ? 'Jane Smith' : 'You',
            acceptedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
            enRouteAt: null,
            completedAt: null,
            eta: null,
            providerLocation: null
          },
          {
            id: 'req-3',
            service: 'AC Repair',
            description: 'AC unit not cooling properly',
            status: 'en_route',
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
            location: 'Tema',
            price: '₵300',
            userId: userRole === 'customer' ? currentUser?.id : 'customer-3',
            providerId: userRole === 'provider' ? currentUser?.id : 'provider-3',
            provider: userRole === 'customer' ? 'Yaw AC Services' : 'Yaw Mensah',
            customer: userRole === 'provider' ? 'Mike Johnson' : 'You',
            acceptedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            enRouteAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
            completedAt: null,
            eta: 18,
            providerLocation: { lat: 5.6037, lng: -0.1870 }
          },
          {
            id: 'req-4',
            service: 'Cleaning',
            description: 'Deep cleaning of 3-bedroom apartment',
            status: 'completed',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
            location: 'Osu',
            price: '₵400',
            userId: userRole === 'customer' ? currentUser?.id : 'customer-4',
            providerId: userRole === 'provider' ? currentUser?.id : 'provider-4',
            provider: userRole === 'customer' ? 'Clean Pro Services' : 'Akosua Osei',
            customer: userRole === 'provider' ? 'Sarah Wilson' : 'You',
            acceptedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
            enRouteAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            completedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
            eta: null,
            providerLocation: null
          }
        ];
        setRequests(mockRequests);
      }
    } catch (error) {
      console.error('🔍 REQUESTS TAB: Error setting up mock data:', error);
      setRequests([]);
    }
  }, [requests.length, userRole, currentUser]);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'accepted', label: 'Accepted' },
    { id: 'en_route', label: 'En Route' },
    { id: 'completed', label: 'Completed' }
  ];

  const filteredRequests = requests.filter(request => 
    activeFilter === 'all' || request.status === activeFilter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-blue-100 text-blue-800';
      case 'en_route':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />;
      case 'accepted':
        return <CheckCircle size={16} />;
      case 'en_route':
        return <Navigation size={16} />;
      case 'completed':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'accepted':
        return 'Accepted';
      case 'en_route':
        return 'En Route';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const handleAcceptRequest = (requestId) => {
    console.log(`🔍 REQUESTS: Accepting request ${requestId}`);
    updateRequestStatus(requestId, 'accepted');
    
    // Add a chat message to notify the customer
    addChatMessage(requestId, {
      sender: currentUser?.id,
      text: 'I have accepted your request. I will start the job soon.',
      type: 'system'
    });
    
    // Show start job prompt
    const request = requests.find(req => req.id === requestId);
    if (request) {
      console.log(`🔍 REQUESTS: Showing start job prompt for request ${requestId}`);
      setSelectedRequest(request);
      setShowStartPrompt(true);
    }
  };

  const handleStartJob = async () => {
    if (!selectedRequest) return;
    
    console.log(`🔍 REQUESTS: Starting job for request ${selectedRequest.id}`);
    const success = startTracking(selectedRequest.id);
    if (success) {
      console.log(`🔍 REQUESTS: Successfully started job for request ${selectedRequest.id}`);
      
      // Add a chat message to notify the customer
      addChatMessage(selectedRequest.id, {
        sender: currentUser?.id,
        text: 'I am now on my way to your location.',
        type: 'system'
      });
      
      setShowStartPrompt(false);
      setSelectedRequest(null);
    } else {
      console.log(`🔍 REQUESTS: Failed to start job for request ${selectedRequest.id}`);
    }
  };

  const handleSkipStartJob = () => {
    setShowStartPrompt(false);
    setSelectedRequest(null);
  };

  const handleCompleteJob = (requestId) => {
    console.log(`🔍 REQUESTS: Provider marking job as complete for request ${requestId}`);
    updateRequestStatus(requestId, 'completed');
    stopTracking(requestId);
    
    // Add a chat message to notify the customer
    addChatMessage(requestId, {
      sender: currentUser?.id,
      text: 'I have completed the job. Please confirm the completion and leave a review.',
      type: 'system'
    });
    
    console.log(`🔍 REQUESTS: Job marked as complete. Customer should now confirm and review.`);
  };

  const handleMessage = (requestId) => {
    router.push(`/chat/${requestId}`);
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return '';
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Start Job Prompt */}
      {showStartPrompt && selectedRequest && (
        <StartJobPrompt
          request={selectedRequest}
          onStartJob={handleStartJob}
          onSkip={handleSkipStartJob}
          onClose={handleSkipStartJob}
        />
      )}

      {/* Job Completion Modal */}
      {showCompletionModal && completedRequest && (
        <JobCompletionModal
          request={completedRequest}
          provider={{ name: completedRequest.provider }}
          onConfirm={(reviewData) => {
            console.log('Review submitted:', reviewData);
            setShowCompletionModal(false);
            setCompletedRequest(null);
          }}
          onClose={() => {
            setShowCompletionModal(false);
            setCompletedRequest(null);
          }}
        />
      )}
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Service Requests</h2>
        <p className="text-gray-600 text-sm">
          {userRole === 'customer' 
            ? 'Track your service requests and their status' 
            : 'Manage incoming and ongoing service requests'
          }
        </p>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {filteredRequests.map((request) => {
          const trackingData = getTrackingData(request.id);
          const isTracked = isRequestTracked(request.id);
          
          return (
            <div key={request.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{request.service}</h4>
                  <p className="text-gray-600 text-sm mt-1">{request.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {formatTimeAgo(request.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{request.location?.name || request.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span className="ml-1">{getStatusText(request.status)}</span>
                  </span>
                  <p className="font-semibold text-primary-600 mt-1">{request.price}</p>
                </div>
              </div>

              {/* Status-specific information */}
              {request.status === 'accepted' && (
                <div className="bg-blue-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-blue-600" />
                    <span className="text-sm text-blue-800 font-medium">
                      {userRole === 'customer' 
                        ? `${request.provider} has accepted your request. They will start the job soon.`
                        : 'Request accepted. Ready to start job?'
                      }
                    </span>
                  </div>
                </div>
              )}

              {request.status === 'en_route' && userRole === 'customer' && (
                <div className="mb-3">
                  <div className="bg-purple-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Navigation size={16} className="text-purple-600" />
                        <span className="text-sm text-purple-800 font-medium">
                          {request.provider} is on the way
                        </span>
                      </div>
                      {request.eta && (
                        <span className="text-sm text-purple-700 font-medium">
                          ETA: {request.eta} mins
                        </span>
                      )}
                    </div>
                  </div>
                  <LiveTracking 
                    request={request} 
                    provider={{ name: request.provider }}
                  />
                </div>
              )}

              {request.status === 'en_route' && userRole === 'provider' && (
                <div className="bg-purple-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Navigation size={16} className="text-purple-600" />
                      <span className="text-sm text-purple-800 font-medium">
                        En route to customer location
                      </span>
                    </div>
                    {request.eta && (
                      <span className="text-sm text-purple-700 font-medium">
                        ETA: {request.eta} mins
                      </span>
                    )}
                  </div>
                </div>
              )}

              {request.status === 'completed' && userRole === 'provider' && (
                <div className="bg-green-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-sm text-green-800 font-medium">
                      Job completed. Waiting for customer confirmation and review.
                    </span>
                  </div>
                </div>
              )}

              {request.status === 'completed' && userRole === 'customer' && (
                <div className="bg-green-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-sm text-green-800 font-medium">
                      Job completed! Please confirm and leave a review.
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <div className="text-sm">
                  <span className="text-gray-500">
                    {userRole === 'customer' ? 'Provider: ' : 'Customer: '}
                  </span>
                  <span className="text-gray-900 font-medium">
                    {userRole === 'customer' ? request.provider : request.customer}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {/* Provider Actions */}
                {userRole === 'provider' && request.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      className="flex-1 bg-primary-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                    >
                      Accept Request
                    </button>
                    <button
                      onClick={() => updateRequestStatus(request.id, 'cancelled')}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Decline
                    </button>
                  </>
                )}

                {userRole === 'provider' && request.status === 'accepted' && (
                  <button
                    onClick={() => {
                      setSelectedRequest(request);
                      setShowStartPrompt(true);
                    }}
                    className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
                  >
                    <Play size={16} className="mr-1" />
                    Start Job Now
                  </button>
                )}

                {userRole === 'provider' && request.status === 'en_route' && (
                  <button
                    onClick={() => handleCompleteJob(request.id)}
                    className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
                  >
                    <StopCircle size={16} className="mr-1" />
                    Mark as Done
                  </button>
                )}

                {/* Customer Actions */}
                {userRole === 'customer' && request.status === 'en_route' && (
                  <button
                    onClick={() => console.log('Provider is on the way for request:', request.id)}
                    className="flex-1 bg-purple-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors flex items-center justify-center"
                  >
                    <Navigation size={16} className="mr-1" />
                    Provider En Route
                  </button>
                )}

                {userRole === 'customer' && request.status === 'completed' && (
                  <button
                    onClick={() => {
                      setCompletedRequest(request);
                      setShowCompletionModal(true);
                    }}
                    className="flex-1 bg-primary-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors flex items-center justify-center"
                  >
                    <Star size={16} className="mr-1" />
                    Confirm & Review
                  </button>
                )}

                {/* Common Actions */}
                {(request.status === 'accepted' || request.status === 'en_route') && (
                  <button
                    onClick={() => handleMessage(request.id)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <MessageSquare size={16} className="mr-1" />
                    Message
                  </button>
                )}

                <button
                  onClick={() => console.log('View details for request:', request.id)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
          <p className="text-gray-600 text-sm">
            {activeFilter === 'all' 
              ? 'You don\'t have any service requests yet.' 
              : `No ${activeFilter} requests found.`
            }
          </p>
        </div>
      )}
    </div>
  );
} 