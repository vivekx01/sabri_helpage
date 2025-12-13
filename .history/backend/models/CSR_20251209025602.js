const mongoose = require('mongoose');

const CSRSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CSR', CSRSchema);
