// Script to seed all 21 page configs into the Page model
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Page = require('../models/Page');

const pages = [
  {
    name: 'About',
    slug: 'about',
    config: {
      hero: { title: 'About Us', subtitle: 'Our journey and mission', image: '/images/about-hero.jpg' },
      sections: [
        { type: 'mission', title: 'Our Mission', content: 'Text content...', icon: 'target' },
        { type: 'vision', title: 'Our Vision', content: 'Text content...', icon: 'eye' }
      ],
      team: [
        { name: 'Team Member', role: 'Role', image: '/images/team/member1.jpg', bio: 'Bio text...' }
      ],
      stats: [
        { number: '50,000+', label: 'Lives Impacted', icon: 'users' }
      ]
    }
  },
  {
    name: 'Contact',
    slug: 'contact',
    hero: { title: "Get in Touch", subtitle: "We'd love to hear from you", image: "/images/contact-hero.jpg" },
    contactInfo: [
      { type: 'email', icon: 'mail', value: 'contact@sabrihelpage.org', image: '/icons/email.svg' },
      { type: 'phone', icon: 'phone', value: '+91 11 2345 6789', image: '/icons/phone.svg' },
      { type: 'address', icon: 'map-pin', value: 'New Delhi, India', image: '/icons/location.svg', mapImage: '/images/map.jpg' }
    ],
    form: {
      fields: [ { name: 'name', type: 'text', placeholder: 'Your Name' } ],
      submitButton: { text: 'Send Message', icon: 'send' }
    }
  },
  // ... (Add all other 19 page configs here, following the same structure as above)
];

async function seed() {
  await connectDB();
  await Page.deleteMany({});
  await Page.insertMany(pages);
  console.log('Seeded all 21 pages!');
  mongoose.connection.close();
}

seed();
const mongoose = require('mongoose');
const Page = require('../models/Page');
require('dotenv').config();

const seedPages = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sabrihelpage');
    console.log('✅ Connected to MongoDB');

    // Clear existing pages
    await Page.deleteMany({});
    console.log('🗑️  Cleared existing pages');

    // Create all 21 pages
    const pages = [
      // ... (all page objects from your provided code)
    ];

    // Insert all pages
    const result = await Page.insertMany(pages);
    
    console.log(`✅ Successfully seeded ${result.length} pages:`);
    result.forEach(page => {
      console.log(`   - ${page.name} (${page.slug})`);
    });
    
    // Show summary
    const publishedCount = result.filter(p => p.status === 'published').length;
    const draftCount = result.filter(p => p.status === 'draft').length;
    
    console.log(`\n📊 Summary: ${publishedCount} published, ${draftCount} draft`);
    console.log('🎉 Database seeding completed successfully!');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedPages();
