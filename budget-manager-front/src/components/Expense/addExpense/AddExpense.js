import { Button, Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { v4 as uuidv4 } from "uuid";
import {
  accountValidator,
  addExpenseItem,
  categoryValidator,
  dateValidator,
  expenseTypeValidator,
  newNotDeletedExpenseList,
} from "../../../store/slices/formSlice/expenseSlice/expenseSlice";
import {
  transactionForm,
  updateEnabler,
} from "../../../store/slices/formSlice/formSlice";
import { accountBalanceValidator } from "../../../store/slices/formSlice/accountSlice/accountSlice";
import {
  addedItem,
  editEvent,
} from "../../../store/slices/formSlice/expenseSlice/thunk";
import { AmountMoneyInput } from "../../UI/AmountMoneyInput";
import { CurrencySelect } from "../../UI/CurrencySelect";
import styles from "./AddExpense.module.css";
import { useEffect } from "react";
// import { setAllCategories } from "../../../store/slices/formSlice/categorySlice/categorySlice";
import { addCategoryTypes } from "../../../store/slices/formSlice/categorySlice/thunk";

export const AddExpense = () => {
  const dispatch = useDispatch();
  const {
    expenseItem,
    invalidExpenseType,
    invalidAccount,
    invalidCategory,
    invalidDate,
    expenseList,
  } = useSelector((state) => state.expense);
  const { invalidAccountBalance, activateUpdate } = useSelector(
    (state) => state.form
  );
  const category = useSelector((store) => store.category.categories);

  useEffect(() => {
    dispatch(addCategoryTypes());
  }, []);
  // collects the type of expense and asigns the state in const
  const valueTypeHandler = (event) => {
    dispatch(expenseTypeValidator(false));
    dispatch(addExpenseItem({ ...expenseItem, expense_type: event }));
  };
  // Account to be debited or credited here
  const valueAccountHandler = (event) => {
    dispatch(accountValidator(false));
    dispatch(
      addExpenseItem({
        ...expenseItem,
        origin_account: parseInt(event.target.value),
      })
    );
  };

  const changeToAccount = (event) => {
    dispatch(
      addExpenseItem({ ...expenseItem, to_account: event.target.value })
    );
  };
  // Category whom expense belongs
  const categoryHandler = (event) => {
    dispatch(categoryValidator(false));
    dispatch(
      addExpenseItem({
        ...expenseItem,
        id_category: parseInt(event.target.value),
      })
    );
  };
  //DATE
  const dateChangeHandler = (event) => {
    dispatch(dateValidator(false));
    dispatch(
      addExpenseItem({ ...expenseItem, expense_date: event.target.value })
    );
  };
  //DESCRIPTION
  const descriptionHandler = (event) => {
    dispatch(
      addExpenseItem({ ...expenseItem, description: event.target.value })
    );
  };
  //Show and hide the expense form

  //Hide from and clear it
  const showAddExpenseHanddler = () => {
    const expenseCleared = {
      ...expenseItem,
      expense_type: "",
      origin_account: "",
      amount: "",
      id_currency: 154,
      to_account: "",
      id_category: "",
      expense_date: "",
      description: "",
    };
    dispatch(transactionForm(false));
    dispatch(expenseTypeValidator(false));
    dispatch(accountValidator(false));
    dispatch(accountBalanceValidator(false));
    dispatch(categoryValidator(false));
    dispatch(dateValidator(false));
    dispatch(updateEnabler(false));
    dispatch(addExpenseItem(expenseCleared));
  };

  // SUBMIT
  const submitHandler = (event) => {
    event.preventDefault();
    if (
      expenseItem.expense_type === "" ||
      expenseItem.origin_account === "" ||
      expenseItem.amount.length === 0 ||
      expenseItem.id_category === "" ||
      expenseItem.expense_date === ""
    ) {
      if (expenseItem.expense_type === "") {
        dispatch(expenseTypeValidator(true));
      }
      if (expenseItem.origin_account === "") {
        dispatch(accountValidator(true));
      }
      if (expenseItem.amount.length === 0) {
        dispatch(accountBalanceValidator(true));
      }
      if (expenseItem.id_category === "") {
        dispatch(categoryValidator(true));
      }
      if (expenseItem.expense_date === "") {
        dispatch(dateValidator(true));
      }
      return;
    }
    if (activateUpdate) {
      // let notUpdatedList = expenseList.filter(
      //   (item) => item.id !== expenseItem.id
      // );
      dispatch(editEvent());
      // dispatch(newNotDeletedExpenseList(notUpdatedList));
      // dispatch(addedItem());
      const expenseCleared = {
        id: "",
        expense_type: "",
        origin_account: "",
        amount: "",
        id_currency: 154,
        to_account: "",
        id_category: "",
        expense_date: "",
        description: "",
        showdescription: false,
      };
      dispatch(addExpenseItem(expenseCleared));
      dispatch(updateEnabler(false));
    } else {
      // if (expenseItem.to_account === "") {
      //   dispatch(
      //     addExpenseItem({
      //       ...expenseItem,
      //       to_account: 0,
      //     })
      //   );
      // }

      dispatch(addedItem());
      const expenseCleared = {
        expense_type: "",
        origin_account: "",
        amount: "",
        id_currency: 154,
        to_account: "",
        id_category: "",
        expense_date: "",
        description: "",
        showdescription: false,
      };
      dispatch(addExpenseItem(expenseCleared));
    }

    dispatch(transactionForm(false));
  };

  const { accountList } = useSelector((state) => state.account);

  return (
    <Form onSubmit={submitHandler}>
      <div>AddExpense</div>
      <br />
      {/* --TYPE-- of expense  */}
      <ToggleButtonGroup
        className={`${styles["form-control"]} ${
          invalidExpenseType && styles.invalid
        }`}
        type="radio"
        name="expense_type"
        value={expenseItem.expense_type}
        onChange={valueTypeHandler}
      >
        <ToggleButton id="Income" value="Income" variant="outline-success">
          Income
        </ToggleButton>
        <ToggleButton id="Expense" value="Expense" variant="outline-danger">
          Expense
        </ToggleButton>
      </ToggleButtonGroup>

      {/* --ACCOUNT-- selection */}
      <div
        className={`${styles["form-control"]} ${
          invalidAccount && styles.invalid
        }`}
      >
        <label>Account</label>
        <select
          id="accountDebited"
          value={expenseItem.origin_account}
          onChange={valueAccountHandler}
        >
          <option></option>
          {accountList.map((i, index) => (
            <option key={i.id_account} value={i.id_account}>
              {i.account_number} | {i.account_type}
            </option>
          ))}
        </select>
      </div>

      {/* --AMOUNT-- which comes from AmountMoneyInput component */}
      <div
        className={`${styles["form-control"]} ${
          invalidAccountBalance && styles.invalid
        }`}
      >
        <label>Amount</label>
        <AmountMoneyInput />
      </div>
      {/* --CURRENCY-- that comes from component as well  */}
      <br />
      <CurrencySelect />
      {expenseItem.expense_type === "Expense" && (
        <div
          className={`${styles["form-control"]} ${
            invalidAccount && styles.invalid
          }`}
        >
          <label>Destination Account</label>
          <h6>
            Type the destination account number here to make the transaction or
            leave it blank if you just want to record the expense
          </h6>
          <input
            type="number"
            onChange={changeToAccount}
            value={expenseItem.to_account}
          />
        </div>
      )}
      {/* --CATEGORY-- for expenses select option*/}
      <div
        className={`${styles["form-control"]} ${
          invalidCategory && styles.invalid
        }`}
      >
        <label>Category</label>
        <select
          id="categoryOfExpense"
          value={expenseItem.id_category}
          onChange={categoryHandler}
        >
          <option></option>
          {category.map((item, index) => (
            <option key={item.id_category} value={item.id_category}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* --DATE-- the expense was made */}
      <div
        className={`${styles["form-control"]} ${invalidDate && styles.invalid}`}
      >
        <label>Date</label>
        <input
          type="date"
          value={expenseItem.expense_date}
          onChange={dateChangeHandler}
        />
      </div>
      <br />
      {/* --DESCRIPTION--  */}

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={expenseItem.description}
          as="textarea"
          rows={2}
          onChange={descriptionHandler}
        />
      </Form.Group>

      <br />
      {!activateUpdate ? (
        <Button type="submit" variant="dark">
          Add
        </Button>
      ) : (
        <Button type="submit" variant="dark">
          Save
        </Button>
      )}
      <Button
        type="button"
        variant="secondary"
        onClick={showAddExpenseHanddler}
      >
        Cancel
      </Button>
    </Form>
  );
};
