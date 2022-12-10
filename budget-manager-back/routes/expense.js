const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {
  getExpenseList,
  createExpense,
  updateExpense,
  deleteExpense,
  getCategories,
} = require("../controllers/expense.js");
const {
  fieldsValidator,
} = require("../controllers/middlewares/fieldsValidation.js");
const { validateJWT } = require("../controllers/middlewares/JWTValidator.js");

router.get(
  "/expenses",
  validateJWT,
  [check("idUser", "idUser is mandatory").not().isEmpty(), fieldsValidator],
  getExpenseList
);
router.post(
  "/newexpense",
  validateJWT,
  [
    check("expense_type", "expense_type is mandatory").not().isEmpty(),
    check("expense_date", "expense_date is mandatory").isDate(),
    check("amount", "amount is mandatory ").not().isEmpty(),
    check("origin_account", "origin_account is mandatory").not().isEmpty(),
    check("id_currency", "id_currency is mandatory").not().isEmpty(),
    check("id_category", "category is mandatory").not().isEmpty(),
    fieldsValidator,
  ],
  createExpense
);
router.put(
  "/:id",
  validateJWT,
  [check("idUser", "idUser is mandatory").not().isEmpty(), fieldsValidator],
  updateExpense
);
router.delete(
  "/:id",
  validateJWT,
  [check("idUser", "idUser is mandatory").not().isEmpty(), fieldsValidator],
  deleteExpense
);
router.get("/categories", validateJWT, getCategories);

module.exports = router;
