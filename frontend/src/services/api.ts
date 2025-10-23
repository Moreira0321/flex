import axios from 'axios';
import type { Review, DashboardStats } from '../types/review';

const API_BASE_URL = 'https://flex-test-backend.vercel.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const reviewsApi = {
  // Fetch all reviews from Hostaway
  async getReviews(): Promise<Review[]> {
    try {
      const response = await api.get('/api/reviews/hostaway');
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  // Update review approval status
  async updateReviewApproval(reviewId: string, approved: boolean): Promise<void> {
    // This would typically be a PATCH/PUT request to update the review
    // For now, we'll simulate this with localStorage
    const reviews = JSON.parse(localStorage.getItem('reviewApprovals') || '{}');
    reviews[reviewId] = approved;
    localStorage.setItem('reviewApprovals', JSON.stringify(reviews));
  },

  // Get dashboard statistics
  async getDashboardStats(): Promise<DashboardStats> {
    const reviews = await this.getReviews();
    
    const totalReviews = reviews.length;
    const approvedReviews = reviews.filter(r => r.approved).length;
    const pendingReviews = totalReviews - approvedReviews;
    
    const ratings = reviews.filter(r => r.rating !== null).map(r => r.rating!);
    const averageRating = ratings.length > 0 
      ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
      : 0;

    // Calculate category statistics
    const categoryStats: Record<string, { sum: number; count: number }> = {};
    reviews.forEach(review => {
      Object.entries(review.categories).forEach(([category, rating]) => {
        if (!categoryStats[category]) {
          categoryStats[category] = { sum: 0, count: 0 };
        }
        categoryStats[category].sum += rating;
        categoryStats[category].count += 1;
      });
    });

    const topCategories = Object.entries(categoryStats)
      .map(([category, stats]) => ({
        category,
        averageRating: stats.sum / stats.count,
        count: stats.count
      }))
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5);

    const recentReviews = reviews
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      .slice(0, 5);

    return {
      totalReviews,
      averageRating,
      approvedReviews,
      pendingReviews,
      topCategories,
      recentReviews
    };
  }
};
