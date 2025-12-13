// Script to seed all 21 page configs into the Page model
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Page = require('../models/Page');

const pages = [
  // 1. About
  {
    name: 'About', slug: 'about', config: { hero: { title: 'About Us', subtitle: 'Our journey and mission', image: '/images/about-hero.jpg' }, sections: [ { type: 'mission', title: 'Our Mission', content: 'Text content...', icon: 'target' }, { type: 'vision', title: 'Our Vision', content: 'Text content...', icon: 'eye' } ], team: [ { name: 'Team Member', role: 'Role', image: '/images/team/member1.jpg', bio: 'Bio text...' } ], stats: [ { number: '50,000+', label: 'Lives Impacted', icon: 'users' } ] }
  },
  // 2. Contact
  {
    name: 'Contact', slug: 'contact', config: { hero: { title: 'Get in Touch', subtitle: "We'd love to hear from you", image: '/images/contact-hero.jpg' }, contactInfo: [ { type: 'email', icon: 'mail', value: 'contact@sabrihelpage.org', image: '/icons/email.svg' }, { type: 'phone', icon: 'phone', value: '+91 11 2345 6789', image: '/icons/phone.svg' }, { type: 'address', icon: 'map-pin', value: 'New Delhi, India', image: '/icons/location.svg', mapImage: '/images/map.jpg' } ], form: { fields: [ { name: 'name', type: 'text', placeholder: 'Your Name' } ], submitButton: { text: 'Send Message', icon: 'send' } } }
  },
  // 3. CSR Summit
  {
    name: 'CSR Summit', slug: 'csr-summit', config: { hero: { title: 'Annual CSR & Social Impact Summit 2024', subtitle: 'Join industry leaders...', backgroundImage: '/images/csr-summit/hero-bg.jpg', overlayImage: '/images/csr-summit/overlay.png' }, speakers: [ { name: 'Arvind Sharma', title: 'CSR Head, Tata Group', avatar: '/images/speakers/arvind-sharma.jpg', companyLogo: '/images/logos/tata.png' } ], agenda: [ { time: '9:00 AM', title: 'Registration', icon: 'calendar', speakerPhoto: null } ], gallery: [ { image: '/images/csr-summit/gallery1.jpg', caption: 'Previous summit photos' } ], sponsors: [ { name: 'Tata Group', logo: '/images/sponsors/tata.png', tier: 'platinum' } ] }
  },
  // 4. Education
  {
    name: 'Education', slug: 'education', config: { hero: { title: 'Transforming Lives Through Education', backgroundImage: '/images/education/hero-bg.jpg', overlayColor: '#00000080' }, programs: [ { title: 'Quality School Education', description: 'Description...', icon: 'book-open', image: '/images/education/school-program.jpg', features: [ { text: 'Feature 1', icon: 'check-circle' } ] } ], impact: [ { number: '25,000+', label: 'Students', icon: 'graduation-cap' } ], gallery: { images: [ { src: '/images/education/gallery1.jpg', alt: 'Classroom photo' } ], videos: [ { url: 'https://youtube.com/...', thumbnail: '/images/education/video-thumb.jpg' } ] } }
  },
  // 5. Elderly Care
  {
    name: 'Elderly Care', slug: 'elderly-care', content: { hero: { title: 'Caring for Our Senior Citizens', image: '/images/elderly/hero-image.jpg', background: '/images/elderly/hero-bg.jpg' }, services: [ { title: 'Daily Meal Service', description: 'Description...', icon: 'utensils', image: '/images/elderly/meal-service.jpg', features: [ { text: 'Nutritious meals', icon: 'check' } ] } ], stories: [ { name: 'Mr. Gupta', age: 78, story: 'Story text...', photo: '/images/elderly/stories/gupta.jpg', beforeAfter: { before: '/images/elderly/before.jpg', after: '/images/elderly/after.jpg' } } ], volunteers: [ { name: 'Volunteer Name', role: 'Role', photo: '/images/volunteers/volunteer1.jpg', quote: 'Quote text...' } ] }
  },
  // 6. Girl Education
  {
    name: 'Girl Education', slug: 'girl-education', config: { hero: { title: 'Educating Girls, Transforming Futures', image: '/images/girl-education/hero.jpg', icons: ['graduation-cap', 'female', 'book'] }, challenges: [ { title: 'Early Marriage', icon: 'ring', image: '/images/girl-education/challenge1.jpg', statIcon: 'percentage' } ], programs: [ { title: 'Back to School Initiative', icon: 'school', image: '/images/girl-education/program1.jpg', impactIcon: 'arrow-up' } ], successStories: [ { name: 'Anjali Sharma', photo: '/images/girl-education/success-anjali.jpg', beforePhoto: '/images/girl-education/before-anjali.jpg', afterPhoto: '/images/girl-education/after-anjali.jpg', achievementIcon: 'award' } ] }
  },
  // 7. ILC
  {
    name: 'ILC', slug: 'ilc', content: { hero: { title: 'International Learning Center', image: '/images/ilc/hero.jpg', background: '/images/ilc/background.jpg' }, focusAreas: [ { id: 'digital', name: 'Digital Skills', icon: 'monitor', image: '/images/ilc/digital-skills.jpg', modalImage: '/images/ilc/digital-modal.jpg' } ], courses: [ { name: 'Digital Skills Academy', icon: 'laptop', image: '/images/ilc/course-digital.jpg', certificateImage: '/images/ilc/certificate-digital.png' } ], facilities: [ { name: 'Digital Lab', image: '/images/ilc/facility-lab.jpg', icon: 'cpu' } ], success: [ { name: 'Rahul Kumar', photo: '/images/ilc/success-rahul.jpg', courseIcon: 'graduation-cap', companyLogo: '/images/logos/company1.png' } ] }
  },
  // 8. Internship
  {
    name: 'Internship', slug: 'internship', config: { hero: { title: 'Internship Opportunities', image: '/images/internship/hero.jpg', background: '/images/internship/bg.jpg' }, opportunities: [ { role: 'Social Media Intern', department: 'Communications', icon: 'share-2', departmentIcon: 'message-circle', image: '/images/internship/social-media.jpg' } ], benefits: [ { title: 'Certificate', icon: 'award', image: '/images/internship/benefit-certificate.jpg' } ], testimonials: [ { name: 'Previous Intern', photo: '/images/internship/testimonial1.jpg', roleIcon: 'briefcase', universityLogo: '/images/logos/university1.png' } ], form: { submitButton: { icon: 'send', loadingIcon: 'loader' } } }
  },
  // 9. Mental Health
  {
    name: 'Mental Health', slug: 'mental-health', config: { hero: { title: 'Mental Health Awareness & Support', image: '/images/mental-health/hero.jpg', icon: 'brain' }, services: [ { title: 'Community Counseling', icon: 'users', image: '/images/mental-health/counseling.jpg', locationImages: ['/images/mental-health/location1.jpg', '/images/mental-health/location2.jpg'] } ], workshops: [ { title: 'Stress Management', icon: 'wind', image: '/images/mental-health/workshop-stress.jpg', materials: [ { name: 'Worksheet', icon: 'file-text', image: '/images/mental-health/worksheet.jpg' } ] } ], team: [ { name: 'Dr. Anjali Mehta', photo: '/images/mental-health/team-anjali.jpg', qualificationIcon: 'graduation-cap', specializationIcon: 'heart' } ] }
  },
  // 10. Sociofare
  {
    name: 'Sociofare', slug: 'sociofare', content: { hero: { title: 'Sociofare Programs', image: '/images/sociofare/hero.jpg', background: '/images/sociofare/bg-pattern.png' }, programs: [ { title: 'Sustainable Livelihood', icon: 'briefcase', image: '/images/sociofare/livelihood.jpg', impactImages: ['/images/sociofare/impact1.jpg', '/images/sociofare/impact2.jpg'] } ], successStories: [ { title: 'Self-Help Group Success', icon: 'users', image: '/images/sociofare/success-group.jpg', memberPhotos: ['/images/sociofare/member1.jpg', '/images/sociofare/member2.jpg'] } ], partners: [ { name: 'Corporate Partner', logo: '/images/partners/partner1.png', typeIcon: 'handshake' } ] }
  },
  // 11. Stories
  {
    name: 'Stories', slug: 'stories', config: { hero: { title: 'Success Stories', image: '/images/stories/hero.jpg', icon: 'book-open' }, categories: [ { name: 'Education', icon: 'graduation-cap', image: '/images/stories/category-education.jpg' } ], stories: [ { id: 'story1', title: 'From Dropout to Graduate', category: 'Education', heroImage: '/images/stories/story1-hero.jpg', contentImages: ['/images/stories/story1-img1.jpg', '/images/stories/story1-img2.jpg'], person: { name: 'Sunil Kumar', photo: '/images/stories/person-sunil.jpg', beforePhoto: '/images/stories/before-sunil.jpg', afterPhoto: '/images/stories/after-sunil.jpg' }, icons: { location: 'map-pin', age: 'calendar', achievement: 'award' } } ], formats: [ { type: 'Video Stories', icon: 'video', thumbnail: '/images/stories/video-thumb.jpg' } ] }
  },
  // 12. Awards
  {
    name: 'Awards', slug: 'awards', config: { hero: { title: 'Awards & Recognition', image: '/images/awards/hero.jpg', icon: 'trophy' }, awards: [ { id: 'award1', title: 'Best NGO for Community Development', organization: 'National NGO Excellence Awards', year: '2023', icon: '🏆', awardImage: '/images/awards/award1.jpg', certificateImage: '/images/awards/certificate1.jpg', organizationLogo: '/images/awards/org-logo1.png', eventPhotos: ['/images/awards/event1.jpg', '/images/awards/event2.jpg'] } ], categories: [ { name: 'National', icon: 'flag', image: '/images/awards/category-national.jpg' } ] }
  },
  // 13. Blog
  {
    name: 'Blog', slug: 'blog', config: { hero: { title: 'Our Blog', image: '/images/blog/hero.jpg', icon: 'file-text' }, posts: [ { id: 'blog1', title: 'How Our Education Program Transformed a Remote Village', excerpt: 'Excerpt text...', date: '2023-11-15', author: 'Priya Sharma', category: 'Education', featuredImage: '/images/blog/featured1.jpg', authorImage: '/images/blog/authors/priya.jpg', categoryIcon: 'book-open', contentImages: ['/images/blog/content1.jpg', '/images/blog/content2.jpg'], gallery: ['/images/blog/gallery1.jpg', '/images/blog/gallery2.jpg'] } ], categories: [ { name: 'Education', icon: 'graduation-cap', image: '/images/blog/category-education.jpg' } ] }
  },
  // 14. FAQ
  {
    name: 'FAQ', slug: 'faq', config: { hero: { title: 'Frequently Asked Questions', image: '/images/faq/hero.jpg', icon: 'help-circle' }, categories: [ { name: 'General Information', icon: 'info', image: '/images/faq/category-general.jpg' } ], faqs: [ { id: 'faq1', question: 'What does Sabri Helpage do?', answer: 'Answer text...', category: 'General', icon: 'question-circle', helpfulImages: ['/images/faq/helpful1.jpg', '/images/faq/helpful2.jpg'] } ], contactPrompt: { image: '/images/faq/contact.jpg', icon: 'mail' } }
  },
  // 15. Gallery
  {
    name: 'Gallery', slug: 'gallery', config: { hero: { title: 'Photo Gallery', image: '/images/gallery/hero.jpg', icon: 'image' }, albums: [ { id: 'album1', title: 'Education Programs', description: 'Photos from our education work', coverImage: '/images/gallery/education/cover.jpg', images: [ { url: '/images/gallery/education/image1.jpg', caption: 'Classroom activities', thumbnail: '/images/gallery/education/thumb1.jpg', eventId: 'event1', eventImage: '/images/events/event1.jpg' } ], event: { title: 'Education Event', images: ['/images/events/edu1.jpg', '/images/events/edu2.jpg'] } } ], featured: [ { image: '/images/gallery/featured1.jpg', caption: 'Featured moment', thumbnail: '/images/gallery/featured1-thumb.jpg' } ], events: [ { id: 'event1', title: 'School Opening', images: ['/images/events/school-opening1.jpg', '/images/events/school-opening2.jpg'], coverImage: '/images/events/school-opening-cover.jpg' } ] }
  },
  // 16. Privacy
  {
    name: 'Privacy', slug: 'privacy', content: { hero: { title: 'Privacy Policy', image: '/images/privacy/hero.jpg', icon: 'shield' }, sections: [ { title: 'Information We Collect', icon: 'database', image: '/images/privacy/collect.jpg', content: 'Content text...' }, { title: 'How We Use Your Information', icon: 'settings', image: '/images/privacy/usage.jpg', content: 'Content text...' } ], contact: { image: '/images/privacy/contact.jpg', icon: 'mail' } }
  },
  // 17. Publications
  {
    name: 'Publications', slug: 'publications', config: { hero: { title: 'Publications & Reports', image: '/images/publications/hero.jpg', icon: 'file-text' }, categories: [ { name: 'Annual Reports', icon: 'book-open', image: '/images/publications/annual-reports.jpg', coverImage: '/images/publications/annual-cover.jpg' } ], publications: [ { id: 'pub1', title: 'Annual Report 2022-2023', type: 'PDF', icon: '📄', coverImage: '/images/publications/report-2023-cover.jpg', thumbnail: '/images/publications/report-2023-thumb.jpg', previewImages: ['/images/publications/report-preview1.jpg', '/images/publications/report-preview2.jpg'], fileUrl: '/publications/annual-report-2023.pdf', fileIcon: 'download' } ], partners: [ { name: 'Research Partner', logo: '/images/partners/research-partner.png', icon: 'handshake' } ] }
  },
  // 18. Terms
  {
    name: 'Terms', slug: 'terms', content: { hero: { title: 'Terms of Use', image: '/images/terms/hero.jpg', icon: 'file-text' }, sections: [ { title: 'Acceptance of Terms', icon: 'check-circle', image: '/images/terms/acceptance.jpg', content: 'Content text...' }, { title: 'Intellectual Property', icon: 'copyright', image: '/images/terms/ip.jpg', content: 'Content text...' } ], legal: { image: '/images/terms/legal.jpg', icon: 'scale' } }
  },
  // 19. Volunteer
  {
    name: 'Volunteer', slug: 'volunteer', config: { hero: { title: 'Volunteer Opportunities', image: '/images/volunteer/hero.jpg', icon: 'users' }, opportunities: [ { type: 'On-Site', icon: 'map-pin', image: '/images/volunteer/onsite.jpg', roles: [ { name: 'Teaching', icon: 'book-open', image: '/images/volunteer/teaching.jpg' } ] } ], currentOpenings: [ { role: 'Math Tutor', icon: 'calculator', image: '/images/volunteer/tutor.jpg', locationImage: '/images/volunteer/location-school.jpg' } ], benefits: [ { title: 'Certificate', icon: 'award', image: '/images/volunteer/benefit-certificate.jpg' } ], testimonials: [ { name: 'Previous Volunteer', photo: '/images/volunteer/testimonial1.jpg', roleIcon: 'briefcase', quoteIcon: 'quote' } ] }
  },
  // 20. News
  {
    name: 'News', slug: 'news', config: { hero: { title: 'News & Updates', image: '/images/news/hero.jpg', icon: 'newspaper' }, categories: [ { name: 'Events', icon: 'calendar', image: '/images/news/category-events.jpg' } ], featuredNews: [ { id: 'news1', title: 'National Education Award 2023', excerpt: 'Excerpt text...', category: 'Achievements', date: '2023-12-15', featuredImage: '/images/news/featured1.jpg', categoryIcon: 'award', gallery: ['/images/news/gallery1.jpg', '/images/news/gallery2.jpg'], author: { name: 'Author', image: '/images/news/authors/author1.jpg' } } ], archives: [ { year: '2023', icon: 'calendar', coverImage: '/images/news/2023-cover.jpg' } ] }
  },
  // 21. Home
  {
    name: 'Home', slug: 'home', config: { hero: { title: 'Creating Sustainable Change', subtitle: 'Empowering communities since 2010', backgroundImage: '/images/home/hero-bg.jpg', overlayImage: '/images/home/hero-overlay.png', ctas: [ { text: 'Donate Now', icon: 'heart', image: '/images/home/donate-button.jpg' }, { text: 'Volunteer', icon: 'users', image: '/images/home/volunteer-button.jpg' } ] }, stats: [ { number: '50,000+', label: 'Lives Impacted', icon: 'users', iconImage: '/images/icons/users.svg' } ], featuredPrograms: [ { title: 'Education', description: 'Quality education for children', icon: 'book-open', image: '/images/home/program-education.jpg', programImages: ['/images/home/edu1.jpg', '/images/home/edu2.jpg'] } ], latestStories: [ { title: 'Success Story', excerpt: 'Excerpt...', image: '/images/home/story1.jpg', categoryIcon: 'award' } ], upcomingEvents: [ { title: 'CSR Summit 2024', date: 'March 15-16', image: '/images/home/event-csr.jpg', icon: 'calendar' } ], partners: [ { name: 'Partner', logo: '/images/partners/partner1.png', icon: 'handshake' } ] }
  }
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
