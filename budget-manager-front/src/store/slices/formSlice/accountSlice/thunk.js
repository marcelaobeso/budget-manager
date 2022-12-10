import budgetApi from "../../../../api/budgetApi.js";
import { setAlert } from "../../alertSlice/alertSlice.js";
import { addAlert } from "../../alertSlice/thunk.js";
import { getAllExpenses } from "../expenseSlice/thunk.js";
import {
  addNewAccountItem,
  appendItemToAccountList,
  newNotDeletedAccountList,
} from "./accountSlice.js";

export const addedItem = () => {
  return async (dispatch, getState) => {
    const newAddedAccount = {
      ...getState().account.newAccountItem,
      idUser: getState().signUp.userInfo.idUser,
    };
    try {
      await budgetApi.post(`/account/newAccount`, newAddedAccount);
    } catch (error) {
      error.response.data.msg
        ? dispatch(setAlert(error.response.data.msg))
        : dispatch(
            setAlert("unable to add this account, check you input parameters")
          );
      dispatch(addAlert());
    }
    dispatch(getAllAccounts());
  };
};

export const getAllAccounts = () => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().signUp;
    const { data } = await budgetApi.get("/account/accounts", {
      params: { idUser: userInfo.idUser },
    });
    data.accounts
      ? dispatch(newNotDeletedAccountList(data.accounts))
      : dispatch(newNotDeletedAccountList([]));
  };
};

export const editAccount = () => {
  return async (dispatch, getState) => {
    const accountToUpdate = {
      ...getState().account.newAccountItem,
      idUser: getState().signUp.userInfo.idUser,
    };
    console.log(accountToUpdate);
    try {
      await budgetApi.put(`/account/${accountToUpdate.id}`, accountToUpdate);
    } catch (error) {
      console.log(error);
      error.response.data.msg
        ? dispatch(setAlert(error.response.data.msg))
        : dispatch(
            setAlert(
              "unable to process this update now try deleting it and creating a new one"
            )
          );
      dispatch(addAlert());
    }

    dispatch(getAllAccounts());
  };
};

export const delAccount = (id) => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().signUp;
    try {
      const { data } = await budgetApi.delete(`/account/${id}`, {
        params: { idUser: userInfo.idUser },
      });
      data && dispatch(setAlert(data.msg));
      dispatch(addAlert());
      dispatch(getAllExpenses());
      dispatch(getAllAccounts());
    } catch (error) {
      error.response.data.msg
        ? dispatch(setAlert(error.response.data.msg))
        : dispatch(setAlert("unable to delete"));
      dispatch(addAlert());
    }
  };
};
