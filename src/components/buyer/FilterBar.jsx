import React from 'react';
import { useApp } from '../../context/AppContext';
import { categories } from '../../data/dummyData';
import { Filter, Leaf } from 'lucide-react';

function FilterBar() {
  const { categoryFilter, ecoFilter, greenStoreMode, dispatch } = useApp();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="font-medium text-gray-700">Filters:</span>
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => dispatch({ type: 'SET_CATEGORY_FILTER', payload: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          {/* Eco Rating Filter */}
          <select
            value={ecoFilter}
            onChange={(e) => dispatch({ type: 'SET_ECO_FILTER', payload: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Eco Ratings</option>
            <option value="eco-high-low">🍃 High to Low</option>
            <option value="eco-low-high">🍃 Low to High</option>
          </select>
        </div>

        {/* Green Store Status */}
        {greenStoreMode && (
          <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
            <Leaf className="h-4 w-4" />
            <span className="text-sm font-medium">Green Store Active</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterBar;