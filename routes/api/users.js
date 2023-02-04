const express = require("express");
const router = express.Router();

const {
  signupUser,
  signinUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  verifyEmail,
} = require("../../controllers/users");
const { validateBody, upload } = require("../../middlewares");
const {
  schemaRegister,
  schemaLogin,
  schemaUpdate,
} = require("../../schemas/users");
const { tryCatchWrapper } = require("../../helpers/index");
const { auth } = require("../../middlewares");

router.post(
  "/signup",
  validateBody(schemaRegister),
  tryCatchWrapper(signupUser)
);

router.get("/verify/:verificationToken", tryCatchWrapper(verifyEmail));

router.post("/login", validateBody(schemaLogin), tryCatchWrapper(signinUser));

router.get("/logout", tryCatchWrapper(auth), tryCatchWrapper(logoutUser));

router.get("/current", tryCatchWrapper(auth), tryCatchWrapper(getCurrentUser));

router.patch(
  "/",
  tryCatchWrapper(auth),
  validateBody(schemaUpdate),
  tryCatchWrapper(updateSubscription)
);

router.patch(
  "/avatars",
  tryCatchWrapper(auth),
  upload.single("avatar"),
  tryCatchWrapper(updateAvatar)
);

module.exports = router;
