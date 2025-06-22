import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, Gift } from 'lucide-react';

function Notifications() {
  const { notifications, dispatch } = useApp();

  useEffect(() => {
    const timers = notifications.map(notification => 
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id });
      }, 5000)
    );

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [notifications, dispatch]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`flex items-center space-x-3 p-4 rounded-lg shadow-lg border max-w-sm animate-slide-in ${
            notification.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : notification.type === 'reward'
              ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}
        >
          {notification.type === 'success' && <CheckCircle className="h-5 w-5" />}
          {notification.type === 'reward' && <Gift className="h-5 w-5" />}
          
          <span className="flex-1 text-sm font-medium">
            {notification.message}
          </span>
          
          <button
            onClick={() => dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id })}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Notifications;