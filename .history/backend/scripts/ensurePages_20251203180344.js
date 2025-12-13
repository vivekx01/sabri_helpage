require('dotenv').config();
const mongoose = require('mongoose');
const PageContent = require('../models/PageContent');
const { pages: PAGE_REGISTRY } = require('../config/adminPages');

(async () => {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/sabrihelpage';
    await mongoose.connect(uri);
    console.log('✅ Connected to Mongo');

    for (const def of PAGE_REGISTRY) {
      const existing = await PageContent.findOne({ slug: def.slug });
      if (!existing) {
        const sections = def.requiredKeys.map((key, idx) => ({ key, order: idx, type: 'paragraph', text: '' }));
        await PageContent.create({ slug: def.slug, title: def.name, sections, status: 'published' });
        console.log(`➕ Created page: ${def.slug}`);
      } else {
        // Ensure required keys exist
        const keys = new Set((existing.sections || []).map(s => s.key));
        let order = existing.sections?.length || 0;
        const toAdd = [];
        for (const key of def.requiredKeys) {
          if (!keys.has(key)) {
            toAdd.push({ key, order: order++, type: 'paragraph', text: '' });
          }
        }
        if (toAdd.length) {
          existing.sections = [...(existing.sections || []), ...toAdd];
          await existing.save();
          console.log(`🛠️  Updated sections for: ${def.slug}`);
        } else {
          console.log(`✔️  Page up-to-date: ${def.slug}`);
        }
      }
    }

    console.log('🎉 Pages ensured');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed ensuring pages:', err.message);
    process.exit(1);
  }
})();
