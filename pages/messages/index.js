import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { Send, ArrowLeft, MoreVertical } from 'lucide-react';
import { conversations, messages, serviceProviders, currentUser } from '../../data/mockData';

export default function Messages() {
  const router = useRouter();
  const { provider: providerId } = router.query;
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [conversationMessages, setConversationMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationMessages]);

  useEffect(() => {
    // If provider ID is provided in query, start a conversation with that provider
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
          // Create new conversation
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
    const convMessages = messages.filter(m => m.conversationId === conversationId);
    setConversationMessages(convMessages);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      conversationId: selectedConversation.id,
      senderId: currentUser.id,
      receiverId: selectedConversation.participants.find(p => p !== currentUser.id),
      message: messageText,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setConversationMessages([...conversationMessages, newMessage]);
    setMessageText('');
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      <Head>
        <title>Messages - Boadwuma</title>
      </Head>

      <div className="h-screen flex bg-white">
        {/* Conversations List - Desktop */}
        <div className={`w-full md:w-80 border-r bg-white ${selectedConversation ? 'hidden md:block' : 'block'}`}>
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
          </div>
          <div className="overflow-y-auto">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => {
                  setSelectedConversation(conversation);
                  loadMessages(conversation.id);
                }}
                className={`w-full p-4 border-b hover:bg-gray-50 flex items-center space-x-3 ${
                  selectedConversation?.id === conversation.id ? 'bg-primary-50' : ''
                }`}
              >
                <div className="relative">
                  <Image
                    src={conversation.providerAvatar}
                    alt={conversation.providerName}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  {conversation.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-gray-900">{conversation.providerName}</h3>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTime(conversation.lastMessageTime)}
                  </p>
                </div>
              </button>
            ))}
            
            {conversations.length === 0 && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
                <p className="text-gray-600">Start a conversation with a service provider</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${selectedConversation ? 'block' : 'hidden md:flex'}`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-white flex items-center">
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="md:hidden mr-3 p-1 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft size={20} />
                </button>
                <Image
                  src={selectedConversation.providerAvatar}
                  alt={selectedConversation.providerName}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="ml-3 flex-1">
                  <h3 className="font-medium text-gray-900">{selectedConversation.providerName}</h3>
                  <p className="text-sm text-green-600">Online</p>
                </div>
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <MoreVertical size={20} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {conversationMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === currentUser.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-white text-gray-900 border'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === currentUser.id ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={!messageText.trim()}
                    className="btn-primary rounded-full px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* No Conversation Selected */
            <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={40} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}