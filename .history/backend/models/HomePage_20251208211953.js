const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  title: { type: String, default: 'Welcome to Sabri Helpage' },
  subtitle: { type: String, default: 'Making a difference in communities' },
  backgroundImage: { type: String, default: '/images/hero-bg.jpg' },
  ctaButton: {
    text: { type: String, default: 'Get Involved' },
    link: { type: String, default: '/contact' }
  }
});

const statsSchema = new mongoose.Schema({
  number: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String }
});

const causeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String },
  image: { type: String },
  link: { type: String }
});

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  content: { type: String, required: true },
  image: { type: String },
  rating: { type: Number, default: 5 }
});

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String },
  date: { type: Date, default: Date.now },
  image: { type: String },
  link: { type: String }
});

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  website: { type: String }
});

const ctaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  buttonText: { type: String, default: 'Learn More' },
  buttonLink: { type: String },
  backgroundImage: { type: String }
});

const homePageSchema = new mongoose.Schema({
  name: { type: String, default: 'Home' },
  slug: { type: String, default: 'home' },
  hero: heroSchema,
  stats: [statsSchema],
  causes: [causeSchema],
  testimonials: [testimonialSchema],
  news: [newsSchema],
  partners: [partnerSchema],
  cta: ctaSchema
}, {
  timestamps: true
});

module.exports = mongoose.model('HomePage', homePageSchema);
