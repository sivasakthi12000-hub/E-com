import React from 'react';
import { getProducts } from '../lib/products';
import { ProductCard } from '../components/product/ProductCard';
import { Sparkles, Clock, Tag, ArrowRight } from 'lucide-react';

interface DealsViewProps {
  onNavigate: (view: string, params?: Record<string, string>) => void;
}

export const DealsView: React.FC<DealsViewProps> = ({ onNavigate }) => {
  const products = getProducts();
  const discounted = products.filter((p) => p.discountPercentage && p.discountPercentage > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#EA5446] to-[#D93829] rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-12 relative overflow-hidden">
        <div className="max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>FLASH SALE ENDS SOON</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Up To 30% OFF All Curated Edits
          </h1>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed">
            Apply code <b className="bg-white text-[#EA5446] px-2 py-0.5 rounded font-mono">CHIC30</b> at checkout for an instant 30% discount on all styles today!
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Featured Deals</h2>
          <p className="text-xs text-gray-500 mt-1">Limited quantities available at special pricing</p>
        </div>
        <button
          onClick={() => onNavigate('products')}
          className="text-xs font-bold text-[#E85042] hover:underline flex items-center gap-1"
        >
          View all catalog <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {discounted.map((product, idx) => (
          <ProductCard
            key={product.id}
            product={product}
            isHighlighted={idx === 0}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
};
