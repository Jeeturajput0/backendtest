import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../../services/category.service";

const initialState = {
  name: "",
  isActive: true,
  image: "",
  categories: [],
  loading: false,
  error: null,
};

export const fetchproducts = createAsyncThunk(
  "product",
  async (_, thunkAPI) => {
    try {
      return await services.getproducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchproducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data || [];
      })

      .addCase(fetchproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ProductSlice.reducer;
