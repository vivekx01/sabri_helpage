// Seeds MongoDB PageContent documents using defaults aligned to frontend pages structure
// Run with: node backend/scripts/seedPagesFromSchema.js

const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sabrihelpage';

// Minimal PageContent model inline to avoid imports ambiguity
const pageContentSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  meta: { type: Object },
  header: { type: Object },
  hero: { type: Object },
  sections: { type: Array },
  cta: { type: Object }
}, { timestamps: true, strict: false });

const PageContent = mongoose.model('PageContent', pageContentSchema);

function defaultsFor(slug) {
  switch (slug) {
    case 'home':
      return {
        name: 'Home',
        meta: { title: 'Sabri Helpage', description: 'Serving society with compassion' },
        header: { title: 'Serving society for more than a decade.', subtitle: 'Compassionate action' },
        hero: { backgroundImage: '/images/hero.jpg', headline: 'More than a decade', primaryCta: { text: 'Read More', route: 'about' }, secondaryCta: { text: 'Support Us', route: 'donate' } },
        sections: [
          { type: 'milestones', stats: [{ label: 'People Helped', value: '75.5K' }, { label: 'Happy Lives', value: '34.2K' }, { label: 'Locations', value: '57.4' }], video: { youtubeId: 'VIDEO_ID', title: 'Sabri Helpage Story' } },
          { type: 'coreCauses', causes: [
            { title: 'Mental Health', route: 'mental-health', image: '/images/mental.jpg', blurb: 'Resources and advocacy across the country.' },
            { title: 'Elderly Care', route: 'elderly-care', image: '/images/elderly.jpg', blurb: 'Dignity and care for seniors.' },
            { title: 'Girl Education', route: 'girl-education', image: '/images/girl.jpg', blurb: 'Empowerment through education.' }
          ]},
          { type: 'supporters', items: ['Google', 'Microsoft', 'Tata Trusts', 'Reliance Foundation', 'HDFC Bank'] },
          { type: 'testimonials', items: [] },
          { type: 'stories', items: [] }
        ],
        cta: { donateRoute: 'donate' }
      };
    case 'about':
      return {
        name: 'About',
        meta: { title: 'About Sabri Helpage', description: 'Founding, purpose and governing body' },
        header: { title: 'About', subtitle: 'Founding, purpose and governing body' },
        sections: [
          { type: 'paragraph', text: 'Sabri Helpage was founded in 2013 and is based in Kolkata, India...' },
          { type: 'paragraph', text: 'Sabri Helpage works at the grassroots level...' }
        ],
        sectionsGoverning: [
          { name: 'Aarti BR Singh', paragraphs: ['Founder of Sabri Helpage...', 'Leadership and impact...'] }
        ]
      };
    case 'sociofare':
      return {
        name: 'Sociofare',
        meta: { title: 'Sociofare', description: 'Community initiatives and outcomes' },
        header: { title: 'Sociofare', subtitle: 'Community initiatives' },
        sections: [
          { type: 'intro', paragraphs: ['We run initiatives to support communities.'] },
          { type: 'initiatives', items: [{ title: 'Food Drive', description: 'Weekly ration support', image: '/images/food.jpg' }] },
          { type: 'outcomes', stats: [{ label: 'Families Supported', value: '5,000+' }] }
        ]
      };
    default:
      return { name: slug[0].toUpperCase() + slug.slice(1) };
  }
}

async function run() {
  const slugs = ['home', 'about', 'sociofare', 'mental-health', 'elderly-care', 'girl-education', 'publications', 'blog', 'stories', 'gallery', 'awards', 'events', 'donate', 'internship', 'ilc', 'contact', 'terms', 'privacy', 'our-causes'];
  await mongoose.connect(MONGO_URI);
  for (const slug of slugs) {
    const def = defaultsFor(slug);
    const existing = await PageContent.findOne({ slug });
    if (existing) {
      await PageContent.updateOne({ slug }, { $set: def });
      console.log(`Updated ${slug}`);
    } else {
      await PageContent.create({ slug, ...def });
      console.log(`Seeded ${slug}`);
    }
  }
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });
