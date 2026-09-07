import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchProducts } from '../../lib/products';
import { Product } from '../../types/ecommerce';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (slug: string) => void;
  onSearchAll: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSearchAll
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(query).slice(0, 6);
  }, [query]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchAll(query.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 pt-20">
        <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Search Header */}
          <form onSubmit={handleSubmit} className="relative flex items-center p-4 border-b border-gray-100">
            <Search className="w-5 h-5 text-gray-400 ml-2 mr-3" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by dress, overshirt, denim, blazer, sneakers..."
              className="w-full text-base bg-transparent text-gray-900 placeholder-gray-400 focus:outline-hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-gray-400 hover:text-gray-600 mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </form>

          {/* Quick Suggestions & Results */}
          <div className="p-5 max-h-[60vh] overflow-y-auto">
            {query.trim() === '' ? (
              <div className="space-y-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Party Dress', 'Checked Overshirt', 'Cropped Blazer', 'Denim Jacket', 'Sneakers', 'Tote Bag'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 bg-[#FAF6F0] hover:bg-[#FFF0ED] hover:text-[#E85042] text-xs font-medium text-gray-700 rounded-full transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-sm font-semibold text-gray-800 mb-1">No matches found</p>
                <p className="text-xs text-gray-500">
                  Try searching with another keyword like &apos;dress&apos;, &apos;jacket&apos;, or &apos;blazer&apos;.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Search Results ({results.length})
                  </span>
                  <button
                    onClick={() => {
                      onSearchAll(query);
                      onClose();
                    }}
                    className="text-xs font-semibold text-[#E85042] hover:underline flex items-center gap-1"
                  >
                    View all results <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {results.map((product: Product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product.slug);
                      onClose();
                    }}
                    className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-[#FAF6F0] cursor-pointer transition-colors group"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-14 h-16 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-gray-400">
                          {product.categoryName}
                        </span>
                        {product.isNew && (
                          <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.2 rounded font-semibold">
                            New
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#E85042] truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {product.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
