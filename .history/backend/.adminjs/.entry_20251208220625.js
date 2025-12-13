AdminJS.UserComponents = {}
const mongoose = require('mongoose');
const Page = require('./models/Page');
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
        name: "About",
        slug: "about",
        pageTitle: "About Us - Sabri Helpage",
        heroTitle: "About Sabri Helpage",
        heroContent: "We are a non-profit organization dedicated to creating positive change in communities through education, healthcare, and social welfare programs.",
        heroImage: "/images/about-hero.jpg",
        sections: [
          {
            type: "mission",
            title: "Our Mission",
            content: "To empower communities through sustainable development programs that create lasting impact and promote social justice.",
            order: 1
          },
          {
            type: "vision",
            title: "Our Vision", 
            content: "A world where every individual, regardless of their background, has equal opportunities to thrive and contribute to society.",
            order: 2
          },
          {
            type: "history",
            title: "Our Journey",
            content: "Founded in 2010 by Mr. Sabri Ahmed with just 5 volunteers, we started with a single education program in one village. Today, we operate across 3 states, impacting over 50,000 lives annually.",
            order: 3
          }
        ],
        stats: [
          { value: "50,000+", label: "Lives Impacted Annually", icon: "users" },
          { value: "12", label: "Active Programs", icon: "layers" },
          { value: "200+", label: "Dedicated Volunteers", icon: "heart" },
          { value: "3", label: "States Coverage", icon: "map-pin" }
        ],
        status: "published",
        seoTitle: "About Sabri Helpage - Our Mission, Vision & History",
        seoDescription: "Learn about Sabri Helpage NGO - our journey since 2010, mission to empower communities, and impact across India."
      },

      {
        name: "Contact",
        slug: "contact",
        pageTitle: "Contact Us - Sabri Helpage",
        heroTitle: "Get in Touch",
        heroContent: "We would love to hear from you. Whether you want to volunteer, donate, partner with us, or just say hello - reach out!",
        heroImage: "/images/contact-hero.jpg",
        sections: [
          {
            type: "info",
            title: "Our Offices",
            items: [
              {
                title: "Head Office",
                description: "123 Social Service Road, Sector 5, New Delhi, India - 110001",
                icon: "map-pin",
                contact: "Phone: +91 11 2345 6789\nEmail: headoffice@sabrihelpage.org"
              }
            ],
            order: 1
          },
          {
            type: "form",
            title: "Send Us a Message",
            description: "Fill out the form below and we will get back to you within 24 hours.",
            formFields: [
              { name: "fullName", label: "Full Name", type: "text", required: true },
              { name: "email", label: "Email Address", type: "email", required: true },
              { name: "phone", label: "Phone Number", type: "tel" },
              { name: "subject", label: "Subject", type: "select", options: ["General Inquiry", "Volunteer", "Donation", "Partnership", "Other"] },
              { name: "message", label: "Your Message", type: "textarea", required: true }
            ],
            submitText: "Send Message",
            order: 2
          }
        ],
        status: "published",
        seoTitle: "Contact Sabri Helpage - Get in Touch",
        seoDescription: "Contact Sabri Helpage NGO for inquiries, donations, volunteering, or partnerships. Reach us via email, phone, or contact form."
      },

      {
        name: "CSR Summit",
        slug: "csr-summit",
        pageTitle: "CSR Summit - Sabri Helpage",
        heroTitle: "Annual CSR & Social Impact Summit 2024",
        heroContent: "Join industry leaders, CSR professionals, and NGOs to explore innovative approaches to corporate social responsibility and sustainable development.",
        heroImage: "/images/csr-summit/hero.jpg",
        sections: [
          {
            type: "details",
            title: "Summit Details",
            items: [
              { label: "Date", value: "March 15-16, 2024" },
              { label: "Location", value: "Taj Palace Hotel, New Delhi" },
              { label: "Theme", value: "Sustainable Partnerships for Lasting Impact" }
            ],
            order: 1
          },
          {
            type: "agenda",
            title: "Summit Agenda",
            items: [
              { time: "9:00 AM", title: "Registration & Networking", speaker: "All Participants" },
              { time: "10:00 AM", title: "Keynote: Future of CSR in India", speaker: "Industry Leader" },
              { time: "11:30 AM", title: "Panel: Measuring Social Impact", speaker: "Experts Panel" }
            ],
            order: 2
          },
          {
            type: "speakers",
            title: "Featured Speakers",
            items: [
              { name: "Arvind Sharma", role: "CSR Head, Tata Group", topic: "Strategic CSR", image: "/images/speakers/speaker1.jpg" },
              { name: "Priya Mehta", role: "CEO, Social Impact Foundation", topic: "Social Entrepreneurship", image: "/images/speakers/speaker2.jpg" }
            ],
            order: 3
          }
        ],
        status: "published",
        seoTitle: "CSR Summit 2024 - Corporate Social Responsibility Conference",
        seoDescription: "Join Sabri Helpage's Annual CSR Summit for discussions on sustainable partnerships, social impact measurement, and corporate responsibility."
      },

      {
        name: "Education",
        slug: "education",
        pageTitle: "Education Programs - Sabri Helpage",
        heroTitle: "Transforming Lives Through Education",
        heroContent: "We believe education is the most powerful tool to break the cycle of poverty. Our programs focus on access, quality, and holistic development.",
        heroImage: "/images/education/hero.jpg",
        sections: [
          {
            type: "programs",
            title: "Our Education Initiatives",
            items: [
              {
                title: "Quality School Education",
                description: "Supporting government schools with infrastructure, teacher training, and learning materials.",
                icon: "school",
                impact: "15,000+ students benefited"
              },
              {
                title: "Girl Child Education",
                description: "Special focus on keeping girls in school through scholarships, mentorship, and community awareness.",
                icon: "female",
                impact: "800+ girls sponsored annually"
              },
              {
                title: "Digital Literacy",
                description: "Teaching essential computer skills to youth and adults for better employment opportunities.",
                icon: "computer",
                impact: "5,000+ individuals trained"
              }
            ],
            order: 1
          },
          {
            type: "impact",
            title: "Our Impact",
            stats: [
              { value: "25,000+", label: "Students Benefited" },
              { value: "150+", label: "Schools Supported" },
              { value: "800+", label: "Teachers Trained" },
              { value: "2,500+", label: "Scholarships Given" }
            ],
            order: 2
          }
        ],
        status: "published",
        seoTitle: "Education Programs - Sabri Helpage NGO",
        seoDescription: "Sabri Helpage education programs: Quality school education, girl child education, digital literacy, and scholarships for underprivileged students."
      },

      {
        name: "Elderly Care",
        slug: "elderly-care",
        pageTitle: "Elderly Care Services - Sabri Helpage",
        heroTitle: "Caring for Our Senior Citizens",
        heroContent: "We provide comprehensive care and support services to ensure our elderly community members live with dignity, comfort, and social connection.",
        heroImage: "/images/elderly/hero.jpg",
        sections: [
          {
            type: "services",
            title: "Our Services",
            items: [
              {
                title: "Daily Meal Service",
                description: "Nutritious meals delivered to homebound elderly individuals",
                icon: "utensils",
                coverage: "500+ elders daily"
              },
              {
                title: "Health Check-up Camps",
                description: "Regular medical check-ups and basic healthcare services",
                icon: "heart",
                coverage: "1,000+ elders monthly"
              },
              {
                title: "Social Connection Programs",
                description: "Activities and gatherings to combat loneliness and isolation",
                icon: "users",
                coverage: "300+ elders weekly"
              }
            ],
            order: 1
          },
          {
            type: "stories",
            title: "Success Stories",
            items: [
              {
                name: "Mr. Gupta, 78",
                story: "After losing his wife, our daily meal service and weekly visits gave him renewed purpose. He now helps other elders as a volunteer.",
                image: "/images/elderly/story1.jpg"
              },
              {
                name: "Mrs. Patel, 82",
                story: "Limited mobility made it hard for Mrs. Patel to leave home. Our wheelchair donation and home modifications have given her independence and safety.",
                image: "/images/elderly/story2.jpg"
              }
            ],
            order: 2
          }
        ],
        status: "published",
        seoTitle: "Elderly Care Services - Sabri Helpage",
        seoDescription: "Sabri Helpage elderly care services: Daily meal delivery, health check-ups, social activities, and support for senior citizens in need."
      },

      {
        name: "Girl Education",
        slug: "girl-education",
        pageTitle: "Girl Child Education - Sabri Helpage",
        heroTitle: "Educating Girls, Transforming Futures",
        heroContent: "We work to eliminate barriers to girls' education and create an environment where every girl can complete her education and pursue her dreams.",
        heroImage: "/images/girl-education/hero.jpg",
        sections: [
          {
            type: "challenges",
            title: "Addressing Challenges",
            items: [
              { title: "Early Marriage", description: "Social pressure for early marriage forces many girls to drop out", icon: "ring" },
              { title: "Safety Concerns", description: "Long distances to school and safety issues prevent attendance", icon: "shield" },
              { title: "Financial Constraints", description: "Families often prioritize boys' education due to limited resources", icon: "dollar-sign" }
            ],
            order: 1
          },
          {
            type: "programs",
            title: "Our Programs",
            items: [
              { title: "Back to School Initiative", description: "Identifying out-of-school girls and facilitating their return to education", impact: "1,200+ girls returned" },
              { title: "Scholarship Program", description: "Financial support for girls from economically weak backgrounds", impact: "800+ girls sponsored" },
              { title: "Mentorship Program", description: "Role models and guidance for academic and personal development", impact: "500+ girls mentored" }
            ],
            order: 2
          },
          {
            type: "success",
            title: "Success Stories",
            items: [
              {
                name: "Anjali Sharma, 17",
                story: "Anjali was forced to drop out in 8th grade due to financial constraints. With our scholarship and mentorship, she returned to school and topped her district in exams.",
                image: "/images/girl-education/success1.jpg"
              }
            ],
            order: 3
          }
        ],
        status: "published",
        seoTitle: "Girl Child Education - Sabri Helpage",
        seoDescription: "Sabri Helpage girl education programs: Scholarships, mentorship, and support to keep girls in school and empower them for a better future."
      },

      {
        name: "ILC",
        slug: "ilc",
        pageTitle: "International Learning Center - Sabri Helpage",
        heroTitle: "Building Global Changemakers",
        heroContent: "Our International Learning Center provides skills training, leadership development, and global exposure to youth from underserved communities.",
        heroImage: "/images/ilc/hero.jpg",
        sections: [
          {
            type: "programs",
            title: "Training Programs",
            items: [
              {
                title: "Digital Skills Academy",
                description: "6-month comprehensive training in digital literacy, coding, and IT skills",
                duration: "6 months",
                outcomes: ["Certificate", "Placement Assistance", "Internship"]
              },
              {
                title: "English Proficiency Program",
                description: "3-month intensive English language training for better employment",
                duration: "3 months",
                outcomes: ["Proficiency Certificate", "Job Readiness"]
              },
              {
                title: "Healthcare Assistant Training",
                description: "8-month certification program for healthcare support roles",
                duration: "8 months",
                outcomes: ["Government Certificate", "Hospital Placements"]
              }
            ],
            order: 1
          },
          {
            type: "stats",
            title: "Placement Statistics",
            stats: [
              { value: "85%", label: "Placement Rate" },
              { value: "₹18,000", label: "Average Monthly Salary" },
              { value: "50+", label: "Companies Visited" },
              { value: "2,000+", label: "Alumni Network" }
            ],
            order: 2
          }
        ],
        status: "published",
        seoTitle: "International Learning Center - Skills Training",
        seoDescription: "Sabri Helpage ILC: Digital skills training, English proficiency, healthcare assistant programs, and job placement support for youth."
      },

      {
        name: "Internship",
        slug: "internship",
        pageTitle: "Internship Opportunities - Sabri Helpage",
        heroTitle: "Gain Experience, Make Impact",
        heroContent: "Join our internship program to develop professional skills while contributing to meaningful social change. Open to students and young professionals.",
        heroImage: "/images/internship/hero.jpg",
        sections: [
          {
            type: "opportunities",
            title: "Current Opportunities",
            items: [
              {
                role: "Social Media & Content Creation",
                department: "Communications",
                duration: "2-3 months",
                location: "Remote/Hybrid",
                stipend: "₹5,000/month",
                responsibilities: ["Create social media content", "Write blog articles", "Design graphics"]
              },
              {
                role: "Program Research Assistant",
                department: "Program Development",
                duration: "3-6 months",
                location: "On-site",
                stipend: "₹8,000/month",
                responsibilities: ["Research social issues", "Data analysis", "Report writing"]
              },
              {
                role: "Education Program Intern",
                department: "Education",
                duration: "3 months",
                location: "Field",
                stipend: "₹6,000/month",
                responsibilities: ["Assist in classroom activities", "Support teacher training", "Organize events"]
              }
            ],
            order: 1
          },
          {
            type: "benefits",
            title: "Internship Benefits",
            items: [
              "Certificate of Completion",
              "Letter of Recommendation",
              "Networking Opportunities",
              "Skill Development",
              "Real Project Experience",
              "Flexible Schedule"
            ],
            order: 2
          }
        ],
        status: "published",
        seoTitle: "Internship Opportunities - Sabri Helpage",
        seoDescription: "Sabri Helpage internship program: Social media, research, education, and healthcare internships for students and young professionals."
      },

      {
        name: "Mental Health",
        slug: "mental-health",
        pageTitle: "Mental Health Awareness & Support - Sabri Helpage",
        heroTitle: "Mental Well-being for All",
        heroContent: "Breaking the stigma around mental health and providing accessible support services to communities in need.",
        heroImage: "/images/mental-health/hero.jpg",
        sections: [
          {
            type: "services",
            title: "Our Services",
            items: [
              {
                title: "Community Counseling Centers",
                description: "Free counseling services at multiple locations",
                hours: "Mon-Sat, 10 AM - 6 PM",
                coverage: "New Delhi, Mumbai, Pune, Lucknow"
              },
              {
                title: "School Mental Health Program",
                description: "Mental health education and support in schools",
                coverage: "50+ schools, 10,000+ students",
                activities: ["Awareness workshops", "Teacher training", "Student counseling"]
              },
              {
                title: "Tele-counseling Helpline",
                description: "24/7 mental health support via phone",
                number: "1800-123-4567",
                languages: ["Hindi", "English", "Marathi", "Urdu"]
              }
            ],
            order: 1
          },
          {
            type: "workshops",
            title: "Workshops & Training",
            items: [
              "Stress Management Workshop (Monthly)",
              "Parenting & Child Mental Health (Bi-monthly)",
              "Youth Mental Health First Aid (Quarterly)",
              "Workplace Well-being Sessions"
            ],
            order: 2
          }
        ],
        status: "published",
        seoTitle: "Mental Health Support - Sabri Helpage",
        seoDescription: "Sabri Helpage mental health services: Community counseling, school programs, tele-counseling helpline, and mental health awareness workshops."
      },

      {
        name: "Sociofare",
        slug: "sociofare",
        pageTitle: "Sociofare Programs - Sabri Helpage",
        heroTitle: "Building Sustainable Communities",
        heroContent: "Our sociofare programs focus on holistic community development through livelihood support, social security, and sustainable infrastructure.",
        heroImage: "/images/sociofare/hero.jpg",
        sections: [
          {
            type: "programs",
            title: "Key Programs",
            items: [
              {
                title: "Sustainable Livelihood Program",
                description: "Skill training and micro-enterprise support for income generation",
                impact: "2,500+ families benefited",
                features: ["Vocational training", "Seed funding", "Market linkages"]
              },
              {
                title: "Community Development Program",
                description: "Water, sanitation, and infrastructure development",
                impact: "10,000+ people benefited",
                features: ["Water access", "Toilet construction", "Community centers"]
              },
              {
                title: "Women Empowerment",
                description: "Self-help groups and economic empowerment programs",
                impact: "500+ women entrepreneurs",
                features: ["Business training", "Group savings", "Leadership development"]
              }
            ],
            order: 1
          },
          {
            type: "impact",
            title: "Community Impact",
            stats: [
              { value: "10,000+", label: "Families Benefited" },
              { value: "50+", label: "Communities Reached" },
              { value: "5,000+", label: "Individuals Trained" },
              { value: "100+", label: "Infrastructure Projects" }
            ],
            order: 2
          }
        ],
        status: "published",
        seoTitle: "Sociofare & Community Development - Sabri Helpage",
        seoDescription: "Sabri Helpage sociofare programs: Livelihood support, community infrastructure, women empowerment, and sustainable development initiatives."
      },

      {
        name: "Stories",
        slug: "stories",
        pageTitle: "Success Stories - Sabri Helpage",
        heroTitle: "Stories of Transformation",
        heroContent: "Real stories of hope, resilience, and change from the communities we serve.",
        heroImage: "/images/stories/hero.jpg",
        sections: [
          {
            type: "categories",
            title: "Story Categories",
            items: [
              { name: "Education", count: 15, icon: "book-open" },
              { name: "Healthcare", count: 10, icon: "heart" },
              { name: "Elderly Care", count: 8, icon: "users" },
              { name: "Livelihood", count: 12, icon: "briefcase" },
              { name: "Women Empowerment", count: 10, icon: "female" }
            ],
            order: 1
          },
          {
            type: "featured",
            title: "Featured Stories",
            items: [
              {
                title: "From School Dropout to College Graduate",
                person: "Sunil Kumar, 22",
                location: "Rural Maharashtra",
                category: "Education",
                excerpt: "First college graduate from his village after returning to education through our program.",
                image: "/images/stories/featured1.jpg"
              },
              {
                title: "A New Lease on Life at 75",
                person: "Mrs. Shanti Devi, 75",
                location: "Delhi Slum",
                category: "Elderly Care",
                excerpt: "From isolation and depression to community and purpose through our elderly care services.",
                image: "/images/stories/featured2.jpg"
              }
            ],
            order: 2
          }
        ],
        status: "published",
        seoTitle: "Success Stories - Sabri Helpage Impact Stories",
        seoDescription: "Read inspiring success stories from Sabri Helpage programs - education, healthcare, elderly care, and community development transformations."
      },

      {
        name: "Awards",
        slug: "awards",
        pageTitle: "Awards & Recognition - Sabri Helpage",
        heroTitle: "Our Awards & Recognitions",
        heroContent: "Honors and recognitions celebrating our journey, impact, and the incredible partners who make our work possible.",
        heroImage: "/images/awards/hero.jpg",
        sections: [
          {
            type: "awards",
            title: "Our Awards",
            items: [
              {
                title: "Best NGO for Community Development",
                organization: "National NGO Excellence Awards",
                year: "2023",
                description: "Recognized for outstanding contribution to community development and sustainable social impact.",
                icon: "trophy"
              },
              {
                title: "Education Champion Award",
                organization: "Ministry of Education, Government of India",
                year: "2022",
                description: "Awarded for innovative approaches to improving access to quality education in rural areas.",
                icon: "award"
              },
              {
                title: "Sustainable Impact Partner",
                organization: "Global Development Network",
                year: "2021",
                description: "Recognized for implementing sustainable development programs with measurable long-term impact.",
                icon: "leaf"
              },
              {
                title: "Healthcare Innovation Award",
                organization: "Healthcare Excellence Forum",
                year: "2020",
                description: "For developing low-cost healthcare solutions for underserved communities.",
                icon: "heart"
              }
            ],
            order: 1
          },
          {
            type: "categories",
            title: "Award Categories",
            items: ["National", "International", "Education", "Healthcare", "Community Development", "Sustainability"],
            order: 2
          }
        ],
        status: "published",
        seoTitle: "Awards & Recognition - Sabri Helpage NGO",
        seoDescription: "Awards and recognitions received by Sabri Helpage for community development, education, healthcare, and social impact work."
      },

      {
        name: "Blog",
        slug: "blog",
        pageTitle: "Blog - Sabri Helpage Stories & Updates",
        heroTitle: "Our Stories & Insights",
        heroContent: "Read about our work, success stories, community impact, and insights on social development.",
        heroImage: "/images/blog/hero.jpg",
        sections: [
          {
            type: "featured",
            title: "Featured Posts",
            items: [
              {
                title: "How Our Education Program Transformed a Remote Village",
                excerpt: "The inspiring story of how consistent intervention and community partnership led to 100% school enrollment in a tribal village.",
                author: "Priya Sharma",
                date: "2023-11-15",
                category: "Education",
                readTime: "4 min",
                image: "/images/blog/featured1.jpg"
              },
              {
                title: "5 Sustainable Practices for Community Healthcare",
                excerpt: "Learn about cost-effective healthcare practices that communities can sustain long-term.",
                author: "Dr. Rajesh Verma",
                date: "2023-10-28",
                category: "Healthcare",
                readTime: "6 min",
                image: "/images/blog/featured2.jpg"
              }
            ],
            order: 1
          },
          {
            type: "categories",
            title: "Blog Categories",
            items: [
              { name: "Education", count: 5 },
              { name: "Healthcare", count: 4 },
              { name: "Success Stories", count: 3 },
              { name: "Volunteers", count: 2 },
              { name: "Partnerships", count: 1 }
            ],
            order: 2
          }
        ],
        status: "published",
        seoTitle: "Blog - Sabri Helpage Stories & Articles",
        seoDescription: "Sabri Helpage blog: Read stories, insights, and updates about our education, healthcare, and community development work across India."
      },

      {
        name: "FAQ",
        slug: "faq",
        pageTitle: "Frequently Asked Questions - Sabri Helpage",
        heroTitle: "How Can We Help You?",
        heroContent: "Find answers to common questions about our organization, programs, donations, and volunteering.",
        heroImage: "/images/faq/hero.jpg",
        sections: [
          {
            type: "categories",
            title: "FAQ Categories",
            items: [
              {
                category: "General Information",
                faqs: [
                  { question: "What does Sabri Helpage do?", answer: "We work in education, healthcare, elderly care, and community development across 3 states in India." },
                  { question: "Where do you operate?", answer: "Head office in New Delhi with programs in Delhi NCR, Uttar Pradesh, and Maharashtra." }
                ]
              },
              {
                category: "Donations",
                faqs: [
                  { question: "How can I donate?", answer: "Online through our website, bank transfer, UPI, or cheque. All donations are tax-deductible." },
                  { question: "Where does my donation go?", answer: "85% to program implementation, 10% administrative costs, 5% fundraising efforts." }
                ]
              },
              {
                category: "Volunteering",
                faqs: [
                  { question: "How can I volunteer?", answer: "Apply through our website, attend orientation, and choose a role matching your skills." },
                  { question: "What are the age requirements?", answer: "18+ for most roles, 16-17 with parental consent in youth programs." }
                ]
              }
            ],
            order: 1
          },
          {
            type: "contact",
            title: "Need More Help?",
            content: "Contact our support team for personalized assistance.",
            contactOptions: ["Email: support@sabrihelpage.org", "Phone: +91 11 2345 6789", "WhatsApp: +91 98 7654 3210"],
            order: 2
          }
        ],
        status: "published",
        seoTitle: "FAQ - Frequently Asked Questions - Sabri Helpage",
        seoDescription: "Frequently asked questions about Sabri Helpage programs, donations, volunteering, partnerships, and organizational information."
      },

      {
        name: "Gallery",
        slug: "gallery",
        pageTitle: "Photo Gallery - Sabri Helpage in Action",
        heroTitle: "Moments That Matter",
        heroContent: "A visual journey through our work, impact, and the communities we serve.",
        heroImage: "/images/gallery/hero.jpg",
        sections: [
          {
            type: "albums",
            title: "Photo Albums",
            items: [
              {
                title: "Education Programs",
                description: "Photos from our school support, digital literacy, and scholarship programs",
                imageCount: 45,
                coverImage: "/images/gallery/education/cover.jpg"
              },
              {
                title: "Healthcare Initiatives",
                description: "Medical camps, health awareness programs, and community health activities",
                imageCount: 32,
                coverImage: "/images/gallery/healthcare/cover.jpg"
              },
              {
                title: "Elderly Care Services",
                description: "Daily meal service, health check-ups, and social activities for elders",
                imageCount: 28,
                coverImage: "/images/gallery/elderly/cover.jpg"
              },
              {
                title: "Events & Celebrations",
                description: "Annual events, festivals, and special celebrations with communities",
                imageCount: 52,
                coverImage: "/images/gallery/events/cover.jpg"
              }
            ],
            order: 1
          },
          {
            type: "featured",
            title: "Featured Images",
            items: [
              { image: "/images/gallery/featured1.jpg", caption: "Children learning in digital classroom", category: "Education" },
              { image: "/images/gallery/featured2.jpg", caption: "Medical camp serving rural community", category: "Healthcare" },
              { image: "/images/gallery/featured3.jpg", caption: "Elderly meal distribution", category: "Elderly Care" },
              { image: "/images/gallery/featured4.jpg", caption: "Community celebration", category: "Events" }
            ],
            order: 2
          }
        ],
        status: "published",
        seoTitle: "Photo Gallery - Sabri Helpage Work & Impact",
        seoDescription: "Sabri Helpage photo gallery: See images from our education, healthcare, elderly care, and community development programs across India."
      },

      {
        name: "Privacy",
        slug: "privacy",
        pageTitle: "Privacy Policy - Sabri Helpage",
        heroTitle: "Privacy Policy",
        heroContent: "Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.",
        heroImage: "/images/privacy/hero.jpg",
        sections: [
          {
            type: "sections",
            title: "Policy Details",
            items: [
              { title: "Information We Collect", content: "We collect information you provide directly such as name, email, phone number, and donation information." },
              { title: "How We Use Your Information", content: "To provide services, process donations, send important notices, and respond to your inquiries and requests." },
              { title: "Information Sharing", content: "We do not sell, trade, or rent your personal information. We may share with trusted third parties who assist our operations." },
              { title: "Security", content: "We implement appropriate measures to protect your personal information from unauthorized access, alteration, disclosure, and destruction." },
              { title: "Contact Us", content: "Email: privacy@sabrihelpage.org for any privacy-related questions." }
            ],
            order: 1
          }
        ],
        status: "published",
        seoTitle: "Privacy Policy - Sabri Helpage Data Protection",
        seoDescription: "Sabri Helpage privacy policy: How we collect, use, and protect your personal information when you interact with our organization."
      },

      {
        name: "Publications",
        slug: "publications",
        pageTitle: "Publications & Reports - Sabri Helpage",
        heroTitle: "Research, Reports & Resources",
        heroContent: "Access our annual reports, research studies, case studies, and educational resources.",
        heroImage: "/images/publications/hero.jpg",
        sections: [
          {
            type: "categories",
            title: "Publication Categories",
            items: [
              { name: "Annual Reports", count: 5, description: "Yearly overview of our work, impact, and finances" },
              { name: "Research Studies", count: 8, description: "In-depth studies on social issues and program impact" },
              { name: "Case Studies", count: 12, description: "Detailed analysis of specific programs and success stories" },
              { name: "Policy Briefs", count: 6, description: "Recommendations and insights for policymakers" },
              { name: "Educational Resources", count: 15, description: "Teaching materials, guides, and toolkits" }
            ],
            order: 1
          },
          {
            type: "featured",
            title: "Featured Publications",
            items: [
              {
                title: "Annual Report 2022-2023",
                type: "PDF",
                pages: 68,
                description: "Comprehensive report covering our programs, impact, financials, and future plans.",
                downloadUrl: "/publications/annual-report-2023.pdf"
              },
              {
                title: "Impact of Digital Education in Rural India",
                type: "PDF",
                pages: 45,
                description: "Research study on digital literacy programs in 50 rural schools.",
                downloadUrl: "/publications/digital-education-impact.pdf"
              }
            ],
            order: 2
          }
        ],
        status: "published",
        seoTitle: "Publications & Reports - Sabri Helpage Research",
        seoDescription: "Sabri Helpage publications: Annual reports, research studies, case studies, policy briefs, and educational resources for download."
      },

      {
        name: "Terms",
        slug: "terms",
        pageTitle: "Terms of Use - Sabri Helpage",
        heroTitle: "Terms of Use",
        heroContent: "Please read these terms carefully before using our website or services.",
        heroImage: "/images/terms/hero.jpg",
        sections: [
          {
            type: "sections",
            title: "Terms & Conditions",
            items: [
              { title: "Acceptance of Terms", content: "By accessing and using our website, you accept and agree to be bound by these Terms of Use." },
              { title: "Intellectual Property", content: "All content on this website is the property of Sabri Helpage or its content suppliers and is protected by copyright laws." },
              { title: "User Content", content: "By submitting content to our website, you grant Sabri Helpage license to use, reproduce, modify, and distribute such content." },
              { title: "Donations and Payments", content: "All donations are non-refundable except in cases of processing errors. Donations support our general fund unless specified." },
              { title: "Disclaimer", content: "The information on this website is provided on an 'as is' basis without warranties of any kind." }
            ],
            order: 1
          }
        ],
        status: "published",
        seoTitle: "Terms of Use - Sabri Helpage Website Terms",
        seoDescription: "Sabri Helpage terms of use: Website usage terms, intellectual property, user content, donations, and disclaimer information."
      },

      {
        name: "Volunteer",
        slug: "volunteer",
        pageTitle: "Volunteer Opportunities - Sabri Helpage",
        heroTitle: "Join Our Volunteer Community",
        heroContent: "Make a difference in your community. Share your skills, time, and passion to create positive change.",
        heroImage: "/images/volunteer/hero.jpg",
        sections: [
          {
            type: "opportunities",
            title: "Volunteer Types",
            items: [
              {
                type: "On-Site Volunteering",
                description: "Direct community engagement at our centers and field locations",
                roles: ["Teaching", "Healthcare Assistance", "Elderly Care", "Event Support"],
                commitment: "4+ hours/week"
              },
              {
                type: "Remote Volunteering",
                description: "Support our work from anywhere through virtual contributions",
                roles: ["Content Writing", "Social Media", "Graphic Design", "Research"],
                commitment: "Flexible hours"
              },
              {
                type: "Skill-Based Volunteering",
                description: "Share your professional expertise for specific projects",
                roles: ["Legal Consultation", "Medical Expertise", "IT Support", "Marketing"],
                commitment: "Project-based"
              }
            ],
            order: 1
          },
          {
            type: "benefits",
            title: "Volunteer Benefits",
            items: [
              "Certificate of Completion",
              "Letter of Recommendation",
              "Networking Opportunities",
              "Skill Development",
              "Impact Measurement",
              "Flexible Schedule"
            ],
            order: 2
          }
        ],
        status: "published",
        seoTitle: "Volunteer Opportunities - Sabri Helpage",
        seoDescription: "Sabri Helpage volunteer program: On-site, remote, and skill-based volunteering opportunities with certificates and recognition."
      },

      {
        name: "News",
        slug: "news",
        pageTitle: "News & Updates - Sabri Helpage",
        heroTitle: "Latest News & Announcements",
        heroContent: "Stay updated with our latest activities, achievements, and community impact stories.",
        heroImage: "/images/news/hero.jpg",
        sections: [
          {
            type: "categories",
            title: "News Categories",
            items: ["Events", "Achievements", "Program Updates", "Partnerships", "Media Coverage"],
            order: 1
          },
          {
            type: "featured",
            title: "Featured News",
            items: [
              {
                title: "Sabri Helpage Wins National Education Award 2023",
                excerpt: "Recognized for innovative approaches to rural education and digital literacy programs.",
                date: "2023-12-15",
                category: "Achievements",
                image: "/images/news/featured1.jpg"
              },
              {
                title: "Annual CSR Summit 2024: Registrations Open",
                excerpt: "Join industry leaders for discussions on sustainable social impact and corporate responsibility.",
                date: "2024-01-10",
                category: "Events",
                image: "/images/news/featured2.jpg"
              }
            ],
            order: 2
          }
        ],
        status: "published",
        seoTitle: "News & Updates - Sabri Helpage Latest News",
        seoDescription: "Latest news from Sabri Helpage: Awards, events, program updates, partnerships, and media coverage about our social impact work."
      },

      {
        name: "Home",
        slug: "home",
        pageTitle: "Sabri Helpage - Empowering Communities Since 2010",
        heroTitle: "Creating Sustainable Change",
        heroContent: "We are a non-profit organization dedicated to transforming lives through education, healthcare, elderly care, and community development programs across India.",
        heroImage: "/images/home/hero.jpg",
        sections: [
          {
            type: "stats",
            title: "Our Impact",
            items: [
              { value: "50,000+", label: "Lives Impacted Annually", icon: "users" },
              { value: "12", label: "Active Programs", icon: "layers" },
              { value: "200+", label: "Dedicated Volunteers", icon: "heart" },
              { value: "3", label: "States of Operation", icon: "map-pin" }
            ],
            order: 1
          },
          {
            type: "programs",
            title: "Our Key Programs",
            items: [
              {
                title: "Education",
                description: "Quality education for underprivileged children",
                icon: "book-open",
                link: "/education"
              },
              {
                title: "Healthcare",
                description: "Community health services and awareness",
                icon: "heart",
                link: "/healthcare"
              },
              {
                title: "Elderly Care",
                description: "Support services for senior citizens",
                icon: "users",
                link: "/elderly-care"
              },
              {
                title: "Skill Development",
                description: "Training for better employment opportunities",
                icon: "briefcase",
                link: "/ilc"
              }
            ],
            order: 2
          },
          {
            type: "stories",
            title: "Recent Success Stories",
            items: [
              {
                title: "First College Graduate",
                excerpt: "From dropout to degree holder - inspiring transformation",
                link: "/stories"
              },
              {
                title: "Community Transformation",
                excerpt: "Village gains digital access and infrastructure",
                link: "/stories"
              }
            ],
            order: 3
          },
          {
            type: "events",
            title: "Upcoming Events",
            items: [
              {
                title: "Annual CSR Summit 2024",
                date: "March 15-16, 2024",
                link: "/csr-summit"
              },
              {
                title: "Health Camp - Rural Maharashtra",
                date: "February 25, 2024",
                link: "/events"
              }
            ],
            order: 4
          }
        ],
        status: "published",
        seoTitle: "Sabri Helpage NGO - Education, Healthcare, Community Development",
        seoDescription: "Sabri Helpage is a non-profit organization working in education, healthcare, elderly care, and community development across India since 2010."
      }
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