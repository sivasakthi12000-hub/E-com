import productsData from '../data/products.json';
import { Product } from '../types/ecommerce';

export function getProducts(): Product[] {
  return productsData as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return (productsData as Product[]).find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );
}

export function getProductById(id: string): Product | undefined {
  return (productsData as Product[]).find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return (productsData as Product[]).filter((p) => p.categoryId === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return (productsData as Product[]).filter((p) => p.isFeatured);
}

export function getNewArrivals(): Product[] {
  return (productsData as Product[]).filter((p) => p.isNew);
}

export function getBestSellers(): Product[] {
  return (productsData as Product[]).filter((p) => p.isBestSeller);
}

export function getRelatedProducts(currentProductId: string, categoryId: string, limit = 4): Product[] {
  return (productsData as Product[])
    .filter((p) => p.id !== currentProductId && p.categoryId === categoryId)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  if (!query || query.trim() === '') return getProducts();
  const q = query.toLowerCase().trim();
  return (productsData as Product[]).filter((p) => {
    const matchName = p.name.toLowerCase().includes(q);
    const matchCategory = p.categoryName.toLowerCase().includes(q);
    const matchBrand = p.brand.toLowerCase().includes(q);
    const matchDescription = p.description.toLowerCase().includes(q);
    const matchTags = p.tags.some((tag) => tag.toLowerCase().includes(q));
    return matchName || matchCategory || matchBrand || matchDescription || matchTags;
  });
}
