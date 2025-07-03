import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { coupons } from '../../data/dummyData';
import { Gift, Check, Clock, Percent, Truck, DollarSign } from 'lucide-react';

function CouponSelector() {
  const { user, dispatch } = useApp();
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [redeemedCoupon, setRedeemedCoupon] = useState(null);
  
  const canSelectCoupon = user?.greenCoins >= 100;
  const selectedCoupons = user?.selectedCoupons || [];

  const handleSelectCoupon = (coupon) => {
    if (canSelectCoupon) {
      dispatch({ type: 'SELECT_COUPON', payload: coupon });
      setRedeemedCoupon(coupon);
      setShowRedeemModal(true);
    }
  };

  const getCouponIcon = (type) => {
    switch (type) {
      case 'percentage':
        return <Percent className="h-6 w-6" />;
      case 'shipping':
        return <Truck className="h-6 w-6" />;
      case 'fixed':
        return <DollarSign className="h-6 w-6" />;
      default:
        return <Gift className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Green Rewards
        </h2>
        <p className="text-gray-600">
          Exchange your Green Coins for exclusive rewards
        </p>
      </div>

      {/* Progress to Next Reward */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Progress to Next Reward</h3>
          <span className="text-2xl font-bold text-green-600">
            {user?.greenCoins || 0}/100
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((user?.greenCoins || 0) / 100) * 100}%` }}
          />
        </div>
        
        <p className="text-sm text-gray-600">
          {canSelectCoupon 
            ? 'Congratulations! You can select a reward coupon!' 
            : `Earn ${100 - (user?.greenCoins || 0)} more Green Coins to unlock rewards!`
          }
        </p>
      </div>

      {/* Available Coupons */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Available Rewards</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coupons.map(coupon => (
            <div
              key={coupon.id}
              className={`relative border-2 rounded-lg p-6 transition-all ${
                canSelectCoupon 
                  ? 'border-green-200 bg-green-50 hover:border-green-300 cursor-pointer' 
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
              onClick={() => handleSelectCoupon(coupon)}
            >
              {!canSelectCoupon && (
                <div className="absolute inset-0 bg-white bg-opacity-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Locked</p>
                  </div>
                </div>
              )}
              
              <div className="text-center">
                <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  canSelectCoupon ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {getCouponIcon(coupon.type)}
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-2">
                  {coupon.title}
                </h4>
                
                <p className="text-sm text-gray-600 mb-4">
                  {coupon.description}
                </p>
                
                <div className="text-xs text-gray-500">
                  Cost: 100 Green Coins
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Coupons */}
      {selectedCoupons.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Your Selected Coupons</h3>
          
          <div className="space-y-3">
            {selectedCoupons.map(coupon => (
              <div
                key={coupon.id}
                className="bg-white border border-green-200 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    {getCouponIcon(coupon.type)}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">{coupon.title}</h4>
                    <p className="text-sm text-gray-600">{coupon.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                    Use Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Earning Tips */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          Ways to Earn Green Coins
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Gift className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Eco-Friendly Purchases</h4>
              <p className="text-sm text-gray-600">Earn coins for every green product you buy</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Truck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Return Packaging</h4>
              <p className="text-sm text-gray-600">+5 coins for returning product packaging</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Check className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Rate Products</h4>
              <p className="text-sm text-gray-600">+5 coins for each product review</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Gift className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Refer Friends</h4>
              <p className="text-sm text-gray-600">Bonus coins when friends shop eco-friendly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Redeem Confirmation Modal */}
      {showRedeemModal && redeemedCoupon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Gift className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Redemption Successful!</h3>
            <p className="text-gray-700 mb-4">
              You have redeemed <span className="font-bold text-green-700">{redeemedCoupon.title}</span> for 100 Green Coins.
            </p>
            <button
              onClick={() => setShowRedeemModal(false)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CouponSelector;