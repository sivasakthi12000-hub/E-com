import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  ArrowRight,
  Lock,
  ChevronLeft
} from 'lucide-react';

interface CheckoutViewProps {
  onNavigate: (view: string, params?: Record<string, string>) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ onNavigate }) => {
  const { cart, subtotal, discount, shipping, total, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@example.com',
    phone: '+1 (555) 382-9910',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zipCode: '97477',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'applepay' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('884');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shippingCost = shippingMethod === 'express' ? shipping + 15 : shipping;
  const finalTotal = Math.round((subtotal - discount + shippingCost) * 100) / 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedId = `CW-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setOrderComplete(true);
      clearCart();
    }, 1200);
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#E85042]">
          Thank You For Your Order!
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-3">
          Order Confirmed #{orderId}
        </h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto mb-8">
          A confirmation email and tracking link have been dispatched to{' '}
          <b>{formData.email}</b>. Your order will be carefully packaged and shipped promptly.
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-left max-w-md mx-auto shadow-xs mb-8 space-y-3 text-xs">
          <div className="flex justify-between font-medium text-gray-600">
            <span>Customer:</span>
            <span className="font-bold text-gray-900">
              {formData.firstName} {formData.lastName}
            </span>
          </div>
          <div className="flex justify-between font-medium text-gray-600">
            <span>Shipping To:</span>
            <span className="font-bold text-gray-900 text-right">
              {formData.address}, {formData.city}, {formData.state}
            </span>
          </div>
          <div className="flex justify-between font-medium text-gray-600">
            <span>Delivery Method:</span>
            <span className="font-bold text-gray-900">
              {shippingMethod === 'express' ? 'Express (1-2 business days)' : 'Standard (3-5 business days)'}
            </span>
          </div>
          <div className="flex justify-between font-medium text-gray-600 pt-2 border-t border-gray-100">
            <span>Total Paid:</span>
            <span className="font-bold text-base text-[#E85042]">${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('home')}
          className="px-8 py-3 bg-[#E85042] hover:bg-[#D43D30] text-white text-sm font-bold rounded-full shadow-lg shadow-red-500/25 transition-all"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Items to Checkout</h2>
        <p className="text-sm text-gray-500 mb-6">
          Your shopping bag is empty. Please add some products to checkout.
        </p>
        <button
          onClick={() => onNavigate('products')}
          className="px-6 py-2.5 bg-[#E85042] text-white text-xs font-bold rounded-full"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={() => onNavigate('cart')}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#E85042] transition-colors mb-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back to bag
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Secure Checkout
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Encrypted Transaction</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Customer & Payment Form (cols 7) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer Contact */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFF0ED] text-[#E85042] text-xs flex items-center justify-center font-bold">
                1
              </span>
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#E85042]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#E85042]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFF0ED] text-[#E85042] text-xs flex items-center justify-center font-bold">
                2
              </span>
              Delivery Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#E85042]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#E85042]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#E85042]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#E85042]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">State / Province</label>
                <input
                  type="text"
                  required
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#E85042]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ZIP / Postal Code</label>
                <input
                  type="text"
                  required
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#E85042]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#E85042]"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            {/* Shipping Method Option */}
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-xs font-semibold text-gray-700 mb-2">Shipping Method</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between ${
                    shippingMethod === 'standard'
                      ? 'border-[#E85042] bg-[#FFF0ED]/40'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="accent-[#E85042]"
                    />
                    <div>
                      <p className="font-bold text-gray-900">Standard Delivery</p>
                      <p className="text-gray-500 text-[11px]">3-5 Business Days</p>
                    </div>
                  </div>
                  <span className="font-bold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </label>

                <label
                  className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between ${
                    shippingMethod === 'express'
                      ? 'border-[#E85042] bg-[#FFF0ED]/40'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="accent-[#E85042]"
                    />
                    <div>
                      <p className="font-bold text-gray-900">Express Priority</p>
                      <p className="text-gray-500 text-[11px]">1-2 Business Days</p>
                    </div>
                  </div>
                  <span className="font-bold">+ $15.00</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFF0ED] text-[#E85042] text-xs flex items-center justify-center font-bold">
                3
              </span>
              Payment Selection
            </h2>

            {/* Payment Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'card', label: 'Credit Card', icon: CreditCard },
                { id: 'paypal', label: 'PayPal', icon: ShieldCheck },
                { id: 'applepay', label: 'Apple Pay', icon: Lock },
                { id: 'cod', label: 'Cash on Del.', icon: Truck }
              ].map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === m.id
                      ? 'border-[#E85042] bg-[#FFF0ED] text-[#E85042]'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <m.icon className="w-4 h-4" />
                  <span>{m.label}</span>
                </button>
              ))}
            </div>

            {/* Card Inputs */}
            {paymentMethod === 'card' && (
              <div className="pt-3 space-y-3 bg-[#FAF6F0] p-4 rounded-xl border border-gray-100">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#E85042]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">Expiration</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#E85042]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">CVC / Security Code</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#E85042]"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod !== 'card' && (
              <div className="p-4 bg-gray-50 rounded-xl text-xs text-gray-600 text-center">
                You will complete your payment via <b>{paymentMethod.toUpperCase()}</b> on the next confirmation step.
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Review & Submit (cols 5) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-6">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-4">
            Items in Order ({cart.length})
          </h2>

          {/* Cart items list */}
          <div className="space-y-3.5 max-h-64 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-xs">
                <img
                  src={item.product.thumbnail || item.product.images[0]}
                  alt={item.product.name}
                  className="w-12 h-14 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{item.product.name}</p>
                  <p className="text-gray-500 text-[11px]">
                    Qty: {item.quantity} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                  </p>
                </div>
                <div className="font-bold text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Cost breakdown */}
          <div className="border-t border-gray-100 pt-4 space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#E85042]">
                <span>Coupon Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Cost</span>
              <span className="font-semibold text-gray-900">
                {shippingCost === 0 ? <span className="text-emerald-600">FREE</span> : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 pt-3 border-t border-gray-200">
              <span>Total Amount</span>
              <span className="text-xl text-[#E85042]">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3.5 bg-[#E85042] hover:bg-[#D43D30] disabled:bg-gray-300 text-white text-sm font-bold rounded-full shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            {isProcessing ? (
              <span>Processing Order...</span>
            ) : (
              <>
                <span>Place Order (${finalTotal.toFixed(2)})</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-[11px] text-gray-400 text-center">
            By placing this order, you agree to ChicWove&apos;s 7-day hassle-free return policy &amp; terms.
          </p>
        </div>
      </form>
    </div>
  );
};
