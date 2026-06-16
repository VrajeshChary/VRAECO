import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export function useAbandonedCart() {
  const cart = useStore((state) => state.cart);
  const hasTrackedRef = useRef(false);
  const email = useStore((state) => state.cart);
  const hasSentAbandonedRef = useRef(false);

  // Track cart abandonment when user leaves the site
  useEffect(() => {
    if (cart.length === 0 || hasTrackedRef.current) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Set a flag in sessionStorage that cart was abandoned
      sessionStorage.setItem('cartAbandoned', 'true');
      sessionStorage.setItem('cartAbandonedAt', Date.now().toString());

      const cartItems = cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));
      sessionStorage.setItem(
        'abandonedCartItems',
        JSON.stringify(cartItems)
      );
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    hasTrackedRef.current = true;

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [cart]);

  // Check for abandoned cart on return
  const checkAbandoned = () => {
    const isAbandoned = sessionStorage.getItem('cartAbandoned') === 'true';
    const abandonedAt = sessionStorage.getItem('cartAbandonedAt');
    const hasCart = cart.length > 0;

    if (isAbandoned && abandonedAt && hasCart) {
      const elapsed = Date.now() - parseInt(abandonedAt);
      // 30 minutes = 1800000ms
      return elapsed >= 1800000;
    }
    return false;
  };

  // Clear abandoned cart flags
  const clearAbandoned = () => {
    sessionStorage.removeItem('cartAbandoned');
    sessionStorage.removeItem('cartAbandonedAt');
    sessionStorage.removeItem('abandonedCartItems');
  };

  return { checkAbandoned, clearAbandoned, hasCart: cart.length > 0 };
}
