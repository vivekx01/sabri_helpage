require('dotenv').config();
const mongoose = require('mongoose');
const Teacher = require('./models/Teacher');
const PageContent = require('./models/PageContent');
const CauseContent = require('./models/CauseContent');
const Testimonial = require('./models/Testimonial');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ngo-db';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const seedTeachers = async () => {
  try {
    // Check if data already exists
    const count = await Teacher.countDocuments();
    
    if (count > 0) {
      console.log('Teachers collection already has data. Skipping seed.');
      return;
    }

    const teachers = [
      { name: 'Aisha Khan' },
      { name: 'Rohan Mehta' },
      { name: 'Sana Patel' },
      { name: 'Vikram Singh' },
      { name: 'Priya Sharma' },
    ];

    await Teacher.insertMany(teachers);
    console.log(`Successfully seeded ${teachers.length} teachers`);
  } catch (error) {
    console.error('Error seeding teachers:', error.message);
  }
};

const seedPageContent = async () => {
  const exists = await PageContent.findOne({ slug: 'about' });
  if (exists) { console.log('About content exists. Skipping.'); return; }
  await PageContent.create({
    slug: 'about',
    title: 'About',
    subtitle: 'Founding, purpose and governing body',
    sections: [
      { type: 'paragraph', text: 'Sabri Helpage was founded in 2013 and is based in Kolkata, India. Its simple goal is to bring dignity, care, and emotional support to communities that are often ignored. Over time, it has become a caring social project that focuses on three main areas: mental health, caring for the elderly, and educating girls.' },
      { type: 'paragraph', text: "Sabri Helpage works at the grassroots level, helping families in need and villages that are hard to reach where there isn't much information or help. Sabri Helpage keeps making a difference by running counselling camps, programs for emotional well-being, help for seniors, and programs that promote education and empowerment for young girls." },
      { type: 'paragraph', text: 'What started as a sincere effort has now become a dependable source of support for many. Sabri Helpage is dedicated to making society more knowledgeable, emotionally strong, and welcoming, one life at a time.' },
    ],
    status: 'published',
  });
  console.log('Seeded About PageContent');
};

const seedCauseContent = async () => {
  const causes = [
    {
      slug: 'mental-health',
      title: 'Mental Health',
      subtitle: 'Awareness, support, and care',
      bannerImage: '',
      contentBlocks: [
        { type: 'heading', text: 'Our Programs for Mental Health' },
        { type: 'paragraph', text: 'Sabri Helpage thinks that mental health is an important part of being healthy. We are dedicated to putting mental health in the spotlight with care and purpose at a time when emotional problems are often hidden by fear, stigma, or a lack of understanding.' },
        { type: 'list', text: 'Support Pathways', items: ['Podcast Conversations', 'One-on-one interactions'] },
      ],
      status: 'published',
    },
    {
      slug: 'elderly-care',
      title: 'Elderly Care & Dignity',
      subtitle: 'Safety, dignity, and access to care',
      bannerImage: '',
      contentBlocks: [
        { type: 'heading', text: 'Programs for Seniors' },
        { type: 'paragraph', text: 'We support abandoned seniors with medical camps, legal aid, and essential supplies.' },
      ],
      status: 'published',
    },
    {
      slug: 'girl-education',
      title: 'Girl Child & Education',
      subtitle: 'Education and empowerment',
      bannerImage: '',
      contentBlocks: [
        { type: 'heading', text: "Helping Girls Get an Education" },
        { type: 'paragraph', text: 'We ensure girls in need get regular help with schoolwork, supplies, and guidance.' },
      ],
      status: 'published',
    },
  ];

  for (const c of causes) {
    const exists = await CauseContent.findOne({ slug: c.slug });
    if (exists) { console.log(`Cause ${c.slug} exists. Skipping.`); continue; }
    await CauseContent.create(c);
    console.log(`Seeded CauseContent: ${c.slug}`);
  }
};

const seedTestimonials = async () => {
  const count = await Testimonial.countDocuments();
  if (count > 0) { console.log('Testimonials exist. Skipping.'); return; }
  await Testimonial.insertMany([
    { name: 'Rohan Sharma', title: 'Former Intern', quote: 'The experience was life-changing. I loved the emphasis on elderly care and mental health.', rating: 5, initials: 'RS', order: 1 },
    { name: 'Priya Verma', title: 'Donor', quote: "I'm proud to support an organization with such transparency and focus on girl child education.", rating: 5, initials: 'PV', order: 2 },
    { name: 'Dr. Alok Gupta', title: 'Partner NGO', quote: 'Our collaboration on mental health initiatives has been immensely successful and rewarding.', rating: 5, initials: 'AG', order: 3 },
  ]);
  console.log('Seeded testimonials');
};

const runSeed = async () => {

    await connectDB();
  await seedTeachers();
    await seedPageContent();
    await seedCauseContent();
    await seedTestimonials();
  await mongoose.disconnect();
  console.log('Seeding complete');
  process.exit(0);
};

runSeed();
