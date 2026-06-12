import { create } from "zustand";
import { wishlistSeed } from "../data/accountMock";
import type { Product } from "../types";

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  items: wishlistSeed,
  addItem: (product) =>
    set((state) => ({
      items: state.items.some((item) => item.id === product.id) ? state.items : [product, ...state.items]
    })),
  removeItem: (productId) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== productId) }))
}));
