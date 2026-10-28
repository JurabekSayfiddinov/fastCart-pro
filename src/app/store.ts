import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../Log/logSlice"
import categoryReducer from "../components/Category"
import productReducer from "../components/Products"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;