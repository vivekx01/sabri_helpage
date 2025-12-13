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
      {
        slug: 'home',
        title: 'Home',
        header: 'Welcome to Sabri Helpage',
        sections: [
          {
            type: 'hero',
            content: {
              title: 'Serving Humanity Through Comprehensive Welfare Programs',
              subtitle: 'Dedicated to serving humanity through comprehensive welfare programs for the elderly, women, and children.',
              image: '/HeroSection.jpg',
              cta: {
                text: 'Learn More',
                link: '/about'
              }
            }
          },
          {
            type: 'stats',
            content: {
              title: 'Our Impact',
              stats: [
                { number: '5000+', label: 'Lives Touched' },
                { number: '50+', label: 'Projects Completed' },
                { number: '100+', label: 'Volunteers' },
                { number: '10+', label: 'Years of Service' }
              ]
            }
          },
          {
            type: 'causes',
            content: {
              title: 'Our Causes',
              causes: [
                {
                  title: 'Mental Health Awareness',
                  description: 'Supporting mental health initiatives and providing counseling services.',
                  image: '/MentalHealth.jpg',
                  link: '/mental-health'
                },
                {
                  title: 'Elderly Care & Dignity',
                  description: 'Comprehensive care programs for senior citizens.',
                  image: '/elderlyCareImg.jpg',
                  link: '/elderly-care'
                },
                {
                  title: 'Girl Child & Education',
                  description: 'Empowering girls through education and skill development.',
                  image: '/girlChildEducation.jpg',
                  link: '/girl-education'
                }
              ]
            }
          },
          {
            type: 'testimonials',
            content: {
              title: 'What People Say',
              testimonials: [
                {
                  name: 'John Doe',
                  role: 'Beneficiary',
                  content: 'Sabri Helpage has transformed my life through their elderly care program.',
                  image: '/testimonial1.jpg'
                },
                {
                  name: 'Jane Smith',
                  role: 'Volunteer',
                  content: 'Being part of this organization has been incredibly rewarding.',
                  image: '/testimonial2.jpg'
                }
              ]
            }
          }
        ],
        meta: {
          description: 'Sabri Helpage - Serving humanity through comprehensive welfare programs for the elderly, women, and children.',
          keywords: ['charity', 'welfare', 'elderly care', 'education', 'mental health']
        }
      },
      {
        slug: 'about',
        title: 'About Us',
        header: 'About Sabri Helpage',
        sections: [
          {
            type: 'text',
            content: {
              title: 'Our Mission',
              text: 'Sabri Helpage is dedicated to serving humanity through comprehensive welfare programs for the elderly, women, and children. We believe in creating sustainable solutions that address the root causes of social issues.'
            }
          },
          {
            type: 'text',
            content: {
              title: 'Our Vision',
              text: 'To create a society where every individual, regardless of age or gender, has access to basic rights, education, healthcare, and dignity.'
            }
          },
          {
            type: 'timeline',
            content: {
              title: 'Our Journey',
              events: [
                { year: '2014', event: 'Organization founded' },
                { year: '2015', event: 'First elderly care center established' },
                { year: '2017', event: 'Mental health program launched' },
                { year: '2019', event: 'Girl education initiative started' },
                { year: '2021', event: 'Expanded to multiple locations' }
              ]
            }
          }
        ],
        meta: {
          description: 'Learn about Sabri Helpage\'s mission, vision, and journey in serving humanity.',
          keywords: ['about', 'mission', 'vision', 'charity organization']
        }
      },
      {
        slug: 'causes',
        title: 'Our Causes',
        header: 'Our Causes',
        sections: [
          {
            type: 'text',
            content: {
              title: 'Making a Difference',
              text: 'We focus on three main areas where we can create the most impact: Mental Health Awareness, Elderly Care & Dignity, and Girl Child & Education.'
            }
          },
          {
            type: 'causes-grid',
            content: {
              causes: [
                {
                  title: 'Mental Health Awareness',
                  description: 'Supporting mental health initiatives and providing counseling services to those in need.',
                  image: '/MentalHealth.jpg',
                  link: '/mental-health',
                  stats: { helped: '2000+', programs: '15+' }
                },
                {
                  title: 'Elderly Care & Dignity',
                  description: 'Comprehensive care programs ensuring dignity and respect for senior citizens.',
                  image: '/elderlyCareImg.jpg',
                  link: '/elderly-care',
                  stats: { served: '1500+', centers: '8+' }
                },
                {
                  title: 'Girl Child & Education',
                  description: 'Empowering girls through education and skill development programs.',
                  image: '/girlChildEducation.jpg',
                  link: '/girl-education',
                  stats: { educated: '3000+', schools: '12+' }
                }
              ]
            }
          }
        ],
        meta: {
          description: 'Explore the causes we support: Mental Health, Elderly Care, and Girl Education.',
          keywords: ['causes', 'mental health', 'elderly care', 'girl education']
        }
      },
      {
        slug: 'mental-health',
        title: 'Mental Health Awareness',
        header: 'Mental Health Awareness Program',
        sections: [
          {
            type: 'hero',
            content: {
              title: 'Breaking the Stigma, Building Strong Minds',
              subtitle: 'Our mental health awareness program provides support, counseling, and resources to help individuals overcome mental health challenges.',
              image: '/MentalHealth.jpg'
            }
          },
          {
            type: 'text',
            content: {
              title: 'Our Approach',
              text: 'We believe that mental health is as important as physical health. Our comprehensive program includes counseling services, awareness campaigns, support groups, and community education.'
            }
          },
          {
            type: 'services',
            content: {
              title: 'Services Offered',
              services: [
                'Individual Counseling',
                'Group Therapy Sessions',
                'Mental Health Workshops',
                'Crisis Intervention',
                'Community Awareness Programs',
                'Support for Families'
              ]
            }
          },
          {
            type: 'stats',
            content: {
              stats: [
                { number: '2000+', label: 'People Helped' },
                { number: '50+', label: 'Counseling Sessions' },
                { number: '15+', label: 'Awareness Programs' },
                { number: '95%', label: 'Success Rate' }
              ]
            }
          }
        ],
        meta: {
          description: 'Mental health awareness program providing counseling, support, and community education.',
          keywords: ['mental health', 'counseling', 'awareness', 'support']
        }
      },
      {
        slug: 'elderly-care',
        title: 'Elderly Care & Dignity',
        header: 'Elderly Care & Dignity Program',
        sections: [
          {
            type: 'hero',
            content: {
              title: 'Honoring Our Elders with Dignity and Care',
              subtitle: 'Comprehensive care programs ensuring that senior citizens live with dignity, respect, and access to necessary support.',
              image: '/elderlyCareImg.jpg'
            }
          },
          {
            type: 'text',
            content: {
              title: 'Our Commitment',
              text: 'We believe that every senior citizen deserves to live with dignity. Our elderly care program provides medical support, emotional care, social activities, and assistance with daily living.'
            }
          },
          {
            type: 'services',
            content: {
              title: 'Care Services',
              services: [
                'Medical Care & Health Monitoring',
                'Nutritional Support',
                'Social Activities & Recreation',
                'Emotional Support & Counseling',
                'Assistance with Daily Living',
                'Family Support Programs'
              ]
            }
          },
          {
            type: 'facilities',
            content: {
              title: 'Our Care Centers',
              centers: [
                { name: 'Senior Living Center', location: 'Downtown', capacity: '50 beds' },
                { name: 'Day Care Center', location: 'Midtown', services: 'Daily care' },
                { name: 'Home Care Services', location: 'Community-wide', type: 'In-home support' }
              ]
            }
          }
        ],
        meta: {
          description: 'Comprehensive elderly care programs ensuring dignity and support for senior citizens.',
          keywords: ['elderly care', 'senior citizens', 'dignity', 'support']
        }
      },
      {
        slug: 'girl-education',
        title: 'Girl Child & Education',
        header: 'Girl Child & Education Program',
        sections: [
          {
            type: 'hero',
            content: {
              title: 'Empowering Girls Through Education',
              subtitle: 'Breaking barriers and creating opportunities for girls to achieve their full potential through quality education and skill development.',
              image: '/girlChildEducation.jpg'
            }
          },
          {
            type: 'text',
            content: {
              title: 'Why Girl Education Matters',
              text: 'Educating girls creates a ripple effect that benefits families, communities, and nations. Our program focuses on providing quality education, mentorship, and life skills to empower the next generation of women leaders.'
            }
          },
          {

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
