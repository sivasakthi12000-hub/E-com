import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchModal } from './components/common/SearchModal';
import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { CategoryView } from './views/CategoryView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { DealsView } from './views/DealsView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { BlogView } from './views/BlogView';

export default function App() {
  // Navigation routing state
  const [currentView, setCurrentView] = useState<string>('home');
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Parse path on initial mount or popstate
  useEffect(() => {
    const parsePath = () => {
      const path = window.location.pathname;
      const search = window.location.search;
      const urlParams = new URLSearchParams(search);

      if (path.startsWith('/category/')) {
        const slug = path.replace('/category/', '').replace(/\/$/, '');
        setCurrentView('category');
        setRouteParams({ slug });
      } else if (path.startsWith('/product/')) {
        const slug = path.replace('/product/', '').replace(/\/$/, '');
        setCurrentView('product');
        setRouteParams({ slug });
      } else if (path === '/cart') {
        setCurrentView('cart');
        setRouteParams({});
      } else if (path === '/checkout') {
        setCurrentView('checkout');
        setRouteParams({});
      } else if (path === '/products' || path === '/shop') {
        const query = urlParams.get('q') || '';
        const filter = urlParams.get('filter') || '';
        setCurrentView('products');
        setRouteParams({ initialQuery: query, initialFilter: filter });
      } else if (path === '/deals') {
        setCurrentView('deals');
        setRouteParams({});
      } else if (path === '/about') {
        setCurrentView('about');
        setRouteParams({});
      } else if (path === '/contact') {
        setCurrentView('contact');
        setRouteParams({});
      } else if (path === '/blog') {
        setCurrentView('blog');
        setRouteParams({});
      } else {
        setCurrentView('home');
        setRouteParams({});
      }
    };

    parsePath();
    window.addEventListener('popstate', parsePath);
    return () => window.removeEventListener('popstate', parsePath);
  }, []);

  // Programmatic navigation handler
  const handleNavigate = (view: string, params: Record<string, string> = {}) => {
    setCurrentView(view);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update browser URL smoothly without reloading
    let url = '/';
    if (view === 'products') {
      if (params.initialQuery) {
        url = `/products?q=${encodeURIComponent(params.initialQuery)}`;
      } else if (params.filter) {
        url = `/products?filter=${encodeURIComponent(params.filter)}`;
      } else {
        url = '/products';
      }
    } else if (view === 'category' && params.slug) {
      url = `/category/${params.slug}`;
    } else if (view === 'product' && params.slug) {
      url = `/product/${params.slug}`;
    } else if (view === 'cart') {
      url = '/cart';
    } else if (view === 'checkout') {
      url = '/checkout';
    } else if (view === 'deals') {
      url = '/deals';
    } else if (view === 'about') {
      url = '/about';
    } else if (view === 'contact') {
      url = '/contact';
    } else if (view === 'blog') {
      url = '/blog';
    }

    try {
      window.history.pushState({}, '', url);
    } catch {
      // Safe fallback in restricted sandboxes
    }
  };

  const handleSearchSubmit = (query: string) => {
    handleNavigate('products', { initialQuery: query });
  };

  const handleSelectSearchProduct = (slug: string) => {
    handleNavigate('product', { slug });
  };

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-gray-900 font-sans selection:bg-[#E85042] selection:text-white">
          {/* Header */}
          <Header
            currentView={currentView}
            onNavigate={handleNavigate}
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          {/* View Container */}
          <div className="flex-1">
            {currentView === 'home' && (
              <HomeView onNavigate={handleNavigate} />
            )}

            {currentView === 'products' && (
              <ProductsView
                initialFilter={routeParams.initialFilter || routeParams.filter}
                initialQuery={routeParams.initialQuery}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'category' && (
              <CategoryView
                slug={routeParams.slug || 'women-dresses'}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'product' && (
              <ProductDetailView
                slug={routeParams.slug || 'sequin-party-dress'}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'cart' && (
              <CartView onNavigate={handleNavigate} />
            )}

            {currentView === 'checkout' && (
              <CheckoutView onNavigate={handleNavigate} />
            )}

            {currentView === 'deals' && (
              <DealsView onNavigate={handleNavigate} />
            )}

            {currentView === 'about' && (
              <AboutView onNavigate={handleNavigate} />
            )}

            {currentView === 'contact' && (
              <ContactView />
            )}

            {currentView === 'blog' && (
              <BlogView onNavigate={handleNavigate} />
            )}
          </div>

          {/* Footer */}
          <Footer onNavigate={handleNavigate} />

          {/* Slide-over Cart Drawer */}
          <CartDrawer onNavigate={handleNavigate} />

          {/* Live Search Modal */}
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSearchAll={handleSearchSubmit}
            onSelectProduct={handleSelectSearchProduct}
          />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
