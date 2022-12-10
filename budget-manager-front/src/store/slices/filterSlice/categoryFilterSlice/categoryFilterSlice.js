import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const categoryFilterSlice = createSlice({
  name: "categoryFilter",
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {},
  },
});

export const { incrementByAmount } = categoryFilterSlice.actions;

export default categoryFilterSlice.reducer;
