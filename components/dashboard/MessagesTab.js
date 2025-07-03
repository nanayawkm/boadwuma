import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '../../contexts/AppContext';
import { 
  MessageSquare, 
  Clock, 
  User, 
  Search,
  Send,
  MoreVertical
} from 'lucide-react';

export default function MessagesTab() {
  const router = useRouter();
  const { currentUser, getChatMessages, getUserRequests } = useApp();
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      // Get user's requests to create conversations
      const userRequests = getUserRequests();
      const userConversations = userRequests.map(request => {
        const messages = getChatMessages(request.id);
        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
        
        return {
          id: request.id,
          requestId: request.id,
          service: request.service,
          status: request.status,
          lastMessage: lastMessage?.message || 'No messages yet',
          lastMessageTime: lastMessage?.timestamp || request.timestamp,
          unreadCount: messages.filter(msg => !msg.read && msg.senderId !== currentUser?.id).length,
          otherUser: {
            name: currentUser?.role === 'customer' ? request.provider : request.customer,
            avatar: null
          }
        };
      });

      setConversations(userConversations);
    } catch (error) {
      console.error('🔍 MESSAGES TAB: Error loading conversations:', error);
      setConversations([]);
    }
  }, [getUserRequests, getChatMessages, currentUser]);

  const filteredConversations = conversations.filter(conversation =>
    conversation.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return '';
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
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

  const handleConversationClick = (conversationId) => {
    router.push(`/chat/${conversationId}`);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Messages</h2>
        <p className="text-gray-600 text-sm">Chat with service providers and customers</p>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input pr-12"
        />
        <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Conversations List */}
      <div className="space-y-2">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => handleConversationClick(conversation.id)}
            className="card p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 font-semibold text-lg">
                  {conversation.otherUser.name.charAt(0)}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-gray-900 truncate">
                    {conversation.otherUser.name}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className={`status-badge ${getStatusColor(conversation.status)}`}>
                      {getStatusText(conversation.status)}
                    </span>
                    {conversation.unreadCount > 0 && (
                      <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-1">{conversation.service}</p>
                <p className="text-sm text-gray-500 truncate">
                  {conversation.lastMessage}
                </p>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">
                    {formatTimeAgo(conversation.lastMessageTime)}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredConversations.length === 0 && (
        <div className="card p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
          <p className="text-gray-600 text-sm mb-4">
            {searchQuery 
              ? 'No conversations match your search.' 
              : 'Start a conversation by requesting a service or accepting a request.'
            }
          </p>
          {!searchQuery && (
            <button 
              onClick={() => router.push('/post-request')}
              className="btn-primary"
            >
              Request Service
            </button>
          )}
        </div>
      )}
    </div>
  );
} 