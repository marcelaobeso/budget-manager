/*
Login routes for users 

host + /api/auth
*/
const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {
  fieldsValidator,
} = require("../controllers/middlewares/fieldsValidation.js");
const { createUser, logUser, renewUser } = require("../controllers/auth.js");
const { validateJWT } = require("../controllers/middlewares/JWTValidator.js");

router.post(
  "/sign",
  [
    //middlewares
    check("firstName", "Firstname is mandatory").not().isEmpty(),
    check("lastName", "lastName is mandatory").not().isEmpty(),
    check(
      "username",
      "username is mandatory and should have more than 5 caracters"
    ).isLength({ min: 5 }),
    check(
      "password",
      "password is mandatory and must be 6 caracters length minimun"
    ).isLength({ min: 6 }),
    check("email", "email is mandatory").isEmail(),
    fieldsValidator,
  ],
  createUser
);
router.post(
  "/login",
  [
    //middlewares
    check("username", "username must be entered").not().isEmpty(),
    check("password", "password must be entered").not().isEmpty(),
    fieldsValidator,
  ],

  logUser
);
router.get(
  "/renew",
  [
    //middlewares
    check("token", "no token to validate").not().isEmpty(),
    validateJWT,
  ],
  renewUser
);

module.exports = router;
