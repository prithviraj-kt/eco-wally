import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CreditCard, Truck, CheckCircle } from 'lucide-react';

function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartTotal, 
  deliveryFee, 
  finalTotal, 
  totalCarbonImpact, 
  totalGreenCoins,
  cartOptions 
}) {
  const { cart, dispatch, addGreenCoins } = useApp();
  const [step, setStep] = useState(1); // 1: Payment, 2: Success
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    address: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = () => {
    if (!orderData.name || !orderData.cardNumber || !orderData.address) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Create order
      const newOrder = {
        id: Date.now(),
        items: [...cart],
        total: finalTotal,
        subtotal: cartTotal,
        deliveryFee: deliveryFee,
        carbonImpact: totalCarbonImpact,
        greenCoins: totalGreenCoins,
        groupBuying: cartOptions.groupBuying,
        orderDate: new Date().toISOString(),
        status: 'confirmed',
        address: orderData.address,
        canReturnPackaging: !cartOptions.groupBuying, // Only if not group buying
        hasReviewed: false,
        packagingReturned: false
      };

      dispatch({ type: 'ADD_ORDER', payload: newOrder });
      
      // Award green coins for purchase
      addGreenCoins(totalGreenCoins, 'completing purchase', Math.abs(totalCarbonImpact));
      
      setIsProcessing(false);
      setStep(2);
    }, 2000);
  };

  const handleClose = () => {
    setStep(1);
    setIsProcessing(false);
    setOrderData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      name: '',
      address: ''
    });
    onClose();
    
    if (step === 2) {
      dispatch({ type: 'SET_VIEW', payload: 'orders' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {step === 1 ? 'Checkout' : 'Order Confirmed!'}
          </h2>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === 1 ? (
          <div className="p-6 space-y-6">
            {/* Payment Information */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Payment Information</span>
              </h3>
              
              <input
                type="text"
                name="name"
                placeholder="Cardholder Name *"
                value={orderData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number *"
                value={orderData.cardNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={orderData.expiryDate}
                  onChange={handleInputChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={orderData.cvv}
                  onChange={handleInputChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center space-x-2">
                <Truck className="h-5 w-5" />
                <span>Shipping Address</span>
              </h3>
              
              <textarea
                name="address"
                placeholder="Full Address *"
                value={orderData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>${deliveryFee}</span>
              </div>
              {cartOptions.groupBuying && (
                <div className="text-sm text-green-600">
                  ✓ Group buying discount applied
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? 'Processing...' : 'Complete Order'}
            </button>
          </div>
        ) : (
          <div className="p-6 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900">
              Order Placed Successfully!
            </h3>
            
            <p className="text-gray-600">
              Thank you for your eco-friendly purchase. You've earned {totalGreenCoins} Green Coins!
            </p>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">Environmental Impact</h4>
              <p className="text-sm text-green-700">
                {totalCarbonImpact < 0 ? 'You saved' : 'You added'} {Math.abs(totalCarbonImpact).toFixed(1)} kg CO₂ with this order
              </p>
            </div>
            
            <button
              onClick={handleClose}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View My Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutModal;