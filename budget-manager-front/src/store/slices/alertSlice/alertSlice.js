import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAlert: false,
  alert: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    triggerAlert: (state, { payload }) => {
      state.showAlert = payload;
    },
    setAlert: (state, { payload }) => {
      state.alert = payload;
    },
  },
});

export const { triggerAlert, setAlert } = alertSlice.actions;

export default alertSlice.reducer;
