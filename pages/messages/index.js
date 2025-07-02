import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { Send, ArrowLeft, MoreVertical, Check, CheckCheck, Calendar, Wrench } from 'lucide-react';
import { conversations, messages, serviceProviders, currentUser } from '../../data/mockData';

const MessageStatus = ({ status }) => {
  switch (status) {
    case 'sent':
      return <Check size={10} className="sm:w-3 sm:h-3 text-gray-400" />;
    case 'delivered':
      return <CheckCheck size={10} className="sm:w-3 sm:h-3 text-gray-400" />;
    case 'seen':
      return <CheckCheck size={10} className="sm:w-3 sm:h-3 text-blue-500" />;
    default:
      return null;
  }
};

const TypingIndicator = () => (
  <div className="flex items-center space-x-1 text-gray-500 text-xs sm:text-sm px-4 py-2">
    <div className="flex space-x-1">
      <div className="typing-dot"></div>
      <div className="typing-dot"></div>
      <div className="typing-dot"></div>
    </div>
    <span className="ml-2">Typing...</span>
  </div>
);

const BookingModal = ({ isOpen, onClose, provider }) => {
  const [selectedService, setSelectedService] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const services = [
    'Plumbing Repair',
    'Electrical Work',
    'Air Conditioning',
    'Appliance Repair',
    'General Maintenance'
  ];

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleBooking = (e) => {
    e.preventDefault();
    // Handle booking logic here
    console.log('Booking:', { selectedService, description, selectedDate, selectedTime });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold">Book Service</h3>
            <button onClick={onClose} className="text-gray-500 text-xl">×</button>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">with {provider?.name}</p>
        </div>
        
        <form onSubmit={handleBooking} className="p-4 space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Service Type</label>
            <select 
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:ring-whatsapp-green-500 focus:border-transparent text-sm sm:text-base"
              required
            >
              <option value="">Select a service</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Issue Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Fridge not cooling, AC making noise..."
              className="w-full p-2.5 sm:p-3 border rounded-lg h-16 sm:h-20 resize-none focus:ring-2 focus:ring-whatsapp-green-500 focus:border-transparent text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Preferred Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:ring-whatsapp-green-500 focus:border-transparent text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Preferred Time</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:ring-whatsapp-green-500 focus:border-transparent text-sm sm:text-base"
              required
            >
              <option value="">Select time</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-whatsapp-green-500 text-white rounded-lg hover:bg-whatsapp-green-600 text-sm sm:text-base"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Messages() {
  const router = useRouter();
  const { provider: providerId } = router.query;
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [conversationMessages, setConversationMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [quickReplies] = useState([
    "What's the issue?",
    "When are you available?",
    "What's your rate?",
    "Can you come today?"
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationMessages, isTyping]);

  useEffect(() => {
    if (providerId) {
      const provider = serviceProviders.find(p => p.id === providerId);
      if (provider) {
        const existingConv = conversations.find(c => 
          c.participants.includes(providerId)
        );

        if (existingConv) {
          setSelectedConversation(existingConv);
          loadMessages(existingConv.id);
        } else {
          const newConversation = {
            id: `conv_${Date.now()}`,
            participants: [currentUser.id, providerId],
            lastMessage: '',
            lastMessageTime: new Date().toISOString(),
            unreadCount: 0,
            providerName: provider.name,
            providerAvatar: provider.avatar
          };
          setSelectedConversation(newConversation);
          setConversationMessages([]);
        }
      }
    }
  }, [providerId]);

  const loadMessages = (conversationId) => {
    const convMessages = messages.filter(m => m.conversationId === conversationId)
      .map(msg => ({
        ...msg,
        status: msg.senderId === currentUser.id ? 'seen' : undefined
      }));
    setConversationMessages(convMessages);
  };

  const handleSendMessage = (e, customMessage = null) => {
    e?.preventDefault();
    const messageToSend = customMessage || messageText;
    if (!messageToSend.trim() || !selectedConversation) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      conversationId: selectedConversation.id,
      senderId: currentUser.id,
      receiverId: selectedConversation.participants.find(p => p !== currentUser.id),
      message: messageToSend,
      timestamp: new Date().toISOString(),
      isRead: false,
      status: 'sent'
    };

    setConversationMessages(prev => [...prev, newMessage]);
    setMessageText('');

    // Simulate message status updates
    setTimeout(() => {
      setConversationMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 500);

    // Simulate typing indicator and response
    setTimeout(() => {
      setIsTyping(true);
    }, 1000);

    setTimeout(() => {
      setIsTyping(false);
      setConversationMessages(prev => [
        ...prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'seen' } : msg
        ),
        {
          id: `msg_${Date.now() + 1}`,
          conversationId: selectedConversation.id,
          senderId: selectedConversation.participants.find(p => p !== currentUser.id),
          receiverId: currentUser.id,
          message: "Thanks for your message! I'll help you with that.",
          timestamp: new Date().toISOString(),
          isRead: false
        }
      ]);
    }, 2500);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
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

  return (
    <>
      <Head>
        <title>Messages - Boadwuma</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#22c55e" />
      </Head>

      <div className="h-screen flex bg-gray-100">
        {/* Conversations List */}
        <div className={`w-full md:w-80 bg-white ${selectedConversation ? 'hidden md:block' : 'block'}`}>
          <div className="p-3 sm:p-4 bg-whatsapp-green-600 text-white">
            <h2 className="text-lg sm:text-xl font-semibold">Chats</h2>
          </div>
          <div className="overflow-y-auto h-full">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => {
                  setSelectedConversation(conversation);
                  loadMessages(conversation.id);
                }}
                className={`w-full p-3 sm:p-4 hover:bg-gray-50 flex items-center space-x-2 sm:space-x-3 transition-colors touch-target ${
                  selectedConversation?.id === conversation.id ? 'bg-gray-100' : ''
                }`}
              >
                <div className="relative">
                  <Image
                    src={conversation.providerAvatar}
                    alt={conversation.providerName}
                    width={40}
                    height={40}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                  {conversation.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-whatsapp-green-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 truncate text-sm sm:text-base">{conversation.providerName}</h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {formatTime(conversation.lastMessageTime)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${selectedConversation ? 'block' : 'hidden md:flex'}`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-3 sm:p-4 bg-white border-b flex items-center shadow-sm">
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="md:hidden mr-2 sm:mr-3 p-1 text-gray-600 hover:text-gray-900 touch-target"
                >
                  <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
                </button>
                <Image
                  src={selectedConversation.providerAvatar}
                  alt={selectedConversation.providerName}
                  width={36}
                  height={36}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                />
                <div className="ml-2 sm:ml-3 flex-1">
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base">{selectedConversation.providerName}</h3>
                  <p className="text-xs sm:text-sm text-whatsapp-green-600">online</p>
                </div>
                <button className="p-1 sm:p-2 text-gray-600 hover:text-gray-900 touch-target">
                  <MoreVertical size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 chat-background">
                {conversationMessages.map((message, index) => {
                  const showDate = index === 0 || 
                    formatDate(message.timestamp) !== formatDate(conversationMessages[index - 1].timestamp);
                  
                  return (
                    <div key={message.id}>
                      {showDate && (
                        <div className="flex justify-center mb-3 sm:mb-4">
                          <span className="bg-white bg-opacity-90 text-gray-600 text-xs px-2 sm:px-3 py-1 rounded-full shadow-sm">
                            {formatDate(message.timestamp)}
                          </span>
                        </div>
                      )}
                      <div className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'} mb-1`}>
                        <div className={`max-w-[75%] sm:max-w-xs md:max-w-sm px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl shadow-sm ${
                          message.senderId === currentUser.id
                            ? 'bg-whatsapp-green-500 text-white rounded-br-md'
                            : 'bg-white text-gray-900 rounded-bl-md'
                        }`}>
                          <p className="text-xs sm:text-sm leading-relaxed">{message.message}</p>
                          <div className={`flex items-center justify-end mt-1 space-x-1 ${
                            message.senderId === currentUser.id ? 'text-whatsapp-green-100' : 'text-gray-500'
                          }`}>
                            <span className="text-xs">{formatTime(message.timestamp)}</span>
                            {message.senderId === currentUser.id && (
                              <MessageStatus status={message.status} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="px-3 sm:px-4 py-2 bg-white border-t">
                <div className="flex space-x-1.5 sm:space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={(e) => handleSendMessage(e, reply)}
                      className="quick-reply flex-shrink-0 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="p-3 sm:p-4 bg-white border-t">
                <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type a message"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-whatsapp-green-500 focus:bg-white transition-colors text-sm sm:text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!messageText.trim()}
                    className="p-2.5 sm:p-3 bg-whatsapp-green-500 text-white rounded-full hover:bg-whatsapp-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-target"
                  >
                    <Send size={16} className="sm:w-4 sm:h-4" />
                  </button>
                </form>
              </div>

              {/* Floating Book Now Button */}
              <button
                onClick={() => setShowBookingModal(true)}
                className="floating-btn fixed bottom-20 sm:bottom-24 right-4 sm:right-6 bg-whatsapp-green-500 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-whatsapp-green-600 transition-all transform hover:scale-105 z-40 touch-target"
              >
                <Calendar size={20} className="sm:w-6 sm:h-6" />
                <span className="sr-only">Book Now</span>
              </button>

              {/* Floating Service Issues Button */}
              <button
                onClick={() => setShowBookingModal(true)}
                className="floating-btn fixed bottom-32 sm:bottom-36 right-4 sm:right-6 bg-orange-500 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-orange-600 transition-all transform hover:scale-105 z-40 touch-target"
              >
                <Wrench size={20} className="sm:w-6 sm:h-6" />
                <span className="sr-only">Service Issues</span>
              </button>

              {/* Booking Modal */}
              <BookingModal
                isOpen={showBookingModal}
                onClose={() => setShowBookingModal(false)}
                provider={serviceProviders.find(p => p.id === selectedConversation?.participants.find(p => p !== currentUser.id))}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  Choose a provider to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}