import Contacts from "../models/Contacts.js";
const fs = require('fs');
const path = require('path');

const CONTACTS_FILE = path.join(__dirname, '..', 'data', 'contacts.json');

function readContacts() {
  try {
    const raw = fs.readFileSync(CONTACTS_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

function writeContacts(arr) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(arr, null, 2), 'utf8');
}

exports.createContact = (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};
    if (!name || !message) {
      return res.status(400).json({ success: false, error: 'name and message are required' });
    }

    const contacts = readContacts();
    const newContact = {
      id: Date.now().toString(),
      name,
      email: email || null,
      subject: subject || null,
      message,
      createdAt: new Date().toISOString(),
    };

    contacts.unshift(newContact);
    writeContacts(contacts);

    return res.status(201).json({ success: true, data: newContact });
  } catch (err) {
    console.error('createContact error', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.listContacts = (req, res) => {
  try {
    const contacts = readContacts();
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    console.error('listContacts error', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};