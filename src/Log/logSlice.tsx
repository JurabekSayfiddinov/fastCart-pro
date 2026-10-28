
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../utils/Api";


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    userData: { userName: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${Api}/Account/login`,
        userData
      );

      if (
        data?.isSuccess === false ||
        data?.success === false
      ) {
        return rejectWithValue(
          data?.message || "Login failed"
        );
      }

      return data;
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
          error.response?.data?.title ||
          "Invalid username or password"
        );
      }

      return rejectWithValue("Login failed");
    }
  }
);


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api}/Account/register`,
        userData
      );

      if (
        response.data?.isSuccess === false ||
        response.data?.success === false
      ) {
        return rejectWithValue(
          response.data?.message || "Registration failed"
        );
      }

      return response.data;
    } catch (error) {

   if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
          error.response?.data?.title ||
          "Registration failed"
        );
      }

      return rejectWithValue("Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",

initialState: {
  loading: false,
  error: null,
  success: false,
  isAuthenticated:  localStorage.getItem("isAuthenticated") === "true",
},

  reducers: {
    resetAuth: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
      logout: (state) => {
    state.isAuthenticated = false;
    state.success = false;
    localStorage.removeItem("isAuthenticated");
  },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.isAuthenticated = true;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =
          action.payload || "Registration failed";
      })
      .addCase(loginUser.pending, (state) => {
  state.loading = true;
  state.error = null;
  state.success = false;
})
.addCase(loginUser.fulfilled, (state) => {
  state.loading = false;
  state.success = true;
  state.isAuthenticated = true;
    localStorage.setItem("isAuthenticated", "true");
})
.addCase(loginUser.rejected, (state, action) => {
  state.loading = false;
  state.success = false;
  state.error =
    (action.payload as string) || "Login failed";
})
  },
});

export const { resetAuth,logout } = authSlice.actions;

export default authSlice.reducer;
