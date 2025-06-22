import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Package, Star, Recycle, CheckCircle, Clock } from 'lucide-react';
import ReviewModal from './ReviewModal';

function OrdersPage() {
  const { orders, dispatch, addGreenCoins } = useApp();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const goBack = () => {
    dispatch({ type: 'SET_VIEW', payload: 'dashboard' });
  };

  const handleReturnPackaging = (orderId) => {
    dispatch({
      type: 'UPDATE_ORDER',
      payload: {
        id: orderId,
        updates: { packagingReturned: true }
      }
    });
    
    addGreenCoins(5, 'returning packaging materials');
  };

  const handleReviewProduct = (order) => {
    setSelectedOrder(order);
    setShowReviewModal(true);
  };

  const handleReviewSubmit = (orderId, reviews) => {
    dispatch({
      type: 'UPDATE_ORDER',
      payload: {
        id: orderId,
        updates: { hasReviewed: true, reviews }
      }
    });
    
    // Award 5 green coins for each product reviewed
    const totalCoins = reviews.length * 5;
    addGreenCoins(totalCoins, `reviewing ${reviews.length} product${reviews.length > 1 ? 's' : ''}`);
    
    setShowReviewModal(false);
    setSelectedOrder(null);
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={goBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <Package className="mx-auto h-16 w-16" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
          <p className="text-gray-600 mb-8">Start shopping for eco-friendly products!</p>
          <button
            onClick={goBack}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={goBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Order Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order.id}
                  </h3>
                  <p className="text-gray-600">
                    Placed on {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600">
                    ${order.total.toFixed(2)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status === 'confirmed' ? 'Delivered' : 'Processing'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm font-medium text-blue-600">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Environmental Impact */}
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-green-800 mb-2">Environmental Impact</h4>
                <div className="flex items-center justify-between text-sm">
                  <span>Carbon Impact:</span>
                  <span className={order.carbonImpact < 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {order.carbonImpact < 0 ? 'Saved' : 'Added'} {Math.abs(order.carbonImpact).toFixed(1)} kg CO₂
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Green Coins Earned:</span>
                  <span className="text-yellow-600 font-medium">+{order.greenCoins}</span>
                </div>
              </div>

              {/* Post-Purchase Actions */}
              {order.status === 'confirmed' && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Post-Purchase Actions</h4>
                  
                  <div className="flex flex-wrap gap-3">
                    {/* Review Products */}
                    {!order.hasReviewed && (
                      <button
                        onClick={() => handleReviewProduct(order)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Star className="h-4 w-4" />
                        <span>Review Products (+{order.items.length * 5} coins)</span>
                      </button>
                    )}

                    {order.hasReviewed && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Products Reviewed</span>
                      </div>
                    )}

                    {/* Return Packaging (only if not group buying and not already returned) */}
                    {order.canReturnPackaging && !order.packagingReturned && order.hasReviewed && (
                      <button
                        onClick={() => handleReturnPackaging(order.id)}
                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Recycle className="h-4 w-4" />
                        <span>Return Packaging (+5 coins)</span>
                      </button>
                    )}

                    {order.packagingReturned && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Packaging Returned</span>
                      </div>
                    )}

                    {/* Show message if review is required first */}
                    {order.canReturnPackaging && !order.packagingReturned && !order.hasReviewed && (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Review products first to unlock packaging return</span>
                      </div>
                    )}

                    {/* Group buying message */}
                    {order.groupBuying && (
                      <div className="flex items-center space-x-2 text-blue-600">
                        <Package className="h-4 w-4" />
                        <span>Group delivery - packaging return not available</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => {
          setShowReviewModal(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
        onSubmit={handleReviewSubmit}
      />
    </>
  );
}

export default OrdersPage;