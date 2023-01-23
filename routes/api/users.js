const express = require("express");
const router = express.Router();

const {
  signupUser,
  signinUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
} = require("../../controllers/users");
const { validateBody } = require("../../middlewares/index");
const {
  schemaRegister,
  schemaLogin,
  schemaUpdate,
} = require("../../schemas/users");
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

router.patch(
  "/",
  tryCatchWrapper(auth),
  validateBody(schemaUpdate),
  tryCatchWrapper(updateSubscription)
);

module.exports = router;
