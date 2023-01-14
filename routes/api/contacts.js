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
const { contactSchema, updateStatusSchema } = require("../../models/contact");
const { validateBody } = require("../../middlewares/index");
const router = express.Router();

router.get("/", tryCatchWrapper(getContacts));

router.get("/:contactId", tryCatchWrapper(getContact));

router.post("/", validateBody(contactSchema), tryCatchWrapper(createContact));

router.delete("/:contactId", tryCatchWrapper(deleteContact));

router.put(
  "/:contactId",
  validateBody(contactSchema),
  tryCatchWrapper(updateContact)
);

router.patch(
  "/:contactId/favorite",
  validateBody(updateStatusSchema),
  tryCatchWrapper(updateStatusContact)
);

module.exports = router;
