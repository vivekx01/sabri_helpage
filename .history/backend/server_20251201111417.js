require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');

// Register AdminJS adapter
AdminJS.registerAdapter(AdminJSMongoose);

// Initialize Express
const app = express();

// Import models
const User = require('./models/User');
const Blog = require('./models/Blog');
const Story = require('./models/Story');
const Event = require('./models/Event');
const Video = require('./models/Video');
const Award = require('./models/Award');
const Publication = require('./models/Publication');
const FAQ = require('./models/Faq');
const Teacher = require('./models/Teacher');
const Contact = require('./models/Contact');
const Donor = require('./models/Donor');
const Volunteer = require('./models/Volunteer');
const Internship = require('./models/Internship');
const ClubRegistration = require('./models/ClubRegistration');
const SiteConfig = require('./models/SiteConfig');
const CSR = require('./models/CSR');

// CORS only (body parser comes after AdminJS)
app.use(cors());

// Simple role check
const isAdmin = ({ currentAdmin }) => {
  return currentAdmin && ['editor', 'manager', 'admin', 'super-admin'].includes(currentAdmin.role);
};

const isSuperAdmin = ({ currentAdmin }) => {
  return currentAdmin && currentAdmin.role === 'super-admin';
};

// Role-based access control functions
const canAccess = (permittedRoles) => ({ currentAdmin }) => {
  return currentAdmin && permittedRoles.includes(currentAdmin.role);
};

const canModify = ({ currentAdmin, record }) => {
  if (!currentAdmin) return false;
  if (currentAdmin.role === 'super-admin') return true;
  if (currentAdmin.role === 'admin') return true;
  if (currentAdmin.role === 'manager') return true;
  if (currentAdmin.role === 'editor') return false; // Editors can't delete
  return false;
};

const canDelete = ({ currentAdmin }) => {
  return currentAdmin && ['super-admin', 'admin', 'manager'].includes(currentAdmin.role);
};

// Setup AdminJS - Flat structure with all sections directly visible
const adminJs = new AdminJS({
  resources: [
    // USER MANAGEMENT (Super Admin only)
    { 
      resource: User,
      options: {
        properties: {
          password: { 
            isVisible: { edit: true, show: false, list: false, filter: false },
            type: 'password',
          },
          role: {
            availableValues: [
              { value: 'editor', label: 'Editor (Content Only)' },
              { value: 'manager', label: 'Manager (Selected Access)' },
              { value: 'admin', label: 'Admin (Full Access)' },
              { value: 'super-admin', label: 'Super Admin (Complete Control)' },
            ],
          },
        },
        actions: {
          list: { isAccessible: canAccess(['super-admin', 'admin']) },
          show: { isAccessible: canAccess(['super-admin', 'admin']) },
          edit: { isAccessible: canAccess(['super-admin', 'admin']) },
          new: { isAccessible: canAccess(['super-admin', 'admin']) },
          delete: { isAccessible: canAccess(['super-admin']) },
        },
      },
    },

    // 1. DONOR DATA
    { 
      resource: Donor,
      options: {
        properties: {
          status: {
            availableValues: [
              { value: 'pending', label: 'Pending' },
              { value: 'approved', label: 'Approved' },
              { value: 'archived', label: 'Archived' },
            ],
          },
        },
        actions: {
          edit: { isAccessible: canAccess(['super-admin', 'admin', 'manager']) },
          new: { isAccessible: canAccess(['super-admin', 'admin', 'manager']) },
          delete: { isAccessible: canDelete },
          approve: {
            icon: 'Check',
            actionType: 'record',
            isAccessible: canAccess(['super-admin', 'admin', 'manager']),
            handler: async (req, res, context) => {
              const { record } = context;
              await record.update({ status: 'approved' });
              return { record, notice: { message: 'Approved', type: 'success' } };
            },
          },
          archive: {
            icon: 'Archive',
            actionType: 'record',
            isAccessible: canAccess(['super-admin', 'admin', 'manager']),
            handler: async (req, res, context) => {
              const { record } = context;
              await record.update({ status: 'archived' });
              return { record, notice: { message: 'Archived', type: 'success' } };
            },
          },
        },
      },
    },

    // 2. CLUBS (Registration)
    { 
      resource: ClubRegistration,
      options: {
        properties: {
          status: {
            availableValues: [
              { value: 'pending', label: 'Pending' },
              { value: 'approved', label: 'Approved' },
              { value: 'rejected', label: 'Rejected' },
              { value: 'archived', label: 'Archived' },
            ],
          },
        },
        actions: {
          edit: { isAccessible: canAccess(['super-admin', 'admin', 'manager']) },
          delete: { isAccessible: canDelete },
          approve: { icon: 'Check', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'approved' }); return { record, notice: { message: 'Approved', type: 'success' } }; } },
          archive: { icon: 'Archive', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'archived' }); return { record, notice: { message: 'Archived', type: 'success' } }; } },
        },
      },
    },

    // 3. VOLUNTEERS (Registration)
    { 
      resource: Volunteer,
      options: {
        properties: {
          status: {
            availableValues: [
              { value: 'pending', label: 'Pending' },
              { value: 'approved', label: 'Approved' },
              { value: 'rejected', label: 'Rejected' },
              { value: 'archived', label: 'Archived' },
            ],
          },
        },
        actions: {
          edit: { isAccessible: canAccess(['super-admin', 'admin', 'manager']) },
          delete: { isAccessible: canDelete },
          approve: { icon: 'Check', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'approved' }); return { record, notice: { message: 'Approved', type: 'success' } }; } },
          archive: { icon: 'Archive', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'archived' }); return { record, notice: { message: 'Archived', type: 'success' } }; } },
        },
      },
    },

    // 4. INTERNSHIPS (Registration)
    { 
      resource: Internship,
      options: {
        properties: {
          status: {
            availableValues: [
              { value: 'pending', label: 'Pending' },
              { value: 'approved', label: 'Approved' },
              { value: 'rejected', label: 'Rejected' },
              { value: 'archived', label: 'Archived' },
            ],
          },
        },
        actions: {
          edit: { isAccessible: canAccess(['super-admin', 'admin', 'manager']) },
          delete: { isAccessible: canDelete },
          approve: { icon: 'Check', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'approved' }); return { record, notice: { message: 'Approved', type: 'success' } }; } },
          archive: { icon: 'Archive', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'archived' }); return { record, notice: { message: 'Archived', type: 'success' } }; } },
        },
      },
    },

    // 5. EVENTS (with image carousel)
    { 
      resource: Event,
      options: {
        properties: {
          status: {
            availableValues: [
              { value: 'draft', label: 'Draft' },
              { value: 'published', label: 'Published' },
              { value: 'archived', label: 'Archived' },
            ],
          },
          images: { type: 'mixed' },
          year: { type: 'number' },
          month: { type: 'number' },
        },
        actions: {
          edit: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']) },
          new: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']) },
          delete: { isAccessible: canDelete },
          approve: { icon: 'Check', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'published' }); return { record, notice: { message: 'Published', type: 'success' } }; } },
          archive: { icon: 'Archive', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'archived' }); return { record, notice: { message: 'Archived', type: 'success' } }; } },
        },
      },
    },

    // 6. VIDEOS
    { 
      resource: Video,
      options: {
        properties: {
          status: {
            availableValues: [
              { value: 'draft', label: 'Draft' },
              { value: 'published', label: 'Published' },
              { value: 'archived', label: 'Archived' },
            ],
          },
          videoUrl: { type: 'string' },
        },
        actions: {
          edit: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']) },
          new: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']) },
          delete: { isAccessible: canDelete },
          approve: { icon: 'Check', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'published' }); return { record, notice: { message: 'Published', type: 'success' } }; } },
          archive: { icon: 'Archive', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'archived' }); return { record, notice: { message: 'Archived', type: 'success' } }; } },
        },
      },
    },

    // 7. BLOG
    { 
      resource: Blog,
      options: {
        properties: {
          status: {
            availableValues: [
              { value: 'draft', label: 'Draft' },
              { value: 'published', label: 'Published' },
              { value: 'archived', label: 'Archived' },
            ],
          },
          coverImage: { type: 'string' },
        },
        actions: {
          edit: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']) },
          new: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']) },
          delete: { isAccessible: canDelete },
          approve: { icon: 'Check', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'published' }); return { record, notice: { message: 'Published', type: 'success' } }; } },
          archive: { icon: 'Archive', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'archived' }); return { record, notice: { message: 'Archived', type: 'success' } }; } },
        },
      },
    },

    // 8. STORIES
    { 
      resource: Story,
      options: {
        properties: {
          status: {
            availableValues: [
              { value: 'draft', label: 'Draft' },
              { value: 'published', label: 'Published' },
              { value: 'archived', label: 'Archived' },
            ],
          },
          image: { type: 'string' },
        },
        actions: {
          list: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']) },
          show: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']) },
          edit: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']) },
          new: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']) },
          delete: { isAccessible: canDelete },
        },
      },
    },

    // 9. AWARDS
    { 
      resource: Award,
      options: {
        properties: {
          status: {
            availableValues: [
              { value: 'draft', label: 'Draft' },
              { value: 'published', label: 'Published' },
              { value: 'archived', label: 'Archived' },
            ],
          },
          year: { type: 'number' },
        },
        actions: {
          edit: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']) },
          new: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']) },
          delete: { isAccessible: canDelete },
          approve: { icon: 'Check', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'published' }); return { record, notice: { message: 'Published', type: 'success' } }; } },
          archive: { icon: 'Archive', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'archived' }); return { record, notice: { message: 'Archived', type: 'success' } }; } },
        },
      },
    },

    // 10. PUBLICATIONS
    { 
      resource: Publication,
      options: {
        properties: {
          status: {
            availableValues: [
              { value: 'draft', label: 'Draft' },
              { value: 'published', label: 'Published' },
              { value: 'archived', label: 'Archived' },
            ],
          },
        },
        actions: {
          edit: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']) },
          new: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']) },
          delete: { isAccessible: canDelete },
          approve: { icon: 'Check', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'published' }); return { record, notice: { message: 'Published', type: 'success' } }; } },
          archive: { icon: 'Archive', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'archived' }); return { record, notice: { message: 'Archived', type: 'success' } }; } },
        },
      },
    },

    // 11. FAQs
    { 
      resource: FAQ,
      options: {
        properties: {
          status: {
            availableValues: [
              { value: 'active', label: 'Active' },
              { value: 'archived', label: 'Archived' },
            ],
          },
        },
        actions: {
          edit: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']) },
          new: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']) },
          delete: { isAccessible: canDelete },
          approve: { icon: 'Check', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'active' }); return { record, notice: { message: 'Activated', type: 'success' } }; } },
          archive: { icon: 'Archive', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'archived' }); return { record, notice: { message: 'Archived', type: 'success' } }; } },
        },
      },
    },

    // 12. CONTACTS (Inquiries)
    { 
      resource: Contact,
      options: {
        properties: {
          status: {
            availableValues: [
              { value: 'new', label: 'New' },
              { value: 'read', label: 'Read' },
              { value: 'replied', label: 'Replied' },
              { value: 'archived', label: 'Archived' },
            ],
          },
        },
        actions: {
          edit: { isAccessible: canAccess(['super-admin', 'admin', 'manager']) },
          delete: { isAccessible: canDelete },
          approve: { icon: 'Check', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'replied' }); return { record, notice: { message: 'Marked as replied', type: 'success' } }; } },
          archive: { icon: 'Archive', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'archived' }); return { record, notice: { message: 'Archived', type: 'success' } }; } },
        },
      },
    },

    // 13. TEACHERS (Staff/Team Members)
    { 
      resource: Teacher,
      options: {
        properties: {
          status: {
            availableValues: [
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'archived', label: 'Archived' },
            ],
          },
        },
        actions: {
          edit: { isAccessible: canAccess(['super-admin', 'admin', 'manager']) },
          new: { isAccessible: canAccess(['super-admin', 'admin', 'manager']) },
          delete: { isAccessible: canDelete },
          approve: { icon: 'Check', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'active' }); return { record, notice: { message: 'Activated', type: 'success' } }; } },
          archive: { icon: 'Archive', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'archived' }); return { record, notice: { message: 'Archived', type: 'success' } }; } },
        },
      },
    },

    // 14. SITE SETTINGS (Logo + Hero Images)
    { 
      resource: SiteConfig,
      options: {
        properties: {
          logoUrl: { type: 'string' },
          heroImages: { type: 'mixed' },
        },
        actions: {
          edit: { isAccessible: canAccess(['super-admin', 'admin']) },
          delete: { isAccessible: canAccess(['super-admin']) },
        },
      },
    },

    // 15. CSR (Corporate Social Responsibility)
    { 
      resource: CSR,
      options: {
        properties: {
          status: {
            availableValues: [
              { value: 'pending', label: 'Pending' },
              { value: 'under-review', label: 'Under Review' },
              { value: 'approved', label: 'Approved' },
              { value: 'rejected', label: 'Rejected' },
              { value: 'archived', label: 'Archived' },
            ],
          },
          csrBudget: { type: 'number' },
          focusAreas: { type: 'mixed' },
          documents: { type: 'mixed' },
        },
        actions: {
          edit: { isAccessible: canAccess(['super-admin', 'admin', 'manager']) },
          new: { isAccessible: canAccess(['super-admin', 'admin', 'manager']) },
          delete: { isAccessible: canDelete },
          approve: { icon: 'Check', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'approved' }); return { record, notice: { message: 'Approved', type: 'success' } }; } },
          archive: { icon: 'Archive', actionType: 'record', isAccessible: canAccess(['super-admin', 'admin', 'manager']), handler: async (req, res, { record }) => { await record.update({ status: 'archived' }); return { record, notice: { message: 'Archived', type: 'success' } }; } },
        },
      },
    },
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'Sabri Helpage Admin',
    logo: false,
    softwareBrothers: false,
    theme: {
      colors: {
        primary100: '#FF7A42',
        primary80: '#FF8F5C',
        primary60: '#FFA476',
        primary40: '#FFB990',
        primary20: '#FFCEAA',
        accent: '#4A90E2',
        love: '#E74C3C',
        grey100: '#2C3E50',
        grey80: '#34495E',
        grey60: '#7F8C8D',
        grey40: '#BDC3C7',
        grey20: '#ECF0F1',
        filterBg: '#FFF8F0',
        hoverBg: '#FFE4D6',
      },
    },
  },
  dashboard: {
    component: AdminJS.bundle('./components/dashboard.jsx'),
  },
});

// Authentication for AdminJS
const bcrypt = require('bcryptjs');
const session = require('express-session');

const authenticate = async (email, password) => {
  // Must select password explicitly since it has select: false
  const user = await User.findOne({ email }).select('+password');
  if (!user) return null;
  
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  
  // Only allow admin roles to access admin panel
  if (!['editor', 'manager', 'admin', 'super-admin'].includes(user.role)) {
    return null;
  }
  
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    title: user.role.charAt(0).toUpperCase() + user.role.slice(1).replace('-', ' '),
  };
};

const signup = async (email, password, name) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    name,
    role: 'editor', // Default role for new signups
  });
  
  return {
    id: newUser._id.toString(),
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
    title: newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1),
  };
};

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: process.env.ADMINJS_COOKIE_SECRET || 'super-secret-cookie-password-change-in-production',
  },
  null,
  {
    resave: false,
    saveUninitialized: false,
    secret: process.env.ADMINJS_COOKIE_SECRET || 'super-secret-cookie-password-change-in-production',
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
    name: 'adminjs',
  }
);

app.use(adminJs.options.rootPath, adminRouter);

// Body parser middleware AFTER AdminJS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve custom login page
app.use(express.static(path.join(__dirname, 'public')));

// Serve custom login and signup pages
app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/admin/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Add signup endpoint
app.post('/admin/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields required' });
    }
    
    const user = await signup(email, password, name);
    
    // Auto-login after signup
    req.session.adminUser = user;
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ error: 'Session error' });
      }
      res.json({ 
        success: true, 
        message: 'Account created successfully',
        redirectUrl: '/admin'
      });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Health Check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'NGO Backend API is running',
    version: '1.0.0',
    adminPanel: '/admin',
  });
});

// Stats endpoint for dashboard
app.get('/api/stats', async (req, res) => {
  try {
    const stats = {
      users: await User.countDocuments(),
      blogs: await Blog.countDocuments(),
      stories: await Story.countDocuments(),
      events: await Event.countDocuments(),
      videos: await Video.countDocuments(),
      contacts: await Contact.countDocuments(),
      volunteers: await Volunteer.countDocuments(),
      donors: await Donor.countDocuments(),
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// API Info Route
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'NGO Backend API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/user',
      blogs: '/api/blogs',
      events: '/api/events',
      stories: '/api/stories',
      teachers: '/api/teachers',
      contacts: '/api/contacts',
      awards: '/api/awards',
      faqs: '/api/faqs',
      publications: '/api/publications',
      videos: '/api/videos',
      donors: '/api/donors',
      volunteers: '/api/volunteers',
      internships: '/api/internships',
      clubs: '/api/clubs',
      config: '/api/config',
      upload: '/api/upload',
    },
    adminPanel: '/admin',
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/teacherRoutes'));
app.use('/api', require('./routes/contactRoutes'));
app.use('/api', require('./routes/blogRoutes'));
app.use('/api', require('./routes/storyRoutes'));
app.use('/api', require('./routes/eventRoutes'));
app.use('/api', require('./routes/awardRoutes'));
app.use('/api', require('./routes/faqRoutes'));
app.use('/api', require('./routes/publicationRoutes'));
app.use('/api', require('./routes/internshipRoutes'));
app.use('/api', require('./routes/volunteerRoutes'));
app.use('/api', require('./routes/donorRoutes'));
app.use('/api', require('./routes/videoRoutes'));
app.use('/api', require('./routes/clubRoutes'));
app.use('/api', require('./routes/configRoutes'));
app.use('/api', require('./routes/uploadRoutes'));
app.use('/api', require('./routes/csrRoutes'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    // Connect to database
    const connected = await connectDB();
    
    if (!connected) {
      console.warn('⚠️  MongoDB not connected. Server will run but database features won\'t work.');
    }

    // Start server
    app.listen(PORT, () => {
      console.log('\n' + '='.repeat(50));
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 API: http://localhost:${PORT}/api`);
      console.log('='.repeat(50) + '\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

start();

module.exports = app;
