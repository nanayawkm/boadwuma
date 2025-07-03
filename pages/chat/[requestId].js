import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useApp } from '../../contexts/AppContext';
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  CheckCircle2,
  Star,
  MapPin,
  User,
  Clock
} from 'lucide-react';
import { 
  MOCK_CHAT_MESSAGES, 
  MOCK_PROVIDERS, 
  MOCK_USERS, 
  formatTimeAgo,
  PAYMENT_METHODS 
} from '../../data/mockData';

export default function ChatPage() {
  const router = useRouter();
  const { requestId } = router.query;
  const { 
    currentUser, 
    userRole, 
    getRequestById, 
    getChatMessages, 
    addChatMessage,
    getRequestStatus,
    updateRequestStatus
  } = useApp();
  
  const [message, setMessage] = useState('');
  const [request, setRequest] = useState(null);
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (requestId) {
      const requestData = getRequestById(requestId);
      setRequest(requestData);
      
      if (requestData) {
        // Determine the other user (customer or provider)
        const isCustomer = userRole === 'customer';
        const otherUserName = isCustomer ? requestData.provider : requestData.customer;
        setOtherUser({
          name: otherUserName,
          phone: '+233 20 123 4567', // Mock phone number
          avatar: otherUserName?.charAt(0) || 'U'
        });
      }
    }
  }, [requestId, userRole, getRequestById]);

  useEffect(() => {
    if (requestId) {
      const chatMessages = getChatMessages(requestId);
      setMessages(chatMessages);
    }
  }, [requestId, getChatMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && requestId) {
      addChatMessage(requestId, {
        senderId: currentUser?.id,
        senderType: userRole,
        message: message.trim(),
        timestamp: new Date(),
        type: 'text'
      });
      setMessage('');
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'accepted':
        return 'status-accepted';
      case 'en_route':
        return 'status-en-route';
      case 'completed':
        return 'status-completed';
      default:
        return 'status-pending';
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
      default:
        return status;
    }
  };

  const handleCustomerConfirmation = (confirmed) => {
    if (confirmed) {
      setShowCompletionModal(true);
    } else {
      // Handle "No" - could open a dispute or feedback form
      alert('Please contact the provider to resolve any issues.');
    }
  };

  const handleRatingSubmit = () => {
    if (rating > 0) {
      updateRequestStatus(requestId, 'rated', {
        rating,
        review: review.trim(),
        paymentMethod
      });
      setShowCompletionModal(false);
      router.push('/');
    }
  };

  if (!request) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Request not found</h3>
          <p className="text-gray-600 text-sm">The chat you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Chat with {otherUser?.name} | Boadwuma</title>
      </Head>

      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold text-lg">
                  {otherUser?.avatar || 'U'}
                </span>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{otherUser?.name || 'User'}</h2>
                <div className="flex items-center space-x-2">
                  <span className={`status-badge ${getStatusColor(request.status)}`}>
                    {getStatusText(request.status)}
                  </span>
                  <span className="text-sm text-gray-500">• {request.service}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <a
                href={`tel:${otherUser?.phone}`}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
              <p className="text-gray-600 text-sm">Start the conversation by sending a message.</p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isOwnMessage = msg.senderId === currentUser?.id;
              const showDate = index === 0 || 
                formatDate(msg.timestamp) !== formatDate(messages[index - 1]?.timestamp);
              
              return (
                <div key={index}>
                  {showDate && (
                    <div className="text-center mb-4">
                      <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                        {formatDate(msg.timestamp)}
                      </span>
                    </div>
                  )}
                  
                  <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                      <div className={`chat-bubble ${isOwnMessage ? 'sent' : 'received'}`}>
                        {msg.type === 'system' ? (
                          <div className="text-center text-sm opacity-75">
                            {msg.message}
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm">{msg.message}</p>
                            <p className="text-xs opacity-75 mt-1">
                              {formatTime(msg.timestamp)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="input flex-1"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="w-12 h-12 bg-primary-600 text-white rounded-xl flex items-center justify-center hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </form>
        </div>

        {/* Completion Modal */}
        {showCompletionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-900 mb-4 font-display">
                  Rate Your Experience
                </h3>

                {/* Star Rating */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-text-900 mb-2">
                    Rating
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-neutral-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-text-900 mb-2">
                    Review (optional)
                  </label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Share your experience..."
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 h-20 resize-none"
                  />
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-text-900 mb-2">
                    How did you pay?
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  >
                    <option value="">Select payment method...</option>
                    {PAYMENT_METHODS.map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.icon} {method.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCompletionModal(false)}
                    className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    Skip
                  </button>
                  <button
                    onClick={handleRatingSubmit}
                    disabled={rating === 0}
                    className="flex-1 bg-accent-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}