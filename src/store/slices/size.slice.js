import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import service from "../../services/size.service";

const initialState = {
  size: [],
  loading: false,
  error: null,
};

export const fetchsize = createAsyncThunk(
  "size/fetchsize",

  async (params = {}, thunkAPI) => {
    try {
      const res = await service.getallsize(params);

    //   console.log("THUNK SIZE RESPONSE:", res);

      if (!res?.success) {
        return thunkAPI.rejectWithValue(res?.message || "Failed to fetch size");
      }

      return res?.data || [];
    } catch (error) {
    //   console.error("THUNK ERROR:", error);

      return thunkAPI.rejectWithValue(error.message || "Failed to fetch size");
    }
  },
);

const sizeSlice = createSlice({
  name: "size",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchsize.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchsize.fulfilled, (state, action) => {
        state.loading = false;
        state.size = action.payload || [];
        state.error = null;

        // console.log("REDUX SIZE DATA:", action.payload);
      })

      .addCase(fetchsize.rejected, (state, action) => {
        state.loading = false;
        state.size = [];
        state.error = action.payload || "Failed to fetch size";
      });
  },
});

export default sizeSlice.reducer;
