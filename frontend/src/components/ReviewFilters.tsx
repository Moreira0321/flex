import React from 'react';
import type { ReviewFilters } from '../types/review';
import { Search, X } from 'lucide-react';

interface ReviewFiltersProps {
  filters: ReviewFilters;
  onFilterChange: (filters: ReviewFilters) => void;
  totalReviews: number;
  filteredCount: number;
}

export const ReviewFiltersComponent: React.FC<ReviewFiltersProps> = ({
  filters,
  onFilterChange,
  totalReviews,
  filteredCount
}) => {
  const handleFilterChange = (key: keyof ReviewFilters, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== null && value !== ''
  );

  return (
    <div className="mb-8 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Filters</h3>
          </div>
          <div className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
            {filteredCount} of {totalReviews} reviews
          </div>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="btn-outline flex items-center text-sm"
          >
            <X className="w-4 h-4 mr-2" />
            Clear filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <select
            value={filters.rating || ''}
            onChange={(e) => handleFilterChange('rating', e.target.value ? Number(e.target.value) : undefined)}
            className="form-select w-full"
          >
            <option value="">All ratings</option>
            <option value="10">5 stars</option>
            <option value="8">4 stars</option>
            <option value="6">3 stars</option>
            <option value="4">2 stars</option>
            <option value="2">1 star</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
            className="form-select w-full"
          >
            <option value="">All categories</option>
            <option value="cleanliness">Cleanliness</option>
            <option value="communication">Communication</option>
            <option value="respect_house_rules">House Rules</option>
            <option value="location">Location</option>
            <option value="value">Value</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
            className="form-select w-full"
          >
            <option value="">All statuses</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Time Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Range
          </label>
          <select
            value={filters.timeRange || ''}
            onChange={(e) => handleFilterChange('timeRange', e.target.value || undefined)}
            className="form-select w-full"
          >
            <option value="">All time</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Search and Additional Filters */}
      <div className="mt-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search by property
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-half translate-y-neg-half text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Enter property name..."
              value={filters.listingName || ''}
              onChange={(e) => handleFilterChange('listingName', e.target.value || undefined)}
              className="form-input w-full pl-10 pr-3"
            />
          </div>
        </div>

        <div className="flex items-end space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="approved-only"
              checked={filters.approved === true}
              onChange={(e) => handleFilterChange('approved', e.target.checked ? true : undefined)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="approved-only" className="ml-2 text-sm text-gray-700">
              Approved only
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="pending-only"
              checked={filters.approved === false}
              onChange={(e) => handleFilterChange('approved', e.target.checked ? false : undefined)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="pending-only" className="ml-2 text-sm text-gray-700">
              Pending only
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
