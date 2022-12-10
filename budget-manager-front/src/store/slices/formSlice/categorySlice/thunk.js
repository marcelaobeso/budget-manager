import budgetApi from "../../../../api/budgetApi.js";
import {
  setAllCategories,
  setAllTypes,
  setCurrencies,
} from "./categorySlice.js";

export const addAccountTypes = () => {
  return async (dispatch, getState) => {
    const { data: type } = await budgetApi.get("/account/accounttype");
    dispatch(setAllTypes(type.types));
  };
};
export const addCategoryTypes = () => {
  return async (dispatch, getState) => {
    const { data } = await budgetApi.get("/expense/categories");
    dispatch(setAllCategories(data.categories));
  };
};
export const addCurrencies = () => {
  return async (dispatch, getState) => {
    const { data } = await budgetApi.get("/account/currencies");
    dispatch(setCurrencies(data.currency));
  };
};
