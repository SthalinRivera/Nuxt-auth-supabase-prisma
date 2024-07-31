// stores/cartStore.ts
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as Array<{ id: number; name: string; price: number; quantity: number }>,
  }),
  getters: {
    totalQuantity(state) {
      return state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    },
    totalPrice(state) {
      return state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
  actions: {
    addItem(item: { id: number; name: string; price: number; quantity: number }) {
      const existingItem = this.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        this.cartItems.push(item);
      }
    },
    removeItem(id: number) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
    },
  },
});
