import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../../services/products.service";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchproducts = createAsyncThunk(
  "product/fetchproducts",
  async (params, thunkAPI) => {
    try {
      const response = await services.getAllproducts(params);
      if (!response?.success) {
        return thunkAPI.rejectWithValue(response?.message || "Failed to fetch products");
      }
      return response.data || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchproducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchproducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.payload || "Failed to fetch products";
      });
  },
});

export default ProductSlice.reducer;
