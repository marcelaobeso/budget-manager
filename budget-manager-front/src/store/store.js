import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./slices/formSlice/accountSlice/accountSlice";
import expenseSlice from "./slices/formSlice/expenseSlice/expenseSlice";
import formSlice from "./slices/formSlice/formSlice";
import signUpSlice from "./slices/signUpSlice/signUpSlice";
import accountFilterSlice from "./slices/filterSlice/accountFilterSlice/accountFilterSlice";
import categoryFilterSlice from "./slices/filterSlice/categoryFilterSlice/categoryFilterSlice";
import dateFilterSlice from "./slices/filterSlice/dateFilterSlice/dateFilterSlice";
import categorySlice from "./slices/formSlice/categorySlice/categorySlice";
import alertSlice from "./slices/alertSlice/alertSlice";

export const store = configureStore({
  reducer: {
    form: formSlice,
    signUp: signUpSlice,
    account: accountSlice,
    expense: expenseSlice,
    accountFilter: accountFilterSlice,
    dateFilter: dateFilterSlice,
    categoryFilter: categoryFilterSlice,
    category: categorySlice,
    alert: alertSlice,
  },
});
