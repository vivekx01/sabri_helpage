import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: String, // 'SEO', 'Hero', 'RichText', 'CardGrid', etc.
  title: String,
  order: { type: Number, default: 0 },
  
  fields: {
    // SEO fields
    title: String,
    description: String,
    og_image: String,
    
    // Hero fields
    subtitle: String,
    background_image: String,
    cta_label: String,
    cta_link: String,
    overlay: Boolean,
    
    // Rich Text fields
    body_html: String,
    images: [String],
    
    // List fields
    stats_list: [mongoose.Schema.Types.Mixed],
    cards_list: [mongoose.Schema.Types.Mixed],
    items_list: [mongoose.Schema.Types.Mixed],
    features_list: [mongoose.Schema.Types.Mixed],
    timeline_items: [mongoose.Schema.Types.Mixed],
    logos_list: [String],
    faq_items: [mongoose.Schema.Types.Mixed],
    links_list: [mongoose.Schema.Types.Mixed],
    
    // Media fields
    media: String,
    media_list: [String],
    caption: String,
    captions: [String],
    alignment: String,
    
    // CTA fields
    button_label: String,
    button_link: String,
    
    // Form fields
    form_fields: [mongoose.Schema.Types.Mixed],
    submit_endpoint: String,
    
    // Contact fields
    address: String,
    phone: String,
    email: String,
    map_coordinates: String,
    whatsapp: String,
    
    // Bank/Donation fields
    account_info: String,
    
    // Collection source
    source_collection: String,
    
    // Any custom data
    customData: mongoose.Schema.Types.Mixed
  },
  
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  }
  
}, { _id: false });

const PageSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  
  name: {
    type: String,
    required: true
  },
  
  title: String,
  subtitle: String,
  description: String,
  
  sections: [SectionSchema],
  
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  
  publishedAt: Date,
  
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  
}, { timestamps: true });

export default mongoose.model('Page', PageSchema);
