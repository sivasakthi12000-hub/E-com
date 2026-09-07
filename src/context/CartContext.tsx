import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types/ecommerce';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  totalItemsCount: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  promoCode: string;
  promoApplied: boolean;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'chicwove_cart_items';
const PROMO_CODE_KEY = 'chicwove_promo_code';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    // Default initial cart with 2 items as indicated by the "2" badge in the reference image!
    return [
      {
        id: 'cart-init-1',
        product: {
          id: 'prod-002',
          name: 'Sequin Party Dress',
          slug: 'sequin-party-dress',
          categoryId: 'cat-dresses',
          categoryName: 'Women Dresses',
          description: 'Turn heads with high-refraction micro-sequins mini dress.',
          price: 79.0,
          originalPrice: 110.0,
          discountPercentage: 28,
          rating: 4.9,
          reviewCount: 168,
          stock: 19,
          images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'],
          thumbnail: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
          brand: 'ChicWove Luxe',
          tags: ['hot', 'party'],
          colors: [
            { name: 'Ruby Glitz', hex: '#B91C1C' },
            { name: 'Midnight Sparkle', hex: '#18181B' }
          ],
          sizes: ['S', 'M', 'L'],
          specifications: { Material: 'Micro-Sequin Mesh' }
        },
        quantity: 1,
        selectedColor: 'Ruby Glitz',
        selectedSize: 'S'
      },
      {
        id: 'cart-init-2',
        product: {
          id: 'prod-001',
          name: 'Checked Overshirt',
          slug: 'checked-overshirt',
          categoryId: 'cat-tops',
          categoryName: 'Tops & T-shirts',
          description: 'Relaxed-fit checked flannel overshirt made with brushed cotton twill.',
          price: 49.0,
          originalPrice: 65.0,
          discountPercentage: 25,
          rating: 4.8,
          reviewCount: 94,
          stock: 38,
          images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'],
          thumbnail: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
          brand: 'ChicWove Studio',
          tags: ['new-arrival'],
          colors: [
            { name: 'Crimson Plaid', hex: '#D13838' },
            { name: 'Charcoal Black', hex: '#1E1E1E' }
          ],
          sizes: ['XS', 'S', 'M'],
          specifications: { Material: '100% Brushed Cotton' }
        },
        quantity: 1,
        selectedColor: 'Crimson Plaid',
        selectedSize: 'M'
      }
    ];
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    const chosenColor = color || product.colors[0]?.name || 'Standard';
    const chosenSize = size || product.sizes[0] || 'Standard';
    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedColor === chosenColor &&
        item.selectedSize === chosenSize
    );

    if (existingIndex > -1) {
      setCart((prev) => {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      });
    } else {
      const newItem: CartItem = {
        id: `cart-${product.id}-${Date.now()}`,
        product,
        quantity,
        selectedColor: chosenColor,
        selectedSize: chosenSize
      };
      setCart((prev) => [newItem, ...prev]);
    }
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'CHIC30' || clean === 'WELCOME10' || clean === 'SAVE20') {
      setPromoCode(clean);
      setPromoApplied(true);
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoApplied(false);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  let discountRate = 0;
  if (promoApplied) {
    if (promoCode === 'CHIC30') discountRate = 0.3;
    else if (promoCode === 'SAVE20') discountRate = 0.2;
    else if (promoCode === 'WELCOME10') discountRate = 0.1;
  }
  const discount = Math.round(subtotal * discountRate * 100) / 100;
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const total = Math.max(0, Math.round((subtotal - discount + shipping) * 100) / 100);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        shipping,
        total,
        totalItemsCount,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        promoCode,
        promoApplied,
        applyPromoCode,
        removePromoCode
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
