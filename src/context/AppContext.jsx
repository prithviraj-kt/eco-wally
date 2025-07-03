import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { dummyProducts, dummyUsers } from '../data/dummyData';

const AppContext = createContext();

const COIN_LIMIT = 100;

const initialState = {
  user: null,
  isAuthenticated: false,
  userType: 'buyer', // 'buyer' or 'seller'
  currentView: 'dashboard', // 'dashboard', 'cart', 'orders'
  products: dummyProducts,
  cart: [],
  orders: [],
  greenStoreMode: false,
  searchQuery: '',
  categoryFilter: 'all',
  ecoFilter: 'all', // 'all', 'eco-high-low', 'eco-low-high'
  leaderboard: [],
  referralCode: '',
  notifications: []
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        cart: [],
        currentView: 'dashboard'
      };
    case 'SET_VIEW':
      return {
        ...state,
        currentView: action.payload
      };
    case 'TOGGLE_USER_TYPE':
      return {
        ...state,
        userType: state.userType === 'buyer' ? 'seller' : 'buyer',
        currentView: 'dashboard'
      };
    case 'TOGGLE_GREEN_STORE':
      return {
        ...state,
        greenStoreMode: !state.greenStoreMode
      };
    case 'SET_SEARCH':
      return {
        ...state,
        searchQuery: action.payload
      };
    case 'SET_CATEGORY_FILTER':
      return {
        ...state,
        categoryFilter: action.payload
      };
    case 'SET_ECO_FILTER':
      return {
        ...state,
        ecoFilter: action.payload
      };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        cart: []
      };
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? { ...order, ...action.payload.updates } : order
        )
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case 'UPDATE_USER_COINS': {
      const { coins, carbonReduction, historyEntry } = action.payload;
      let updatedUser = {
        ...state.user,
        greenCoins: coins,
        carbonReduction: carbonReduction || state.user.carbonReduction,
      };
      if (historyEntry) {
        updatedUser.greenCoinHistory = [
          ...(state.user.greenCoinHistory || []),
          historyEntry,
        ];
      }
      if (coins >= COIN_LIMIT && !(updatedUser.greenCoinHistory || []).some(e => e.type === 'limit')) {
        updatedUser.greenCoinHistory = [
          ...(updatedUser.greenCoinHistory || []),
          {
            id: `limit-${Date.now()}`,
            date: new Date().toISOString(),
            description: `Green Coin limit of ${COIN_LIMIT} reached`,
            amount: 0,
            type: 'limit',
          },
        ];
      }
      return {
        ...state,
        user: updatedUser,
      };
    }
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notif => notif.id !== action.payload)
      };
    case 'SELECT_COUPON': {
      const coupon = action.payload;
      const entry = {
        id: `redeem-${Date.now()}`,
        date: new Date().toISOString(),
        description: `Redeemed 100 coins for ${coupon.title}`,
        amount: -100,
        type: 'Redemption',
      };
      return {
        ...state,
        user: {
          ...state.user,
          selectedCoupons: [...(state.user.selectedCoupons || []), { ...coupon, redeemedAt: new Date().toISOString() }],
          greenCoins: 0,
          greenCoinHistory: [
            ...(state.user.greenCoinHistory || []),
            entry,
          ],
        },
      };
    }
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('ecoCommerceUser');
    if (savedUser) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(savedUser) });
    }
  }, []);

  // Save user data to localStorage
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('ecoCommerceUser', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('ecoCommerceUser');
    }
  }, [state.user]);

  const login = (email, password) => {
    const user = dummyUsers.find(u => u.email === email && u.password === password);
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      greenCoins: 0,
      carbonReduction: 0,
      selectedCoupons: [],
      referralCode: Math.random().toString(36).substring(2, 8).toUpperCase()
    };
    dispatch({ type: 'LOGIN', payload: newUser });
    return true;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const addGreenCoins = (coins, reason, carbonReduction = 0) => {
    if (state.user) {
      const prevCoins = state.user.greenCoins;
      let allowedCoins = coins;
      let capEntry = null;
      if (prevCoins + coins > COIN_LIMIT) {
        allowedCoins = COIN_LIMIT - prevCoins;
        if (allowedCoins < 0) allowedCoins = 0;
        capEntry = {
          id: `cap-${Date.now()}`,
          date: new Date().toISOString(),
          description: `Coin limit of ${COIN_LIMIT} reached — excess coins not added`,
          amount: 0,
          type: 'limit',
        };
      }
      const newCoins = Math.min(COIN_LIMIT, prevCoins + coins);
      const newCarbonReduction = state.user.carbonReduction + carbonReduction;
      const entry = allowedCoins > 0 ? {
        id: `earn-${Date.now()}`,
        date: new Date().toISOString(),
        description: `${allowedCoins > 0 ? '+' : ''}${allowedCoins} coins earned for ${reason}`,
        amount: allowedCoins,
        type: 'Earning',
      } : null;
      if (entry) {
        dispatch({
          type: 'UPDATE_USER_COINS',
          payload: {
            coins: newCoins,
            carbonReduction: newCarbonReduction,
            historyEntry: entry,
          },
        });
      }
      if (capEntry) {
        dispatch({
          type: 'UPDATE_USER_COINS',
          payload: {
            coins: newCoins,
            carbonReduction: newCarbonReduction,
            historyEntry: capEntry,
          },
        });
      }
      if (allowedCoins > 0) {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: Date.now(),
            message: `+${allowedCoins} Green Coins earned for ${reason}!`,
            type: 'success',
          },
        });
      }
      if (capEntry) {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: Date.now() + 1,
            message: `Coin limit of ${COIN_LIMIT} reached — excess coins not added`,
            type: 'reward',
          },
        });
      }
    }
  };

  const getFilteredProducts = () => {
    let filtered = state.products;

    // Green store mode filter
    if (state.greenStoreMode) {
      filtered = filtered.filter(product => product.ecoRating >= 3);
    }

    // Search filter
    if (state.searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (state.categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === state.categoryFilter);
    }

    // Eco filter and value sorting
    if (state.ecoFilter === 'eco-high-low') {
      filtered.sort((a, b) => b.ecoRating - a.ecoRating);
    } else if (state.ecoFilter === 'eco-low-high') {
      filtered.sort((a, b) => a.ecoRating - b.ecoRating);
    } else if (state.ecoFilter === 'value-low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.ecoFilter === 'value-high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const value = {
    ...state,
    dispatch,
    login,
    register,
    logout,
    addGreenCoins,
    getFilteredProducts
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}