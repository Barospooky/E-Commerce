import { create } from "zustand";
import type { CartLine, Product } from "../types";

interface CartState {
  lines: CartLine[];
  addItem: (product: Product) => void;
  decrementItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  lines: [],
  addItem: (product) =>
    set((state) => {
      const existing = state.lines.find((line) => line.product.id === product.id);

      if (existing) {
        return {
          lines: state.lines.map((line) =>
            line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line
          )
        };
      }

      return { lines: [...state.lines, { product, quantity: 1 }] };
    }),
  decrementItem: (productId) =>
    set((state) => ({
      lines: state.lines
        .map((line) =>
          line.product.id === productId ? { ...line, quantity: line.quantity - 1 } : line
        )
        .filter((line) => line.quantity > 0)
    })),
  removeItem: (productId) =>
    set((state) => ({ lines: state.lines.filter((line) => line.product.id !== productId) })),
  clearCart: () => set({ lines: [] })
}));
