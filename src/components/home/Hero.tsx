import React from 'react';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
  onExploreCollections: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow, onExploreCollections }) => {
  return (
    <section className="relative bg-[#FAF6F0] overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 z-10 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* New Collection Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0ED] border border-[#FCD8D2] text-[#E85042] text-xs font-bold tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 fill-[#E85042]" />
              <span>NEW COLLECTION</span>
            </div>

            {/* Headline matching reference: "Stylish Looks. Everyday You." */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#18181B] leading-[1.12]">
              Stylish Looks.{' '}
              <br className="hidden sm:inline" />
              Everyday <span className="font-display italic text-[#E85042]">You.</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-gray-600 max-w-lg mx-auto lg:mx-0 font-normal leading-relaxed">
              Trendy styles, premium quality &amp; unmatched comfort.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="px-7 py-3.5 bg-[#E85042] hover:bg-[#D43D30] text-white text-sm sm:text-base font-bold rounded-full shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCollections}
                className="px-7 py-3.5 bg-white/80 hover:bg-white text-gray-800 text-sm sm:text-base font-semibold rounded-full border border-gray-300/80 hover:border-gray-400 transition-all shadow-xs cursor-pointer"
              >
                Explore Collections
              </button>
            </div>
          </div>

          {/* Right Column: Model with Coral Arch & Floating Social Proof */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Coral Organic Arch Backdrop */}
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none aspect-[4/4.5] sm:aspect-[4/4.8] flex items-center justify-center">
              {/* Organic Coral Red Shape with Botanical Leaves in Background */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[85%] sm:w-[88%] h-[92%] bg-gradient-to-br from-[#EA5446] to-[#E03E2F] rounded-t-full rounded-bl-[140px] rounded-br-[60px] shadow-2xl shadow-red-500/20 overflow-hidden">
                {/* Botanical leaf line art illustration in SVG overlay */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
                  viewBox="0 0 400 500"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                >
                  <path d="M350 40 C320 80, 360 140, 320 200 C300 160, 280 120, 350 40 Z" />
                  <path d="M320 120 C360 110, 380 90, 370 70" />
                  <path d="M320 160 C360 150, 375 130, 365 110" />
                  <path d="M320 200 C350 210, 370 230, 380 250" />
                  <circle cx="340" cy="50" r="3" fill="#FFFFFF" />
                  <circle cx="370" cy="90" r="2.5" fill="#FFFFFF" />
                  <circle cx="380" cy="180" r="3" fill="#FFFFFF" />
                  <circle cx="310" cy="220" r="2" fill="#FFFFFF" />
                </svg>

                {/* Subtle warm glow dot accent */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/15 rounded-full blur-2xl" />
              </div>

              {/* Foreground Smiling Fashion Model */}
              <div className="relative z-10 w-[92%] h-[98%] flex items-end justify-center">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85"
                  alt="Stylish fashion model with sunglasses and coral overshirt"
                  className="w-full h-full object-cover object-top rounded-b-[40px] drop-shadow-xl"
                />
              </div>

              {/* Floating Social Proof Card: "Loved by 10K+ Women" (matching reference) */}
              <div className="absolute -bottom-4 sm:bottom-4 left-2 sm:left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3.5">
                {/* 3 Overlapping Avatars */}
                <div className="flex -space-x-2.5 overflow-hidden">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                    alt="Customer avatar 1"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                    alt="Customer avatar 2"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80"
                    alt="Customer avatar 3"
                  />
                </div>

                {/* Rating and Text */}
                <div className="leading-tight">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">
                    Loved by 10K+ Women
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="flex text-[#F59E0B]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700 ml-1">
                      4.8
                    </span>
                    <span className="text-[11px] text-gray-500">
                      (2.5K Reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
