const mongoose = require('mongoose');

const GlobalConfigSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed }
});

module.exports = mongoose.model('GlobalConfig', GlobalConfigSchema);
