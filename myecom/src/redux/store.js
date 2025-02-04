import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/cart"; // Correct path for cart reducer
import productReducer from "./reducer/product"; // Correct path for product reducer

const store = configureStore({
  reducer: {
    cart: cartReducer, 
    product: productReducer,
  },
});

export default store;
