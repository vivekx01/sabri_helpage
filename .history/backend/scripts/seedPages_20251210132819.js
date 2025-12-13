
import mongoose from 'mongoose';
import Page from '../models/Page.js';
import dotenv from 'dotenv';
dotenv.config();

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
