import { useState } from 'react';
import { useRouter } from 'next/router';
import { Clock, CheckCircle, MessageSquare, MapPin, Star, ArrowRight, Navigation, TrendingUp, DollarSign, Users } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function ProviderDashboard() {
  const router = useRouter();
  const { 
    requests, 
    updateRequestStatus, 
    startTracking,
    addChatMessage, 
    currentUser 
  } = useApp();
  
  // Get pending requests (requests that haven't been accepted yet)
  const newRequests = requests.filter(req => req.status === 'pending');
  
  // Get accepted jobs (accepted requests that haven't started yet)
  const acceptedJobs = requests.filter(req => req.status === 'accepted');
  
  // Get active jobs (en_route requests)
  const activeJobs = requests.filter(req => req.status === 'en_route');

  const stats = [
    {
      icon: TrendingUp,
      label: 'This Week',
      value: '₵2,450',
      color: 'text-primary-600'
    },
    {
      icon: Users,
      label: 'Jobs Done',
      value: '12',
      color: 'text-success-600'
    },
    {
      icon: Star,
      label: 'Rating',
      value: '4.8',
      color: 'text-accent-600'
    }
  ];

  const handleRequestAction = (requestId, action) => {
    console.log(`${action} request ${requestId}`);
    
    if (action === 'accept') {
      // Accept the request
      updateRequestStatus(requestId, 'accepted');
      alert('Request accepted! You can now start the job when ready.');
    } else if (action === 'message') {
      // Navigate to chat
      router.push(`/chat/${requestId}`);
    }
  };

  const handleJobAction = (jobId, action) => {
    console.log(`${action} job ${jobId}`);
    
    if (action === 'start') {
      // Start the job - this triggers the "en_route" status with tracking
      const success = startTracking(jobId);
      if (success) {
        alert('Job started! You are now en route. Customer can track your location.');
      } else {
        alert('Unable to start job. Please try again.');
      }
    } else if (action === 'complete') {
      // Mark job as complete
      updateRequestStatus(jobId, 'completed');
      alert('Job marked as complete! Waiting for customer confirmation.');
    } else if (action === 'message') {
      // Navigate to chat
      router.push(`/chat/${jobId}`);
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'pending':
        return { text: 'Pending', class: 'status-pending' };
      case 'accepted':
        return { text: 'Accepted', class: 'status-accepted' };
      case 'en_route':
        return { text: 'En Route', class: 'status-en-route' };
      case 'completed':
        return { text: 'Completed', class: 'status-completed' };
      default:
        return { text: 'Unknown', class: 'status-pending' };
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'accepted':
        return 25;
      case 'en_route':
        return 75;
      case 'completed':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Good morning, {currentUser?.name?.split(' ')[0] || 'Provider'}!
            </h1>
            <p className="text-gray-600 mt-1">
              You have {newRequests.length} new requests • {acceptedJobs.length} accepted jobs • {activeJobs.length} active jobs
            </p>
          </div>
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-bold text-lg">
              {currentUser?.name?.charAt(0) || 'P'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-4 text-center">
              <Icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* New Requests */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">New Requests</h2>
          <span className="status-badge status-pending">{newRequests.length}</span>
        </div>
        
        {newRequests.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No new requests</h3>
            <p className="text-gray-600 text-sm">New service requests will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {newRequests.map((request) => (
              <div key={request.id} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{request.customerName || 'Customer'}</h4>
                    <p className="text-gray-500 text-sm">{request.service}</p>
                    <p className="text-gray-700 text-sm mt-1">{request.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary-600">{request.price || '₵150'}</p>
                    <p className="text-gray-500 text-xs">{request.time || '2 hours ago'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <MapPin size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {typeof request.location === 'object' && request.location?.name 
                      ? request.location.name 
                      : request.location || 'Location unavailable'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRequestAction(request.id, 'accept')}
                    className="btn-primary flex-1"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRequestAction(request.id, 'message')}
                    className="btn-secondary flex items-center justify-center"
                  >
                    <MessageSquare size={16} className="mr-1" />
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accepted Jobs */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Accepted Jobs</h2>
          <span className="status-badge status-accepted">{acceptedJobs.length}</span>
        </div>
        
        {acceptedJobs.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No accepted jobs</h3>
            <p className="text-gray-600 text-sm">Accepted requests will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {acceptedJobs.map((job) => {
              const statusInfo = getStatusDisplay(job.status);
              const progress = getProgressPercentage(job.status);
              
              return (
                <div key={job.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{job.customerName || 'Customer'}</h4>
                      <p className="text-gray-500 text-sm">{job.service}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{job.scheduledTime || 'Today, 2:00 PM'}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`status-badge ${statusInfo.class}`}>
                        {statusInfo.text}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {typeof job.location === 'object' && job.location?.name 
                        ? job.location.name 
                        : job.location || 'Location unavailable'}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleJobAction(job.id, 'start')}
                      className="btn-primary flex items-center justify-center flex-1"
                    >
                      <Navigation size={16} className="mr-1" />
                      Start Job
                    </button>
                    <button
                      onClick={() => handleJobAction(job.id, 'message')}
                      className="btn-secondary flex items-center justify-center"
                    >
                      <MessageSquare size={16} className="mr-1" />
                      Chat
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Active Jobs */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Active Jobs</h2>
          <span className="status-badge status-en-route">{activeJobs.length}</span>
        </div>
        
        {activeJobs.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Navigation size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No active jobs</h3>
            <p className="text-gray-600 text-sm">Jobs in progress will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeJobs.map((job) => {
              const statusInfo = getStatusDisplay(job.status);
              const progress = getProgressPercentage(job.status);
              
              return (
                <div key={job.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{job.customerName || 'Customer'}</h4>
                      <p className="text-gray-500 text-sm">{job.service}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{job.scheduledTime || 'Today, 2:00 PM'}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`status-badge ${statusInfo.class}`}>
                        {statusInfo.text}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {typeof job.location === 'object' && job.location?.name 
                        ? job.location.name 
                        : job.location || 'Location unavailable'}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleJobAction(job.id, 'complete')}
                      className="btn-success flex items-center justify-center flex-1"
                    >
                      <CheckCircle size={16} className="mr-1" />
                      Mark Complete
                    </button>
                    <button
                      onClick={() => handleJobAction(job.id, 'message')}
                      className="btn-secondary flex items-center justify-center"
                    >
                      <MessageSquare size={16} className="mr-1" />
                      Chat
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 