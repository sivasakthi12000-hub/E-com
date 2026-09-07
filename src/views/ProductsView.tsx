import React, { useState, useMemo } from 'react';
import { getProducts } from '../lib/products';
import { getCategories } from '../lib/categories';
import { ProductCard } from '../components/product/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { SlidersHorizontal, Search, RotateCcw, X } from 'lucide-react';

interface ProductsViewProps {
  initialFilter?: string;
  initialQuery?: string;
  onNavigate: (view: string, params?: Record<string, string>) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  initialFilter,
  initialQuery = '',
  onNavigate
}) => {
  const allProducts = getProducts();
  const categories = getCategories();
  const { wishlistIds } = useWishlist();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(120);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [onlyWishlist, setOnlyWishlist] = useState<boolean>(initialFilter === 'wishlist');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        // Wishlist filter
        if (onlyWishlist && !wishlistIds.includes(product.id)) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCat = product.categoryName.toLowerCase().includes(q);
          const matchBrand = product.brand.toLowerCase().includes(q);
          const matchTag = product.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchCat && !matchBrand && !matchTag) return false;
        }

        // Price filter
        if (product.price > maxPrice) {
          return false;
        }

        // Rating filter
        if (minRating > 0 && product.rating < minRating) {
          return false;
        }

        // Stock filter
        if (inStockOnly && product.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // 'featured'
      });
  }, [
    allProducts,
    selectedCategory,
    searchQuery,
    maxPrice,
    minRating,
    inStockOnly,
    sortBy,
    onlyWishlist,
    wishlistIds
  ]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(120);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
    setOnlyWishlist(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Title & Breadcrumbs */}
      <div className="mb-8">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          <span
            onClick={() => onNavigate('home')}
            className="hover:text-[#E85042] cursor-pointer"
          >
            Home
          </span>{' '}
          / <span className="text-gray-900">Products Catalog</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {onlyWishlist ? 'Your Wishlist Items' : 'All Fashion Collections'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Showing {filteredProducts.length} of {allProducts.length} styles
            </p>
          </div>

          {/* Quick Search & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#E85042]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden p-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 flex items-center gap-1.5 text-xs font-semibold"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#E85042]" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters */}
        <aside
          className={`lg:block ${
            showMobileFilters ? 'block' : 'hidden'
          } bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-6`}
        >
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#E85042]" />
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Filters
              </h3>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-[#E85042] hover:underline font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Category
            </h4>
            <div className="space-y-1.5">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left text-xs sm:text-sm py-1.5 px-2.5 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#FFF0ED] text-[#E85042] font-bold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left text-xs sm:text-sm py-1.5 px-2.5 rounded-lg font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[#FFF0ED] text-[#E85042] font-bold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2.5 pt-2 border-t border-gray-100">
            <div className="flex justify-between items-center text-xs font-bold text-gray-900 uppercase tracking-wider">
              <span>Max Price</span>
              <span className="text-[#E85042] font-bold">${maxPrice}.00</span>
            </div>
            <input
              type="range"
              min={30}
              max={150}
              step={5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#E85042] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>$30</span>
              <span>$150</span>
            </div>
          </div>

          {/* Minimum Rating Filter */}
          <div className="space-y-2.5 pt-2 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Minimum Rating
            </h4>
            <div className="space-y-1">
              {[0, 4.5, 4.8].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-gray-900 py-1"
                >
                  <input
                    type="radio"
                    name="minRating"
                    checked={minRating === rating}
                    onChange={() => setMinRating(rating)}
                    className="accent-[#E85042]"
                  />
                  <span>{rating === 0 ? 'Any rating' : `${rating}+ Stars ⭐`}</span>
                </label>
              ))}
            </div>
          </div>

          {/* In-Stock Only */}
          <div className="pt-2 border-t border-gray-100">
            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#E85042] rounded"
              />
              <span>In stock items only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Sort & Status Bar */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="text-gray-500 font-medium">
              Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> styles
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sortBySelect" className="text-gray-500 font-semibold">Sort by:</label>
              <select
                id="sortBySelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-800 focus:outline-hidden focus:border-[#E85042]"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Grid of Products */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-4">
              <p className="text-base font-bold text-gray-800">No styles match your filter</p>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try expanding your price range or resetting your category filters to find the perfect look.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#E85042] text-white text-xs font-bold rounded-full hover:bg-[#D43D30] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
