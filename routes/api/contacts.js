const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.controllers");
const { contactSchema, updateStatusSchema } = require("../../schemas/contacts");
const { validateBody } = require("../../middlewares");
const { auth } = require("../../middlewares");

const router = express.Router();

router.get("/", tryCatchWrapper(auth), tryCatchWrapper(getContacts));

router.get("/:contactId", tryCatchWrapper(auth), tryCatchWrapper(getContact));

router.post(
  "/",
  tryCatchWrapper(auth),
  validateBody(contactSchema),
  tryCatchWrapper(createContact)
);

router.delete(
  "/:contactId",
  tryCatchWrapper(auth),
  tryCatchWrapper(deleteContact)
);

router.put(
  "/:contactId",
  validateBody(contactSchema),
  tryCatchWrapper(auth),
  tryCatchWrapper(updateContact)
);

router.patch(
  "/:contactId/favorite",
  validateBody(updateStatusSchema),
  tryCatchWrapper(auth),
  tryCatchWrapper(updateStatusContact)
);

module.exports = router;
