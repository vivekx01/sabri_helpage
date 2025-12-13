const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  amount: { type: Number, required: true },
  frequency: { type: String, enum: ['one-time','monthly'], default: 'one-time' },
  cause: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', DonationSchema, 'donations');
