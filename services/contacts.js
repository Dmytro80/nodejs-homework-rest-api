const { Contact } = require("../models/contact");

const listContacts = async (query) => {
  const { limit = 3, page = 1 } = query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({})
    .skip(skip)
    .limit(limit)
    .populate("owner");

  return contacts;
};

const getContactById = async (contactId) => {
  const contactById = await Contact.findById(contactId);

  return contactById;
};

const removeContact = async (contactId) => {
  await Contact.findByIdAndRemove(contactId);
};

const addContact = async (body, id) => {
  const newContact = await Contact.create({ ...body, owner: id });

  return newContact;
};

const updateContactById = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
