import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', onClick }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const tagSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-[11px]'
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
    >
      {/* ChicWove Flower Petal Geometric Mark */}
      <div className={`${iconSizes[size]} relative flex items-center justify-center text-[#E85042] flex-shrink-0 transition-transform group-hover:scale-105 duration-300`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full stroke-current"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* 8-petal symmetrical floral medallion matching reference image */}
          <circle cx="16" cy="16" r="3.2" fill="#E85042" stroke="none" />
          <path d="M16 4 C14 8, 14 11, 16 12.8 C18 11, 18 8, 16 4Z" />
          <path d="M16 28 C14 24, 14 21, 16 19.2 C18 21, 18 24, 16 28Z" />
          <path d="M4 16 C8 14, 11 14, 12.8 16 C11 18, 8 18, 4 16Z" />
          <path d="M28 16 C24 14, 21 14, 19.2 16 C21 18, 24 18, 28 16Z" />
          <path d="M7.5 7.5 C10.5 9.5, 12.5 11.5, 13.8 13.8 C11.5 12.5, 9.5 10.5, 7.5 7.5Z" />
          <path d="M24.5 24.5 C21.5 22.5, 19.5 20.5, 18.2 18.2 C20.5 19.5, 22.5 21.5, 24.5 24.5Z" />
          <path d="M24.5 7.5 C22.5 10.5, 20.5 12.5, 18.2 13.8 C19.5 11.5, 21.5 9.5, 24.5 7.5Z" />
          <path d="M7.5 24.5 C9.5 21.5, 11.5 19.5, 13.8 18.2 C12.5 20.5, 10.5 22.5, 7.5 24.5Z" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span className={`${textSizes[size]} font-bold tracking-tight text-[#1F2421]`}>
          Chic<span className="text-[#E85042]">Wove</span>
        </span>
        <span className={`${tagSizes[size]} tracking-wider uppercase text-gray-500 font-medium mt-0.5`}>
          Wear Your Confidence
        </span>
      </div>
    </div>
  );
};
