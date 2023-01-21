const express = require("express");
const router = express.Router();

const {
  signupUser,
  signinUser,
  logoutUser,
} = require("../../controllers/auth");
const { validateBody } = require("../../middlewares/index");
const { schemaRegister, schemaLogin } = require("../../schemas/users");
const { tryCatchWrapper } = require("../../helpers/index");

router.post(
  "/signup",
  validateBody(schemaRegister),
  tryCatchWrapper(signupUser)
);

router.post("/login", validateBody(schemaLogin), tryCatchWrapper(signinUser));

router.get("/logout", tryCatchWrapper(logoutUser));

module.exports = router;
