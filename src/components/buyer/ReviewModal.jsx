import React, { useState } from 'react';
import { X, Star } from 'lucide-react';

function ReviewModal({ isOpen, onClose, order, onSubmit }) {
  const [reviews, setReviews] = useState({});

  if (!isOpen || !order) return null;

  const handleRatingChange = (productId, rating) => {
    setReviews(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        rating
      }
    }));
  };

  const handleCommentChange = (productId, comment) => {
    setReviews(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        comment
      }
    }));
  };

  const handleSubmit = () => {
    const reviewsArray = order.items.map(item => ({
      productId: item.id,
      productName: item.name,
      rating: reviews[item.id]?.rating || 5,
      comment: reviews[item.id]?.comment || '',
      date: new Date().toISOString()
    }));

    onSubmit(order.id, reviewsArray);
  };

  const allProductsReviewed = order.items.every(item => 
    reviews[item.id]?.rating && reviews[item.id]?.rating > 0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Review Your Products</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-gray-600">
            Share your experience with these products to help other eco-conscious shoppers and earn Green Coins!
          </p>

          {order.items.map(item => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => handleRatingChange(item.id, rating)}
                      className={`p-1 ${
                        (reviews[item.id]?.rating || 0) >= rating
                          ? 'text-yellow-500'
                          : 'text-gray-300'
                      }`}
                    >
                      <Star className="h-6 w-6" fill="currentColor" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review (Optional)
                </label>
                <textarea
                  value={reviews[item.id]?.comment || ''}
                  onChange={(e) => handleCommentChange(item.id, e.target.value)}
                  placeholder="Share your thoughts about this product..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}

          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Reward Information</h4>
            <p className="text-sm text-yellow-700">
              You'll earn {order.items.length * 5} Green Coins for reviewing these products!
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!allProductsReviewed}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Submit Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;