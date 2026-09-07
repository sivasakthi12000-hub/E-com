export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: string;
  bgTint: string;
  accentColor: string;
  image: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'color' | 'size';
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  thumbnail: string;
  brand: string;
  tags: string[];
  badges?: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  specifications: Record<string, string>;
  isNew?: boolean;
  isHot?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface OrderCustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped';
  paymentMethod: string;
}
