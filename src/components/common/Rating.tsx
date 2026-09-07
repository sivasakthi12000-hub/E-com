import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
  count?: number;
  showValue?: boolean;
  size?: number;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  count,
  showValue = false,
  size = 14,
  className = ''
}) => {
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center text-[#F59E0B]">
        {Array.from({ length: max }).map((_, i) => {
          const isFilled = i < Math.floor(value);
          const isHalf = !isFilled && i < value;
          return (
            <Star
              key={i}
              size={size}
              className={`${
                isFilled
                  ? 'fill-[#F59E0B] text-[#F59E0B]'
                  : isHalf
                  ? 'fill-[#FCD34D] text-[#F59E0B]'
                  : 'text-[#E5E7EB]'
              }`}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-gray-800 ml-0.5">
          {value.toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className="text-xs text-gray-500">
          ({count} Reviews)
        </span>
      )}
    </div>
  );
};
