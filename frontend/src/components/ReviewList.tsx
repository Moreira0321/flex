import React from 'react';
import type { Review } from '../types/review';
import { Star, CheckCircle, Clock, User, Calendar, Building } from 'lucide-react';

interface ReviewListProps {
  reviews: Review[];
  onApprovalChange: (reviewId: string, approved: boolean) => void;
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews, onApprovalChange }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>
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
      <div className="flex flex-wrap gap-2 mt-2">
        {Object.entries(categories).map(([category, rating]) => (
          <span
            key={category}
            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            {categoryLabels[category] || category}: {rating}/10
          </span>
        ))}
      </div>
    );
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in-up">
        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <Star className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews found</h3>
        <p className="text-gray-500 mb-6">Try adjusting your filters to see more results.</p>
        <div className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-600 rounded-lg">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Adjust your search criteria
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <div
          key={review.id}
          className={`review-card ${review.approved ? 'approved' : 'pending'} animate-fade-in-up`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-2">
                  {review.approved ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-orange-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    review.approved ? 'text-green-700' : 'text-orange-700'
                  }`}>
                    {review.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(review.submittedAt)}
                </div>
              </div>

              <div className="mb-3">
                {renderStars(review.rating)}
              </div>

              {review.listingName && (
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Building className="w-4 h-4 mr-1" />
                  {review.listingName}
                </div>
              )}

              {review.guestName && (
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <User className="w-4 h-4 mr-1" />
                  {review.guestName}
                </div>
              )}

              {review.text && (
                <div className="mb-3">
                  <p className="text-gray-900 leading-relaxed">{review.text}</p>
                </div>
              )}

              {Object.keys(review.categories).length > 0 && (
                <div className="mb-4">
                  {renderCategories(review.categories)}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>Source: {review.source}</span>
                  <span>Type: {review.reviewType}</span>
                  <span>Status: {review.status}</span>
                </div>
              </div>
            </div>

            <div className="ml-6 flex flex-col space-y-3">
              <button
                onClick={() => onApprovalChange(review.id, true)}
                disabled={review.approved}
                className={`btn-modern ${review.approved ? 'btn-success opacity-50 cursor-not-allowed' : 'btn-success'}`}
              >
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {review.approved ? 'Approved' : 'Approve'}
                </div>
              </button>
              
              <button
                onClick={() => onApprovalChange(review.id, false)}
                disabled={!review.approved}
                className={`btn-modern ${!review.approved ? 'btn-warning opacity-50 cursor-not-allowed' : 'btn-warning'}`}
              >
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {!review.approved ? 'Pending' : 'Unapprove'}
                </div>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
