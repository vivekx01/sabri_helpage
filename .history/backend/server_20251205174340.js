require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
// AdminJS removed

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
const PageContent = require('./models/PageContent');
const { pages: PAGE_REGISTRY } = require('./config/adminPages');
const CauseContent = require('./models/CauseContent');
const Testimonial = require('./models/Testimonial');

// CORS: restrict origins in production via env
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true,
  credentials: true,
}));

// Basic security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// Rate limit API to mitigate abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Prevent MongoDB operator injection
app.use(mongoSanitize());

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

// AdminJS disabled
/* const adminJs = new AdminJS({
  resources: [
    // USER MANAGEMENT (Super Admin only)
    { 
      resource: User,
      options: {
        navigation: { name: 'System', icon: 'User' },
        properties: {
          password: { 
            isVisible: { edit: true, show: false, list: false, filter: false },
            type: 'password',
          },
          status: {
            availableValues: [
              { value: 'pending', label: 'Pending' },
              { value: 'active', label: 'Active' },
              { value: 'approved', label: 'Approved' },
              { value: 'archived', label: 'Archived' },
            ],
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
          show: { isAccessible: canAccess(['super-admin', 'admin']), label: 'Details' },
          edit: { isAccessible: canAccess(['super-admin', 'admin']) },
          new: { isAccessible: canAccess(['super-admin', 'admin']) },
          delete: { isAccessible: canAccess(['super-admin']) },
          approve: {
            icon: 'Check',
            actionType: 'record',
            isAccessible: canAccess(['super-admin', 'admin']),
            handler: async (req, res, { record }) => {
              await record.update({ status: 'approved' });
              return { record, notice: { message: 'User approved', type: 'success' } };
            },
          },
          archive: {
            icon: 'Archive',
            actionType: 'record',
            isAccessible: canAccess(['super-admin', 'admin']),
            handler: async (req, res, { record }) => {
              await record.update({ status: 'archived' });
              return { record, notice: { message: 'User archived', type: 'success' } };
            },
          },
        },
      },
    },

    // 1. DONOR DATA
    { 
      resource: Donor,
      options: {
        navigation: { name: 'Engagement', icon: 'Heart' },
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
          show: { isAccessible: canAccess(['super-admin', 'admin', 'manager']), label: 'Details' },
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
        navigation: { name: 'Engagement', icon: 'Users' },
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
          show: { isAccessible: canAccess(['super-admin', 'admin', 'manager']), label: 'Details' },
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
        navigation: { name: 'Engagement', icon: 'Users' },
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
          show: { isAccessible: canAccess(['super-admin', 'admin', 'manager']), label: 'Details' },
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
        navigation: { name: 'Engagement', icon: 'Briefcase' },
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
          show: { isAccessible: canAccess(['super-admin', 'admin', 'manager']), label: 'Details' },
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
        navigation: { name: 'Content', icon: 'Calendar' },
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
          show: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']), label: 'Details' },
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
        navigation: { name: 'Content', icon: 'Play' },
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
          show: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']), label: 'Details' },
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
        navigation: { name: 'Content', icon: 'Document' },
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
          show: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']), label: 'Details' },
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
        navigation: { name: 'Content', icon: 'Book' },
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
          show: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']), label: 'Details' },
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
        navigation: { name: 'Content', icon: 'Trophy' },
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
          show: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']), label: 'Details' },
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
        navigation: { name: 'Content', icon: 'Document' },
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
          show: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']), label: 'Details' },
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
        navigation: { name: 'Content', icon: 'QuestionMarkCircle' },
        properties: {
          status: {
            availableValues: [
              { value: 'active', label: 'Active' },
              { value: 'archived', label: 'Archived' },
            ],
          },
        },
        actions: {
          show: { isAccessible: canAccess(['super-admin', 'admin', 'manager', 'editor']), label: 'Details' },
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
        navigation: { name: 'Engagement', icon: 'Inbox' },
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
          show: { isAccessible: canAccess(['super-admin', 'admin', 'manager']), label: 'Details' },
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
        navigation: { name: 'Content', icon: 'UserGroup' },
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
          show: { isAccessible: canAccess(['super-admin', 'admin', 'manager']), label: 'Details' },
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
        navigation: { name: 'Settings', icon: 'Cog' },
        properties: {
          logoUrl: { type: 'string' },
          heroImages: { type: 'mixed' },
        },
        actions: {
          show: { isAccessible: canAccess(['super-admin', 'admin']), label: 'Details' },
          edit: { isAccessible: canAccess(['super-admin', 'admin']) },
          delete: { isAccessible: canAccess(['super-admin']) },
        },
      },
    },

    // Editable Page Content (section-based like CMS)
    { 
      resource: PageContent, 
      options: { 
        id: 'Pages',
        navigation: { name: 'Content', icon: 'Document' },
        properties: {
          slug: { 
            isTitle: true,
            availableValues: PAGE_REGISTRY.map(p => ({ value: p.slug, label: p.name }))
          },
          title: { type: 'string' },
          eyebrow: { type: 'string' },
          subtitle: { type: 'string' },
          heroImage: { type: 'string' },
          sections: { 
            type: 'mixed',
            components: {
              edit: AdminJS.bundle('./components/pages/SectionsEditor.jsx')
            }
          },
          'sections.key': { type: 'string' },
          'sections.type': {
            availableValues: [
              { value: 'heading', label: 'Heading' },
              { value: 'paragraph', label: 'Paragraph' },
              { value: 'list', label: 'List' },
              { value: 'image', label: 'Image' },
              { value: 'cta', label: 'CTA Button' },
            ],
          },
          'sections.level': { type: 'number' },
          'sections.text': { type: 'textarea' },
          'sections.items': { type: 'mixed' },
          'sections.imageUrl': { type: 'string' },
          'sections.altText': { type: 'string' },
          'sections.href': { type: 'string' },
          'sections.label': { type: 'string' },
          'sections.order': { type: 'number' },
          status: {
            availableValues: [
              { value: 'draft', label: 'Draft' },
              { value: 'published', label: 'Published' },
              { value: 'archived', label: 'Archived' },
            ],
          },
        },
        listProperties: ['slug', 'title', 'status', 'updatedAt'],
        filterProperties: ['slug', 'status', 'updatedAt'],
        editProperties: ['slug', 'title', 'eyebrow', 'subtitle', 'heroImage', 'sections', 'status'],
        showProperties: ['slug', 'title', 'eyebrow', 'subtitle', 'heroImage', 'sections', 'status', 'createdAt', 'updatedAt'],
        actions: { 
          list: { isAccessible: isAdmin },
          show: { isAccessible: isAdmin },
          edit: { isAccessible: isAdmin }, 
          new: { isAccessible: isAdmin }, 
          delete: { isAccessible: isSuperAdmin },
          initSections: {
            icon: 'Tools',
            actionType: 'record',
            isAccessible: isAdmin,
            handler: async (req, res, { record }) => {
              const slug = record.param('slug');
              const pageDef = PAGE_REGISTRY.find(p => p.slug === slug);
              if (!pageDef) {
                return { record, notice: { message: 'Page not in registry', type: 'error' } };
              }
              const sections = record.param('sections') || [];
              const keys = new Set(sections.map(s => s.key));
              let order = sections.length;
              for (const key of pageDef.requiredKeys) {
                if (!keys.has(key)) {
                  sections.push({ key, type: 'paragraph', text: '', order });
                  order += 1;
                }
              }
              await record.update({ sections });
              return { record, notice: { message: 'Sections initialized', type: 'success' } };
            },
          },
          manage: {
            actionType: 'resource',
            icon: 'PencilSquare',
            label: 'Pages Editor',
            component: AdminJS.bundle('./components/pages/ManagePage.jsx'),
            isAccessible: isAdmin,
            handler: async (req, res, { h }) => {
              const { method } = req;
              if (method && method.toLowerCase() === 'post') {
                const { slug, title, eyebrow, subtitle, heroImage, sections } = req.payload || {};
                if (!slug) {
                  return {
                    notice: { message: 'Slug is required', type: 'error' },
                    data: { pages: PAGE_REGISTRY }
                  };
                }
                const body = { title, eyebrow, subtitle, heroImage };
                if (Array.isArray(sections)) body.sections = sections;
                const updated = await PageContent.findOneAndUpdate(
                  { slug },
                  { $set: { slug, ...body } },
                  { upsert: true, new: true }
                );
                return {
                  notice: { message: 'Page saved', type: 'success' },
                  data: { page: updated, pages: PAGE_REGISTRY }
                };
              }
              // GET handler: return current page by slug (if provided) and registry
              const { slug } = req.query || {};
              let page = null;
              if (slug) {
                page = await PageContent.findOne({ slug }).lean();
              }
              return {
                data: { page, pages: PAGE_REGISTRY }
              };
            }
          }
        } 
      } 
    },
    // Editable Cause Content (blocks per cause page)
    { 
      resource: CauseContent, 
      options: { 
        properties: {
          slug: { isTitle: true },
          title: { type: 'string' },
          eyebrow: { type: 'string' },
          subtitle: { type: 'string' },
          bannerImage: { type: 'string' },
          contentBlocks: { type: 'mixed' },
          'contentBlocks.type': {
            availableValues: [
              { value: 'heading', label: 'Heading' },
              { value: 'paragraph', label: 'Paragraph' },
              { value: 'list', label: 'List' },
              { value: 'image', label: 'Image' },
              { value: 'cta', label: 'CTA Button' },
            ],
          },
          'contentBlocks.level': { type: 'number' },
          'contentBlocks.text': { type: 'textarea' },
          'contentBlocks.items': { type: 'mixed' },
          'contentBlocks.imageUrl': { type: 'string' },
          'contentBlocks.altText': { type: 'string' },
          'contentBlocks.href': { type: 'string' },
          'contentBlocks.label': { type: 'string' },
          status: {
            availableValues: [
              { value: 'draft', label: 'Draft' },
              { value: 'published', label: 'Published' },
              { value: 'archived', label: 'Archived' },
            ],
          },
        },
        listProperties: ['slug', 'title', 'status', 'updatedAt'],
        editProperties: ['slug', 'title', 'eyebrow', 'subtitle', 'bannerImage', 'contentBlocks', 'status'],
        showProperties: ['slug', 'title', 'eyebrow', 'subtitle', 'bannerImage', 'contentBlocks', 'status', 'createdAt', 'updatedAt'],
        actions: { 
          list: { isAccessible: isAdmin },
          show: { isAccessible: isAdmin },
          edit: { isAccessible: isAdmin }, 
          new: { isAccessible: isAdmin }, 
          delete: { isAccessible: isSuperAdmin } 
        } 
      } 
    },
    // Testimonials
    { resource: Testimonial, options: { navigation: { name: 'Content', icon: 'ChatBubbleBottomCenterText' }, actions: { show: { isAccessible: isAdmin, label: 'Details' }, edit: { isAccessible: isAdmin }, new: { isAccessible: isAdmin }, delete: { isAccessible: isSuperAdmin } } } },

    // 15. CSR (Corporate Social Responsibility)
    { 
      resource: CSR,
      options: {
        navigation: { name: 'Content', icon: 'BuildingOffice2' },
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
          show: { isAccessible: canAccess(['super-admin', 'admin', 'manager']), label: 'Details' },
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
}); */

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

// AdminJS routes removed

// Body parser middleware AFTER AdminJS
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Serve custom login page
// Static admin assets disabled

// Serve custom login and signup pages
// Admin login route removed

// Admin signup route removed

// Add signup endpoint
// Admin signup endpoint removed

// Health Check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'NGO Backend API is running',
    version: '1.0.0',
    adminPanel: null,
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
    adminPanel: null,
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
app.use('/api', require('./routes/contentRoutes'));
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
