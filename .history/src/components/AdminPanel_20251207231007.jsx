import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Settings, Menu, X, Search, Edit, Check, Archive, Trash2, Users, Lock, UserPlus, LogIn, ChevronRight, Plus, GripVertical, Image, Layout, Shield, UserCog, Eye, LogOut, AlertCircle } from 'lucide-react';
import api from '../services/api';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSection, setEditingSection] = useState(null);
  const [pagesList, setPagesList] = useState([]);
  const [pageContent, setPageContent] = useState(null);
  const [saving, setSaving] = useState(false);

  const pageConfigs = {
    'HomePage.jsx': {
      sections: [
        { id: 'hero', title: 'Hero Section', fields: ['heading', 'subheading', 'cta_button', 'background_image'] },
        { id: 'what-we-stand-for', title: 'What We Stand For', fields: ['title', 'description', 'values'] },
        { id: 'milestones', title: 'Milestones & Stats', fields: ['years_active', 'people_helped', 'projects', 'volunteers'] },
        { id: 'core-causes', title: 'Core Causes', fields: ['causes_list', 'cause_images'] },
        { id: 'supporters', title: 'Supporters Section', fields: ['partner_logos', 'testimonials'] },
        { id: 'stories', title: 'Stories Section', fields: ['featured_stories', 'story_cta'] }
      ]
    },
    'AboutPage.jsx': {
      sections: [
        { id: 'overview', title: 'Overview', fields: ['mission', 'vision', 'history'] },
        { id: 'governing-body', title: 'Governing Body', fields: ['board_members', 'advisory_team'] }
      ]
    },
    'SociofarePage.jsx': {
      sections: [
        { id: 'intro', title: 'Introduction', fields: ['heading', 'description'] },
        { id: 'initiatives', title: 'Initiatives', fields: ['program_list', 'program_details'] },
        { id: 'outcomes', title: 'Outcomes & Impact', fields: ['impact_metrics', 'success_stories'] }
      ]
    },
    'ContactPage.jsx': {
      sections: [
        { id: 'offices', title: 'Office Locations', fields: ['address', 'phone', 'email', 'map'] },
        { id: 'form', title: 'Contact Form', fields: ['form_fields', 'validation', 'submit_action'] },
        { id: 'social', title: 'Social Media', fields: ['facebook', 'twitter', 'instagram', 'linkedin'] }
      ]
    },
    'DonatePage.jsx': {
      sections: [
        { id: 'options', title: 'Donation Options', fields: ['one_time', 'monthly', 'custom'] },
        { id: 'preset-amounts', title: 'Preset Amounts', fields: ['amount_1', 'amount_2', 'amount_3', 'amount_4'] },
        { id: 'cta', title: 'Call to Action', fields: ['heading', 'description', 'button_text'] }
      ]
    },
    'OurCausesLandingPage.jsx': {
      sections: [
        { id: 'causes-grid', title: 'Causes Grid', fields: ['cause_cards', 'images', 'descriptions'] },
        { id: 'impact-stats', title: 'Impact Statistics', fields: ['stat_1', 'stat_2', 'stat_3', 'stat_4'] }
      ]
    },
    'MentoringPage.jsx': {
      sections: [
        { id: 'overview', title: 'Program Overview', fields: ['title', 'description'] },
        { id: 'programs', title: 'Programs', fields: ['program_list', 'eligibility'] },
        { id: 'impact', title: 'Impact Stories', fields: ['testimonials', 'statistics'] },
        { id: 'partners', title: 'Partners', fields: ['partner_logos', 'partner_descriptions'] }
      ]
    },
    'ElderlyCarePage.jsx': {
      sections: [
        { id: 'overview', title: 'Overview', fields: ['heading', 'description'] },
        { id: 'programs', title: 'Care Programs', fields: ['services', 'facilities'] },
        { id: 'impact', title: 'Impact', fields: ['beneficiaries', 'success_stories'] },
        { id: 'partners', title: 'Partners', fields: ['supporting_organizations'] }
      ]
    },
    'GirlEducationPage.jsx': {
      sections: [
        { id: 'overview', title: 'Overview', fields: ['mission', 'goals'] },
        { id: 'programs', title: 'Education Programs', fields: ['scholarships', 'workshops', 'mentoring'] },
        { id: 'impact', title: 'Impact Metrics', fields: ['girls_educated', 'schools_partnered'] },
        { id: 'partners', title: 'Partners', fields: ['sponsors', 'collaborators'] }
      ]
    },
    'AwardsPage.jsx': {
      sections: [
        { id: 'awards-list', title: 'Awards & Recognition', fields: ['award_title', 'year', 'organization', 'description'] }
      ]
    },
    'BlogPage.jsx': {
      sections: [
        { id: 'blog-posts', title: 'Blog Posts', fields: ['title', 'author', 'date', 'content', 'featured_image'] }
      ]
    },
    'EventsPage.jsx': {
      sections: [
        { id: 'upcoming', title: 'Upcoming Events', fields: ['event_name', 'date', 'location', 'description'] },
        { id: 'past', title: 'Past Events', fields: ['gallery', 'highlights'] }
      ]
    },
    'FAQPage.jsx': {
      sections: [
        { id: 'faqs', title: 'FAQ List', fields: ['question', 'answer', 'category'] }
      ]
    },
    'GalleryPage.jsx': {
      sections: [
        { id: 'photo-gallery', title: 'Photo Gallery', fields: ['images', 'captions', 'categories'] }
      ]
    },
    'ILCPage.jsx': {
      sections: [
        { id: 'program-info', title: 'ILC Program Info', fields: ['description', 'curriculum', 'enrollment'] }
      ]
    },
    'InternshipPage.jsx': {
      sections: [
        { id: 'opportunities', title: 'Internship Opportunities', fields: ['position', 'duration', 'requirements', 'apply_link'] }
      ]
    },
    'PrivacyPage.jsx': {
      sections: [
        { id: 'policy', title: 'Privacy Policy', fields: ['policy_text', 'last_updated'] }
      ]
    },
    'PublicationsPage.jsx': {
      sections: [
        { id: 'publications-list', title: 'Publications', fields: ['title', 'date', 'file', 'description'] }
      ]
    },
    'StoriesPage.jsx': {
      sections: [
        { id: 'success-stories', title: 'Success Stories', fields: ['story_title', 'person', 'content', 'image'] }
      ]
    },
    'TermsPage.jsx': {
      sections: [
        { id: 'terms', title: 'Terms & Conditions', fields: ['terms_text', 'last_updated'] }
      ]
    },
    'CSRSummitPage.jsx': {
      sections: [
        { id: 'summit-info', title: 'Summit Information', fields: ['date', 'venue', 'speakers', 'agenda', 'registration'] }
      ]
    }
  };

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch pages list when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchPagesList();
    }
  }, [isAuthenticated]);

  // Fetch page content when page is selected
  useEffect(() => {
    if (selectedPage && isAuthenticated) {
      fetchPageContent(selectedPage);
    }
  }, [selectedPage, isAuthenticated]);

  const checkAuth = async () => {
    try {
      if (api.isAuthenticated()) {
        const userData = await api.getCurrentUser();
        if (userData && userData.success) {
          setIsAuthenticated(true);
          setUser(userData.data);
        } else {
          api.logout();
        }
      }
    } catch (error) {
      api.logout();
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const response = await api.login(loginEmail, loginPassword);
      if (response.success) {
        setIsAuthenticated(true);
        setUser(response.data);
        setLoginEmail('');
        setLoginPassword('');
      } else {
        setLoginError(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.message || 'Login failed. Please check your credentials and ensure the backend server is running.');
    }
  };

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    setUser(null);
    setSelectedPage(null);
    setPageContent(null);
  };

  const fetchPagesList = async () => {
    try {
      const response = await api.getPagesList();
      setPagesList(response || []);
    } catch (error) {
      console.error('Failed to fetch pages:', error);
    }
  };

  const fetchPageContent = async (pageSlug) => {
    try {
      // Convert page name to slug (e.g., 'HomePage.jsx' -> 'home')
      const slug = pageSlug.toLowerCase().replace('page.jsx', '').replace('page', '');
      let content = null;
      try {
        content = await api.getPageContent(slug);
      } catch (apiErr) {
        // Fallback to localStorage if backend fails
        const raw = localStorage.getItem(`admin_page_${slug}`);
        content = raw ? JSON.parse(raw) : null;
      }
      if (!content) {
        // initialize from pageConfigs schema
        const cfg = pageConfigs[pageSlug] || {};
        content = { slug, sections: (cfg.sections || []).map(s => ({ id: s.id })) };
      }
      setPageContent(content);
    } catch (error) {
      console.error('Failed to fetch page content:', error);
      setPageContent(null);
    }
  };

  const handleSaveContent = async (slug, contentData) => {
    setSaving(true);
    try {
      // Try backend save first
      try {
        await api.updatePageContent(slug, contentData);
      } catch (apiErr) {
        // Persist to localStorage as fallback for frontend-only mode
        localStorage.setItem(`admin_page_${slug}`, JSON.stringify(contentData));
      }
      alert('Content saved successfully!');
      // Also refresh local state
      localStorage.setItem(`admin_page_${slug}`, JSON.stringify(contentData));
      fetchPageContent(selectedPage);
    } catch (error) {
      alert('Failed to save content: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Map page names to slugs
  const getPageSlug = (pageName) => {
    const slugMap = {
      'HomePage.jsx': 'home',
      'AboutPage.jsx': 'about',
      'ContactPage.jsx': 'contact',
      'DonatePage.jsx': 'donate',
      'SociofarePage.jsx': 'sociofare',
      'OurCausesLandingPage.jsx': 'causes',
      'CSRSummitPage.jsx': 'csr',
      'PublicationsPage.jsx': 'publications',
      'ElderlyCarePage.jsx': 'elderly-care',
      'GirlEducationPage.jsx': 'girl-education',
      'MentalHealthPage.jsx': 'mental-health',
      'AwardsPage.jsx': 'awards',
      'BlogPage.jsx': 'blog',
      'EventsPage.jsx': 'events',
      'FAQPage.jsx': 'faq',
      'GalleryPage.jsx': 'gallery',
      'ILCPage.jsx': 'ilc',
      'InternshipPage.jsx': 'internship',
      'PrivacyPage.jsx': 'privacy',
      'StoriesPage.jsx': 'stories',
      'TermsPage.jsx': 'terms',
    };
    return slugMap[pageName] || pageName.toLowerCase().replace('page.jsx', '').replace('page', '');
  };

  const pages = Object.keys(pageConfigs);
  const filteredPages = pages.filter(page => 
    page.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show login screen if not authenticated
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4">
              <Lock className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600 mt-2">Enter your credentials to access the admin panel</p>
          </div>
          
          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
              <AlertCircle size={16} />
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-medium transition-all shadow-sm"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Pages', value: '21', change: '+12%', icon: FileText },
    { label: 'Published', value: '18', change: '+8%', icon: Check },
    { label: 'Draft', value: '2', change: '-3%', icon: Edit },
    { label: 'Archived', value: '1', change: '0%', icon: Archive }
  ];

  const roles = [
    { name: 'Super Admin', icon: Shield, color: 'bg-purple-100 text-purple-700 border-purple-200', permissions: 'Full access to all features' },
    { name: 'Admin', icon: UserCog, color: 'bg-blue-100 text-blue-700 border-blue-200', permissions: 'Manage content and users' },
    { name: 'Manager', icon: Users, color: 'bg-emerald-100 text-emerald-700 border-emerald-200', permissions: 'Oversee content workflow' },
    { name: 'Editor', icon: Edit, color: 'bg-amber-100 text-amber-700 border-amber-200', permissions: 'Edit and publish content' }
  ];

  const handlePageAction = (action, page, section) => {
    console.log(`${action} action on ${page} - ${section}`);
  };

  const updateFieldValue = (sectionId, fieldName, value) => {
    if (!pageContent) {
      setPageContent({ sections: [] });
    }
    const updated = { ...pageContent };
    if (!updated.sections) updated.sections = [];
    
    let sectionIndex = updated.sections.findIndex(s => s.id === sectionId);
    if (sectionIndex === -1) {
      updated.sections.push({ id: sectionId, [fieldName]: value });
      sectionIndex = updated.sections.length - 1;
    } else {
      updated.sections[sectionIndex] = { ...updated.sections[sectionIndex], [fieldName]: value };
    }
    
    setPageContent(updated);
  };

  const getFieldValue = (sectionId, fieldName) => {
    if (!pageContent || !pageContent.sections) return '';
    const section = pageContent.sections.find(s => s.id === sectionId);
    return section?.[fieldName] || '';
  };

  const renderSectionEditor = (section) => {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg cursor-move hover:from-indigo-100 hover:to-purple-100 transition-colors">
              <GripVertical className="text-indigo-600" size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{section.title}</h4>
              <p className="text-sm text-gray-500 mt-0.5">{section.fields.length} fields</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditingSection(editingSection === section.id ? null : section.id)}
              className="px-3 py-1.5 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2 shadow-sm"
            >
              <Edit size={14} />
              {editingSection === section.id ? 'Close' : 'Edit'}
            </button>
            <button
              onClick={() => {
                const slug = getPageSlug(selectedPage);
                handleSaveContent(slug, pageContent);
              }}
              className="px-3 py-1.5 text-sm bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 flex items-center gap-2 shadow-sm"
            >
              <Check size={14} />
              Save
            </button>
          </div>
        </div>

        {editingSection === section.id && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            {section.fields.map((field, idx) => {
              const fieldValue = getFieldValue(section.id, field);
              return (
                <div key={idx}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {field.replace(/_/g, ' ')}
                  </label>
                  {field.includes('image') || field.includes('logo') ? (
                    <div className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-all cursor-pointer">
                      <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Image className="text-indigo-600" size={24} />
                      </div>
                      <input
                        type="text"
                        value={fieldValue}
                        onChange={(e) => updateFieldValue(section.id, field, e.target.value)}
                        placeholder="Image URL"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mt-2"
                      />
                      <p className="text-xs text-gray-500 mt-1">Enter image URL or upload</p>
                    </div>
                  ) : field.includes('description') || field.includes('content') || field.includes('text') ? (
                    <textarea
                      rows="4"
                      value={fieldValue}
                      onChange={(e) => updateFieldValue(section.id, field, e.target.value)}
                      placeholder={`Enter ${field.replace(/_/g, ' ')}...`}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    ></textarea>
                  ) : field.includes('list') || field.includes('values') || field.includes('cards') ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add item..."
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const currentList = getFieldValue(section.id, field);
                              const list = currentList ? (Array.isArray(currentList) ? currentList : [currentList]) : [];
                              updateFieldValue(section.id, field, [...list, e.target.value]);
                              e.target.value = '';
                            }
                          }}
                        />
                        <button
                          onClick={(e) => {
                            const input = e.target.previousElementSibling;
                            const currentList = getFieldValue(section.id, field);
                            const list = currentList ? (Array.isArray(currentList) ? currentList : [currentList]) : [];
                            updateFieldValue(section.id, field, [...list, input.value]);
                            input.value = '';
                          }}
                          className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2 shadow-sm"
                        >
                          <Plus size={16} />
                          Add
                        </button>
                      </div>
                      <div className="space-y-2 mt-3">
                        {(Array.isArray(fieldValue) ? fieldValue : fieldValue ? [fieldValue] : []).map((item, i) => (
                          <div key={i} className="flex items-center gap-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                            <GripVertical className="text-gray-400 cursor-move" size={16} />
                            <span className="flex-1 text-sm text-gray-700 font-medium">{item}</span>
                            <button
                              onClick={() => {
                                const list = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
                                list.splice(i, 1);
                                updateFieldValue(section.id, field, list);
                              }}
                              className="text-rose-600 hover:text-rose-700 p-1 hover:bg-rose-50 rounded"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={fieldValue}
                      onChange={(e) => updateFieldValue(section.id, field, e.target.value)}
                      placeholder={`Enter ${field.replace(/_/g, ' ')}...`}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 transition-all duration-300 flex flex-col relative z-10 shadow-2xl`}>
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">Content Management</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'pages', label: 'Pages', icon: FileText },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  if (item.id !== 'pages') setSelectedPage(null);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-700">
          {sidebarOpen ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">System Online</span>
              </div>
              {user && (
                <div className="pt-2 border-t border-gray-700">
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="w-full mt-2 px-3 py-2 text-xs text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all flex items-center gap-2"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="h-2 w-2 bg-emerald-500 rounded-full mx-auto animate-pulse"></div>
              <button
                onClick={handleLogout}
                className="w-full p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all flex items-center justify-center"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-8 py-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {activeSection === 'dashboard' && 'Dashboard'}
                {activeSection === 'pages' && (selectedPage ? selectedPage : 'Pages')}
                {activeSection === 'settings' && 'Settings'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {activeSection === 'dashboard' && 'Monitor your content performance'}
                {activeSection === 'pages' && !selectedPage && 'Manage your website pages'}
                {activeSection === 'pages' && selectedPage && 'Edit page sections and content'}
                {activeSection === 'settings' && 'Configure system preferences'}
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard */}
            {activeSection === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
                            <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{stat.value}</p>
                            <p className="text-xs text-gray-500 mt-2">{stat.change} from last month</p>
                          </div>
                          <div className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                            <Icon className="text-indigo-600" size={20} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-base font-semibold text-gray-900">Recent Activity</h3>
                      <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View all</button>
                    </div>
                    <div className="space-y-4">
                      {[
                        { action: 'HomePage.jsx updated', time: '2 hours ago', user: 'John Doe' },
                        { action: 'BlogPage.jsx published', time: '5 hours ago', user: 'Jane Smith' },
                        { action: 'ContactPage.jsx edited', time: '1 day ago', user: 'John Doe' }
                      ].map((activity, idx) => (
                        <div key={idx} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                          <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                            <p className="text-xs text-gray-500 mt-0.5">by {activity.user}</p>
                          </div>
                          <span className="text-xs text-gray-500 flex-shrink-0">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-900 mb-6">Quick Stats</h3>
                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Page Views</span>
                          <span className="text-sm font-semibold text-gray-900">1,234</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full" style={{width: '65%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Active Users</span>
                          <span className="text-sm font-semibold text-gray-900">89</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 h-2 rounded-full" style={{width: '45%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Pending</span>
                          <span className="text-sm font-semibold text-gray-900">5</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full" style={{width: '25%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pages Management */}
            {activeSection === 'pages' && !selectedPage && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="Search pages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPages.map((page, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPage(page)}
                      className="bg-white rounded-xl p-5 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all text-left group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg group-hover:from-indigo-100 group-hover:to-purple-100 transition-colors">
                            <Layout className="text-indigo-600" size={18} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm truncate">{page}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {pageConfigs[page].sections.length} sections
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="text-gray-400 group-hover:text-indigo-600 transition-colors flex-shrink-0" size={16} />
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-md font-medium border border-emerald-200">Published</span>
                        <span className="text-gray-500">Updated 2h ago</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Page Section Editor */}
            {activeSection === 'pages' && selectedPage && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedPage(null);
                      setEditingSection(null);
                      setPageContent(null);
                    }}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
                  >
                    ← Back to Pages
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const slug = getPageSlug(selectedPage);
                        if (pageContent) {
                          handleSaveContent(slug, pageContent);
                        }
                      }}
                      disabled={saving || !pageContent}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2 shadow-sm">
                      <Plus size={16} />
                      Add Section
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
                      <Layout className="text-indigo-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedPage}</h3>
                      <p className="text-sm text-gray-500">Slug: {getPageSlug(selectedPage)}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {pageContent ? 'Content loaded from backend' : 'No content found. Click "Save Changes" to create.'}
                  </p>
                </div>

                <div className="space-y-4">
                  {pageConfigs[selectedPage].sections.map((section) => renderSectionEditor(section))}
                </div>
              </div>
            )}

            {/* Settings */}
            {activeSection === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
                      <Shield className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">User Roles & Permissions</h3>
                      <p className="text-sm text-gray-600 mt-0.5">Manage access levels for your team</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roles.map((role, idx) => {
                      const Icon = role.icon;
                      return (
                        <div key={idx} className={`p-5 rounded-xl border-2 ${role.color} hover:shadow-md transition-all cursor-pointer`}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Icon size={22} />
                              <div>
                                <h4 className="font-bold text-sm">{role.name}</h4>
                                <p className="text-xs mt-1 opacity-80">{role.permissions}</p>
                              </div>
                            </div>
                            <button className="text-sm font-medium hover:underline">
                              Manage
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                        <Lock className="text-blue-600" size={20} />
                      </div>
                      <h3 className="text-base font-semibold text-gray-900">Authentication</h3>
                    </div>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/30 transition-all">
                        <div className="flex items-center gap-3">
                          <LogIn size={18} className="text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">Login Settings</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/30 transition-all">
                        <div className="flex items-center gap-3">
                          <UserPlus size={18} className="text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">Signup Settings</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/30 transition-all">
                        <div className="flex items-center gap-3">
                          <Shield size={18} className="text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">Password Policy</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-900 mb-6">General Settings</h3>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                        <input
                          type="text"
                          defaultValue="My Website"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                        <input
                          type="email"
                          defaultValue="admin@example.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm lg:col-span-2">
                    <h3 className="text-base font-semibold text-gray-900 mb-6">Security Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                          <p className="text-xs text-gray-500 mt-1">Add extra layer of security</p>
                        </div>
                        <label className="relative inline-block w-12 h-6">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-purple-600 peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-sm"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Login Attempts Limit</p>
                          <p className="text-xs text-gray-500 mt-1">Maximum failed attempts</p>
                        </div>
                        <input
                          type="number"
                          defaultValue="5"
                          className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;