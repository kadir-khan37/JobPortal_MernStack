import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios.js";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    const User_API_Endpoint = "https://jobportal-mernstack-4vux.onrender.com/api/v1/user";

    try {
      const res = await axios.get(`${User_API_Endpoint}/me`, {
        withCredentials: true,
      });
      return res.data.user;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;