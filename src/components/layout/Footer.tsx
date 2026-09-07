import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { Mail, ArrowRight, ShieldCheck, Heart, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, params?: Record<string, string>) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#18181B] text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/95 p-2 rounded-xl inline-block">
              <Logo size="md" onClick={() => onNavigate('home')} />
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Empowering women through everyday elegance, uncompromising quality, and tailored confidence. Discover modern silhouettes crafted for every moment.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#E85042] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#E85042] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#E85042] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#E85042] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Shop Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('category', { slug: 'women-dresses' })}
                  className="hover:text-[#E85042] transition-colors"
                >
                  Women Dresses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category', { slug: 'tops-t-shirts' })}
                  className="hover:text-[#E85042] transition-colors"
                >
                  Tops & T-shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category', { slug: 'denim-wear' })}
                  className="hover:text-[#E85042] transition-colors"
                >
                  Denim Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category', { slug: 'shoes-footwear' })}
                  className="hover:text-[#E85042] transition-colors"
                >
                  Shoes & Footwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category', { slug: 'bags-accessories' })}
                  className="hover:text-[#E85042] transition-colors"
                >
                  Bags & Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#E85042] transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('checkout')} className="hover:text-[#E85042] transition-colors">
                  Order Tracking
                </button>
              </li>
              <li>
                <button onClick={() => alert('Shipping & Returns: Free 7-day hassle-free returns on all US orders.')} className="hover:text-[#E85042] transition-colors">
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button onClick={() => alert('Size Guide: True to size. Model is 5\'8" wearing size S.')} className="hover:text-[#E85042] transition-colors">
                  Size Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#E85042] transition-colors">
                  Our Story
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Stay In Style
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Subscribe to unlock 15% off your first purchase and exclusive access to drops.
            </p>
            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>You&apos;re in! Check your inbox for your 15% code.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-hidden focus:border-[#E85042]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#E85042] text-white text-xs font-bold rounded-lg hover:bg-[#D43D30] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 space-y-3 sm:space-y-0">
          <p>© {new Date().getFullYear()} ChicWove. All rights reserved. Wear Your Confidence.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-400 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
