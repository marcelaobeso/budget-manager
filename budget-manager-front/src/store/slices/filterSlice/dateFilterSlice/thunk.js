import { viewFilterDatexpensesSetter } from "./dateFilterSlice";

const filterItemsByDate = () => {
  return (dispatch, getState) => {
    const view = getState().expense.expenseList;
    dispatch(viewFilterDatexpensesSetter(view));
  };
};
export default filterItemsByDate;
