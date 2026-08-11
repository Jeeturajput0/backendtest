import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../../services/order.service";


const initialState = {
  name: "",
  isActive: true,
  image: "",
  categories: [],
  loading: false,
  error: null,
};

export const fetchorder = createAsyncThunk(
  "product",
  async (_, thunkAPI) => {
    try {
      return await services.getorders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const orderslice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchorder.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchorder.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data || [];
      })

      .addCase(fetchorder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderslice.reducer;
