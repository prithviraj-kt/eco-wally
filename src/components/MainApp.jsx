import React from 'react';
import { useApp } from '../context/AppContext';
import AuthScreen from './auth/AuthScreen';
import Dashboard from './dashboard/Dashboard';
import Notifications from './common/Notifications';

function MainApp() {
  const { isAuthenticated } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      <Notifications />
      {isAuthenticated ? <Dashboard /> : <AuthScreen />}
    </div>
  );
}

export default MainApp;