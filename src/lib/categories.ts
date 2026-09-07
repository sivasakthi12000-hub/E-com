import categoriesData from '../data/categories.json';
import { Category } from '../types/ecommerce';

export function getCategories(): Category[] {
  return categoriesData as Category[];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return (categoriesData as Category[]).find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase()
  );
}

export function getCategoryById(id: string): Category | undefined {
  return (categoriesData as Category[]).find((c) => c.id === id);
}
