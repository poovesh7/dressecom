import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    category: '',
  },
  reducers: {
    setCategory: (state, { payload }) => {
      state.category = payload; // Mutating state directly (recommended in Redux Toolkit)
    },


  },
});

export const { setCategory } = productSlice.actions;

export default productSlice.reducer;
