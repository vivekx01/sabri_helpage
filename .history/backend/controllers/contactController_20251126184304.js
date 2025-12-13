import Contacts from "../models/Contact.js";


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

