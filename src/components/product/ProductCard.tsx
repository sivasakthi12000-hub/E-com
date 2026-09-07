import React, { useState } from 'react';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../types/ecommerce';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Badge } from '../common/Badge';

interface ProductCardProps {
  product: Product;
  isHighlighted?: boolean;
  onNavigate: (view: string, params?: Record<string, string>) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isHighlighted = false,
  onNavigate
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const activeColor = product.colors[selectedColorIndex]?.name || 'Standard';
  const isWished = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, activeColor, product.sizes[0]);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleToggleWish = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  // Card 2 in reference image has the highlighted active styling:
  // Red border, soft shadow, and full-width Add to Cart button
  const isCardActive = isHighlighted || isHovered;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onNavigate('product', { slug: product.slug })}
      className={`group relative bg-white rounded-2xl p-3 sm:p-3.5 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
        isCardActive
          ? 'border-2 border-[#E85042] shadow-xl shadow-red-500/10'
          : 'border border-gray-100/80 hover:border-gray-200 shadow-xs hover:shadow-md'
      }`}
    >
      {/* Product Image Box */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#F5F2ED] mb-3">
        <img
          src={product.thumbnail || product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges on Top-Left (e.g. Hot, New matching Card 2) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isHot && <Badge variant="hot">Hot</Badge>}
          {product.isNew && <Badge variant="new">New</Badge>}
          {!product.isHot && !product.isNew && product.badges && product.badges[0] && (
            <Badge variant="default">{product.badges[0]}</Badge>
          )}
        </div>

        {/* Heart Wishlist Button on Top-Right */}
        <button
          onClick={handleToggleWish}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-xs ${
            isWished
              ? 'bg-white text-[#E85042]'
              : 'bg-white/90 text-gray-600 hover:text-[#E85042] hover:bg-white'
          }`}
          title={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWished ? 'fill-[#E85042]' : ''}`} />
        </button>
      </div>

      {/* Card Info Details */}
      <div className="space-y-2">
        {/* Title */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-[#E85042] transition-colors">
          {product.name}
        </h3>

        {/* Price & Original Price */}
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Color Swatches & Action Button Row */}
        <div className="pt-1 flex items-center justify-between">
          {/* Color swatches */}
          <div className="flex items-center space-x-1.5">
            {product.colors.map((c, index) => (
              <button
                key={c.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIndex(index);
                }}
                className={`w-3.5 h-3.5 rounded-full transition-transform border border-black/10 ${
                  selectedColorIndex === index
                    ? 'ring-2 ring-offset-1 ring-[#E85042] scale-110'
                    : 'hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>

          {/* Standard cart button (when not highlighted or on mobile) */}
          {!isCardActive && (
            <button
              onClick={handleAddToCart}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#E85042] hover:text-white hover:border-[#E85042] transition-colors shadow-xs"
              title="Add to cart"
            >
              {justAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Full-width "Add to Cart" button for active/highlighted card (matches Card 2 in reference image!) */}
        {isCardActive && (
          <div className="pt-2 animate-in fade-in duration-200">
            <button
              onClick={handleAddToCart}
              className="w-full py-2 px-3 bg-[#E85042] hover:bg-[#D43D30] text-white text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" /> Added!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
