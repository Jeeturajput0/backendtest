import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/category.slice";
import homeReducer from "./slices/home.slice";

export const store = configureStore({
  reducer: {
    homepage: homeReducer,
    category: categoryReducer,
  },
});