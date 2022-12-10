import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const accountFilterSlice = createSlice({
  name: "accountFilter",
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {},
  },
});

export const { incrementByAmount } = accountFilterSlice.actions;

export default accountFilterSlice.reducer;
