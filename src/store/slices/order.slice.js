import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import services from "../../services/order.service";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const getOrders = createAsyncThunk(
  "order/getOrders",

  async (params = {}, thunkAPI) => {
    try {
      const response = await services.getAllOrders(params);

      console.log("ORDER RESPONSE:", response);

      if (response.success) {
        return response.data || [];
      }

      return thunkAPI.rejectWithValue(response.message || "Orders not found");
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  },
);

const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder.addCase(getOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });


    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.loading = false;

      state.orders = action.payload || [];

      state.error = null;
    });


    builder.addCase(getOrders.rejected, (state, action) => {
      state.loading = false;

      state.error = action.payload || "Failed to fetch orders";
    });
  },
});

export default orderSlice.reducer;
