import React from 'react';
import { getCategoryBySlug } from '../lib/categories';
import { getProductsByCategory } from '../lib/products';
import { ProductCard } from '../components/product/ProductCard';
import { ArrowLeft } from 'lucide-react';

interface CategoryViewProps {
  slug: string;
  onNavigate: (view: string, params?: Record<string, string>) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ slug, onNavigate }) => {
  const category = getCategoryBySlug(slug);
  const products = category ? getProductsByCategory(category.id) : [];

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Category Not Found</h2>
        <p className="text-sm text-gray-500 mb-6">
          We couldn&apos;t find the category you requested.
        </p>
        <button
          onClick={() => onNavigate('products')}
          className="px-6 py-2.5 bg-[#E85042] text-white text-xs font-bold rounded-full"
        >
          View All Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-[#E85042] transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('products')}
          className="hover:text-[#E85042] transition-colors"
        >
          Categories
        </button>
        <span>/</span>
        <span className="text-gray-900">{category.name}</span>
      </div>

      {/* Category Banner with Custom Tint matching design */}
      <div
        style={{ backgroundColor: category.bgTint }}
        className="rounded-3xl p-6 sm:p-10 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs"
      >
        <div className="space-y-2 text-center md:text-left max-w-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E85042]">
            Curated Collection
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            {category.name}
          </h1>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {category.description}
          </p>
          <p className="text-xs font-semibold text-gray-600 pt-1">
            Available: {products.length} styles in this edit
          </p>
        </div>

        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-lg border-2 border-white/60">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Back button & title row */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('products')}
          className="flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#E85042] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all categories
        </button>
        <span className="text-xs text-gray-500 font-medium">
          Showing {products.length} products
        </span>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-sm font-bold text-gray-800 mb-2">No products in this category yet</p>
          <button
            onClick={() => onNavigate('products')}
            className="px-6 py-2.5 bg-[#E85042] text-white text-xs font-bold rounded-full"
          >
            Explore Other Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};
