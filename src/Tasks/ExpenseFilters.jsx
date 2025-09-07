import React from 'react';
import { Search, Filter, X, ArrowUpDown } from 'lucide-react';
import { useExpense } from '../contexts/ExpenseContext';

const ExpenseFilters = () => {
  const { 
    categories, 
    filters, 
    sortBy, 
    sortOrder, 
    setFilter, 
    clearFilters, 
    setSort 
  } = useExpense();

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSort(newSortBy, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(newSortBy, 'desc');
    }
  };

  const hasActiveFilters = filters.category || filters.dateFrom || filters.dateTo || filters.search;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters & Search
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search expenses..."
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => setFilter('category', e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Date From */}
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilter('dateFrom', e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="From Date"
        />

        {/* Date To */}
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilter('dateTo', e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="To Date"
        />
      </div>

      {/* Sort Options */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
          <ArrowUpDown className="w-4 h-4 mr-1" />
          Sort by:
        </span>
        
        {['date', 'amount', 'title', 'category'].map((field) => (
          <button
            key={field}
            onClick={() => handleSortChange(field)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              sortBy === field
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {field.charAt(0).toUpperCase() + field.slice(1)}
            {sortBy === field && (
              <span className="ml-1">
                {sortOrder === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExpenseFilters;