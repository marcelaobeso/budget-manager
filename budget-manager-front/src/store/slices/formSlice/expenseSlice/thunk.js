import budgetApi from "../../../../api/budgetApi";
import { setAlert } from "../../alertSlice/alertSlice";
import { addAlert } from "../../alertSlice/thunk";
import { getAllAccounts } from "../accountSlice/thunk";
import { newNotDeletedExpenseList } from "./expenseSlice";

export const addedItem = () => {
  return async (dispatch, getState) => {
    const newAddedExpense = {
      ...getState().expense.expenseItem,
      idUser: getState().signUp.userInfo.idUser,
    };
    console.log(newAddedExpense);
    await budgetApi.post("/expense/newexpense", newAddedExpense);
    dispatch(getAllExpenses());
    dispatch(getAllAccounts());
  };
};
export const editEvent = () => {
  return async (dispatch, getState) => {
    const newAddedExpense = {
      ...getState().expense.expenseItem,
      idUser: getState().signUp.userInfo.idUser,
    };
    console.log(newAddedExpense);
    try {
      await budgetApi.put(
        `/expense/${newAddedExpense.id_expense}`,
        newAddedExpense
      );
    } catch (error) {
      error.response.data.msg
        ? dispatch(setAlert(error.response.data.msg))
        : dispatch(
            setAlert(
              "unable to process this update now try deleting it and creating a new one"
            )
          );
      dispatch(addAlert());
    }

    dispatch(getAllExpenses());
  };
};

export const deleteExpense = (id) => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().signUp;
    try {
      const { data } = await budgetApi.delete(`/expense/${id}`, {
        params: { idUser: userInfo.idUser },
      });
      data && dispatch(setAlert(data.msg));
      dispatch(addAlert());
      dispatch(getAllExpenses());
      dispatch(getAllAccounts());
    } catch (error) {
      error.response.data.msg
        ? dispatch(setAlert(error.response.data.msg))
        : dispatch(setAlert("unable to process this deletion"));
      dispatch(addAlert());
    }
  };
};

export const getAllExpenses = () => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().signUp;
    const { data } = await budgetApi.get("/expense/expenses", {
      params: { idUser: userInfo.idUser },
    });
    data.expenses
      ? dispatch(newNotDeletedExpenseList(data.expenses))
      : dispatch(newNotDeletedExpenseList([]));
  };
};
