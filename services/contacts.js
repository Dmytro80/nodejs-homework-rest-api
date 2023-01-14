const { Contact } = require("../models/contact");

const listContacts = async () => {
  const contacts = await Contact.find({});

  return contacts;
};

const getContactById = async (contactId) => {
  const contactById = await Contact.findById(contactId);

  return contactById;
};

const removeContact = async (contactId) => {
  await Contact.findByIdAndRemove(contactId);
};

const addContact = async (body) => {
  const newContact = await Contact.create(body);

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
