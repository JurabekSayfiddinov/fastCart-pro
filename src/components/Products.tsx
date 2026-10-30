import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../utils/Api";


export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const { data } = await axios.get(
        `${Api}/Product/get-products`
      );
            console.log("BACKEND PRODUCTS:", data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;