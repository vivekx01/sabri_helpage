const mongoose = require('mongoose');
const Page = require('../models/pageModel');

const allPages = [
  {
    name: 'About',
    slug: 'about',
    pageTitle: 'About Us - Sabri Helpage',
    heroTitle: 'About Sabri Helpage',
    heroContent: 'We are a non-profit organization dedicated to creating positive change in communities...',
    sections: [
      {
        title: 'Our Mission',
        content: 'To empower communities through sustainable development programs...',
        type: 'content'
      },
      {
        title: 'Our Vision',
        content: 'A world where every individual has access to education, healthcare, and opportunities...',
        type: 'content'
      }
    ],
    status: 'published'
  },
  {
    name: 'Contact',
    slug: 'contact',
    pageTitle: 'Contact Us - Sabri Helpage',
    heroTitle: 'Get in Touch',
    heroContent: 'We would love to hear from you...',
    sections: [
      {
        title: 'Contact Information',
        content: 'Email: contact@sabrihelpage.org\nPhone: +1 234 567 8900',
        type: 'content'
      }
    ],
    status: 'published'
  },
  {
    name: 'Awards',
    slug: 'awards',
    pageTitle: 'Awards & Recognition',
    heroTitle: 'Our Awards',
    heroContent: 'Recognitions celebrating our impact and partners...',
    awards: [
      {
        title: 'Best NGO 2023',
        organization: 'Global NGO Forum',
        description: 'Awarded for excellence in community development',
        year: '2023'
      }
    ],
    status: 'published'
  },
  {
    name: 'Blog',
    slug: 'blog',
    pageTitle: 'Blog - Sabri Helpage',
    heroTitle: 'Our Blog',
    heroContent: 'Stories and updates from our work...',
    blogs: [
      {
        title: 'First Blog Post',
        excerpt: 'This is our first blog post...',
        content: 'Full content here...',
        author: 'Admin',
        date: new Date()
      }
    ],
    status: 'published'
  },
  {
    name: 'CSRSummit',
    slug: 'csr-summit',
    pageTitle: 'CSR Summit - Sabri Helpage',
    heroTitle: 'CSR Summit',
    heroContent: 'Corporate Social Responsibility events and initiatives...',
    sections: [
      {
        title: 'About the Summit',
        content: 'Our annual CSR Summit brings together corporate leaders...',
        type: 'content'
      }
    ],
    status: 'published'
  },
  {
    name: 'Education',
    slug: 'education',
    pageTitle: 'Education Programs - Sabri Helpage',
    heroTitle: 'Education Initiatives',
    heroContent: 'Empowering communities through education...',
    sections: [
      {
        title: 'Our Programs',
        content: 'We offer various educational programs...',
        type: 'content'
      }
    ],
    status: 'published'
  },
  {
    name: 'ElderlyCare',
    slug: 'elderly-care',
    pageTitle: 'Elderly Care - Sabri Helpage',
    heroTitle: 'Elderly Care Programs',
    heroContent: 'Supporting our elderly community members...',
    sections: [
      {
        title: 'Our Services',
        content: 'Comprehensive care for the elderly...',
        type: 'content'
      }
    ],
    status: 'published'
  },
  {
    name: 'GirlEducation',
    slug: 'girl-education',
    pageTitle: 'Girl Education - Sabri Helpage',
    heroTitle: 'Girl Education Initiative',
    heroContent: 'Empowering girls through education...',
    sections: [
      {
        title: 'Our Mission',
        content: 'Ensuring every girl has access to quality education...',
        type: 'content'
      }
    ],
    status: 'published'
  },
  {
    name: 'Home',
    slug: 'home',
    pageTitle: 'Home - Sabri Helpage',
    heroTitle: 'Welcome to Sabri Helpage',
    heroContent: 'Making a difference in communities worldwide...',
    sections: [
      {
        title: 'Our Impact',
        content: 'We have helped thousands of people...',
        type: 'content'
      }
    ],
    status: 'published'
  },
  {
    name: 'ILC',
    slug: 'ilc',
    pageTitle: 'ILC - Sabri Helpage',
    heroTitle: 'International Learning Center',
    heroContent: 'Global education and learning opportunities...',
    sections: [
      {
        title: 'About ILC',
        content: 'Our international learning center offers...',
        type: 'content'
      }
    ],
    status: 'published'
  },
  {
    name: 'Internship',
    slug: 'internship',
    pageTitle: 'Internship Program - Sabri Helpage',
    heroTitle: 'Internship Opportunities',
    heroContent: 'Join our team and make a difference...',
    sections: [
      {
        title: 'Program Details',
        content: 'Our internship program offers...',
        type: 'content'
      }
    ],
    status: 'published'
  },
  {
    name: 'MentalHealth',
    slug: 'mental-health',
    pageTitle: 'Mental Health - Sabri Helpage',
    heroTitle: 'Mental Health Support',
    heroContent: 'Supporting mental health and wellbeing...',
    sections: [
      {
        title: 'Our Services',
        content: 'Comprehensive mental health support...',
        type: 'content'
      }
    ],
    status: 'published'
  },
  {
    name: 'News',
    slug: 'news',
    pageTitle: 'News - Sabri Helpage',
    heroTitle: 'Latest News',
    heroContent: 'Stay updated with our latest activities...',
    sections: [
      {
        title: 'Recent Updates',
        content: 'Latest news and announcements...',
        type: 'content'
      }
    ],
    status: 'published'
  },
  {
    name: 'Sociofare',
    slug: 'sociofare',
    pageTitle: 'Sociofare - Sabri Helpage',
    heroTitle: 'Social Welfare Programs',
    heroContent: 'Comprehensive social welfare initiatives...',
    sections: [
      {
        title: 'Our Programs',
        content: 'Various social welfare programs...',
        type: 'content'
      }
    ],
    status: 'published'
  },
  {
    name: 'Stories',
    slug: 'stories',
    pageTitle: 'Success Stories - Sabri Helpage',
    heroTitle: 'Success Stories',
    heroContent: 'Inspiring stories of impact and change...',
    sections: [
      {
        title: 'Impact Stories',
        content: 'Real stories of transformation...',
        type: 'content'
      }
    ],
    status: 'published'
  },
  {
    name: 'FAQ',
    slug: 'faq',
    pageTitle: 'FAQ - Sabri Helpage',
    heroTitle: 'Frequently Asked Questions',
    heroContent: 'Find answers to common questions...',
    faqs: [
      {
        question: 'How can I get involved?',
        answer: 'You can volunteer, donate, or participate in our programs.',
        category: 'general'
      }
    ],
    status: 'published'
  },
  {
    name: 'Gallery',
    slug: 'gallery',
    pageTitle: 'Gallery - Sabri Helpage',
    heroTitle: 'Photo Gallery',
    heroContent: 'Images from our work and events...',
    events: [
      {
        title: 'Gallery',
        images: []
      }
    ],
    status: 'published'
  },
  {
    name: 'Privacy',
    slug: 'privacy',
    pageTitle: 'Privacy Policy - Sabri Helpage',
    heroTitle: 'Privacy Policy',
    heroContent: 'How we protect your privacy...',
    sections: [
      {
        title: 'Privacy Policy',
        content: 'Our privacy policy details...',
        type: 'content'
      }
    ],
    status: 'published'
  },
  {
    name: 'Publications',
    slug: 'publications',
    pageTitle: 'Publications - Sabri Helpage',
    heroTitle: 'Our Publications',
    heroContent: 'Reports, research, and publications...',
    publications: [
      {
        title: 'Annual Report 2023',
        type: 'Report',
        description: 'Our annual impact report',
        date: new Date()
      }
    ],
    status: 'published'
  },
  {
    name: 'Terms',
    slug: 'terms',
    pageTitle: 'Terms of Service - Sabri Helpage',
    heroTitle: 'Terms of Service',
    heroContent: 'Terms and conditions for using our services...',
    sections: [
      {
        title: 'Terms of Service',
        content: 'Our terms of service...',
        type: 'content'
      }
    ],
    status: 'published'
  },
  {
    name: 'Volunteer',
    slug: 'volunteer',
    pageTitle: 'Volunteer - Sabri Helpage',
    heroTitle: 'Become a Volunteer',
    heroContent: 'Join our volunteer community...',
    sections: [
      {
        title: 'Volunteer Opportunities',
        content: 'Various ways to volunteer...',
        type: 'content'
      }
    ],
    status: 'published'
  }
];

const seedPages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing pages
    await Page.deleteMany({});

    // Insert all pages
    for (const pageData of allPages) {
      const page = new Page(pageData);
      await page.save();
      console.log(`Created: ${page.name}`);
    }

    console.log('✅ All 21 pages created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating pages:', error);
    process.exit(1);
  }
};

seedPages();
