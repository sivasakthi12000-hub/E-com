import React from 'react';
import { ArrowRight } from 'lucide-react';
import { getNewArrivals } from '../../lib/products';
import { ProductCard } from '../product/ProductCard';

interface NewArrivalsProps {
  onViewAllProducts: () => void;
  onNavigate: (view: string, params?: Record<string, string>) => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  onViewAllProducts,
  onNavigate
}) => {
  const newProducts = getNewArrivals().slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
      {/* Header Row matching reference */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
            New Arrivals
          </h2>
        </div>
        <button
          onClick={onViewAllProducts}
          className="text-xs sm:text-sm font-bold text-[#E85042] hover:text-[#D43D30] flex items-center gap-1.5 transition-colors cursor-pointer group"
        >
          <span>View All Products</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {newProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            // Card 2 ("Sequin Party Dress") is highlighted with active border and Add to Cart button in reference
            isHighlighted={index === 1}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </section>
  );
};
