const mongoose = require('mongoose');

const csrSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  companyType: { type: String, required: true },
  industry: { type: String, required: true },
  companySize: { type: String, required: true },
  budget: { type: String, required: true },
  focusAreas: [{ type: String }],
  duration: { type: String, required: true },
  objectives: { type: String, required: true },
  previousCSR: { type: String },
  expectations: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'in-progress', 'completed'], default: 'pending' },
  notes: { type: String },
  proposalDate: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('CSR', csrSchema);
