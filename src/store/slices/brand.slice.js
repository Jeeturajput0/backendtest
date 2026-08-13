import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import services from "../../services/brand.service";

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  brands: [],

  selectedBrand: null,

  loading: false,

  saving: false,

  error: null,
};

// =====================================================
// FETCH ALL BRANDS
// =====================================================

export const fetchBrands = createAsyncThunk(
  "brand/fetchBrands",

  async (params = {}, thunkAPI) => {
    try {
      const response =
        await services.getAllBrands(params);

      console.log(
        "FETCH BRANDS RESPONSE:",
        response
      );

      if (!response?.success) {
        return thunkAPI.rejectWithValue(
          response?.message ||
            "Failed to fetch brands"
        );
      }

      return response?.data || [];

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message ||
          "Failed to fetch brands"
      );
    }
  }
);

// =====================================================
// FETCH BRAND BY ID
// =====================================================

export const fetchBrandById =
  createAsyncThunk(
    "brand/fetchBrandById",

    async (brand_id, thunkAPI) => {
      try {
        const response =
          await services.getBrandById(
            brand_id
          );

        console.log(
          "FETCH BRAND BY ID:",
          response
        );

        if (!response?.success) {
          return thunkAPI.rejectWithValue(
            response?.message ||
              "Failed to fetch brand"
          );
        }

        return response?.data;

      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.message ||
            "Failed to fetch brand"
        );
      }
    }
  );

// =====================================================
// SAVE BRAND
// CREATE + UPDATE
// =====================================================

export const saveBrand = createAsyncThunk(
  "brand/saveBrand",

  async (
    { id, values },
    thunkAPI
  ) => {
    try {
      let response;

      if (id) {
        // UPDATE
        response =
          await services.updateBrand(
            id,
            values
          );
      } else {
        // CREATE
        response =
          await services.createBrand(
            values
          );
      }

      console.log(
        "SAVE BRAND RESPONSE:",
        response
      );

      if (!response?.success) {
        return thunkAPI.rejectWithValue(
          response?.message ||
            "Failed to save brand"
        );
      }

      return response;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message ||
          "Failed to save brand"
      );
    }
  }
);

// =====================================================
// DELETE BRAND
// =====================================================

export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",

  async (brand_id, thunkAPI) => {
    try {
      const response =
        await services.deleteBrand(
          brand_id
        );

      if (!response?.success) {
        return thunkAPI.rejectWithValue(
          response?.message ||
            "Failed to delete brand"
        );
      }

      return {
        brand_id,
        ...response,
      };

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message ||
          "Failed to delete brand"
      );
    }
  }
);

// =====================================================
// SLICE
// =====================================================

const brandSlice = createSlice({
  name: "brand",

  initialState,

  reducers: {

    // Clear selected brand

    clearSelectedBrand: (state) => {
      state.selectedBrand = null;
    },

    // Clear error

    clearBrandError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {

    // =================================================
    // FETCH BRANDS
    // =================================================

    builder.addCase(
      fetchBrands.pending,
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addCase(
      fetchBrands.fulfilled,
      (state, action) => {
        state.loading = false;

        state.brands =
          action.payload || [];

        state.error = null;
      }
    );

    builder.addCase(
      fetchBrands.rejected,
      (state, action) => {
        state.loading = false;

        state.brands = [];

        state.error =
          action.payload ||
          "Failed to fetch brands";
      }
    );

    // =================================================
    // FETCH BRAND BY ID
    // =================================================

    builder.addCase(
      fetchBrandById.pending,
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addCase(
      fetchBrandById.fulfilled,
      (state, action) => {
        state.loading = false;

        state.selectedBrand =
          action.payload || null;

        state.error = null;
      }
    );

    builder.addCase(
      fetchBrandById.rejected,
      (state, action) => {
        state.loading = false;

        state.selectedBrand = null;

        state.error =
          action.payload ||
          "Failed to fetch brand";
      }
    );

    // =================================================
    // SAVE BRAND
    // =================================================

    builder.addCase(
      saveBrand.pending,
      (state) => {
        state.saving = true;
        state.error = null;
      }
    );

    builder.addCase(
      saveBrand.fulfilled,
      (state) => {
        state.saving = false;
        state.error = null;
      }
    );

    builder.addCase(
      saveBrand.rejected,
      (state, action) => {
        state.saving = false;

        state.error =
          action.payload ||
          "Failed to save brand";
      }
    );

    // =================================================
    // DELETE BRAND
    // =================================================

    builder.addCase(
      deleteBrand.pending,
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addCase(
      deleteBrand.fulfilled,
      (state, action) => {
        state.loading = false;

        state.brands =
          state.brands.filter(
            (item) =>
              item._id !==
              action.payload.brand_id
          );

        state.error = null;
      }
    );

    builder.addCase(
      deleteBrand.rejected,
      (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          "Failed to delete brand";
      }
    );
  },
});

// =====================================================
// EXPORT ACTIONS
// =====================================================

export const {
  clearSelectedBrand,
  clearBrandError,
} = brandSlice.actions;

// =====================================================
// EXPORT REDUCER
// =====================================================

export default brandSlice.reducer;