const { response } = require("express");
const {
  getAccounts,
  addAccount,
  accountUpdate,
  accountDeletion,
  getAccTypes,
  getCurrency,
} = require("../models/Account");

const createAccount = async (req, res = response) => {
  try {
    const dbAns = await addAccount(req.body);
    if (dbAns.answer === "ok") {
      res.status(201).json({
        ok: true,
        msg: "account successfully created ",
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
const getAccountList = async (req, res = response) => {
  try {
    const dbAns = await getAccounts(req);
    if (dbAns.answer === "ok") {
      res.status(202).json({
        ok: true,
        msg: "get accounts",
        accounts: dbAns.accounts,
      });
    } else {
      res.status(202).json({
        ok: false,
        msg: "user has no accounts",
      });
    }
  } catch (e) {
    res.status(500).json({
      ok: false,
      msg: "Ups looks like something went really wrong",
    });
  }
};
const updateAccount = async (req, res = response) => {
  try {
    const dbAns = await accountUpdate(req);
    if (dbAns.answer === "ok") {
      res.status(202).json({
        ok: true,
        msg: "account updated",
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
      msg: "Ups looks like something went really wrong",
    });
  }
};
const deleteAccount = async (req, res = response) => {
  try {
    const dbAns = await accountDeletion(req);
    if (dbAns.answer === "ok") {
      res.status(202).json({
        ok: true,
        msg: "account deleted",
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
      msg: "Looks like we cannot delete this one, make sure there are no other expenses asociated",
    });
  }
};

const getAccountTypes = async (req, res = response) => {
  try {
    const dbAns = await getAccTypes(req);
    if (dbAns.answer === "ok") {
      res.status(202).json({
        ok: true,
        msg: "get your types",
        types: dbAns.types,
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
      msg: "Ups looks like something went really wrong",
    });
  }
};
const getCurrencyType = async (req, res = response) => {
  try {
    const dbAns = await getCurrency(req);
    if (dbAns.answer === "ok") {
      res.status(202).json({
        ok: true,
        msg: "get your currency",
        currency: dbAns.currency,
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
      msg: "Ups looks like something went really wrong",
    });
  }
};

module.exports = {
  createAccount,
  getAccountList,
  updateAccount,
  deleteAccount,
  getAccountTypes,
  getCurrencyType,
};
