import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingCart, Leaf, TrendingDown, TrendingUp, Coins } from 'lucide-react';

function ProductCard({ product }) {
  const { dispatch, addGreenCoins, products, orders } = useApp();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    
    // if (product.ecoRating >= 3) {
    //   addGreenCoins(product.greenCoins, 'adding eco-friendly item to cart', Math.abs(product.carbonFootprint));
    // }
  };

  const renderEcoRating = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Leaf
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-green-500' : 'text-gray-300'
        }`}
        fill="currentColor"
      />
    ));
  };

  const isEcoFriendly = product.ecoRating >= 3;
  const carbonImpact = product.carbonFootprint;

  // --- Green Certificate Logic ---
  // Find all products by this seller
  const sellerProducts = products.filter(p => p.seller === product.seller);
  const sellerProductIds = sellerProducts.map(p => p.id);
  // Collect all reviews for seller's products
  const productReviewMap = {};
  (orders || []).forEach(order => {
    if (order.reviews) {
      order.reviews.forEach(r => {
        if (sellerProductIds.includes(r.productId)) {
          if (!productReviewMap[r.productId]) productReviewMap[r.productId] = [];
          productReviewMap[r.productId].push(r);
        }
      });
    }
  });
  // Count how many seller products have at least 2 reviews with rating >= 4
  const eligibleProducts = sellerProducts.filter(p => {
    const reviews = productReviewMap[p.id] || [];
    const positive = reviews.filter(r => r.rating >= 4);
    return positive.length >= 2;
  });
  const isCertifiedGreenSeller = eligibleProducts.length >= 3;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        
        {/* Eco Badge */}
        {isEcoFriendly && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Eco-Friendly
          </div>
        )}

        {/* Discount Badge */}
        {product.originalPrice > product.price && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Save ${(product.originalPrice - product.price).toFixed(2)}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Eco Rating */}
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm text-gray-600">Eco Rating:</span>
          <div className="flex space-x-1">
            {renderEcoRating(product.ecoRating)}
          </div>
        </div>

        {/* Carbon Impact */}
        <div className="flex items-center space-x-2 mb-3">
          {carbonImpact < 0 ? (
            <TrendingDown className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingUp className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${
            carbonImpact < 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {carbonImpact < 0 ? 'Saves' : 'Adds'} {Math.abs(carbonImpact)} kg CO₂
          </span>
        </div>

        {/* Green Coins */}
        {isEcoFriendly && (
          <div className="flex items-center space-x-1 mb-3">
            <Coins className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-yellow-600 font-medium">
              +{product.greenCoins} Green Coins
            </span>
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Add to Cart</span>
          </button>
        </div>

        {/* Seller Info */}
        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center space-x-2">
          <span className="text-xs text-gray-500">
            Sold by {product.seller}
          </span>
          {isCertifiedGreenSeller && (
            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold border border-green-300">
              Certified Green Seller
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;