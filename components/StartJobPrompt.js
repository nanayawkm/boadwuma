import { useState } from 'react';
import { MapPin, Clock, CheckCircle, X } from 'lucide-react';

export default function StartJobPrompt({ request, onStartJob, onSkip, onClose }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartJob = async () => {
    setIsLoading(true);
    try {
      await onStartJob();
    } catch (error) {
      console.error('Error starting job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    onSkip();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Start Job Now?</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Request Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold">
                  {request.service.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{request.service}</h4>
                <p className="text-sm text-gray-600">{request.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span>{request.location?.name || request.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{new Date(request.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Starting now will:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-green-500" />
                <span>Enable live location tracking for customer</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-green-500" />
                <span>Show ETA to customer</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-green-500" />
                <span>Improve customer experience</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleSkip}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Start Later
            </button>
            <button
              onClick={handleStartJob}
              disabled={isLoading}
              className="flex-1 bg-primary-500 text-white px-4 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Starting...' : 'Start Job Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 