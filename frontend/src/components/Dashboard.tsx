import React, { useState, useEffect } from 'react';
import type { Review, ReviewFilters, DashboardStats } from '../types/review';
import { reviewsApi } from '../services/api';
import { DashboardHeader } from './DashboardHeader';
import { ReviewFiltersComponent } from './ReviewFilters';
import { ReviewList } from './ReviewList';
import { StatsCards } from './StatsCards';
import { LoadingSpinner } from './LoadingSpinner';

export const Dashboard: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ReviewFilters>({});

  useEffect(() => {
    loadReviews();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [reviews, filters]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const reviewsData = await reviewsApi.getReviews();
      setReviews(reviewsData);
    } catch (err) {
      setError('Failed to load reviews. Please try again.');
      console.error('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...reviews];

    if (filters.rating) {
      filtered = filtered.filter(review => 
        review.rating && Math.floor(review.rating / 2) === Math.floor(filters.rating! / 2)
      );
    }

    if (filters.category) {
      filtered = filtered.filter(review => 
        review.categories[filters.category!] !== undefined
      );
    }

    if (filters.listingName) {
      filtered = filtered.filter(review => 
        review.listingName?.toLowerCase().includes(filters.listingName!.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(review => review.status === filters.status);
    }

    if (filters.approved !== undefined) {
      filtered = filtered.filter(review => review.approved === filters.approved);
    }

    if (filters.timeRange) {
      const now = new Date();
      const timeRanges = {
        '7d': 7,
        '30d': 30,
        '90d': 90,
        '1y': 365
      };
      
      const days = timeRanges[filters.timeRange as keyof typeof timeRanges];
      if (days) {
        const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(review => 
          new Date(review.submittedAt) >= cutoffDate
        );
      }
    }

    setFilteredReviews(filtered);
  };

  const handleFilterChange = (newFilters: ReviewFilters) => {
    setFilters(newFilters);
  };

  const handleReviewApproval = async (reviewId: string, approved: boolean) => {
    try {
      await reviewsApi.updateReviewApproval(reviewId, approved);
      setReviews(prevReviews => 
        prevReviews.map(review => 
          review.id === reviewId ? { ...review, approved } : review
        )
      );
    } catch (err) {
      console.error('Error updating review approval:', err);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await reviewsApi.getDashboardStats();
      setStats(statsData);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  useEffect(() => {
    if (reviews.length > 0) {
      loadStats();
    }
  }, [reviews]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Reviews</h2>
            <p className="text-gray-600 mb-6">{error}</p>
          </div>
          <button 
            onClick={loadReviews}
            className="btn-modern"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {stats && <StatsCards stats={stats} />}
        
        <div className="mt-8 animate-fade-in-up">
          <div className="card-modern">
            <div className="px-6 py-6 border-b border-gray-200">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Review Management</h2>
              </div>
              <p className="text-gray-600">
                Manage and approve guest reviews for your properties with powerful filtering and analytics
              </p>
            </div>
            
            <div className="p-6">
              <ReviewFiltersComponent 
                filters={filters}
                onFilterChange={handleFilterChange}
                totalReviews={reviews.length}
                filteredCount={filteredReviews.length}
              />
              
              <ReviewList 
                reviews={filteredReviews}
                onApprovalChange={handleReviewApproval}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
