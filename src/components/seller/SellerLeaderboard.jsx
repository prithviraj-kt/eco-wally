import React from 'react';
import { Trophy, Medal, Award, DollarSign, Leaf, Star } from 'lucide-react';

function SellerLeaderboard() {
  const sellerLeaderboard = [
    { id: 1, name: 'EcoFashion Co.', sales: 2847, ecoScore: 4.8, greenProducts: 85, rank: 1 },
    { id: 2, name: 'GreenTech Solutions', sales: 2156, ecoScore: 4.6, greenProducts: 72, rank: 2 },
    { id: 3, name: 'SolarPower Inc.', sales: 1923, ecoScore: 4.9, greenProducts: 95, rank: 3 },
    { id: 4, name: 'Natural Beauty Co.', sales: 1678, ecoScore: 4.4, greenProducts: 68, rank: 4 },
    { id: 5, name: 'Your Store', sales: 1245, ecoScore: 4.2, greenProducts: 45, rank: 5 },
    { id: 6, name: 'HydroLife', sales: 1089, ecoScore: 4.1, greenProducts: 38, rank: 6 },
    { id: 7, name: 'EcoLight', sales: 967, ecoScore: 4.3, greenProducts: 52, rank: 7 },
    { id: 8, name: 'GreenHome', sales: 834, ecoScore: 3.9, greenProducts: 29, rank: 8 },
    { id: 9, name: 'SustainableStyle', sales: 756, ecoScore: 4.0, greenProducts: 34, rank: 9 },
    { id: 10, name: 'EcoWorld', sales: 689, ecoScore: 3.8, greenProducts: 26, rank: 10 }
  ];

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />;
    return null;
  };

  const getRankBadge = (rank) => {
    if (rank <= 3) return 'Green Seller of the Month';
    if (rank <= 5) return 'Eco Champion';
    if (rank <= 10) return 'Sustainability Partner';
    return 'Growing Seller';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Seller Leaderboard
        </h2>
        <p className="text-gray-600">
          Top performing sellers based on sales volume and eco-friendliness
        </p>
      </div>

      {/* Top 3 Sellers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {sellerLeaderboard.slice(0, 3).map((seller, index) => (
          <div
            key={seller.id}
            className={`relative bg-gradient-to-br ${
              index === 0 
                ? 'from-yellow-50 to-yellow-100 border-yellow-200' 
                : index === 1 
                ? 'from-gray-50 to-gray-100 border-gray-200'
                : 'from-amber-50 to-amber-100 border-amber-200'
            } border-2 rounded-lg p-6 text-center`}
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              {getRankIcon(seller.rank)}
            </div>
            
            <div className="mt-4">
              <h3 className="font-bold text-lg text-gray-900">{seller.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{getRankBadge(seller.rank)}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-1 text-green-600">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-semibold">${seller.sales.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-center space-x-1 text-blue-600">
                  <Star className="h-4 w-4" />
                  <span className="font-semibold">{seller.ecoScore} eco score</span>
                </div>
                
                <div className="flex items-center justify-center space-x-1 text-emerald-600">
                  <Leaf className="h-4 w-4" />
                  <span className="font-semibold">{seller.greenProducts} green products</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Rankings */}
      <div className="bg-white rounded-lg shadow border">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Full Rankings</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {sellerLeaderboard.map((seller) => (
            <div 
              key={seller.id} 
              className={`px-4 py-4 flex items-center justify-between hover:bg-gray-50 ${
                seller.name === 'Your Store' ? 'bg-blue-50 border-l-4 border-blue-400' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  {seller.rank <= 3 ? (
                    getRankIcon(seller.rank)
                  ) : (
                    <span className="font-medium text-gray-700">{seller.rank}</span>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{seller.name}</h4>
                    {seller.name === 'Your Store' && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">You</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{getRankBadge(seller.rank)}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">${seller.sales.toLocaleString()}</div>
                    <div className="text-gray-500">Sales</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{seller.ecoScore}</div>
                    <div className="text-gray-500">Eco Score</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{seller.greenProducts}</div>
                    <div className="text-gray-500">Green Products</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certification Info */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Award className="h-5 w-5 text-green-600" />
          <span>Green Certification Levels</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="bg-yellow-100 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            <h4 className="font-medium text-gray-900">Green Seller of the Month</h4>
            <p className="text-sm text-gray-600">Top 3 sellers with highest eco impact</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900">Eco Champion</h4>
            <p className="text-sm text-gray-600">50+ eco products with 4.0+ rating</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <Leaf className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900">Sustainability Partner</h4>
            <p className="text-sm text-gray-600">25+ eco products with 3.5+ rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerLeaderboard;