const { Contact } = require("../models/contact");

const listContacts = async (user, query) => {
  const { limit = 3, page = 1, favorite } = query;
  const skip = (page - 1) * limit;

  if (favorite) {
    const contacts = await Contact.find({ owner: user._id, favorite })
      .skip(skip)
      .limit(limit);

    return contacts;
  }

  const contacts = await Contact.find({ owner: user._id })
    .skip(skip)
    .limit(limit);

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
