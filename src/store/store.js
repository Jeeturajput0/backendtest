import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/category.slice";
import homeReducer from "./slices/home.slice";
import productReducer from "./slices/products.slice";
import orderReducer from "./slices/order.slice";
export const store = configureStore({
  reducer: {
    homepage: homeReducer,
    category: categoryReducer,
    product: productReducer,
    order:orderReducer,

  },
});