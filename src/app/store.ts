import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../Log/logSlice"
import categoryReducer from "../components/Category"
import productReducer from "../components/Products"
import wishlistReducer from "../components/WishlistSlice"
import cartReducer from "../components/CartSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productReducer,
        wishlist: wishlistReducer,
         cart: cartReducer,
  },
});

let previousWishlist = store.getState().wishlist;

store.subscribe(() => {
  const currentWishlist = store.getState().wishlist;

  if (currentWishlist !== previousWishlist) {
    previousWishlist = currentWishlist;

    localStorage.setItem(
      "wishlist",
      JSON.stringify(currentWishlist)
    );
  }
});


let previousCart = store.getState().cart;

store.subscribe(() => {
  const currentCart = store.getState().cart;

  if (currentCart !== previousCart) {
    previousCart = currentCart;

    localStorage.setItem(
      "cart",
      JSON.stringify(currentCart)
    );
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;