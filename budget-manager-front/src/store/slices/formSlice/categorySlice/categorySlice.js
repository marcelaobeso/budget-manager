import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: [],
  categories: [],
  currencies: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setAllTypes: (state, { payload }) => {
      state.type = payload;
    },
    setAllCategories: (state, { payload }) => {
      state.categories = payload;
    },
    setCurrencies: (state, { payload }) => {
      state.currencies = payload;
    },
  },
});

export const { setAllTypes, setAllCategories, setCurrencies } =
  categorySlice.actions;

export default categorySlice.reducer;
