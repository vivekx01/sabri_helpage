/**
 * Enhanced AdminJS Configuration
 * Complete admin panel with custom actions, colors, and filters
 */

const AdminJS = require('adminjs');
const { canAccessAdmin, canEdit, canDelete, canApprove, canManageUsers, canManageSiteConfig, canViewDonors, canViewContacts, isSuperAdmin } = require('./middleware/rbac');

// Import all models
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
const CSRSubmission = require('./models/CSRSubmission');

/**
 * Custom Actions for Approval Workflow
 */
const approveAction = {
  actionType: 'record',
  icon: 'CheckCircle',
  label: 'Approve',
  variant: 'success',
  isVisible: canApprove,
  handler: async (request, response, context) => {
    const { record, resource } = context;
    await record.update({ status: 'approved', reviewedAt: new Date() });
    return {
      record: record.toJSON(context.currentAdmin),
      notice: {
        message: 'Successfully approved!',
        type: 'success',
      },
    };
  },
};

const rejectAction = {
  actionType: 'record',
  icon: 'XCircle',
  label: 'Reject',
  variant: 'danger',
  isVisible: canApprove,
  handler: async (request, response, context) => {
    const { record } = context;
    await record.update({ status: 'rejected', reviewedAt: new Date() });
    return {
      record: record.toJSON(context.currentAdmin),
      notice: {
        message: 'Rejected',
        type: 'info',
      },
    };
  },
};

const archiveAction = {
  actionType: 'record',
  icon: 'Archive',
  label: 'Archive',
  variant: 'light',
  isVisible: canDelete,
  handler: async (request, response, context) => {
    const { record } = context;
    await record.update({ status: 'archived' });
    return {
      record: record.toJSON(context.currentAdmin),
      notice: {
        message: 'Archived successfully',
        type: 'success',
      },
    };
  },
};

/**
 * Common status property configuration
 */
const getStatusProperty = (statuses) => ({
  status: {
    availableValues: statuses.map(s => ({
      value: s.value,
      label: s.label
    })),
    components: {
      list: AdminJS.bundle('./components/StatusBadge'),
    },
  },
});

/**
 * Create AdminJS Configuration
 */
const createAdminConfig = () => {
  return {
    resources: [
      // 🔐 USER MANAGEMENT
      {
        resource: User,
        options: {
          navigation: { name: '🔐 System', icon: 'User' },
          properties: {
            password: {
              isVisible: { edit: true, show: false, list: false, filter: false },
              type: 'password',
            },
            role: {
              availableValues: [
                { value: 'editor', label: '✍️ Editor' },
                { value: 'manager', label: '📊 Manager' },
                { value: 'admin', label: '👨‍💼 Admin' },
                { value: 'super-admin', label: '🔐 Super Admin' },
              ],
            },
            email: { isTitle: true },
          },
          actions: {
            list: { isAccessible: canManageUsers },
            show: { isAccessible: canManageUsers },
            edit: { isAccessible: canManageUsers },
            new: { isAccessible: canManageUsers },
            delete: { isAccessible: isSuperAdmin },
          },
          listProperties: ['name', 'email', 'role', 'createdAt'],
          filterProperties: ['name', 'email', 'role'],
          showProperties: ['name', 'email', 'role', 'createdAt', 'updatedAt'],
        },
      },

      // 💰 DONOR MANAGEMENT
      {
        resource: Donor,
        options: {
          navigation: { name: '💰 Fundraising', icon: 'DollarSign' },
          properties: {
            name: { isTitle: true },
            ...getStatusProperty([
              { value: 'pending', label: '⏳ Pending' },
              { value: 'approved', label: '✅ Approved' },
              { value: 'archived', label: '📦 Archived' },
            ]),
            amount: { type: 'number' },
          },
          actions: {
            list: { isAccessible: canViewDonors },
            show: { isAccessible: canViewDonors },
            edit: { isAccessible: canViewDonors },
            new: { isAccessible: canViewDonors },
            delete: { isAccessible: canDelete },
            approve: approveAction,
            archive: archiveAction,
          },
          listProperties: ['name', 'email', 'amount', 'status', 'createdAt'],
          filterProperties: ['name', 'email', 'status', 'amount'],
        },
      },

      // 📝 CLUB REGISTRATIONS
      {
        resource: ClubRegistration,
        options: {
          navigation: { name: '📝 Registrations', icon: 'Users' },
          properties: {
            name: { isTitle: true },
            ...getStatusProperty([
              { value: 'pending', label: '⏳ Pending' },
              { value: 'approved', label: '✅ Approved' },
              { value: 'rejected', label: '❌ Rejected' },
              { value: 'archived', label: '📦 Archived' },
            ]),
          },
          actions: {
            list: { isAccessible: canEdit },
            show: { isAccessible: canEdit },
            edit: { isAccessible: canApprove },
            new: { isAccessible: canApprove },
            delete: { isAccessible: canDelete },
            approve: approveAction,
            reject: rejectAction,
            archive: archiveAction,
          },
          listProperties: ['name', 'phone', 'college', 'city', 'status', 'createdAt'],
          filterProperties: ['name', 'college', 'city', 'status'],
        },
      },

      // 🤝 VOLUNTEERS
      {
        resource: Volunteer,
        options: {
          navigation: { name: '📝 Registrations', icon: 'Heart' },
          properties: {
            name: { isTitle: true },
            ...getStatusProperty([
              { value: 'pending', label: '⏳ Pending' },
              { value: 'approved', label: '✅ Approved' },
              { value: 'rejected', label: '❌ Rejected' },
              { value: 'archived', label: '📦 Archived' },
            ]),
          },
          actions: {
            list: { isAccessible: canEdit },
            show: { isAccessible: canEdit },
            edit: { isAccessible: canApprove },
            new: { isAccessible: canApprove },
            delete: { isAccessible: canDelete },
            approve: approveAction,
            reject: rejectAction,
            archive: archiveAction,
          },
          listProperties: ['name', 'phone', 'skills', 'status', 'createdAt'],
          filterProperties: ['name', 'status'],
        },
      },

      // 💼 INTERNSHIPS
      {
        resource: Internship,
        options: {
          navigation: { name: '📝 Registrations', icon: 'Briefcase' },
          properties: {
            name: { isTitle: true },
            ...getStatusProperty([
              { value: 'pending', label: '⏳ Pending' },
              { value: 'approved', label: '✅ Approved' },
              { value: 'rejected', label: '❌ Rejected' },
              { value: 'archived', label: '📦 Archived' },
            ]),
          },
          actions: {
            list: { isAccessible: canEdit },
            show: { isAccessible: canEdit },
            edit: { isAccessible: canApprove },
            new: { isAccessible: canApprove },
            delete: { isAccessible: canDelete },
            approve: approveAction,
            reject: rejectAction,
            archive: archiveAction,
          },
          listProperties: ['name', 'email', 'resumeUrl', 'status', 'createdAt'],
          filterProperties: ['name', 'email', 'status'],
        },
      },

      // 🏢 CSR SUBMISSIONS
      {
        resource: CSRSubmission,
        options: {
          navigation: { name: '📝 Registrations', icon: 'FileText' },
          properties: {
            organizationName: { isTitle: true },
            ...getStatusProperty([
              { value: 'pending', label: '⏳ Pending' },
              { value: 'under-review', label: '👁️ Under Review' },
              { value: 'approved', label: '✅ Approved' },
              { value: 'rejected', label: '❌ Rejected' },
              { value: 'archived', label: '📦 Archived' },
            ]),
            budget: { type: 'number' },
            focusArea: {
              availableValues: [
                { value: 'Education', label: '📚 Education' },
                { value: 'Healthcare', label: '🏥 Healthcare' },
                { value: 'Environment', label: '🌱 Environment' },
                { value: 'Women Empowerment', label: '👩 Women Empowerment' },
                { value: 'Elderly Care', label: '🤝 Elderly Care' },
                { value: 'Mental Health', label: '❤️ Mental Health' },
                { value: 'Other', label: '📌 Other' },
              ],
            },
          },
          actions: {
            list: { isAccessible: canApprove },
            show: { isAccessible: canApprove },
            edit: { isAccessible: canApprove },
            new: { isAccessible: canApprove },
            delete: { isAccessible: canDelete },
            approve: approveAction,
            reject: rejectAction,
            archive: archiveAction,
          },
          listProperties: ['organizationName', 'proposalTitle', 'focusArea', 'budget', 'status', 'createdAt'],
          filterProperties: ['organizationName', 'focusArea', 'status'],
        },
      },

      // 📅 EVENTS
      {
        resource: Event,
        options: {
          navigation: { name: '📅 Content', icon: 'Calendar' },
          properties: {
            title: { isTitle: true },
            ...getStatusProperty([
              { value: 'draft', label: '📝 Draft' },
              { value: 'published', label: '✅ Published' },
              { value: 'archived', label: '📦 Archived' },
            ]),
            year: { type: 'number' },
            month: {
              type: 'number',
              availableValues: [
                { value: 1, label: 'January' },
                { value: 2, label: 'February' },
                { value: 3, label: 'March' },
                { value: 4, label: 'April' },
                { value: 5, label: 'May' },
                { value: 6, label: 'June' },
                { value: 7, label: 'July' },
                { value: 8, label: 'August' },
                { value: 9, label: 'September' },
                { value: 10, label: 'October' },
                { value: 11, label: 'November' },
                { value: 12, label: 'December' },
              ],
            },
            images: { type: 'mixed' },
          },
          actions: {
            list: { isAccessible: canEdit },
            show: { isAccessible: canEdit },
            edit: { isAccessible: canEdit },
            new: { isAccessible: canEdit },
            delete: { isAccessible: canDelete },
            archive: archiveAction,
          },
          listProperties: ['title', 'year', 'month', 'status', 'createdAt'],
          filterProperties: ['title', 'year', 'month', 'status'],
        },
      },

      // 🎥 VIDEOS
      {
        resource: Video,
        options: {
          navigation: { name: '📅 Content', icon: 'Video' },
          properties: {
            title: { isTitle: true },
            ...getStatusProperty([
              { value: 'draft', label: '📝 Draft' },
              { value: 'published', label: '✅ Published' },
              { value: 'archived', label: '📦 Archived' },
            ]),
          },
          actions: {
            list: { isAccessible: canEdit },
            show: { isAccessible: canEdit },
            edit: { isAccessible: canEdit },
            new: { isAccessible: canEdit },
            delete: { isAccessible: canDelete },
            archive: archiveAction,
          },
          listProperties: ['title', 'videoUrl', 'status', 'createdAt'],
          filterProperties: ['title', 'status'],
        },
      },

      // 📝 BLOGS
      {
        resource: Blog,
        options: {
          navigation: { name: '✍️ Publications', icon: 'Book' },
          properties: {
            title: { isTitle: true },
            ...getStatusProperty([
              { value: 'draft', label: '📝 Draft' },
              { value: 'published', label: '✅ Published' },
              { value: 'archived', label: '📦 Archived' },
            ]),
            content: { type: 'richtext' },
          },
          actions: {
            list: { isAccessible: canEdit },
            show: { isAccessible: canEdit },
            edit: { isAccessible: canEdit },
            new: { isAccessible: canEdit },
            delete: { isAccessible: canDelete },
            archive: archiveAction,
          },
          listProperties: ['title', 'author', 'status', 'publishedAt'],
          filterProperties: ['title', 'author', 'status', 'tags'],
        },
      },

      // 📖 STORIES
      {
        resource: Story,
        options: {
          navigation: { name: '✍️ Publications', icon: 'BookOpen' },
          properties: {
            title: { isTitle: true },
            ...getStatusProperty([
              { value: 'draft', label: '📝 Draft' },
              { value: 'published', label: '✅ Published' },
              { value: 'archived', label: '📦 Archived' },
            ]),
          },
          actions: {
            list: { isAccessible: canEdit },
            show: { isAccessible: canEdit },
            edit: { isAccessible: canEdit },
            new: { isAccessible: canEdit },
            delete: { isAccessible: canDelete },
            archive: archiveAction,
          },
          listProperties: ['title', 'category', 'status', 'createdAt'],
          filterProperties: ['title', 'category', 'status'],
        },
      },

      // 🏆 AWARDS
      {
        resource: Award,
        options: {
          navigation: { name: '🏆 Recognition', icon: 'Award' },
          properties: {
            title: { isTitle: true },
            ...getStatusProperty([
              { value: 'draft', label: '📝 Draft' },
              { value: 'published', label: '✅ Published' },
              { value: 'archived', label: '📦 Archived' },
            ]),
            year: { type: 'number' },
          },
          actions: {
            list: { isAccessible: canEdit },
            show: { isAccessible: canEdit },
            edit: { isAccessible: canEdit },
            new: { isAccessible: canEdit },
            delete: { isAccessible: canDelete },
            archive: archiveAction,
          },
          listProperties: ['title', 'year', 'status', 'createdAt'],
          filterProperties: ['title', 'year', 'status'],
        },
      },

      // 📄 PUBLICATIONS
      {
        resource: Publication,
        options: {
          navigation: { name: '🏆 Recognition', icon: 'FileText' },
          properties: {
            title: { isTitle: true },
            ...getStatusProperty([
              { value: 'draft', label: '📝 Draft' },
              { value: 'published', label: '✅ Published' },
              { value: 'archived', label: '📦 Archived' },
            ]),
            year: { type: 'number' },
          },
          actions: {
            list: { isAccessible: canEdit },
            show: { isAccessible: canEdit },
            edit: { isAccessible: canEdit },
            new: { isAccessible: canEdit },
            delete: { isAccessible: canDelete },
            archive: archiveAction,
          },
          listProperties: ['title', 'year', 'status', 'createdAt'],
          filterProperties: ['title', 'year', 'status'],
        },
      },

      // ❓ FAQ
      {
        resource: FAQ,
        options: {
          navigation: { name: '❓ Support', icon: 'HelpCircle' },
          properties: {
            question: { isTitle: true },
            ...getStatusProperty([
              { value: 'active', label: '✅ Active' },
              { value: 'archived', label: '📦 Archived' },
            ]),
            answer: { type: 'textarea' },
          },
          actions: {
            list: { isAccessible: canEdit },
            show: { isAccessible: canEdit },
            edit: { isAccessible: canEdit },
            new: { isAccessible: canEdit },
            delete: { isAccessible: canDelete },
            archive: archiveAction,
          },
          listProperties: ['question', 'status', 'createdAt'],
          filterProperties: ['status'],
        },
      },

      // 📞 CONTACTS
      {
        resource: Contact,
        options: {
          navigation: { name: '📞 Communications', icon: 'Mail' },
          properties: {
            name: { isTitle: true },
            ...getStatusProperty([
              { value: 'new', label: '🆕 New' },
              { value: 'read', label: '👁️ Read' },
              { value: 'replied', label: '✅ Replied' },
              { value: 'archived', label: '📦 Archived' },
            ]),
          },
          actions: {
            list: { isAccessible: canViewContacts },
            show: { isAccessible: canViewContacts },
            edit: { isAccessible: canViewContacts },
            delete: { isAccessible: canDelete },
            archive: archiveAction,
          },
          listProperties: ['name', 'email', 'subject', 'status', 'createdAt'],
          filterProperties: ['name', 'email', 'status'],
        },
      },

      // 👨‍🏫 TEACHERS
      {
        resource: Teacher,
        options: {
          navigation: { name: '👥 Team', icon: 'Users' },
          properties: {
            name: { isTitle: true },
            ...getStatusProperty([
              { value: 'active', label: '✅ Active' },
              { value: 'inactive', label: '⏸️ Inactive' },
              { value: 'archived', label: '📦 Archived' },
            ]),
          },
          actions: {
            list: { isAccessible: canApprove },
            show: { isAccessible: canApprove },
            edit: { isAccessible: canApprove },
            new: { isAccessible: canApprove },
            delete: { isAccessible: canDelete },
            archive: archiveAction,
          },
          listProperties: ['name', 'status', 'createdAt'],
          filterProperties: ['name', 'status'],
        },
      },

      // ⚙️ SITE CONFIG
      {
        resource: SiteConfig,
        options: {
          navigation: { name: '⚙️ Settings', icon: 'Settings' },
          properties: {
            logoUrl: { type: 'string' },
            heroImages: { type: 'mixed' },
            carouselImages: { type: 'mixed' },
          },
          actions: {
            list: { isAccessible: canManageSiteConfig },
            show: { isAccessible: canManageSiteConfig },
            edit: { isAccessible: canManageSiteConfig },
            new: { isAccessible: canManageSiteConfig },
            delete: { isAccessible: isSuperAdmin },
          },
        },
      },
    ],

    // Global configuration
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
          bg: '#F5F7FA',
          white: '#FFFFFF',
          error: '#E74C3C',
          success: '#2ECC71',
          info: '#3498DB',
          warning: '#F39C12',
        },
      },
    },
    dashboard: {
      component: AdminJS.bundle('./components/dashboard.jsx'),
    },
    locale: {
      language: 'en',
      translations: {
        en: {
          actions: {
            approve: 'Approve',
            reject: 'Reject',
            archive: 'Archive',
          },
        },
      },
    },
  };
};

module.exports = createAdminConfig;
