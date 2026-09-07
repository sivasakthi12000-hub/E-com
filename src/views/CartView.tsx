import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, Tag, Check, ShoppingBag, ShieldCheck } from 'lucide-react';

interface CartViewProps {
  onNavigate: (view: string, params?: Record<string, string>) => void;
}

export const CartView: React.FC<CartViewProps> = ({ onNavigate }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    total,
    totalItemsCount,
    promoCode,
    promoApplied,
    applyPromoCode,
    removePromoCode
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!inputCode.trim()) return;
    const ok = applyPromoCode(inputCode);
    if (ok) {
      setInputCode('');
    } else {
      setPromoError('Invalid code. Use "CHIC30" for 30% off!');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-[#FFF0ED] text-[#E85042] rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Shopping Bag is Empty</h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-8">
          Explore our new arrivals and popular collections to find pieces you love.
        </p>
        <button
          onClick={() => onNavigate('products')}
          className="px-8 py-3 bg-[#E85042] hover:bg-[#D43D30] text-white text-sm font-bold rounded-full shadow-lg shadow-red-500/25 transition-all"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb & Title */}
      <div className="mb-8">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          <span onClick={() => onNavigate('home')} className="hover:text-[#E85042] cursor-pointer">
            Home
          </span>{' '}
          / <span className="text-gray-900">Shopping Bag</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Your Shopping Bag ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Cart Items List (cols 8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-xs divide-y divide-gray-100">
          {cart.map((item) => (
            <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Product Thumbnail */}
              <img
                src={item.product.thumbnail || item.product.images[0]}
                alt={item.product.name}
                onClick={() => onNavigate('product', { slug: item.product.slug })}
                className="w-24 h-28 sm:w-28 sm:h-32 object-cover rounded-xl bg-gray-100 flex-shrink-0 cursor-pointer"
              />

              {/* Product Info & Controls */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3
                      onClick={() => onNavigate('product', { slug: item.product.slug })}
                      className="text-base font-bold text-gray-900 hover:text-[#E85042] cursor-pointer"
                    >
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 uppercase font-bold mt-0.5">
                    {item.product.categoryName}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-gray-600 mt-2">
                    {item.selectedSize && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded font-medium">
                        Size: {item.selectedSize}
                      </span>
                    )}
                    {item.selectedColor && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded font-medium">
                        Color: {item.selectedColor}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  {/* Quantity adjustment */}
                  <div className="flex items-center border border-gray-200 rounded-xl bg-white">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-gray-600 hover:text-black transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-xs font-bold text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-gray-600 hover:text-black transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Unit price & total price */}
                  <div className="text-right">
                    <div className="text-base font-bold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-xs text-gray-400">
                        ${item.product.price.toFixed(2)} each
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-5 flex items-center justify-between">
            <button
              onClick={() => onNavigate('products')}
              className="flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-[#E85042] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </button>
          </div>
        </div>

        {/* Right: Summary Box (cols 4) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-6">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-4">
            Order Summary
          </h2>

          {/* Promo Code Form */}
          <div>
            {promoApplied ? (
              <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 text-xs px-3.5 py-2.5 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Promo code <b>{promoCode}</b> (-30%)
                </div>
                <button
                  onClick={removePromoCode}
                  className="text-emerald-700 hover:text-emerald-900 underline font-semibold text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. CHIC30)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#E85042]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-black transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-red-500">{promoError}</p>}
                <p className="text-[11px] text-gray-400">
                  Tip: Use promo code <b className="text-gray-600">CHIC30</b> for 30% off!
                </p>
              </form>
            )}
          </div>

          {/* Subtotals breakdown */}
          <div className="space-y-3 text-xs sm:text-sm text-gray-600 border-t border-gray-100 pt-4">
            <div className="flex justify-between">
              <span>Bag Subtotal</span>
              <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#E85042]">
                <span>Promotional Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-[11px] text-gray-400">
                Add ${(100 - subtotal).toFixed(2)} more for Free Shipping
              </p>
            )}
            <div className="flex justify-between text-base font-bold text-gray-900 pt-3 border-t border-gray-200">
              <span>Total Due</span>
              <span className="text-xl text-[#E85042]">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout CTA Button */}
          <button
            onClick={() => onNavigate('checkout')}
            className="w-full py-3.5 bg-[#E85042] hover:bg-[#D43D30] text-white text-sm font-bold rounded-full shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Trust badge */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
