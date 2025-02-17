import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/cart"; // Correct path for cart reducer
import productReducer from "./reducer/product"; // Correct path for product reducer
import userReducer from "./reducer/user"; // Correct path for product reducer

const store = configureStore({
  reducer: {
    cart: cartReducer, 
    product: productReducer,
    user:userReducer
  },
});

export default store;
