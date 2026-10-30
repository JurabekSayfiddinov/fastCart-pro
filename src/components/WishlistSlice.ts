import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export type WishlistProduct = {
  id: number;
  productName: string;
  price: number;
  discountPrice: number;
  hasDiscount: boolean;
  image: string;
};

const savedWishlist = localStorage.getItem("wishlist");

const initialState: WishlistProduct[] = savedWishlist
  ? JSON.parse(savedWishlist)
  : [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    toggleWishlist: (
      state,
      action: PayloadAction<WishlistProduct>
    ) => {
      const index = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.splice(index, 1);
      } else {
        state.push(action.payload);
      }
    },

    removeWishlist: (
      state,
      action: PayloadAction<number>
    ) => {
      return state.filter(
        (item) => item.id !== action.payload
      );
    },

    clearWishlist: () => [],
  },
});

export const {
  toggleWishlist,
  removeWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;