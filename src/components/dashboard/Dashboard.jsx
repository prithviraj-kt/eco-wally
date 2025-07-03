import React from 'react';
import { useApp } from '../../context/AppContext';
import Navbar from './Navbar';
import BuyerDashboard from '../buyer/BuyerDashboard';
import SellerDashboard from '../seller/SellerDashboard';
import CartPage from '../buyer/CartPage';
import OrdersPage from '../buyer/OrdersPage';
import GreenCoinHistory from '../buyer/GreenCoinHistory';

function Dashboard() {
  const { userType, currentView } = useApp();

  const renderContent = () => {
    if (currentView === 'cart') {
      return <CartPage />;
    }
    
    if (currentView === 'orders') {
      return <OrdersPage />;
    }

    if (currentView === 'greenCoinHistory') {
      return <GreenCoinHistory isPage />;
    }

    return userType === 'buyer' ? <BuyerDashboard /> : <SellerDashboard />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;