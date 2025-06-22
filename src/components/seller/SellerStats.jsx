import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  DollarSign, 
  Package, 
  Leaf, 
  TrendingUp, 
  Award,
  Users,
  Star
} from 'lucide-react';

function SellerStats() {
  const { user, products } = useApp();
  
  // Mock seller stats
  const sellerProducts = products.filter(p => p.seller.includes(user?.name?.split(' ')[0] || ''));
  const totalRevenue = 2847.50;
  const totalSales = 127;
  const ecoProducts = sellerProducts.filter(p => p.ecoRating >= 3).length;
  const avgEcoRating = 4.2;

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Products Sold',
      value: totalSales,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Eco Products',
      value: `${ecoProducts}/${sellerProducts.length}`,
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Avg Eco Rating',
      value: avgEcoRating.toFixed(1),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Green Certification Progress */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Green Certification Progress</h3>
          <Award className="h-6 w-6 text-green-600" />
        </div>
        
        <p className="text-gray-600 mb-4">
          Sell eco-friendly products to earn your Green Seller Certification
        </p>
        
        <div className="w-full bg-green-200 rounded-full h-3 mb-4">
          <div
            className="bg-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: '72%' }}
          />
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-green-700 font-medium">72% Complete</span>
          <span className="text-gray-600">18 more eco products needed</span>
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Sales</h3>
          <div className="space-y-4">
            {/* Mock chart data */}
            {[
              { month: 'Jan', sales: 85, eco: 60 },
              { month: 'Feb', sales: 92, eco: 70 },
              { month: 'Mar', sales: 78, eco: 55 },
              { month: 'Apr', sales: 95, eco: 80 },
              { month: 'May', sales: 127, eco: 95 }
            ].map(data => (
              <div key={data.month} className="flex items-center space-x-4">
                <span className="w-8 text-sm text-gray-600">{data.month}</span>
                <div className="flex-1 flex space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full"
                      style={{ width: `${(data.sales / 127) * 100}%` }}
                    />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{ width: `${(data.eco / 95) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-600 w-12">{data.sales}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span>Total Sales</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>Eco Sales</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Product sold', item: 'Solar Power Bank', time: '2 hours ago', eco: true },
              { action: 'New review', item: 'Bamboo Phone Case', time: '4 hours ago', eco: true },
              { action: 'Product sold', item: 'LED Bulb', time: '1 day ago', eco: true },
              { action: 'Product uploaded', item: 'Organic T-Shirt', time: '2 days ago', eco: true },
              { action: 'Achievement unlocked', item: 'Green Seller Badge', time: '3 days ago', eco: true }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${activity.eco ? 'bg-green-500' : 'bg-gray-400'}`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.action}:</span> {activity.item}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'First Sale', desc: 'Made your first sale', earned: true },
            { title: 'Eco Champion', desc: '50+ eco-friendly products sold', earned: true },
            { title: 'Green Seller', desc: 'Achieved 4+ average eco rating', earned: true },
            { title: 'Top Performer', desc: 'Top 10 seller this month', earned: false },
            { title: 'Sustainability Expert', desc: '100+ eco products sold', earned: false },
            { title: 'Carbon Hero', desc: 'Saved 100kg+ CO₂ through sales', earned: false }
          ].map((badge, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                badge.earned 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="text-center">
                <Award className={`h-8 w-8 mx-auto mb-2 ${
                  badge.earned ? 'text-green-600' : 'text-gray-400'
                }`} />
                <h4 className="font-medium text-gray-900">{badge.title}</h4>
                <p className="text-xs text-gray-600">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerStats;