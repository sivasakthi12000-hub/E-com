import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';

export const FeatureBar: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Premium Quality',
      description: 'Handpicked just for you'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'On-time delivery guaranteed'
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '7 days return policy'
    },
    {
      icon: Award,
      title: 'Best Prices',
      description: 'Stylish looks, best prices'
    }
  ];

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-12 sm:mb-16">
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100/80 p-5 sm:p-6 lg:p-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-center gap-4 ${
                  index !== 0 ? 'pt-4 sm:pt-0 sm:pl-6 lg:pl-8' : ''
                }`}
              >
                {/* Coral Tint Icon Circle */}
                <div className="w-12 h-12 rounded-xl bg-[#FFF0ED] text-[#E85042] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
