import React from 'react';
import { useApp } from '../../context/AppContext';
import { leaderboardData } from '../../data/dummyData';
import { Trophy, Medal, Award, TrendingDown } from 'lucide-react';

function Leaderboard() {
  const { user } = useApp();
  
  // Add current user to leaderboard if not in top 10
  const userRank = 15; // Simulated user rank
  const userInTop10 = leaderboardData.some(entry => entry.name.includes(user?.name?.split(' ')[0]));

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />;
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Carbon Footprint Reduction Leaderboard
        </h2>
        <p className="text-gray-600">
          Local heroes making the biggest environmental impact
        </p>
      </div>

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {leaderboardData.slice(0, 3).map((entry, index) => (
          <div
            key={entry.id}
            className={`relative bg-gradient-to-br ${
              index === 0 
                ? 'from-yellow-50 to-yellow-100 border-yellow-200' 
                : index === 1 
                ? 'from-gray-50 to-gray-100 border-gray-200'
                : 'from-amber-50 to-amber-100 border-amber-200'
            } border-2 rounded-lg p-6 text-center`}
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              {getRankIcon(entry.rank)}
            </div>
            
            <div className="mt-4">
              <h3 className="font-bold text-lg text-gray-900">{entry.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{entry.location}</p>
              
              <div className="flex items-center justify-center space-x-1 text-green-600">
                <TrendingDown className="h-4 w-4" />
                <span className="font-semibold">{entry.carbonReduction} kg CO₂</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rankings 4-10 */}
      <div className="bg-white rounded-lg shadow border">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Full Rankings</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {leaderboardData.slice(3).map((entry) => (
            <div key={entry.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="font-medium text-gray-700">{entry.rank}</span>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">{entry.name}</h4>
                  <p className="text-sm text-gray-500">{entry.location}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingDown className="h-4 w-4" />
                <span className="font-semibold">{entry.carbonReduction} kg</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current User Position (if not in top 10) */}
      {!userInTop10 && (
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="font-medium text-blue-700">{userRank}</span>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-900">{user?.name} (You)</h4>
                <p className="text-sm text-blue-600">Keep going to climb the rankings!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingDown className="h-4 w-4" />
              <span className="font-semibold">{user?.carbonReduction || 0} kg</span>
            </div>
          </div>
        </div>
      )}

      {/* Referral System */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          Invite Friends & Earn Together
        </h3>
        
        <p className="text-gray-600 mb-4">
          Share your referral code and earn bonus Green Coins when friends make eco-friendly purchases!
        </p>
        
        <div className="flex items-center space-x-3">
          <div className="bg-white border border-gray-300 rounded-lg px-4 py-2 font-mono text-lg">
            {user?.referralCode || 'DEMO123'}
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Share Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;