import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import services from "../../services/category.service";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",

  async (params = {}, thunkAPI) => {
    try {
      const response = await services.getAllCategories(params);

      console.log("THUNK CATEGORY RESPONSE:", response);

      if (!response?.success) {
        return thunkAPI.rejectWithValue(
          response?.message || "Failed to fetch categories",
        );
      }

      return response?.data || [];
    } catch (error) {
      console.error("CATEGORY THUNK ERROR:", error);

      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch categories",
      );
    }
  },
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",

  async (category_id, thunkAPI) => {
    try {
      const response = await services.categoryDelete(category_id);

      console.log("DELETE CATEGORY RESPONSE:", response);

      if (!response?.success) {
        return thunkAPI.rejectWithValue(
          response?.message || "Failed to delete category",
        );
      }

      return {
        category_id,
        ...response,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to delete category",
      );
    }
  },
);

const categorySlice = createSlice({
  name: "category",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;

      state.categories = action.payload || [];

      state.error = null;
    });

    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;

      state.categories = [];

      state.error = action.payload || "Failed to fetch categories";
    });

    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;

      state.categories = state.categories.filter(
        (item) => item._id !== action.payload.category_id,
      );
    });

    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;

      state.error = action.payload || "Failed to delete category";
    });
  },
});

export default categorySlice.reducer;
