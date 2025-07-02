import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useApp } from '../../contexts/AppContext';
import { MessageCircle, Users } from 'lucide-react';
import { MOCK_REQUESTS, MOCK_PROVIDERS, MOCK_USERS } from '../../data/mockData';

export default function MessagesPage() {
  const { userRole, currentUser } = useApp();

  // Get conversations based on requests
  const conversations = MOCK_REQUESTS.map(request => {
    const otherUser = userRole === 'customer' 
      ? MOCK_PROVIDERS.find(p => p.id === request.providerId)
      : MOCK_USERS.find(u => u.id === request.userId);
    
    return {
      id: request.id,
      otherUser,
      service: request.service,
      lastMessage: request.message,
      timestamp: request.timestamp,
      status: request.status
    };
  });

  return (
    <>
      <Head>
        <title>Messages | Boadwuma</title>
        <meta name="description" content="Your messages and conversations" />
      </Head>

      <div className="min-h-screen bg-background-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-900 mb-2 font-display">
              Messages
            </h1>
            <p className="text-neutral-600">
              Your conversations with {userRole === 'customer' ? 'service providers' : 'customers'}
            </p>
          </div>

          {/* Conversations List */}
          {conversations.length === 0 ? (
            <div className="bg-white rounded-xl shadow-card border border-neutral-100 p-12 text-center">
              <MessageCircle className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-900 mb-2">No messages yet</h3>
              <p className="text-neutral-600 mb-6">
                {userRole === 'customer' 
                  ? 'Start a conversation by requesting a service from a provider.'
                  : 'Messages from customers will appear here when they request your services.'}
              </p>
              {userRole === 'customer' && (
                <Link
                  href="/"
                  className="inline-block bg-accent-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-600 transition-colors"
                >
                  Find Services
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {conversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  href={`/chat/${conversation.id}`}
                  className="block bg-white rounded-xl shadow-card border border-neutral-100 p-6 hover:shadow-card-hover transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={conversation.otherUser?.avatar}
                      alt={conversation.otherUser?.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.otherUser?.name || 'User')}&background=2B4C7E&color=fff`;
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-text-900">
                            {conversation.otherUser?.name}
                          </h3>
                          <p className="text-sm text-neutral-600 font-medium">
                            {conversation.service}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          conversation.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                          conversation.status === 'in_progress' ? 'bg-purple-50 text-purple-700' :
                          conversation.status === 'completed' ? 'bg-success-50 text-success-700' :
                          'bg-neutral-50 text-neutral-700'
                        }`}>
                          {conversation.status === 'pending' ? 'Pending' :
                           conversation.status === 'in_progress' ? 'In Progress' :
                           conversation.status === 'completed' ? 'Completed' :
                           conversation.status}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-700 line-clamp-2">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}