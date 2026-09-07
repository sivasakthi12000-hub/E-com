import React from 'react';
import { Logo } from '../components/common/Logo';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="flex justify-center mb-2">
          <Logo size="lg" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Wear Your Confidence
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          ChicWove was founded on a singular belief: high fashion shouldn&apos;t demand sacrifice in comfort, quality, or accessibility. We craft timeless silhouettes that empower women to embrace their authentic everyday beauty.
        </p>
      </div>

      <div className="rounded-3xl overflow-hidden shadow-xl aspect-[16/9] max-h-96">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
          alt="ChicWove Atelier Design Studio"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#FFF0ED] text-[#E85042] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Modern Silhouettes</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Every stitch is tailored to flatter natural curves with effortless movement and relaxed refinement.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#FFF0ED] text-[#E85042] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Ethical Craft</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            We partner with verified fair-wage makers using premium organic cottons, sustainable denim, and durable materials.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#FFF0ED] text-[#E85042] flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900">10K+ Happy Women</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Backed by a community of thousands of women worldwide who celebrate self-expression and grace.
          </p>
        </div>
      </div>

      <div className="text-center pt-6">
        <button
          onClick={() => onNavigate('products')}
          className="px-8 py-3.5 bg-[#E85042] text-white text-sm font-bold rounded-full hover:bg-[#D43D30] shadow-lg shadow-red-500/25 transition-all"
        >
          Explore the Collection
        </button>
      </div>
    </div>
  );
};
