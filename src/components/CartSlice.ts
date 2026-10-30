import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartProduct = {
  id: number;
  productName: string;
  image: string;
  price: number;
  discountPrice: number;
  hasDiscount: boolean;
};

export type CartItem = CartProduct & {
  quantity: number;
};

const savedCart = localStorage.getItem("cart");

const initialState: CartItem[] = (() => {
  try {
    const parsed = savedCart ? JSON.parse(savedCart) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
})();

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (
      state,
      action: PayloadAction<CartProduct>
    ) => {
      const existingProduct = state.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<number>
    ) => {
      return state.filter(
        (item) => item.id !== action.payload
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        quantity: number;
      }>
    ) => {
      const product = state.find(
        (item) => item.id === action.payload.id
      );

      if (product) {
        product.quantity = Math.max(
          1,
          Math.floor(action.payload.quantity)
        );
      }
    },

    clearCart: () => [],
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;