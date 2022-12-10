const pool = require("../database/config");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const addUser = async (req) => {
  const { firstName, lastName, username, email, password } = req;

  const emailCheck = await pool.query("SELECT* FROM PERSON WHERE EMAIL = $1", [
    email,
  ]);

  if (emailCheck.rowCount !== 0) {
    return { answer: "email alreay in database " };
  }
  const userCheck = await pool.query(
    "SELECT* FROM PERSON WHERE USERNAME = $1",
    [username]
  );
  if (userCheck.rowCount !== 0) {
    return { answer: "username already in database " };
  }
  await pool.query(
    "INSERT INTO PERSON (FIRST_NAME, LAST_NAME, USERNAME, EMAIL, PASSWORD) VALUES($1, $2, $3, $4, $5);",
    [firstName, lastName, username, email, password]
  );
  const { rows } = await pool.query("SELECT* FROM PERSON WHERE USERNAME = $1", [
    username,
  ]);
  const token = await generateJWT(rows[0].id_user, rows[0].first_name);
  return { answer: "ok", idUser: rows[0].id_user, token: token };
};

const loginUser = async (req) => {
  const { username, password } = req;

  const userCheck = await pool.query(
    "SELECT* FROM PERSON WHERE USERNAME = $1",
    [username]
  );
  if (userCheck.rowCount === 0) {
    return { answer: "ups user o pass incorrectos" };
  }
  const { rows } = await pool.query(
    "SELECT * FROM PERSON WHERE USERNAME = $1",
    [username]
  );
  const hashPass = bcrypt.compareSync(password, rows[0].password);
  if (!hashPass) {
    return { answer: "Password incorrecto" };
  }

  const token = await generateJWT(rows[0].id_user, rows[0].first_name);

  return {
    answer: "ok",
    token: token,
    idUser: rows[0].id_user,
    name: rows[0].first_name,
  };
};
module.exports = { addUser, loginUser };
