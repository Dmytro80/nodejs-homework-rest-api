const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
} = require("../services/contacts");
const { HttpError } = require("../helpers/index");

const getContacts = async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    throw new HttpError(404, `Not found contact by id: ${contactId}`);
  }
  return res.json(contact);
};

const createContact = async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw new HttpError(404, `Not found contact by id: ${contactId}`);
  }
  await removeContact(contactId);
  return res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContactById(contactId, req.body);

  if (!contact) {
    throw new HttpError(404, `Not found contact by id: ${contactId}`);
  }
  return res.status(200).json(contact);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContactById(contactId, req.body);

  if (!contact) {
    throw new HttpError(404, `Not found contact by id: ${contactId}`);
  }
  return res.status(200).json(contact);
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
