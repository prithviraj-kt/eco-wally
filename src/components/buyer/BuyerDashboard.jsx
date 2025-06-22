import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ProductGrid from './ProductGrid';
import FilterBar from './FilterBar';
import Leaderboard from './Leaderboard';
import CouponSelector from './CouponSelector';
import { BarChart3, Users, Award } from 'lucide-react';

function BuyerDashboard() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('products');

  const tabs = [
    { id: 'products', label: 'Products', icon: BarChart3 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Users },
    { id: 'rewards', label: 'Rewards', icon: Award }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          You've saved {user?.carbonReduction || 0} kg CO₂ with your eco-friendly choices 🌱
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'products' && (
        <>
          <FilterBar />
          <ProductGrid />
        </>
      )}

      {activeTab === 'leaderboard' && <Leaderboard />}

      {activeTab === 'rewards' && <CouponSelector />}
    </div>
  );
}

export default BuyerDashboard;