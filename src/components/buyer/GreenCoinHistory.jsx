import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

// Helper for formatting dates
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

// Activity type mapping
const getActivityType = (desc) => {
  if (/redeem|redemption/i.test(desc)) return 'Redemption';
  if (/purchase|bought|order/i.test(desc)) return 'Purchase';
  if (/review|returned|earn|eco-friendly/i.test(desc)) return 'Earning';
  return 'Other';
};

const sortOptions = [
  { value: 'date-desc', label: 'Most Recent' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'amount-desc', label: 'Sort by Value (High to Low)' },
  { value: 'amount-asc', label: 'Sort by Value (Low to High)' },
  { value: 'type', label: 'Activity Type' },
];

const activityTypes = ['All', 'Earning', 'Redemption', 'Purchase'];

function GreenCoinHistory({ isPage }) {
  const { user, orders, dispatch } = useApp();
  // Simulate live transaction data from orders, redemptions, and mock earnings
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [activityType, setActivityType] = useState('All');
  const [sort, setSort] = useState(() => localStorage.getItem('greenCoinSort') || 'date-desc');

  // Compose transaction list from orders, redemptions, and mock earnings
  const transactions = useMemo(() => {
    // Use persistent user.greenCoinHistory if available
    if (user?.greenCoinHistory && user.greenCoinHistory.length > 0) {
      return user.greenCoinHistory;
    }
    // Fallback: Compose from orders, redemptions, and mock earnings
    let txs = [];
    // Orders (purchases)
    if (orders) {
      orders.forEach(order => {
        txs.push({
          id: `order-${order.id}`,
          date: order.orderDate || order.date || new Date().toISOString(),
          description: `Purchased items (${order.items.map(i => i.name).join(', ')})`,
          amount: -Math.abs(order.greenCoins || 0),
          type: 'Purchase',
        });
      });
    }
    // Redemptions (coupons)
    if (user?.selectedCoupons) {
      user.selectedCoupons.forEach((coupon, idx) => {
        txs.push({
          id: `redeem-${idx}`,
          date: coupon.redeemedAt || new Date().toISOString(),
          description: `Redeemed 100 coins for ${coupon.title}`,
          amount: -100,
          type: 'Redemption',
        });
      });
    }
    // Mock earnings (for demo)
    if (user?.greenCoins > 0) {
      txs.push({
        id: 'earn-current',
        date: new Date().toISOString(),
        description: 'Current Green Coin Balance',
        amount: user.greenCoins,
        type: 'Earning',
      });
    }
    // Add more mock earnings if needed
    return txs;
  }, [orders, user]);

  // Filter by date and activity type
  const filteredTxs = useMemo(() => {
    return transactions.filter(tx => {
      const txDate = new Date(tx.date);
      const from = dateRange.from ? new Date(dateRange.from) : null;
      const to = dateRange.to ? new Date(dateRange.to) : null;
      if (from && txDate < from) return false;
      if (to && txDate > to) return false;
      if (activityType !== 'All' && tx.type !== activityType) return false;
      return true;
    });
  }, [transactions, dateRange, activityType]);

  // Sort
  const sortedTxs = useMemo(() => {
    let arr = [...filteredTxs];
    switch (sort) {
      case 'date-desc':
        arr.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'date-asc':
        arr.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'amount-desc':
        arr.sort((a, b) => b.amount - a.amount);
        break;
      case 'amount-asc':
        arr.sort((a, b) => a.amount - b.amount);
        break;
      case 'type':
        arr.sort((a, b) => a.type.localeCompare(b.type));
        break;
      default:
        break;
    }
    return arr;
  }, [filteredTxs, sort]);

  // Persist sort
  useEffect(() => {
    localStorage.setItem('greenCoinSort', sort);
  }, [sort]);

  // Coin limit badge
  const COIN_LIMIT = 500;
  const limitReached = user?.greenCoins >= COIN_LIMIT;

  // Back navigation
  const handleBack = () => {
    dispatch({ type: 'SET_VIEW', payload: 'dashboard' });
  };

  return (
    <div className={isPage ? 'max-w-2xl mx-auto px-4 py-8' : 'bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6'}>
      {isPage && (
        <div className="flex items-center mb-6">
          <button onClick={handleBack} className="mr-4 p-2 rounded hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 flex-1">Green Coin History</h2>
          {limitReached && (
            <span className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full ml-4 text-sm font-semibold">
              <AlertTriangle className="h-4 w-4 mr-1" /> Limit {COIN_LIMIT} reached
            </span>
          )}
        </div>
      )}
      {!isPage && limitReached && (
        <div className="flex items-center mb-2">
          <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
          <span className="text-yellow-700 font-medium text-sm">Coin limit of {COIN_LIMIT} reached</span>
        </div>
      )}
      {/* Filters */}
      {isPage && (
        <div className="flex flex-wrap gap-4 mb-4 items-end">
          <div>
            <label className="block text-xs text-gray-500 mb-1">From</label>
            <input type="date" value={dateRange.from} onChange={e => setDateRange(r => ({ ...r, from: e.target.value }))} className="border px-2 py-1 rounded" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">To</label>
            <input type="date" value={dateRange.to} onChange={e => setDateRange(r => ({ ...r, to: e.target.value }))} className="border px-2 py-1 rounded" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Activity</label>
            <select value={activityType} onChange={e => setActivityType(e.target.value)} className="border px-2 py-1 rounded">
              {activityTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Sort By</label>
            <select value={sort} onChange={e => setSort(e.target.value)} className="border px-2 py-1 rounded">
              {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Description</th>
              <th className="py-2 pr-4">Amount</th>
              {isPage && <th className="py-2 pr-4">Type</th>}
            </tr>
          </thead>
          <tbody>
            {sortedTxs.length === 0 && (
              <tr><td colSpan={isPage ? 4 : 3} className="py-4 text-center text-gray-400">No transactions found.</td></tr>
            )}
            {sortedTxs.map(tx => (
              <tr key={tx.id} className="border-b last:border-b-0">
                <td className="py-2 pr-4 whitespace-nowrap">{formatDate(tx.date)}</td>
                <td className="py-2 pr-4">{
                  // Format entry as per sample
                  tx.type === 'limit'
                    ? tx.description
                    : tx.amount > 0
                      ? `+${tx.amount} coins earned${tx.description ? ` for ${tx.description.replace(/^\+?\d+ coins earned for /, '')}` : ''} on ${formatDate(tx.date)}`
                      : `${tx.amount} coins used${tx.description ? ` to ${tx.description.replace(/^Redeemed 100 coins for /, 'redeem ')}${tx.description.includes('Purchased') ? '' : ''}` : ''} on ${formatDate(tx.date)}`
                }</td>
                <td className={`py-2 pr-4 font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount}
                </td>
                {isPage && <td className="py-2 pr-4">{tx.type}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GreenCoinHistory; 