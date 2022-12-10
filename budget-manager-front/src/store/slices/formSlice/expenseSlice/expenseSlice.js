import { faL } from "@fortawesome/free-solid-svg-icons";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  expenseItem: {
    id_expense: 1,
    expense_type: "",
    origin_account: "",
    amount: "",
    id_currency: "USD",
    to_account: "",
    id_category: "",
    expense_date: "",
    description: "",
    showdescription: false,
  },
  expenseList: [],
  invalidExpenseType: false,
  invalidAccount: false,
  invalidCategory: false,
  invalidDate: false,
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpenseItem: (state, { payload }) => {
      state.expenseItem.id_expense = payload.id_expense;
      state.expenseItem.expense_type = payload.expense_type;
      state.expenseItem.origin_account = payload.origin_account;
      state.expenseItem.amount = payload.amount;
      state.expenseItem.to_account = payload.to_account;
      state.expenseItem.id_currency = payload.id_currency;
      state.expenseItem.id_category = payload.id_category;
      state.expenseItem.expense_date = payload.expense_date;
      state.expenseItem.description = payload.description;
    },
    appendItemToExpenseList: (state, action) => {
      state.expenseList.push(action.payload);
    },
    newNotDeletedExpenseList: (state, { payload }) => {
      state.expenseList = payload;
    },
    expenseTypeValidator: (state, { payload }) => {
      state.invalidExpenseType = payload;
    },
    accountValidator: (state, { payload }) => {
      state.invalidAccount = payload;
    },
    categoryValidator: (state, { payload }) => {
      state.invalidCategory = payload;
    },
    dateValidator: (state, { payload }) => {
      state.invalidDate = payload;
    },
    showDescriptionEnabler: (state, { payload }) => {
      state.expenseList[payload].showdescription =
        !state.expenseList[payload].showdescription;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  appendItemToExpenseList,
  addExpenseItem,
  newNotDeletedExpenseList,
  expenseTypeValidator,
  accountValidator,
  categoryValidator,
  dateValidator,
  showDescriptionEnabler,
} = expenseSlice.actions;

export default expenseSlice.reducer;
