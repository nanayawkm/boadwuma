import { useState } from 'react';
import { useRouter } from 'next/router';
import { Clock, CheckCircle, MessageSquare, MapPin, Star, ArrowRight, Navigation } from 'lucide-react';
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
        return { text: 'Pending', class: 'bg-gray-100 text-gray-800' };
      case 'accepted':
        return { text: 'Accepted', class: 'bg-yellow-100 text-yellow-800' };
      case 'en_route':
        return { text: 'En Route', class: 'bg-blue-100 text-blue-800' };
      case 'completed':
        return { text: 'Completed', class: 'bg-green-100 text-green-800' };
      default:
        return { text: 'Unknown', class: 'bg-gray-100 text-gray-800' };
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
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-4 text-white">
        <h2 className="text-lg font-semibold mb-1">Good morning!</h2>
        <p className="text-primary-100 text-sm">
          You have {newRequests.length} new requests • {acceptedJobs.length} accepted jobs • {activeJobs.length} active jobs
        </p>
      </div>

      {/* New Requests */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">New Requests</h3>
        {newRequests.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500">No new requests at the moment</p>
          </div>
        ) : (
          <div className="space-y-3">
            {newRequests.map((request) => (
              <div key={request.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
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
                    className="flex-1 bg-primary-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRequestAction(request.id, 'message')}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
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
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Accepted Jobs</h3>
        {acceptedJobs.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500">No accepted jobs at the moment</p>
          </div>
        ) : (
          <div className="space-y-3">
            {acceptedJobs.map((job) => {
              const statusInfo = getStatusDisplay(job.status);
              const progress = getProgressPercentage(job.status);
              
              return (
                <div key={job.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
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
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.class}`}>
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
                      className="flex-1 bg-primary-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors flex items-center justify-center"
                    >
                      <Navigation size={16} className="mr-1" />
                      Start Job
                    </button>
                    <button
                      onClick={() => handleJobAction(job.id, 'message')}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
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

      {/* Active Jobs (En Route) */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Active Jobs</h3>
        {activeJobs.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500">No active jobs at the moment</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeJobs.map((job) => {
              const statusInfo = getStatusDisplay(job.status);
              const progress = getProgressPercentage(job.status);
              
              return (
                <div key={job.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
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
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.class}`}>
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
                      className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
                    >
                      <CheckCircle size={16} className="mr-1" />
                      Mark Complete
                    </button>
                    <button
                      onClick={() => handleJobAction(job.id, 'message')}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
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

      {/* Quick Stats */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">This Week</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">₵2,450</div>
              <div className="text-sm text-gray-600">Earnings</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-gray-600">Jobs Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 