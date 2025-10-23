import React from 'react';
import { Star } from 'lucide-react';

export const DashboardHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-8">
          <div className="animate-fade-in-up">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mr-4">
                <Star className="w-10 h-10" color='blue' fill='blue'/>
              </div>
              <h1 className="text-4xl font-bold">
                Flex Living Reviews
              </h1>
            </div>
            <p className="text-gray-600 text-lg">Manage guest reviews and property performance with beautiful insights</p>
          </div>
        </div>
      </div>
    </header>
  );
};
