import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'hot' | 'new' | 'popular' | 'trending' | 'sale' | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = ''
}) => {
  const variantStyles = {
    hot: 'bg-[#E85042] text-white',
    new: 'bg-[#22C55E] text-white',
    popular: 'bg-[#8B5CF6] text-white',
    trending: 'bg-[#F97316] text-white',
    sale: 'bg-[#EF4444] text-white',
    default: 'bg-[#FFF0ED] text-[#E85042] border border-[#FCD8D2]'
  };

  return (
    <span
      className={`inline-flex items-center justify-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full tracking-wide shadow-xs ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
