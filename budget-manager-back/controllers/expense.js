const { response } = require("express");
const {
  getExpenses,
  addExpense,
  expenseUpdate,
  expenseDeletion,
  expenseCategories,
} = require("../models/Expense");

const createExpense = async (req, res = response) => {
  try {
    const dbAns = await addExpense(req.body);
    if (dbAns.answer === "ok") {
      res.status(201).json({
        ok: true,
        msg: "expense successfully created ",
      });
    } else {
      res.status(202).json({
        ok: false,
        msg: dbAns.answer,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};
const getExpenseList = async (req, res = response) => {
  try {
    const dbAns = await getExpenses(req);
    if (dbAns.answer === "ok") {
      res.status(202).json({
        ok: true,
        msg: "get expenses",
        expenses: dbAns.expenses,
      });
    } else {
      res.status(202).json({
        ok: false,
        msg: "user has no expenses yet",
      });
    }
  } catch (e) {
    res.status(500).json({
      ok: false,
      msg: "Ups looks like something went really wrong",
    });
  }
};
const updateExpense = async (req, res = response) => {
  try {
    const dbAns = await expenseUpdate(req);
    if (dbAns.answer === "ok") {
      res.status(202).json({
        ok: true,
        msg: "expense updated",
      });
    } else {
      res.status(400).json({
        ok: false,
        msg: dbAns.answer,
      });
    }
  } catch (e) {
    res.status(500).json({
      ok: false,
      msg: e,
    });
  }
};
const deleteExpense = async (req, res = response) => {
  console.log(req);
  try {
    const dbAns = await expenseDeletion(req);
    if (dbAns.answer === "ok") {
      res.status(202).json({
        ok: true,
        msg: "expense deleted",
      });
    } else {
      res.status(202).json({
        ok: false,
        msg: dbAns.answer,
      });
    }
  } catch (e) {
    res.status(500).json({
      ok: false,
      msg: e,
    });
  }
};
const getCategories = async (req, res = response) => {
  try {
    const dbAns = await expenseCategories(req);
    if (dbAns.answer === "ok") {
      res.status(202).json({
        ok: true,
        msg: "expense categories",
        categories: dbAns.categories,
      });
    } else {
      res.status(202).json({
        ok: false,
        msg: dbAns.answer,
      });
    }
  } catch (e) {
    res.status(500).json({
      ok: false,
      msg: e,
    });
  }
};
module.exports = {
  createExpense,
  getExpenseList,
  updateExpense,
  deleteExpense,
  getCategories,
};
