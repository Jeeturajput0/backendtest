import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandService from "../../services/brand.service";

const getError = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

export const fetchBrands = createAsyncThunk(
  "brands/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await brandService.getAll();
      return data.data || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(getError(error));
    }
  },
);

export const fetchBrandById = createAsyncThunk(
  "brands/fetchById",
  async (id, thunkAPI) => {
    try {
      const { data } = await brandService.getById(id);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getError(error));
    }
  },
);

export const saveBrand = createAsyncThunk(
  "brands/save",
  async ({ id, values }, thunkAPI) => {
    try {
      const response = id
        ? await brandService.update(id, values)
        : await brandService.create(values);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getError(error));
    }
  },
);

export const deleteBrand = createAsyncThunk(
  "brands/delete",
  async (id, thunkAPI) => {
    try {
      await brandService.remove(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(getError(error));
    }
  },
);

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: [],
    selectedBrand: null,
    loading: false,
    saving: false,
    error: null,
  },
  reducers: {
    clearBrandError: (state) => {
      state.error = null;
    },
    clearSelectedBrand: (state) => {
      state.selectedBrand = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBrandById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrandById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBrand = action.payload;
      })
      .addCase(fetchBrandById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveBrand.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(saveBrand.fulfilled, (state, action) => {
        state.saving = false;
        const index = state.brands.findIndex(
          (brand) => brand._id === action.payload._id,
        );
        if (index >= 0) state.brands[index] = action.payload;
        else state.brands.unshift(action.payload);
      })
      .addCase(saveBrand.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brands = state.brands.filter(
          (brand) => brand._id !== action.payload,
        );
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearBrandError, clearSelectedBrand } = brandSlice.actions;
export default brandSlice.reducer;
