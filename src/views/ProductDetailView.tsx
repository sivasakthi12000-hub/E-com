import React, { useState } from 'react';
import { getProductBySlug, getRelatedProducts } from '../lib/products';
import { ProductCard } from '../components/product/ProductCard';
import { Rating } from '../components/common/Rating';
import { Badge } from '../components/common/Badge';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  Share2
} from 'lucide-react';

interface ProductDetailViewProps {
  slug: string;
  onNavigate: (view: string, params?: Record<string, string>) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ slug, onNavigate }) => {
  const product = getProductBySlug(slug);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors[0]?.name || 'Standard'
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes[0] || 'M'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-sm text-gray-500 mb-6">
          The requested product could not be located.
        </p>
        <button
          onClick={() => onNavigate('products')}
          className="px-6 py-2.5 bg-[#E85042] text-white text-xs font-bold rounded-full"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const isWished = isInWishlist(product.id);
  const relatedProducts = getRelatedProducts(product.id, product.categoryId, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    onNavigate('checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-8">
        <button onClick={() => onNavigate('home')} className="hover:text-[#E85042]">
          Home
        </button>
        <span>/</span>
        <button onClick={() => onNavigate('products')} className="hover:text-[#E85042]">
          Shop
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('category', { slug: product.categoryId.replace('cat-', '') })}
          className="hover:text-[#E85042]"
        >
          {product.categoryName}
        </button>
        <span>/</span>
        <span className="text-gray-900 line-clamp-1">{product.name}</span>
      </div>

      {/* Main Product Stage: Gallery & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
        {/* Left: Image Gallery (cols 7) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails list */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto">
            {product.images.map((imgUrl, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                  selectedImageIndex === index
                    ? 'border-[#E85042] shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 opacity-80'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Display Image */}
          <div className="relative flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 shadow-md">
            <img
              src={product.images[selectedImageIndex] || product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {/* Badges on main image */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isHot && <Badge variant="hot">Hot Pick</Badge>}
              {product.isNew && <Badge variant="new">New Arrival</Badge>}
            </div>
            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-md ${
                isWished
                  ? 'bg-white text-[#E85042]'
                  : 'bg-white/90 text-gray-700 hover:text-[#E85042] hover:bg-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWished ? 'fill-[#E85042]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right: Product Purchase Info (cols 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Brand & Stock */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">
                {product.brand}
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating & Review count */}
            <div className="flex items-center gap-3">
              <Rating value={product.rating} count={product.reviewCount} showValue={true} />
              <span className="text-xs text-gray-300">|</span>
              <span className="text-xs font-semibold text-emerald-600">Verified Quality</span>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-[#E85042] bg-[#FFF0ED] px-2 py-0.5 rounded-md">
                    Save {product.discountPercentage || 25}%
                  </span>
                </>
              )}
            </div>

            {/* Short summary description */}
            <p className="text-sm text-gray-600 leading-relaxed pt-1">
              {product.description}
            </p>

            <div className="border-t border-gray-100 pt-5 space-y-5">
              {/* Color Selector */}
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-900 mb-2.5">
                  <span>Select Color: <span className="text-[#E85042]">{selectedColor}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`group relative flex items-center gap-2 p-1.5 rounded-xl border text-xs font-medium transition-all ${
                        selectedColor === c.name
                          ? 'border-[#E85042] bg-[#FFF0ED]/40 text-[#E85042]'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-900 mb-2.5">
                  <span>Select Size: <span className="text-[#E85042]">{selectedSize}</span></span>
                  <button
                    onClick={() => alert('Size Guide: Standard US Women Sizing. XS (0-2), S (4-6), M (8-10), L (12-14), XL (16).')}
                    className="text-[11px] text-gray-500 hover:text-[#E85042] underline"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-11 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        selectedSize === s
                          ? 'bg-gray-900 text-white shadow-md'
                          : 'bg-white border border-gray-200 text-gray-800 hover:border-gray-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="space-y-3 pt-3">
                <div className="flex items-center gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-gray-200 rounded-xl bg-white p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 bg-[#E85042] hover:bg-[#D43D30] text-white text-sm font-bold rounded-xl shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Bag!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Add to Cart
                      </>
                    )}
                  </button>
                </div>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-white" /> Buy Now with 1-Click
                </button>
              </div>

              {/* Guarantee badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-center">
                <div className="flex flex-col items-center p-2 rounded-xl bg-[#FAF6F0]">
                  <Truck className="w-4 h-4 text-[#E85042] mb-1" />
                  <span className="text-[11px] font-bold text-gray-900">Free Shipping</span>
                  <span className="text-[10px] text-gray-500">Orders over $100</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-[#FAF6F0]">
                  <RotateCcw className="w-4 h-4 text-[#E85042] mb-1" />
                  <span className="text-[11px] font-bold text-gray-900">7-Day Returns</span>
                  <span className="text-[10px] text-gray-500">Hassle-free policy</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-[#FAF6F0]">
                  <ShieldCheck className="w-4 h-4 text-[#E85042] mb-1" />
                  <span className="text-[11px] font-bold text-gray-900">Authentic</span>
                  <span className="text-[10px] text-gray-500">ChicWove Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description, Specifications, Reviews */}
      <div className="border-t border-gray-200 pt-10 mb-16">
        <div className="flex items-center gap-8 border-b border-gray-200 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('description')}
            className={`text-sm sm:text-base font-bold transition-colors relative pb-2 ${
              activeTab === 'description'
                ? 'text-[#E85042]'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Product Story &amp; Details
            {activeTab === 'description' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E85042]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('specifications')}
            className={`text-sm sm:text-base font-bold transition-colors relative pb-2 ${
              activeTab === 'specifications'
                ? 'text-[#E85042]'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Specifications
            {activeTab === 'specifications' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E85042]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`text-sm sm:text-base font-bold transition-colors relative pb-2 ${
              activeTab === 'reviews'
                ? 'text-[#E85042]'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Reviews ({product.reviewCount})
            {activeTab === 'reviews' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E85042]" />
            )}
          </button>
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xs">
          {activeTab === 'description' && (
            <div className="prose max-w-none text-sm text-gray-600 leading-relaxed space-y-4">
              <p>{product.description}</p>
              <p>
                Each piece in the ChicWove collection is thoughtfully crafted to bridge everyday comfort with high-fashion silhouettes. Made with premium grade fibers and precision-tailored stitches, designed to be worn on repeat.
              </p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2.5 px-4 bg-[#FAF6F0] rounded-xl text-xs sm:text-sm">
                  <span className="font-semibold text-gray-700">{key}</span>
                  <span className="text-gray-900 font-medium">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-[#FAF6F0] p-4 rounded-xl">
                <div className="text-3xl font-black text-gray-900">{product.rating}</div>
                <div>
                  <Rating value={product.rating} size={16} />
                  <p className="text-xs text-gray-500 mt-1">
                    Based on {product.reviewCount} customer reviews
                  </p>
                </div>
              </div>

              {/* Sample verified review entries */}
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-900">Sophia M. - Verified Buyer</span>
                    <span className="text-[11px] text-gray-400">2 days ago</span>
                  </div>
                  <Rating value={5} size={12} />
                  <p className="text-xs text-gray-600 mt-2">
                    &quot;The fabric quality exceeded my expectations. Fits true to size and looks even better in person than in the photos! Will definitely buy more.&quot;
                  </p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-900">Claire T. - Verified Buyer</span>
                    <span className="text-[11px] text-gray-400">1 week ago</span>
                  </div>
                  <Rating value={5} size={12} />
                  <p className="text-xs text-gray-600 mt-2">
                    &quot;Super flattering silhouette! Got so many compliments at our party. Shipping was prompt and packaging was gorgeous.&quot;
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              You Might Also Like
            </h3>
            <button
              onClick={() => onNavigate('products')}
              className="text-xs sm:text-sm font-bold text-[#E85042] hover:underline"
            >
              View More
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
