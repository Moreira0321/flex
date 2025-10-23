export interface Review {
  id: string;
  source: string;
  listingName: string | null;
  listingId: string | null;
  reviewType: string | null;
  status: string | null;
  approved: boolean;
  rating: number | null;
  categories: Record<string, number>;
  text: string | null;
  guestName: string | null;
  submittedAt: string;
  raw: any;
}

export interface ReviewFilters {
  rating?: number;
  category?: string;
  channel?: string;
  timeRange?: string;
  listingName?: string;
  status?: string;
  approved?: boolean;
}

export interface DashboardStats {
  totalReviews: number;
  averageRating: number;
  approvedReviews: number;
  pendingReviews: number;
  topCategories: Array<{ category: string; averageRating: number; count: number }>;
  recentReviews: Review[];
}
