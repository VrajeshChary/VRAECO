import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useToastStore } from "./useToastStore";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

interface Discount {
  code: string;
  percentage: number;
  expiresAt: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  discount: Discount | null;
  hasSpun: boolean;
  sessionId: string | null;
  checkoutStartedAt?: number | null;
  setSessionId: (id: string) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, variant?: string) => void;
  updateQuantity: (
    id: string,
    variant: string | undefined,
    quantity: number,
  ) => void;
  clearCart: () => void;
  setDiscount: (discount: Discount) => void;
  clearDiscount: () => void;
  setHasSpun: (spun: boolean) => void;
  toggleWishlist: (productId: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      discount: null,
      hasSpun: false,
      sessionId: null,
      checkoutStartedAt: null,
      setSessionId: (id) => set({ sessionId: id }),
      addToCart: (item) =>
        set((state) => {
          useToastStore.getState().addToast("Item added to cart", "success");
          if (window.fbq)
            window.fbq("track", "AddToCart", {
              value: item.price,
              currency: "INR",
            });
          if (window.gtag)
            window.gtag("event", "add_to_cart", {
              items: [{ id: item.id, name: item.name, price: item.price }],
            });

          const existing = state.cart.find(
            (i) => i.id === item.id && i.variant === item.variant,
          );
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id && i.variant === item.variant
                  ? { ...i, quantity: Math.min(i.quantity + item.quantity, 10) }
                  : i,
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity: Math.min(item.quantity, 10) }] };
        }),
      removeFromCart: (id, variant) =>
        set((state) => {
          useToastStore.getState().addToast("Item removed", "info");
          return {
            cart: state.cart.filter(
              (i) => !(i.id === id && i.variant === variant),
            ),
          };
        }),
      updateQuantity: (id, variant, quantity) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.id === id && i.variant === variant ? { ...i, quantity } : i,
          ),
        })),
      clearCart: () => set({ cart: [] }),
      setDiscount: (discount) => set({ discount }),
      clearDiscount: () => set({ discount: null }),
      setHasSpun: (spun) => set({ hasSpun: spun }),
      toggleWishlist: (productId) =>
        set((state) => {
          const isWishlisted = state.wishlist.includes(productId);
          if (isWishlisted) {
            useToastStore.getState().addToast("Removed from wishlist", "info");
            return {
              wishlist: state.wishlist.filter((id) => id !== productId),
            };
          } else {
            useToastStore.getState().addToast("Added to wishlist", "success");
            return { wishlist: [...state.wishlist, productId] };
          }
        }),
    }),
    {
      name: "vraeco-storage",
    },
  ),
);
