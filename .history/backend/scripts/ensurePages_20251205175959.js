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
        // Create sensible defaults per page
        let sections = def.requiredKeys.map((key, idx) => ({ key, order: idx, type: 'paragraph', text: '' }));
        let eyebrow = '';
        let subtitle = '';
        let heroImage = '';

        if (def.slug === 'home') {
          eyebrow = 'Welcome';
          subtitle = 'Sabri Helpage — serving with compassion';
          heroImage = 'https://placehold.co/1200x500?text=Sabri+Helpage+Hero';
          sections = [
            { key: 'hero', order: 0, type: 'heading', level: 2, text: 'Together, we make a difference' },
            { key: 'stats', order: 1, type: 'list', items: ['10+ Programs', '5000+ Beneficiaries', '150+ Volunteers'] },
            { key: 'causes', order: 2, type: 'paragraph', text: 'Explore our core causes: Elderly Care, Girl Education, Mental Health, and more.' },
            { key: 'news', order: 3, type: 'paragraph', text: 'Latest updates and stories from our community.' },
            { key: 'footer', order: 4, type: 'paragraph', text: '© Sabri Helpage' },
          ];
        } else if (def.slug === 'about') {
          eyebrow = 'About Us';
          subtitle = 'Our mission and team';
          heroImage = 'https://placehold.co/1200x400?text=About+Us';
          sections = [
            { key: 'hero', order: 0, type: 'heading', level: 2, text: 'Who we are' },
            { key: 'mission', order: 1, type: 'paragraph', text: 'We strive to uplift communities through sustainable programs.' },
            { key: 'team', order: 2, type: 'paragraph', text: 'Meet our dedicated team and volunteers.' },
            { key: 'footer', order: 3, type: 'paragraph', text: 'Get in touch to learn more.' },
          ];
        } else if (def.slug === 'sociofare') {
          eyebrow = 'SocioFare';
          subtitle = 'Programs and initiatives';
          heroImage = 'https://placehold.co/1200x400?text=SocioFare';
          sections = [
            { key: 'hero', order: 0, type: 'heading', level: 2, text: 'Building better futures' },
            { key: 'programs', order: 1, type: 'paragraph', text: 'Our social welfare programs focus on education and care.' },
            { key: 'steps', order: 2, type: 'list', items: ['Assess needs', 'Plan programs', 'Measure impact'] },
            { key: 'cta', order: 3, type: 'cta', label: 'Donate Now', href: '/donate' },
            { key: 'footer', order: 4, type: 'paragraph', text: 'Thank you for your support.' },
          ];
        }

        await PageContent.create({ slug: def.slug, title: def.name, eyebrow, subtitle, heroImage, sections, status: 'published' });
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
