const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "request requires a token",
    });
  }
  try {
    const { id, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.id = id;
    req.name = name;
  } catch {
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }

  next();
};
module.exports = { validateJWT };
