const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String }
});

module.exports = mongoose.model('Animal', AnimalSchema, 'animals');
