import { create } from "zustand";
export const useCartStore = create((set) => ({
  items: [],
  restaurant: null,
  addItem: (item) =>
    set((s) => {
      const found = s.items.find((i) => i.id === item.id);
      return {
        items: found
          ? s.items.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
            )
          : [...s.items, { ...item, qty: 1 }],
      };
    }),
  removeItem: (id) =>
    set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  changeQty: (id, delta) =>
    set((s) => ({
      items: s.items.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
      ),
    })),
  clear: () => set({ items: [], restaurant: null }),
  setRestaurant: (restaurant) => set({ restaurant }),
}));
