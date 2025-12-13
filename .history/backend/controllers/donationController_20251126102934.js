const Donation = require('../models/Donation');

exports.createDonation = async (req, res) => {
  try {
    const { name, email, amount, frequency, cause } = req.body;
    const donation = new Donation({ name, email, amount, frequency, cause });
    await donation.save();
    res.status(201).json({ data: donation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save donation' });
  }
};

exports.listDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 }).lean();
    res.json({ data: donations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
