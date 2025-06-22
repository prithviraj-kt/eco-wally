import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ProductUpload from './ProductUpload';
import SellerStats from './SellerStats';
import SellerLeaderboard from './SellerLeaderboard';
import { BarChart3, Upload, Trophy } from 'lucide-react';

function SellerDashboard() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('stats');

  const tabs = [
    { id: 'stats', label: 'Dashboard', icon: BarChart3 },
    { id: 'upload', label: 'Add Product', icon: Upload },
    { id: 'leaderboard', label: 'Seller Rankings', icon: Trophy }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Seller Dashboard - Welcome, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Manage your products and track your eco-friendly impact
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
      {activeTab === 'stats' && <SellerStats />}
      {activeTab === 'upload' && <ProductUpload />}
      {activeTab === 'leaderboard' && <SellerLeaderboard />}
    </div>
  );
}

export default SellerDashboard;