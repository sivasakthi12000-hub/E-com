import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface BlogViewProps {
  onNavigate: (view: string, params?: Record<string, string>) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onNavigate }) => {
  const articles = [
    {
      title: 'How to Style the Checked Overshirt for Transitional Weather',
      date: 'Sep 4, 2026',
      author: 'Chloe Laurent',
      category: 'Style Guide',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
      excerpt: 'From casual weekend coffee runs to layered evening outfits, discover 5 versatile ways to style our hero overshirt.'
    },
    {
      title: 'The Return of the Statement Sequin Dress: Night Out Glamour',
      date: 'Aug 28, 2026',
      author: 'Elena Rossi',
      category: 'Trends',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Why high-sparkle micro-sequins and jewel tones are dominating every runway and festive calendar this season.'
    },
    {
      title: 'Capsule Wardrobe 101: 7 Pieces for 30 Chic Daily Outfits',
      date: 'Aug 15, 2026',
      author: 'Maya Lin',
      category: 'Capsule Edit',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Simplify your mornings without losing an ounce of chic elegance. Our lead stylist shares her foundational checklist.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E85042]">
          The ChicWove Journal
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-3">
          Style, Stories &amp; Inspiration
        </h1>
        <p className="text-sm text-gray-500">
          Curated styling notes, trend forecasts, and behind-the-scenes glimpses from our design atelier.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E85042] bg-[#FFF0ED] px-2.5 py-0.5 rounded-full">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-[#E85042] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {item.date}
              </span>
              <button
                onClick={() => onNavigate('products')}
                className="font-bold text-[#E85042] flex items-center gap-1 hover:underline"
              >
                Read Edit <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
