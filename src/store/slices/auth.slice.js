import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const storedToken = localStorage.getItem("token");
const storedUser = JSON.parse(localStorage.getItem("user") || "null");

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      return (await api.post("/user/register", payload)).data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const data = (await api.post("/user/login", payload)).data;
      if (!data.token || !data.user) throw new Error("Invalid login response");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed",
      );
    }
  },
);

export const checkAuth = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    if (!localStorage.getItem("token")) return rejectWithValue("No token");
    try {
      return (await api.get("/profile")).data.data;
    } catch {
      return rejectWithValue("Session expired");
    }
  },
);

const clearSession = (state) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("userdetails");
  state.user = null;
  state.token = null;
  state.isAuthenticated = false;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser,
    token: storedToken,
    isAuthenticated: Boolean(storedToken),
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: clearSession,
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        clearSession(state);
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        clearSession(state);
      }),
});

export const { logoutUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
