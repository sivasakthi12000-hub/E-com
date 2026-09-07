import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Category } from '../../types/ecommerce';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: category.bgTint }}
      className="group relative rounded-2xl p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
    >
      {/* Product Image / Cutout on the Left */}
      <div className="w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 flex items-center justify-center relative overflow-hidden rounded-xl">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 rounded-lg"
        />
      </div>

      {/* Details on the Right */}
      <div className="flex-1 pl-3.5 sm:pl-4 flex flex-col justify-between h-full py-0.5">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight group-hover:text-[#E85042] transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            {category.itemCount}
          </p>
        </div>

        {/* Small Arrow button */}
        <div className="mt-3 flex items-center text-gray-800 group-hover:text-[#E85042] transition-colors">
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
