import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  newAccountItem: {
    id: 0,
    name: "",
    account_number: 0,
    type: 1,
    id_currency: "155",
    balance: "",
  },
  invalidAccountName: false,
  invalidAccountNumber: false,
  invalidAccountBalance: false,

  accountList: [],
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addNewAccountItem: (state, { payload }) => {
      state.newAccountItem.id = payload.id;
      state.newAccountItem.name = payload.name;
      state.newAccountItem.account_number = payload.account_number;
      state.newAccountItem.type = payload.type;
      state.newAccountItem.id_currency = payload.id_currency;
      state.newAccountItem.balance = payload.balance;
    },
    appendItemToAccountList: (state, action) => {
      state.accountList.push(action.payload);
    },
    newNotDeletedAccountList: (state, { payload }) => {
      state.accountList = payload;
    },
    accountNameValidator: (state, { payload }) => {
      state.invalidAccountName = payload;
    },
    accountNumberValidator: (state, { payload }) => {
      state.invalidAccountNumber = payload;
    },
    accountBalanceValidator: (state, { payload }) => {
      state.invalidAccountBalance = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  appendItemToAccountList,
  newNotDeletedAccountList,
  accountNameValidator,
  accountNumberValidator,
  accountBalanceValidator,
  addNewAccountItem,
} = accountSlice.actions;

export default accountSlice.reducer;
