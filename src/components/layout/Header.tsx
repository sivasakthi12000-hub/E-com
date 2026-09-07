import React, { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { Logo } from '../common/Logo';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, params?: Record<string, string>) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenSearch
}) => {
  const { totalItemsCount, setIsCartDrawerOpen } = useCart();
  const { wishlistIds } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'products' },
    { label: 'Deals', view: 'deals' },
    { label: 'About Us', view: 'about' },
    { label: 'Blog', view: 'blog' },
    { label: 'Contact', view: 'contact' }
  ];

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#F0EAE1] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Logo size="md" onClick={() => onNavigate('home')} />
          </div>

          {/* Desktop Navigation Links matching reference */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive =
                currentView === item.view ||
                (item.view === 'home' && currentView === '') ||
                (item.view === 'products' && (currentView === 'category' || currentView === 'product'));
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view)}
                  className={`text-sm font-semibold transition-colors duration-200 relative py-1 ${
                    isActive
                      ? 'text-[#E85042]'
                      : 'text-gray-700 hover:text-[#E85042]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E85042] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Search, User, Bag */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Icon Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-gray-700 hover:text-[#E85042] hover:bg-white/80 rounded-full transition-colors cursor-pointer"
              title="Search products"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist quick link */}
            <button
              onClick={() => onNavigate('products', { filter: 'wishlist' })}
              className="p-2 text-gray-700 hover:text-[#E85042] hover:bg-white/80 rounded-full transition-colors relative cursor-pointer"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#E85042] rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* User Account Button with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 text-gray-700 hover:text-[#E85042] hover:bg-white/80 rounded-full transition-colors cursor-pointer"
                title="Account"
                aria-label="User Account"
              >
                <User className="w-5 h-5" />
              </button>

              {showUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-900">Welcome Guest</p>
                    <p className="text-[11px] text-gray-500">Sign in for member perks</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onNavigate('checkout');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-[#FAF6F0] hover:text-[#E85042]"
                  >
                    Track Orders
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onNavigate('cart');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-[#FAF6F0] hover:text-[#E85042]"
                  >
                    My Bag ({totalItemsCount})
                  </button>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      alert('Member Rewards Program: Earn 10 points for every $1 spent at ChicWove!');
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-[#E85042] hover:bg-[#FFF0ED]"
                  >
                    VIP Rewards (Active)
                  </button>
                </div>
              )}
            </div>

            {/* Shopping Bag Icon with Notification Badge (matches exact '2' badge in reference image) */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-2 text-gray-800 hover:text-[#E85042] hover:bg-white/80 rounded-full transition-colors relative cursor-pointer group"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#E85042] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-[#E85042] rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.view)}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
                currentView === item.view
                  ? 'bg-[#FFF0ED] text-[#E85042]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between px-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#E85042]"
            >
              <Search className="w-4 h-4" /> Search Store
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('cart');
              }}
              className="flex items-center gap-2 text-xs font-bold text-[#E85042]"
            >
              <ShoppingBag className="w-4 h-4" /> View Bag ({totalItemsCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
