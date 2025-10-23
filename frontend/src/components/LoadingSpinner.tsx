import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="loading-container animate-fade-in">
        <div className="loading-spinner"></div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Reviews</h2>
          <p className="text-gray-600">Fetching the latest guest reviews...</p>
          <div className="mt-4 flex justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
