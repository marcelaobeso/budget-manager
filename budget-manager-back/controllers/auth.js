const { response } = require("express");
const bcrypt = require("bcryptjs");
const { addUser, loginUser } = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

// Sign up user, here is where the account is created and a token generated
const createUser = async (req, res = response) => {
  const { firstName, lastName, userName, email, password } = req.body;
  const salt = bcrypt.genSaltSync();
  req.body.password = bcrypt.hashSync(password, salt);

  //errors handler
  try {
    const dbAns = await addUser(req.body);
    if (dbAns.answer === "ok") {
      res.status(201).json({
        ok: true,
        msg: "signup",
        idUser: dbAns.idUser,
        firstName,
        userName,
        token: dbAns.token,
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

// Login, here the user is authenticated with password an the token is generated
const logUser = async (req, res = response) => {
  try {
    const dbAns = await loginUser(req.body);
    if (dbAns.answer === "ok") {
      res.json({
        ok: true,
        msg: "login",
        idUser: dbAns.idUser,
        name: dbAns.name,
        token: dbAns.token,
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
      msg: "Ups looks like something went really wrong",
    });
  }
};

const renewUser = async ({ id, name }, res = response) => {
  const token = await generateJWT(id, name);
  res.json({
    ok: true,
    msg: "renew",
    id,
    name,
    token,
  });
};
module.exports = { createUser, logUser, renewUser };
