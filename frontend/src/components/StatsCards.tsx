import React from 'react';
import type { DashboardStats } from '../types/review';
import { Star, CheckCircle, Clock, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  stats: DashboardStats;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="stat-card animate-fade-in-up">
        <div className="stat-icon primary">
          <Star className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total Reviews</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalReviews}</p>
          <p className="text-xs text-gray-400 mt-1">All time reviews</p>
        </div>
      </div>

      <div className="stat-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="stat-icon success">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Average Rating</p>
          <p className="text-3xl font-bold text-gray-900">
            {formatRating(stats.averageRating)}
          </p>
          <p className="text-xs text-gray-400 mt-1">Out of 5 stars</p>
        </div>
      </div>

      <div className="stat-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="stat-icon success">
          <CheckCircle className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Approved</p>
          <p className="text-3xl font-bold text-gray-900">{stats.approvedReviews}</p>
          <p className="text-xs text-gray-400 mt-1">Ready to publish</p>
        </div>
      </div>

      <div className="stat-card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="stat-icon warning">
          <Clock className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Pending</p>
          <p className="text-3xl font-bold text-gray-900">{stats.pendingReviews}</p>
          <p className="text-xs text-gray-400 mt-1">Awaiting approval</p>
        </div>
      </div>
    </div>
  );
};
