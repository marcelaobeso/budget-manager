import { viewFilterDatexpensesSetter } from "./dateFilterSlice";

const filterItemsByDate = () => {
  return (dispatch, getState) => {
    // const replacedColor = {
    // 	id: 0,
    // 	name: '',
    // };

    const expenseViewList = getState().expense.expenseList;
    dispatch(viewFilterDatexpensesSetter(expenseViewList));
  };
};
export default filterItemsByDate;
