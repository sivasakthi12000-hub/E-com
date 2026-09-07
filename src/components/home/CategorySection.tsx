import React from 'react';
import { ArrowRight } from 'lucide-react';
import { getCategories } from '../../lib/categories';
import { CategoryCard } from '../category/CategoryCard';

interface CategorySectionProps {
  onSelectCategory: (slug: string) => void;
  onViewAllCategories: () => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  onViewAllCategories
}) => {
  const categories = getCategories();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
      {/* Header Row matching reference */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
            Shop by Category
          </h2>
        </div>
        <button
          onClick={onViewAllCategories}
          className="text-xs sm:text-sm font-bold text-[#E85042] hover:text-[#D43D30] flex items-center gap-1.5 transition-colors cursor-pointer group"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 5 Categories Grid matching reference design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onClick={() => onSelectCategory(category.slug)}
          />
        ))}
      </div>
    </section>
  );
};
