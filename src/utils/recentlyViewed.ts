import { useEffect, useState } from 'react';
import { products } from '../data/products';

const STORAGE_KEY = 'vraeco-recently-viewed';
const MAX_VIEWED = 4;

export function trackView(productId: string) {
  try {
    const viewed: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    // Remove if already exists to re-add at end
    const filtered = viewed.filter((id: string) => id !== productId);
    // Add to end (most recent)
    const updated = [...filtered, productId].slice(-MAX_VIEWED);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function useRecentlyViewed() {
  const [viewedProducts, setViewedProducts] = useState<typeof products>([]);

  useEffect(() => {
    try {
      const viewed: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const resolved = viewed
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean) as typeof products;
      setViewedProducts(resolved);
    } catch {
      setViewedProducts([]);
    }
  }, []);

  return viewedProducts;
}
