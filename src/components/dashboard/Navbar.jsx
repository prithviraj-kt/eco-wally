import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Leaf, 
  ToggleLeft, 
  ToggleRight,
  LogOut,
  Settings,
  Award,
  Users,
  Store,
  Package
} from 'lucide-react';
import GreenCoinsDisplay from '../common/GreenCoinsDisplay';

function Navbar() {
  const { 
    user, 
    userType, 
    greenStoreMode, 
    searchQuery, 
    cart, 
    currentView,
    dispatch, 
    logout 
  } = useApp();
  
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e) => {
    dispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const toggleGreenStore = () => {
    dispatch({ type: 'TOGGLE_GREEN_STORE' });
  };

  const toggleUserType = () => {
    dispatch({ type: 'TOGGLE_USER_TYPE' });
  };

  const goToCart = () => {
    dispatch({ type: 'SET_VIEW', payload: 'cart' });
  };

  const goToOrders = () => {
    dispatch({ type: 'SET_VIEW', payload: 'orders' });
  };

  const goToDashboard = () => {
    dispatch({ type: 'SET_VIEW', payload: 'dashboard' });
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={goToDashboard}>
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">EcoMart</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for eco-friendly products..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Green Store Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Green Store</span>
              <button
                onClick={toggleGreenStore}
                className={`p-1 rounded-full transition-colors ${
                  greenStoreMode ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                {greenStoreMode ? (
                  <ToggleRight className="h-6 w-6" />
                ) : (
                  <ToggleLeft className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Green Coins Display */}
            <GreenCoinsDisplay />

            {/* Navigation Buttons */}
            {userType === 'buyer' && (
              <>
                <button
                  onClick={goToOrders}
                  className={`p-2 rounded-lg transition-colors ${
                    currentView === 'orders' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Package className="h-6 w-6" />
                </button>

                <button
                  onClick={goToCart}
                  className={`relative p-2 rounded-lg transition-colors ${
                    currentView === 'cart' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </>
            )}

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="bg-blue-600 p-2 rounded-full">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
              </button>

              {showUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <button
                    onClick={toggleUserType}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50"
                  >
                    {userType === 'buyer' ? <Store className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                    <span>Switch to {userType === 'buyer' ? 'Seller' : 'Buyer'}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                    <Award className="h-4 w-4" />
                    <span>Achievements</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                  
                  <div className="border-t border-gray-200 my-1"></div>
                  
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;