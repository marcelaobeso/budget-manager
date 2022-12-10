import { useDispatch, useSelector } from "react-redux";
import { addExpenseItem } from "../../store/slices/formSlice/expenseSlice/expenseSlice";
import { addNewAccountItem } from "../../store/slices/formSlice/accountSlice/accountSlice";

export const CurrencySelect = () => {
  const { showAddAccountForm, showAddExpenseForm } = useSelector(
    (state) => state.form
  );
  const { newAccountItem } = useSelector((state) => state.account);
  const currencies = useSelector((store) => store.category.currencies);
  const expenseItem = useSelector((state) => state.expense.expenseItem);
  const dispatch = useDispatch();

  const currencyChangeHandler = (event) => {
    if (showAddAccountForm) {
      dispatch(
        addNewAccountItem({
          ...newAccountItem,
          id_currency: parseInt(event.target.value),
        })
      );
    }
    if (showAddExpenseForm) {
      dispatch(
        addExpenseItem({
          ...expenseItem,
          id_currency: parseInt(event.target.value),
        })
      );
    }
  };

  return showAddExpenseForm ? (
    <div>
      <label>Currency</label>
      <select
        id="accountCurrency"
        value={expenseItem.id_currency}
        onChange={currencyChangeHandler}
      >
        {currencies.map((item, index) => (
          <option key={item.id_currency} value={item.id_currency}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <div>
      <label>Currency</label>
      <select
        id="accountCurrency"
        value={newAccountItem.id_currency}
        onChange={currencyChangeHandler}
      >
        {currencies.map((item, index) => (
          <option key={item.id_currency} value={item.id_currency}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};
