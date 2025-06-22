import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Plus, Minus, Trash2, Users, Package, Star, ShoppingBag } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

function CartPage() {
  const { cart, dispatch } = useApp();
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartOptions, setCartOptions] = useState({
    groupBuying: false
  });

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const goBack = () => {
    dispatch({ type: 'SET_VIEW', payload: 'dashboard' });
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalCarbonImpact = cart.reduce((total, item) => total + (item.carbonFootprint * item.quantity), 0);
  const totalGreenCoins = cart.reduce((total, item) => total + (item.greenCoins * item.quantity), 0);

  const deliveryFee = cartOptions.groupBuying ? 2.99 : 5.99;
  const finalTotal = cartTotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={goBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Continue Shopping</span>
        </button>

        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <ShoppingBag className="mx-auto h-16 w-16" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some eco-friendly products to get started!</p>
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
          <span>Continue Shopping</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-xl font-bold text-blue-600">
                          ${item.price}
                        </span>
                        
                        {item.originalPrice > item.price && (
                          <span className="text-gray-500 line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 mt-4">
                      <span className="text-sm text-gray-600">Quantity:</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded border"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        
                        <span className="font-medium px-3">{item.quantity}</span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded border"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Eco Info */}
                    <div className="mt-4 flex items-center space-x-4 text-sm">
                      <div className={`flex items-center space-x-1 ${
                        item.carbonFootprint < 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <span>Carbon Impact:</span>
                        <span className="font-medium">
                          {item.carbonFootprint < 0 ? 'Saves' : 'Adds'} {Math.abs(item.carbonFootprint)} kg CO₂
                        </span>
                      </div>
                      
                      {item.ecoRating >= 3 && (
                        <div className="flex items-center space-x-1 text-yellow-600">
                          <span>Green Coins:</span>
                          <span className="font-medium">+{item.greenCoins}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Environmental Impact */}
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-green-800 mb-3">Environmental Impact</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Carbon Impact:</span>
                    <span className={totalCarbonImpact < 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                      {totalCarbonImpact < 0 ? 'Saves' : 'Adds'} {Math.abs(totalCarbonImpact).toFixed(1)} kg CO₂
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Green Coins:</span>
                    <span className="text-yellow-600 font-medium">+{totalGreenCoins}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Options */}
              <div className="space-y-3 mb-6">
                <h3 className="font-medium text-gray-900">Delivery Options</h3>
                
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={cartOptions.groupBuying}
                    onChange={(e) => setCartOptions({...cartOptions, groupBuying: e.target.checked})}
                    className="rounded"
                  />
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Group Buying</div>
                      <div className="text-sm text-gray-600">50% off delivery (3-5 days)</div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>
                    {cartOptions.groupBuying ? (
                      <>
                        <span className="line-through text-gray-500">$5.99</span>
                        <span className="ml-2 text-green-600">${deliveryFee}</span>
                      </>
                    ) : (
                      `$${deliveryFee}`
                    )}
                  </span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-blue-600">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)}
        cartTotal={cartTotal}
        deliveryFee={deliveryFee}
        finalTotal={finalTotal}
        totalCarbonImpact={totalCarbonImpact}
        totalGreenCoins={totalGreenCoins}
        cartOptions={cartOptions}
      />
    </>
  );
}

export default CartPage;