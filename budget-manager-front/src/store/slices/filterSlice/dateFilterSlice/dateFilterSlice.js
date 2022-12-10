import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  viewExpenseList: [],
};

export const dateFilterSlice = createSlice({
  name: "dateFilter",
  initialState,
  reducers: {
    viewFilterDatexpensesSetter: (state, { payload }) => {
      state.viewExpenseList = payload;
    },
  },
});

export const { viewFilterDatexpensesSetter } = dateFilterSlice.actions;

export default dateFilterSlice.reducer;
