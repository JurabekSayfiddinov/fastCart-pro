import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../utils/Api";


export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    try {
      const { data } = await axios.get(
        `${Api}/Category/get-categories`
      );

      console.log("API DATA:", data);

      return data;
    } catch (error) {
      console.log("API ERROR:", error);
      throw error;
    }
  }
);

const categorySlice = createSlice({
  name: "categories",

  initialState: {
    categories: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
     .addCase(getCategories.fulfilled, (state, action) => {
  state.loading = false;

  console.log("PAYLOAD:", action.payload);

  const result = action.payload;

  state.categories = Array.isArray(result)
    ? result
    : Array.isArray(result?.data)
      ? result.data
      : [];
})
      .addCase(getCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default categorySlice.reducer;