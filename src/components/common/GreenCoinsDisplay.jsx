import React from 'react';
import { useApp } from '../../context/AppContext';
import { Coins, Gift } from 'lucide-react';

function GreenCoinsDisplay() {
  const { user, dispatch } = useApp();
  
  if (!user) return null;

  const progressPercentage = (user.greenCoins / 100) * 100;
  const canSelectCoupon = user.greenCoins === 100;

  const handleProgressClick = () => {
    dispatch({ type: 'SET_VIEW', payload: 'greenCoinHistory' });
  };

  return (
    <div
      className="flex items-center space-x-3 bg-green-50 rounded-lg px-3 py-2 cursor-pointer hover:bg-green-100 transition-colors"
      onClick={handleProgressClick}
      title="View Green Coin History"
    >
      <div className="flex items-center space-x-1">
        <Coins className="h-5 w-5 text-green-600" />
        <span className="font-medium text-green-800">{user.greenCoins}</span>
      </div>
      
      <div className="w-16 bg-green-200 rounded-full h-2">
        <div
          className="bg-green-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {canSelectCoupon && (
        <Gift className="h-5 w-5 text-yellow-500 animate-pulse" />
      )}
    </div>
  );
}

export default GreenCoinsDisplay;