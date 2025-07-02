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
  MapPin
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
  const { currentUser, userRole, chatMessages, addChatMessage, updateRequestStatus } = useApp();
  const [message, setMessage] = useState('');
  const [request, setRequest] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (requestId) {
      // Find the request (mock data)
      const mockRequest = {
        id: requestId,
        userId: 'user-1',
        providerId: 'provider-1',
        service: 'Fridge Repair',
        status: 'in_progress',
        timestamp: new Date(),
        location: { name: 'Accra' }
      };
      setRequest(mockRequest);

      // Get other user (provider or customer)
      if (userRole === 'customer') {
        const provider = MOCK_PROVIDERS.find(p => p.id === mockRequest.providerId);
        setOtherUser(provider);
      } else {
        const customer = MOCK_USERS.find(u => u.id === mockRequest.userId);
        setOtherUser(customer);
      }

      // Get chat messages
      const chatHistory = MOCK_CHAT_MESSAGES[requestId] || [];
      setMessages(chatHistory);
    }
  }, [requestId, userRole]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      senderId: currentUser.id,
      senderType: userRole,
      message: message.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Add to context
    addChatMessage(requestId, newMessage);
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

  if (!request || !otherUser) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Chat with {otherUser.name} | Boadwuma</title>
      </Head>

      <div className="min-h-screen bg-background-50 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-neutral-200 sticky top-16 z-30">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => router.back()}
                  className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                
                <img
                  src={otherUser.avatar}
                  alt={otherUser.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser.name)}&background=2B4C7E&color=fff`;
                  }}
                />
                
                <div>
                  <h2 className="font-semibold text-text-900">{otherUser.name}</h2>
                  <p className="text-sm text-neutral-600">{request.service}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={`tel:${otherUser.phone}`}
                  className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-4 overflow-y-auto">
          <div className="space-y-4">
            {/* Service Request Header */}
            <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
              <div className="flex items-center mb-2">
                <MapPin className="w-4 h-4 text-neutral-500 mr-1" />
                <span className="text-sm text-neutral-600">
                  {typeof request.location === 'object' && request.location?.name 
                    ? request.location.name 
                    : request.location || 'Location unavailable'}
                </span>
                <span className="ml-2 text-sm text-neutral-500">•</span>
                <span className="ml-2 text-sm text-neutral-500">{formatTimeAgo(request.timestamp)}</span>
              </div>
              <h3 className="font-medium text-text-900 mb-1">{request.service} Request</h3>
              <p className="text-sm text-neutral-700">Chat with your service provider to discuss details and pricing.</p>
            </div>

            {/* Chat Messages */}
            {messages.map((msg, index) => {
              const isCurrentUser = msg.senderId === currentUser.id;
              const isStatusMessage = msg.type === 'status';
              
              if (isStatusMessage) {
                return (
                  <div key={index} className="flex justify-center">
                    <div className="bg-accent-50 text-accent-700 px-3 py-1 rounded-full text-sm border border-accent-200">
                      {msg.message}
                    </div>
                  </div>
                );
              }

              return (
                <div key={index} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-bubble ${
                    isCurrentUser
                      ? 'bg-accent-500 text-white'
                      : 'bg-white text-text-900 border border-neutral-200'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      isCurrentUser ? 'text-accent-100' : 'text-neutral-500'
                    }`}>
                      {formatTimeAgo(msg.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Job Completion Prompt */}
            {request.status === 'completed' && userRole === 'customer' && (
              <div className="bg-white rounded-lg p-4 border border-neutral-200">
                <h3 className="font-medium text-text-900 mb-3">Has the job been completed?</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleCustomerConfirmation(true)}
                    className="flex items-center px-4 py-2 bg-success-500 text-white rounded-lg font-medium hover:bg-success-600 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Yes
                  </button>
                  <button
                    onClick={() => handleCustomerConfirmation(false)}
                    className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-neutral-200 sticky bottom-0">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center space-x-3">
              <form onSubmit={handleSendMessage} className="flex-1 flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
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