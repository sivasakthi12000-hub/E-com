import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Tag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartDrawerProps {
  onNavigate: (view: string, params?: Record<string, string>) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    total,
    totalItemsCount,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    promoCode,
    promoApplied,
    applyPromoCode,
    removePromoCode
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!inputCode.trim()) return;
    const success = applyPromoCode(inputCode);
    if (success) {
      setInputCode('');
    } else {
      setPromoError('Invalid code. Try "CHIC30" for 30% off!');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    onNavigate('checkout');
  };

  const handleViewCartClick = () => {
    setIsCartDrawerOpen(false);
    onNavigate('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E85042]" />
              <h2 className="text-lg font-bold text-gray-900">Your Shopping Bag</h2>
              <span className="bg-[#FFF0ED] text-[#E85042] text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItemsCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#FFF0ED] flex items-center justify-center text-[#E85042] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Your bag is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mb-6">
                  Looks like you haven&apos;t added any stylish pieces to your bag yet.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    onNavigate('products');
                  }}
                  className="px-6 py-2.5 bg-[#E85042] text-white text-sm font-semibold rounded-full hover:bg-[#D43D30] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 pb-4 border-b border-gray-100 last:border-0"
                >
                  <img
                    src={item.product.thumbnail || item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xl bg-gray-100 flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      onNavigate('product', { slug: item.product.slug });
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4
                          onClick={() => {
                            setIsCartDrawerOpen(false);
                            onNavigate('product', { slug: item.product.slug });
                          }}
                          className="text-sm font-semibold text-gray-900 hover:text-[#E85042] cursor-pointer line-clamp-1"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedColor && (
                          <span className="flex items-center gap-1">
                            • Color: {item.selectedColor}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-5 bg-[#FAF6F0]/50 space-y-3.5">
              {/* Promo code field */}
              {promoApplied ? (
                <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 text-xs px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Promo code <b>{promoCode}</b> applied!
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-emerald-700 hover:text-emerald-900 underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. CHIC30)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white focus:outline-hidden focus:border-[#E85042]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && <p className="text-[11px] text-red-500">{promoError}</p>}

              {/* Subtotals */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#E85042]">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <b className="text-emerald-600">Free</b> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-[#E85042]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleViewCartClick}
                  className="w-full py-2.5 px-3 border border-gray-300 text-gray-800 text-xs font-bold rounded-full hover:bg-gray-100 transition-colors"
                >
                  View Full Cart
                </button>
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-2.5 px-3 bg-[#E85042] text-white text-xs font-bold rounded-full hover:bg-[#D43D30] transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-red-500/20"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
