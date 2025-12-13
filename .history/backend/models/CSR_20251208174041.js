const mongoose = require('mongoose');

const CSRSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  contactPerson: String,
  email: {
    type: String,
    required: true
  },
  phone: String,
  proposalDetails: String,
  status: {
    type: String,
    default: 'new'
  }
}, { timestamps: true });

module.exports = mongoose.model('CSR', CSRSchema);
