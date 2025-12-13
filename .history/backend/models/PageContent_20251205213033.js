const mongoose = require('mongoose');

// Flexible page content schema to support meta/header/hero/sections/cta
const pageContentSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, index: true, required: true },
    name: { type: String },
    meta: { type: mongoose.Schema.Types.Mixed },
    header: { type: mongoose.Schema.Types.Mixed },
    hero: { type: mongoose.Schema.Types.Mixed },
    sections: { type: [mongoose.Schema.Types.Mixed], default: [] },
    cta: { type: mongoose.Schema.Types.Mixed },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model('PageContent', pageContentSchema);
