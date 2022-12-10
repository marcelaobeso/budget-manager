import { useDispatch, useSelector } from "react-redux";
import { addExpenseItem } from "../../store/slices/formSlice/expenseSlice/expenseSlice";

import {
  accountBalanceValidator,
  addNewAccountItem,
} from "../../store/slices/formSlice/accountSlice/accountSlice";

export const AmountMoneyInput = () => {
  const { showAddExpenseForm, showAddAccountForm } = useSelector(
    (state) => state.form
  );
  const { newAccountItem } = useSelector((state) => state.account);
  const expenseItem = useSelector((state) => state.expense.expenseItem);
  const dispatch = useDispatch();

  const amountChangeHandler = (event) => {
    if (event.target.value.length > 0) {
      dispatch(accountBalanceValidator(false));
    }
    if (showAddAccountForm) {
      dispatch(
        addNewAccountItem({
          ...newAccountItem,
          balance: event.target.value,
        })
      );
    }
    if (showAddExpenseForm) {
      dispatch(addExpenseItem({ ...expenseItem, amount: event.target.value }));
    }
  };
  return showAddExpenseForm ? (
    <input
      type="number"
      min="0.01"
      step="0.01"
      value={expenseItem.amount}
      onChange={amountChangeHandler}
    />
  ) : (
    <input
      type="number"
      min="0.01"
      step="0.01"
      value={newAccountItem.balance}
      onChange={amountChangeHandler}
    />
  );
};
