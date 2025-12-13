const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    res.status(201).json({ data: contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save contact' });
  }
};

exports.listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
    res.json({ data: contacts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
