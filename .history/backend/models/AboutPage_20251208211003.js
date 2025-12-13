const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String },
  bio: { type: String }
});

const statSchema = new mongoose.Schema({
  number: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String }
});

const sectionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'mission', 'vision', etc.
  title: { type: String, required: true },
  content: { type: String, required: true },
  icon: { type: String }
});

const aboutPageSchema = new mongoose.Schema({
  name: { type: String, default: 'About' },
  slug: { type: String, default: 'about' },
  config: {
    hero: {
      title: { type: String, default: 'About Us' },
      subtitle: { type: String, default: 'Our journey and mission' },
      image: { type: String, default: '/images/about-hero.jpg' }
    },
    sections: [sectionSchema],
    team: [teamMemberSchema],
    stats: [statSchema]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AboutPage', aboutPageSchema);
