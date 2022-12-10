import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  showAddExpenseForm: false,
  showAddAccountForm: false,
  activateUpdate: false,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    transactionForm: (state, { payload }) => {
      state.showAddExpenseForm = payload;
    },
    accountForm: (state, { payload }) => {
      state.showAddAccountForm = payload;
    },

    updateEnabler: (state, { payload }) => {
      state.activateUpdate = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  transactionForm,
  accountForm,

  appendItemToAccountList,
  updateEnabler,
} = formSlice.actions;

export default formSlice.reducer;
