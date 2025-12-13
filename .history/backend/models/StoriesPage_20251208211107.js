const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String },
  image: { type: String }
});

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String },
  beforePhoto: { type: String },
  afterPhoto: { type: String }
});

const storySchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  heroImage: { type: String },
  contentImages: [{ type: String }],
  person: personSchema,
  icons: {
    location: { type: String, default: 'map-pin' },
    age: { type: String, default: 'calendar' },
    achievement: { type: String, default: 'award' }
  }
});

const formatSchema = new mongoose.Schema({
  type: { type: String, required: true },
  icon: { type: String },
  thumbnail: { type: String }
});

const storiesPageSchema = new mongoose.Schema({
  name: { type: String, default: 'Stories' },
  slug: { type: String, default: 'stories' },
  config: {
    hero: {
      title: { type: String, default: 'Success Stories' },
      image: { type: String, default: '/images/stories/hero.jpg' },
      icon: { type: String, default: 'book-open' }
    },
    categories: [categorySchema],
    stories: [storySchema],
    formats: [formatSchema]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('StoriesPage', storiesPageSchema);
