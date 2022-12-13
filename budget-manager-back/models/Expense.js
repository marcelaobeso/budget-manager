const { parse } = require("dotenv");
const { query } = require("express");
const pool = require("../database/config");

const getExpenses = async ({ id }) => {
  const { rows: userExpenses } = await pool.query(
    "select distinct on (e.id_expense) e.id_expense, e.expense_type, to_char(e.expense_date,'YYYY-MM-DD') as expense_date, e.amount, e.description, e.showdescription, e.origin_account, e.to_account, e.id_currency, e.id_category,  c.name as currencyName, ca.name as categoryName FROM expense e  left join account a on e.id_user = a.id_user  right join currency c on e.id_currency = c.id_currency  right join category ca on e.id_category = ca.id_category  WHERE e.id_user = $1",
    [id]
  );
  if (userExpenses.rowCount === 0) {
    return { answer: "User has no accounts yet" };
  } else {
    const { rows: accounts } = await pool.query(
      "select a.account_number, a.id_account  from expense e join account a on e.to_account = a.id_account WHERE e.id_user = $1;",
      [id]
    );
    for (let i = 0; i < userExpenses.length; i++) {
      for (let j = 0; j < accounts.length; j++) {
        if (userExpenses[i].to_account === accounts[j].id_account) {
          userExpenses[i] = {
            ...userExpenses[i],
            to_account: accounts[j].account_number,
          };
        }
      }
    }
  }
  return { answer: "ok", expenses: userExpenses };
};

const addExpense = async (req) => {
  const {
    idUser,
    expense_type,
    expense_date,
    amount,
    description,
    origin_account,
    to_account,
    id_currency,
    id_category,
  } = req;

  const { rows: currOriginAcc } = await pool.query(
    "SELECT id_currency FROM account WHERE id_account = $1",
    [origin_account]
  );
  let to_account_id = 0;
  let newToCurr = 0;
  if (to_account == "") {
    to_account_id = 0;
  } else {
    const checkIdToAccount = await pool.query(
      "SELECT id_account FROM account where account_number = $1",
      [to_account]
    );

    if (checkIdToAccount.rowCount === 0) {
      return { answer: "the account you are trying to xfer to doesnt exist" };
    } else {
      to_account_id = checkIdToAccount.rows[0].id_account;
    }
  }
  const { rows: a } = await pool.query(
    "select id_currency from account  where id_account =$1 and id_user = $2",
    [origin_account, idUser]
  );
  // INCOME *****************************************************************
  if (expense_type === "Income") {
    const { rows: b } = await pool.query(
      "SELECT ($1/rate) AS EXCHANGE FROM currency c where id_currency = $2;",
      [amount, id_currency]
    );
    const { rows: c } = await pool.query(
      "select ($1*rate) as EXCHANGE from currency c join account a on c.id_currency = a.id_currency  where id_user = $2 and id_account = $3;",
      [b[0].exchange, idUser, origin_account]
    );
    let deposit = c[0].exchange;
    if (a[0].id_currency === id_currency) {
      deposit = amount;
    }
    await pool.query(
      "UPDATE account SET balance = balance + $1 WHERE id_account = $2 and id_user = $3",
      [deposit, origin_account, idUser]
    );
    await pool.query(
      "INSERT INTO expense(EXPENSE_TYPE, expense_date, AMOUNT, DESCRIPTION, ORIGIN_ACCOUNT, TO_ACCOUNT, ID_CURRENCY, ID_CATEGORY, ID_USER) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);",
      [
        expense_type,
        expense_date,
        amount,
        description,
        origin_account,
        to_account_id,
        id_currency,
        id_category,
        idUser,
      ]
    );

    return { answer: "ok" };
  }
  // EXPENSE *****************************************************************

  let { rows: currToAcc } = await pool.query(
    "SELECT id_currency FROM account WHERE id_account = $1",
    [to_account_id]
  );
  if (to_account === "0") {
    const checkCashAccount = await pool.query(
      "SELECT * FROM account where account_number = $1 and id_user = $2",
      [to_account, idUser]
    );
    if (checkCashAccount.rowCount === 0) {
      return {
        answer: "The account you are trying to transfer doesnt exist yet",
      };
    }
    to_account_id = checkCashAccount.rows[0].id_account;
    newToCurr = await pool.query(
      "SELECT id_currency FROM account WHERE account_number = $1 and id_user = $2",
      [to_account, idUser]
    );
    currToAcc = newToCurr.rows;
  }

  if (expense_type === "Expense") {
    if (to_account_id === parseInt(origin_account) && to_account) {
      return { answer: "trasnfers to the same account are not allowed" };
    }
    const checkToAccount = await pool.query(
      "SELECT * FROM account where id_account = $1",
      [to_account_id]
    );
    if (checkToAccount.rowCount === 0) {
      return {
        answer:
          "account you are trying to transfer doesnt exist in the system, add it if its yours or save it as cash expense ",
      };
    }

    // first we remove the money from the origin account
    await pool.query(
      "UPDATE account SET balance  = balance - exchange(dollars_exchange($1,$2), $3) WHERE id_account = $4;",
      [amount, id_currency, currOriginAcc[0].id_currency, origin_account]
    );

    // now we add that money to the to_account if there is one

    await pool.query(
      "UPDATE account SET balance  = balance + exchange(dollars_exchange($1,$2), $3) WHERE id_account = $4;",
      [amount, id_currency, currToAcc[0].id_currency, to_account_id]
    );
    // and we add the other info of the expense
    await pool.query(
      "INSERT INTO expense(expense_type, expense_date, AMOUNT, DESCRIPTION, ORIGIN_ACCOUNT, TO_ACCOUNT, ID_CURRENCY, ID_CATEGORY, ID_USER) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);",
      [
        expense_type,
        expense_date,
        amount,
        description,
        origin_account,
        to_account_id,
        id_currency,
        id_category,
        idUser,
      ]
    );

    return { answer: "ok" };
  }
};

const expenseUpdate = async (req) => {
  const {
    idUser,
    expense_type,
    expense_date,
    amount,
    description,
    origin_account,
    to_account,
    id_currency,
    id_category,
  } = req.body;
  const id = parseInt(req.params.id);
  let id_to_account = null;

  const { rows: to_account_id } = await pool.query(
    "SELECT id_account FROM account WHERE account_number = $1",
    [to_account]
  );

  if (!to_account_id) {
    return { answer: "destination account doesnt exists " };
  }
  id_to_account = to_account_id[0].id_account;

  const { rows: oldExpense } = await pool.query(
    "SELECT * FROM expense WHERE id_expense = $1",
    [id]
  );

  // All currecies we might need
  const { rows: oldCurOriginAcc } = await pool.query(
    "SELECT id_currency FROM account WHERE id_account = $1",
    [oldExpense[0].origin_account]
  );
  const { rows: oldCurToAcc } = await pool.query(
    "SELECT id_currency FROM account WHERE id_account = $1",
    [oldExpense[0].to_account]
  );
  const { rows: newCurOriginAcc } = await pool.query(
    "SELECT id_currency FROM account WHERE id_account = $1",
    [origin_account]
  );
  const { rows: newCurToAcc } = await pool.query(
    "SELECT id_currency FROM account WHERE id_account = $1",
    [id_to_account]
  );
  if (
    (Number(id_to_account) === Number(origin_account)) &
    (expense_type !== "Income")
  ) {
    return { answer: "transfers to the same account are not permited" };
  }
  if (expense_type !== oldExpense[0].expense_type) {
    //EXPENSE --> INCOME here we are changing from a type expense to a type income
    if (expense_type === "Income") {
      // must check if the money transaction will chage

      //first we undo the things with the old expense
      await pool.query(
        "UPDATE account SET balance  = balance + exchange(dollars_exchange($1,$2), $3) WHERE id_account = $4;",
        [
          oldExpense[0].amount,
          oldExpense[0].id_currency,
          oldCurOriginAcc[0].id_currency,
          oldExpense[0].origin_account,
        ]
      );
      await pool.query(
        "UPDATE account SET balance  = balance - exchange(dollars_exchange($1,$2), $3) WHERE id_account = $4;",
        [
          oldExpense[0].amount,
          oldExpense[0].id_currency,
          oldCurToAcc[0].id_currency,
          oldExpense[0].to_account,
        ]
      );
      // now we redo all withh allthe new info
      await pool.query(
        "UPDATE account SET balance  = balance + exchange(dollars_exchange($1,$2), $3) WHERE id_account = $4;",
        [amount, id_currency, newCurOriginAcc[0].id_currency, origin_account]
      );
      await pool.query(
        "UPDATE expense SET expense_type = $1, expense_date = $2, amount = $3, description= $4, origin_account = $5, to_account = $6, id_currency = $7, id_category = $8 WHERE id_expense = $9",
        [
          expense_type,
          expense_date,
          amount,
          description,
          origin_account,
          id_to_account,
          id_currency,
          id_category,
          id,
        ]
      );
      return { answer: "ok" };
    } else {
      //INCOME --> EXPENSE here we are changing from a type INCOME to a type EXPENSE
      await pool.query(
        "UPDATE account SET balance  = balance - exchange(dollars_exchange($1,$2), $3) WHERE id_account = $4;",
        [
          oldExpense[0].amount,
          oldExpense[0].id_currency,
          oldCurOriginAcc[0].id_currency,
          oldExpense[0].origin_account,
        ]
      );
      // now we redo all withh allthe new info
      await pool.query(
        "UPDATE account SET balance  = balance - exchange(dollars_exchange($1,$2), $3) WHERE id_account = $4;",
        [amount, id_currency, newCurOriginAcc[0].id_currency, origin_account]
      );
      await pool.query(
        "UPDATE account SET balance  = balance + exchange(dollars_exchange($1,$2), $3) WHERE id_account = $4;",
        [amount, id_currency, newCurToAcc[0].id_currency, id_to_account]
      );
      await pool.query(
        "UPDATE expense SET expense_type = $1, expense_date = $2, amount = $3, description= $4, origin_account = $5, to_account = $6, id_currency = $7, id_category = $8 WHERE id_expense = $9",
        [
          expense_type,
          expense_date,
          amount,
          description,
          origin_account,
          id_to_account,
          id_currency,
          id_category,
          id,
        ]
      );
      return { answer: "ok" };
    }
  } else {
    if (
      parseInt(origin_account) !== parseInt(oldExpense[0].origin_account) ||
      parseInt(id_to_account) !== parseInt(oldExpense[0].to_account) ||
      parseInt(amount) !== parseInt(oldExpense[0].amount) ||
      parseInt(id_currency) !== parseInt(oldExpense[0].id_currency)
    ) {
      if (expense_type === "Income") {
        //we first remove the incorrect amount from incorrect account and incorrect rate
        await pool.query(
          "UPDATE account SET balance  = balance - exchange(dollars_exchange($1,$2), $3) WHERE id_account = $4;",
          [
            oldExpense[0].amount,
            oldExpense[0].id_currency,
            oldCurOriginAcc[0].id_currency,
            oldExpense[0].origin_account,
          ]
        );
        //now we give back the money to the the village
        await pool.query(
          "UPDATE account SET balance  = balance + exchange(dollars_exchange($1,$2), $3) WHERE id_account = $4;",
          [amount, id_currency, newCurOriginAcc[0].id_currency, origin_account]
        );
      } else {
        //taking back from old accounts
        await pool.query(
          "UPDATE account SET balance  = balance + exchange(dollars_exchange($1,$2), $3) WHERE id_account = $4;",
          [
            oldExpense[0].amount,
            oldExpense[0].id_currency,
            oldCurOriginAcc[0].id_currency,
            oldExpense[0].origin_account,
          ]
        );
        await pool.query(
          "UPDATE account SET balance  = balance - exchange(dollars_exchange($1,$2), $3) WHERE id_account = $4;",
          [
            oldExpense[0].amount,
            oldExpense[0].id_currency,
            oldCurToAcc[0].id_currency,
            oldExpense[0].to_account,
          ]
        );
        await pool.query(
          "UPDATE account SET balance  = balance - exchange(dollars_exchange($1,$2), $3) WHERE id_account = $4;",
          [amount, id_currency, newCurOriginAcc[0].id_currency, origin_account]
        );
        await pool.query(
          "UPDATE account SET balance  = balance + exchange(dollars_exchange($1,$2), $3) WHERE id_account = $4;",
          [amount, id_currency, newCurToAcc[0].id_currency, id_to_account]
        );
      }
    }
  }

  await pool.query(
    "UPDATE expense SET expense_type = $1, expense_date = $2, amount = $3, description= $4, origin_account = $5, to_account = $6, id_currency = $7, id_category = $8 WHERE id_expense = $9",
    [
      expense_type,
      expense_date,
      amount,
      description,
      origin_account,
      id_to_account,
      id_currency,
      id_category,
      id,
    ]
  );

  return { answer: "ok" };
};

const expenseDeletion = async (req) => {
  const id = parseInt(req.params.id);
  const { rows: oldExpense } = await pool.query(
    "SELECT * FROM expense WHERE id_expense = $1",
    [id]
  );
  if (oldExpense.length === 0) {
    return { answer: "expense doesnt exist" };
  }
  const { rows: oldCurOriginAcc } = await pool.query(
    "SELECT id_currency FROM account WHERE id_account = $1",
    [oldExpense[0].origin_account]
  );
  const { rows: oldCurToAcc } = await pool.query(
    "SELECT id_currency FROM account WHERE id_account = $1",
    [oldExpense[0].to_account]
  );

  if (oldExpense[0].expense_type === "Income") {
    await pool.query(
      "UPDATE account SET balance  = balance - exchange(dollars_exchange($1,$2), $3) WHERE id_account = $4;",
      [
        oldExpense[0].amount,
        oldExpense[0].id_currency,
        oldCurOriginAcc[0].id_currency,
        oldExpense[0].origin_account,
      ]
    );
    await pool.query("DELETE FROM expense WHERE id_expense = $1", [id]);
  } else {
    await pool.query(
      "UPDATE account SET balance  = balance + exchange(dollars_exchange($1,$2), $3) WHERE id_account = $4;",
      [
        oldExpense[0].amount,
        oldExpense[0].id_currency,
        oldCurOriginAcc[0].id_currency,
        oldExpense[0].origin_account,
      ]
    );
    await pool.query(
      "UPDATE account SET balance  = balance - exchange(dollars_exchange($1,$2), $3) WHERE id_account = $4;",
      [
        oldExpense[0].amount,
        oldExpense[0].id_currency,
        oldCurToAcc[0].id_currency,
        oldExpense[0].to_account,
      ]
    );
    await pool.query("DELETE FROM expense WHERE id_expense = $1", [id]);
  }
  return { answer: "ok" };
};

const expenseCategories = async (req) => {
  const { rows } = await pool.query("SELECT * FROM category");
  return { answer: "ok", categories: rows };
};

module.exports = {
  addExpense,
  getExpenses,
  expenseUpdate,
  expenseDeletion,
  expenseCategories,
};
