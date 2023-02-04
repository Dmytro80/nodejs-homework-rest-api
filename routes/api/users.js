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
  resendLinkVerify,
} = require("../../controllers/users");
const { validateBody, upload } = require("../../middlewares");
const {
  schemaRegister,
  schemaLogin,
  schemaUpdate,
  schemaVerifyEmail,
} = require("../../schemas/users");
const { tryCatchWrapper } = require("../../helpers/index");
const { auth } = require("../../middlewares");

router.post(
  "/signup",
  validateBody(schemaRegister),
  tryCatchWrapper(signupUser)
);

router.get("/verify/:verificationToken", tryCatchWrapper(verifyEmail));

router.post(
  "/verify",
  validateBody(schemaVerifyEmail),
  tryCatchWrapper(resendLinkVerify)
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

router.patch(
  "/avatars",
  tryCatchWrapper(auth),
  upload.single("avatar"),
  tryCatchWrapper(updateAvatar)
);

module.exports = router;
