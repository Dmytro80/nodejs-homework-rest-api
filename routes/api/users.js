const express = require("express");
const router = express.Router();

const {
  signupUser,
  signinUser,
  logoutUser,
  getCurrentUser,
} = require("../../controllers/auth");
const { validateBody } = require("../../middlewares/index");
const { schemaRegister, schemaLogin } = require("../../schemas/users");
const { tryCatchWrapper } = require("../../helpers/index");
const { auth } = require("../../middlewares/index");

router.post(
  "/signup",
  validateBody(schemaRegister),
  tryCatchWrapper(signupUser)
);

router.post("/login", validateBody(schemaLogin), tryCatchWrapper(signinUser));

router.get("/logout", tryCatchWrapper(auth), tryCatchWrapper(logoutUser));

router.get("/current", tryCatchWrapper(auth), tryCatchWrapper(getCurrentUser));

module.exports = router;
