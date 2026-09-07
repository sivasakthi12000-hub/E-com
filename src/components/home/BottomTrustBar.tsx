import React from 'react';
import { Gift, ShieldCheck, Headphones, Crown } from 'lucide-react';

export const BottomTrustBar: React.FC = () => {
  const perks = [
    {
      icon: Gift,
      title: 'Exclusive Offers',
      subtitle: 'Save more every day'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      subtitle: '100% safe & secure'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      subtitle: "We're here to help"
    },
    {
      icon: Crown,
      title: 'Loyalty Rewards',
      subtitle: 'Earn points & get rewards'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
      <div className="bg-[#FFF8F6] rounded-2xl border border-[#FDE8E1] p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {perks.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E85042] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-red-500/20">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 font-medium">
                    {item.subtitle}
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
