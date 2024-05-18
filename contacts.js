const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  return new Promise((resolve, reject) => {
    fs.readFile(contactsPath, "utf8", (err, data) => {
      if (err) {
        return reject(err);
      }
      try {
        const contacts = JSON.parse(data);
        resolve(contacts);
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
}

function getContactById(contactId) {
  return listContacts().then((contacts) => {
    const contact = contacts.find((contact) => contact.id == contactId);
    return contact || null;
  });
}

function removeContact(contactId) {
  return listContacts().then((contacts) => {
    const updatedContacts = contacts.filter(
      (contact) => contact.id != contactId
    );
    return new Promise((resolve, reject) => {
      fs.writeFile(
        contactsPath,
        JSON.stringify(updatedContacts, null, 2),
        "utf8",
        (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        }
      );
    });
  });
}

function addContact(name, email, phone) {
  return listContacts().then((contacts) => {
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    return new Promise((resolve, reject) => {
      fs.writeFile(
        contactsPath,
        JSON.stringify(contacts, null, 2),
        "utf8",
        (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        }
      );
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
