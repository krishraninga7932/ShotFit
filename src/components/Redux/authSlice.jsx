import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    isLoggedin: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginStart, isLoggedin, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
