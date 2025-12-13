import Contacts from "../models/Contact.js";
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

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newContact = await Contacts.create({
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      data: newContact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server error" });
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