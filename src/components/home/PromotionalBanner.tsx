import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PromotionalBannerProps {
  onGrabDeal: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ onGrabDeal }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
      <div className="relative bg-gradient-to-r from-[#EB5445] via-[#E84E3F] to-[#DB3B2C] rounded-3xl shadow-xl shadow-red-500/20 overflow-hidden text-white">
        {/* Subtle Botanical Leaf SVG Lines overlay */}
        <svg
          className="absolute left-1/3 top-0 bottom-0 h-full opacity-15 pointer-events-none hidden md:block"
          viewBox="0 0 300 300"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        >
          <path d="M150 20 C110 80, 190 150, 140 280" />
          <path d="M140 100 C180 80, 210 60, 200 40" />
          <path d="M145 150 C190 140, 220 120, 210 90" />
          <path d="M135 210 C180 200, 200 180, 200 150" />
          <circle cx="210" cy="40" r="4" fill="#FFFFFF" />
          <circle cx="215" cy="90" r="3.5" fill="#FFFFFF" />
          <circle cx="205" cy="150" r="3" fill="#FFFFFF" />
        </svg>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
          {/* Left / Center Info */}
          <div className="lg:col-span-7 z-10 flex flex-col items-start space-y-5">
            {/* Limited Time Offer Circular Badge matching reference */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed border-white/60 p-1 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-white text-gray-900 flex flex-col items-center justify-center text-center p-2 shadow-md">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider leading-tight text-gray-800">
                  Limited
                </span>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider leading-tight text-gray-800">
                  Time
                </span>
                <span className="text-[10px] font-semibold text-[#E85042] uppercase tracking-wider">
                  Offer
                </span>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-1.5">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-none">
                Up To 30% OFF
              </h3>
              <p className="text-base sm:text-xl font-medium text-white/90">
                On Selected Women&apos;s Fashion
              </p>
            </div>

            {/* Grab the Deal Button */}
            <button
              onClick={onGrabDeal}
              className="mt-2 px-8 py-3.5 bg-white text-gray-900 hover:bg-[#FAF6F0] text-sm sm:text-base font-bold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 group cursor-pointer"
            >
              <span>Grab the Deal</span>
              <ArrowRight className="w-4 h-4 text-gray-900 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Clothes Rack Photo */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[16/10] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80"
                alt="Rack of trendy pink, coral, denim and floral blouses on wooden hangers"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
