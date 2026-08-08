import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../../services/category.service";
import { API_URI } from "../../config";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const fetchHomeData = createAsyncThunk("homepage", async () => {
  const response = await fetch(`${API_URI}/home`);
  return response.json();
});

const HomeSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
        state.error = null;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default HomeSlice.reducer;
