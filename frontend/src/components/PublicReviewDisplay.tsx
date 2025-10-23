import React, { useState, useEffect } from 'react';
import type { Review } from '../types/review';
import { reviewsApi } from '../services/api';
import { Star, User, Calendar } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface PublicReviewDisplayProps {
  listingId?: string;
}

export const PublicReviewDisplay: React.FC<PublicReviewDisplayProps> = ({ 
  listingId, 
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadApprovedReviews();
  }, [listingId]);

  const loadApprovedReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const allReviews = await reviewsApi.getReviews();
      
      // Filter for approved reviews only
      const approvedReviews = allReviews.filter(review => review.approved);
      
      // If listingId is provided, filter by listing
      const filteredReviews = listingId 
        ? approvedReviews.filter(review => review.listingId === listingId)
        : approvedReviews;
      
      setReviews(filteredReviews);
    } catch (err) {
      setError('Failed to load reviews. Please try again.');
      console.error('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    
    return (
      <div className="flex items-center">
        {[2, 4, 6, 8, 10].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const renderCategories = (categories: Record<string, number>) => {
    const categoryLabels: Record<string, string> = {
      cleanliness: 'Cleanliness',
      communication: 'Communication',
      respect_house_rules: 'House Rules',
      location: 'Location',
      value: 'Value'
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
        {Object.entries(categories).map(([category, rating]) => (
          <div key={category} className="flex justify-between md:justify-start gap-8 items-center text-sm">
            <span className="text-gray-600">{categoryLabels[category] || category}</span>
            <div className="flex items-center">
              <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
              <span className="font-medium">{rating}/10</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in-up">
        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <Star className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
        <p className="text-gray-500 mb-6">Check back later for guest reviews.</p>
        <div className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-600 rounded-lg">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Reviews will appear here once approved
        </div>
      </div>
    );
  }

  // Calculate average rating
  const ratings = reviews.filter(r => r.rating !== null).map(r => r.rating!);
  const averageRating = ratings.length > 0 
    ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
    : 0;

  return (
    <div className="card-modern animate-fade-in-up">
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
              <Star className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Guest Reviews</h2>
              <p className="text-gray-600">What our guests are saying</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {renderStars(averageRating)}
            <div className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
              {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={review.id} className={`review-card animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    {review.guestName && (
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 mr-1" />
                        {review.guestName}
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(review.submittedAt)}
                    </div>
                  </div>

                  <div className="mb-3">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>

              {review.text && (
                <div className="mb-4">
                  <p className="text-gray-900 leading-relaxed">"{review.text}"</p>
                </div>
              )}

              {Object.keys(review.categories).length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Detailed Ratings</h4>
                  {renderCategories(review.categories)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
