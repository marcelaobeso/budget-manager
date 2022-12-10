const jwt = require("jsonwebtoken");

const generateJWT = (id, name) => {
  return new Promise((resolve, reject) => {
    const payload = { id, name };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      { expiresIn: "6h" },
      (err, token) => {
        if (err) {
          reject("unable to generate token");
        }
        resolve(token);
      }
    );
  });
};
module.exports = { generateJWT };
