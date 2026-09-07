import React from 'react';
import { Hero } from '../components/home/Hero';
import { FeatureBar } from '../components/home/FeatureBar';
import { CategorySection } from '../components/home/CategorySection';
import { NewArrivals } from '../components/home/NewArrivals';
import { PromotionalBanner } from '../components/home/PromotionalBanner';
import { BottomTrustBar } from '../components/home/BottomTrustBar';

interface HomeViewProps {
  onNavigate: (view: string, params?: Record<string, string>) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <Hero
        onShopNow={() => onNavigate('products')}
        onExploreCollections={() => onNavigate('products', { filter: 'featured' })}
      />

      {/* 2. Feature / Value Prop Bar */}
      <FeatureBar />

      {/* 3. Shop by Category */}
      <CategorySection
        onSelectCategory={(slug) => onNavigate('category', { slug })}
        onViewAllCategories={() => onNavigate('products')}
      />

      {/* 4. New Arrivals */}
      <NewArrivals
        onViewAllProducts={() => onNavigate('products')}
        onNavigate={onNavigate}
      />

      {/* 5. Promotional Banner: Up to 30% OFF */}
      <PromotionalBanner
        onGrabDeal={() => onNavigate('deals')}
      />

      {/* 6. Bottom Trust / Perks Bar */}
      <BottomTrustBar />
    </main>
  );
};
