import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userList: null,
  },
  reducers: {
    setUserList: (state, { payload }) => {
      state.userList = payload; // Mutating state directly (recommended in Redux Toolkit)
    },
  },
});

export const { setUserList } = userSlice.actions;

export default userSlice.reducer;
