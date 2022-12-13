import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewFilterDatexpensesSetter } from "../../../store/slices/filterSlice/dateFilterSlice/dateFilterSlice";
import filterItemsByDate from "../../../store/slices/filterSlice/dateFilterSlice/thunk";
import styles from "./DateFilter.module.css";
export const DateFilter = () => {
  const { expenseList } = useSelector((state) => state.expense);
  const dispatch = useDispatch();

  const dateFilterChangeHandler = (event) => {
    const newExpensesList = expenseList.filter(
      (item, i) => item.expense_date === event.target.value
    );
    dispatch(viewFilterDatexpensesSetter(newExpensesList));
    if (event.target.value.length === 0) {
      dispatch(filterItemsByDate());
    }
  };
  return (
    <div className="">
      <label>Date </label>
      <input
        onChange={dateFilterChangeHandler}
        type="date"
        min="2018-01-01"
        max="2025-01-01"
      />
    </div>
  );
};
