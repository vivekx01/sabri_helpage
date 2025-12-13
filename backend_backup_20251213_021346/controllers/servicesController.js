const Contact = require('../models/Contact');
const Subscription = require('../models/Subscription');
const Donation = require('../models/Donation');

const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ success: true, message: 'Contact message received.', data: contact });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const createSubscription = async (req, res) => {
  try {
    const subscription = new Subscription(req.body);
    await subscription.save();
    res.status(201).json({ success: true, message: 'Successfully subscribed.', data: subscription });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const createDonation = async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json({ success: true, message: 'Donation received. Thank you!', data: donation });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createContact,
  createSubscription,
  createDonation,
};
