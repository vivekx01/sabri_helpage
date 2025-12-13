require('dotenv').config();
const express = require('express');
const cors = require('cors');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const connectDB = require('./config/db');

// Import all page models
const AboutPage = require('./models/AboutPage');
const Award = require('./models/Award');
const BlogPage = require('./models/BlogPage');
const ContactPage = require('./models/ContactPage');
const CSRSummitPage = require('./models/CSRSummitPage');
const EducationPage = require('./models/EducationPage');
const ElderlyCarePage = require('./models/ElderlyCarePage');
const FAQPage = require('./models/FAQPage');
const GalleryPage = require('./models/GalleryPage');
const GirlEducationPage = require('./models/GirlEducationPage');
const HomePage = require('./models/HomePage');
const ILCPage = require('./models/ILCPage');
const InternshipPage = require('./models/InternshipPage');
const MentalHealthPage = require('./models/MentalHealthPage');
const NewsPage = require('./models/NewsPage');
const PrivacyPage = require('./models/PrivacyPage');
const Publication = require('./models/Publication');
const SociofarePage = require('./models/SociofarePage');
const StoriesPage = require('./models/StoriesPage');
const TermsPage = require('./models/TermsPage');
const VolunteerPage = require('./models/VolunteerPage');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5176', // Update to your frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(express.static('public'));

// Register AdminJS adapter
AdminJS.registerAdapter(AdminJSMongoose);

// Configure AdminJS
const adminJs = new AdminJS({
  resources: [
    AboutPage,
    Award,
    BlogPage,
    ContactPage,
    CSRSummitPage,
    EducationPage,
    ElderlyCarePage,
    FAQPage,
    GalleryPage,
    GirlEducationPage,
    HomePage,
    ILCPage,
    InternshipPage,
    MentalHealthPage,
    NewsPage,
    PrivacyPage,
    Publication,
    SociofarePage,
    StoriesPage,
    TermsPage,
    VolunteerPage,
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'Sabri Helpage Admin',
    logo: false,
  },
});

// Build and use admin router
const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// API routes
const authRoutes = require('./routes/auth');
const pageRoutes = require('./routes/pageRoutes');
const adminRoutes = require('./routes/admin');
app.use('/auth', authRoutes);
app.use('/api/pages', pageRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`AdminJS available at http://localhost:${PORT}/admin`);
});
