import { useState } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '../../contexts/AppContext';
import { MessageSquare, Clock, CheckCircle, User } from 'lucide-react';

export default function MessagesTab() {
  const { userRole } = useApp();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for messages/conversations
  const conversations = [
    {
      id: 1,
      name: 'Kwame Asante',
      lastMessage: 'I\'ll be there in 30 minutes',
      time: '2 min ago',
      unread: 1,
      avatar: 'K',
      status: 'online',
      service: 'Plumbing',
      requestId: 1
    },
    {
      id: 2,
      name: 'Ama Osei',
      lastMessage: 'The work has been completed successfully',
      time: '1 hour ago',
      unread: 0,
      avatar: 'A',
      status: 'offline',
      service: 'Electrical',
      requestId: 2
    },
    {
      id: 3,
      name: 'Yaw Mensah',
      lastMessage: 'Can you send me the exact location?',
      time: '3 hours ago',
      unread: 2,
      avatar: 'Y',
      status: 'online',
      service: 'AC Repair',
      requestId: 3
    },
    {
      id: 4,
      name: 'Efua Addo',
      lastMessage: 'Thank you for the excellent service!',
      time: '1 day ago',
      unread: 0,
      avatar: 'E',
      status: 'offline',
      service: 'Carpentry',
      requestId: 4
    }
  ];

  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationClick = (conversationId) => {
    router.push(`/chat/${conversationId}`);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Messages</h2>
        <p className="text-gray-600 text-sm">
          Chat with {userRole === 'customer' ? 'service providers' : 'customers'} about your requests
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <MessageSquare size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Conversations List */}
      <div className="space-y-2">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => handleConversationClick(conversation.id)}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-lg">
                    {conversation.avatar}
                  </span>
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  conversation.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-gray-900 truncate">{conversation.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                    {conversation.unread > 0 && (
                      <span className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-1 truncate">{conversation.lastMessage}</p>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {conversation.service}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">Request #{conversation.requestId}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredConversations.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations found</h3>
          <p className="text-gray-600 text-sm">
            {searchQuery 
              ? 'No conversations match your search.' 
              : 'Start a conversation by accepting or creating a service request.'
            }
          </p>
        </div>
      )}

      {/* Quick Actions */}
      {filteredConversations.length > 0 && (
        <div className="bg-primary-50 rounded-xl p-4">
          <h4 className="font-medium text-primary-900 mb-2">Quick Actions</h4>
          <div className="flex space-x-2">
            <button className="flex-1 bg-primary-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
              Mark All Read
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 