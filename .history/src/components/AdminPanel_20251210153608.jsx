import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { LayoutDashboard, FileText, Settings, Menu, X, Search, Edit, Check, Archive, Trash2, Users, Lock, UserPlus, LogIn, ChevronRight, Plus, GripVertical, Image, Layout, Shield, UserCog, Eye, Globe, Palette, Bell, Database, Package } from 'lucide-react';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedSubsection, setSelectedSubsection] = useState('global');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSection, setEditingSection] = useState(null);
  // Backend integration state
  const [pagesList, setPagesList] = useState([]);
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Fetch pages list from backend
  useEffect(() => {
    if (activeSection !== 'pages') return;
    setLoading(true);
    setError('');
    api.getPagesList()
      .then(list => setPagesList(Array.isArray(list) ? list : []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [activeSection]);

  // Fetch page content when selectedPage changes
  useEffect(() => {
    if (!selectedPage) return;
    setLoading(true);
    setError('');
    api.getPageContent(selectedPage.toLowerCase())
      .then(data => setPageContent(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [selectedPage]);

  // Global Settings Structure
  const globalSettings = {
    brand: {
      title: 'Brand Settings',
      icon: Palette,
      fields: ['name', 'logo', 'favicon', 'primary_color', 'secondary_color', 'typography']
    },
    navigation: {
      title: 'Navigation',
      icon: Layout,
      fields: ['primary_menu', 'secondary_menu', 'footer_links', 'social_links']
    },
    contact: {
      title: 'Contact Info',
      icon: Bell,
      fields: ['phone', 'email', 'address', 'map_coordinates', 'whatsapp']
    },
    seoDefaults: {
      title: 'SEO Defaults',
      icon: Globe,
      fields: ['site_title', 'meta_description', 'og_image', 'robots_rules']
    },
    integrations: {
      title: 'Integrations',
      icon: Database,
      fields: ['analytics_id', 'meta_pixel', 'consent_text']
    },
    donations: {
      title: 'Donations',
      icon: Package,
      fields: ['payment_links', 'qr_codes', 'default_amounts']
    },
    legal: {
      title: 'Legal',
      icon: Lock,
      fields: ['privacy_policy', 'terms', 'refund_policy']
    }
  };

  // Page Templates with Reusable Sections
  const pageTemplates = {
    'Home': {
      sections: [
        { id: 'seo', type: 'SEO', title: 'SEO Settings', fields: ['title', 'description', 'og_image'] },
        { id: 'hero', type: 'Hero', title: 'Hero Section', fields: ['title', 'subtitle', 'background_image', 'cta_label', 'cta_link', 'overlay'] },
        { id: 'intro', type: 'RichText', title: 'Introduction', fields: ['title', 'body_html', 'images'] },
        { id: 'keyStats', type: 'StatGrid', title: 'Key Statistics', fields: ['title', 'stats_list'] },
        { id: 'causesHighlight', type: 'CardGrid', title: 'Causes Highlight', fields: ['title', 'cards_list'] },
        { id: 'socioFare', type: 'MediaBlock', title: 'SocioFare Section', fields: ['title', 'media', 'caption', 'alignment'] },
        { id: 'testimonials', type: 'TestimonialList', title: 'Testimonials', fields: ['title', 'items_list'] },
        { id: 'latestNews', type: 'CardGrid', title: 'Latest News', fields: ['title', 'cards_list'] },
        { id: 'donateCTA', type: 'CTA', title: 'Donate CTA', fields: ['title', 'description', 'button_label', 'button_link'] }
      ]
    },
    'About': {
      sections: [
        { id: 'seo', type: 'SEO', title: 'SEO Settings', fields: ['title', 'description', 'og_image'] },
        { id: 'hero', type: 'Hero', title: 'Hero Section', fields: ['title', 'subtitle', 'background_image', 'cta_label', 'cta_link'] },
        { id: 'overview', type: 'RichText', title: 'Overview', fields: ['title', 'body_html'] },
        { id: 'missionVision', type: 'FeatureList', title: 'Mission & Vision', fields: ['title', 'features_list'] },
        { id: 'timeline', type: 'Timeline', title: 'Our Journey', fields: ['title', 'timeline_items'] },
        { id: 'team', type: 'CardGrid', title: 'Team Members', fields: ['title', 'cards_list'] },
        { id: 'partners', type: 'PartnerLogos', title: 'Partners', fields: ['title', 'logos_list'] },
        { id: 'contactCTA', type: 'CTA', title: 'Contact CTA', fields: ['title', 'description', 'button_label', 'button_link'] }
      ]
    },
    'Causes': {
      sections: [
        { id: 'seo', type: 'SEO', title: 'SEO Settings', fields: ['title', 'description', 'og_image'] },
        { id: 'hero', type: 'Hero', title: 'Hero Section', fields: ['title', 'subtitle', 'background_image'] },
        { id: 'intro', type: 'RichText', title: 'Introduction', fields: ['title', 'body_html'] },
        { id: 'causes', type: 'CardGrid', title: 'Our Causes', fields: ['title', 'cards_list', 'source_collection'] },
        { id: 'donateCTA', type: 'CTA', title: 'Donate CTA', fields: ['title', 'description', 'button_label', 'button_link'] }
      ]
    },
    'SocioFare': {
      sections: [
        { id: 'seo', type: 'SEO', title: 'SEO Settings', fields: ['title', 'description', 'og_image'] },
        { id: 'hero', type: 'Hero', title: 'Hero Section', fields: ['title', 'subtitle', 'background_image'] },
        { id: 'programOverview', type: 'RichText', title: 'Program Overview', fields: ['title', 'body_html'] },
        { id: 'coreAreas', type: 'FeatureList', title: 'Core Areas', fields: ['title', 'features_list'] },
        { id: 'successStories', type: 'CardGrid', title: 'Success Stories', fields: ['title', 'cards_list'] },
        { id: 'getInvolvedCTA', type: 'CTA', title: 'Get Involved CTA', fields: ['title', 'description', 'button_label', 'button_link'] }
      ]
    },
    'Donate': {
      sections: [
        { id: 'seo', type: 'SEO', title: 'SEO Settings', fields: ['title', 'description', 'og_image'] },
        { id: 'hero', type: 'Hero', title: 'Hero Section', fields: ['title', 'subtitle', 'background_image'] },
        { id: 'whyDonate', type: 'RichText', title: 'Why Donate', fields: ['title', 'body_html'] },
        { id: 'options', type: 'FeatureList', title: 'Donation Options', fields: ['title', 'features_list'] },
        { id: 'qrCodes', type: 'MediaBlock', title: 'QR Codes', fields: ['images', 'captions'] },
        { id: 'bankDetails', type: 'RichText', title: 'Bank Details', fields: ['account_info'] },
        { id: 'donationCTA', type: 'CTA', title: 'Donation CTA', fields: ['title', 'description', 'button_label', 'button_link'] }
      ]
    },
    'Contact': {
      sections: [
        { id: 'seo', type: 'SEO', title: 'SEO Settings', fields: ['title', 'description', 'og_image'] },
        { id: 'hero', type: 'Hero', title: 'Hero Section', fields: ['title', 'subtitle', 'background_image'] },
        { id: 'info', type: 'RichText', title: 'Contact Information', fields: ['address', 'phone', 'email', 'map_coordinates'] },
        { id: 'formConfig', type: 'Form', title: 'Contact Form', fields: ['form_fields', 'submit_endpoint'] },
        { id: 'socialLinks', type: 'List', title: 'Social Links', fields: ['links_list'] },
        { id: 'whatsappCTA', type: 'CTA', title: 'WhatsApp CTA', fields: ['title', 'description', 'button_label', 'button_link'] }
      ]
    },
    'News': {
      sections: [
        { id: 'seo', type: 'SEO', title: 'SEO Settings', fields: ['title', 'description', 'og_image'] },
        { id: 'hero', type: 'Hero', title: 'Hero Section', fields: ['title', 'subtitle', 'background_image'] },
        { id: 'listing', type: 'CardGrid', title: 'News Articles', fields: ['title', 'source_collection'] }
      ]
    },
    'Events': {
      sections: [
        { id: 'seo', type: 'SEO', title: 'SEO Settings', fields: ['title', 'description', 'og_image'] },
        { id: 'hero', type: 'Hero', title: 'Hero Section', fields: ['title', 'subtitle', 'background_image'] },
        { id: 'listing', type: 'CardGrid', title: 'Events', fields: ['title', 'source_collection'] }
      ]
    },
    'Gallery': {
      sections: [
        { id: 'seo', type: 'SEO', title: 'SEO Settings', fields: ['title', 'description', 'og_image'] },
        { id: 'hero', type: 'Hero', title: 'Hero Section', fields: ['title', 'subtitle', 'background_image'] },
        { id: 'media', type: 'MediaBlock', title: 'Gallery Media', fields: ['media_list'] }
      ]
    },
    'FAQ': {
      sections: [
        { id: 'seo', type: 'SEO', title: 'SEO Settings', fields: ['title', 'description', 'og_image'] },
        { id: 'hero', type: 'Hero', title: 'Hero Section', fields: ['title', 'subtitle', 'background_image'] },
        { id: 'faqs', type: 'FAQList', title: 'FAQs', fields: ['title', 'faq_items'] },
        { id: 'cta', type: 'CTA', title: 'Contact CTA', fields: ['title', 'description', 'button_label', 'button_link'] }
      ]
    }
  };

  // Use backend list if available, else fallback to template keys
  const pages = pagesList.length ? pagesList.map(p => p.slug || p) : Object.keys(pageTemplates);
  const filteredPages = pages.filter(page => 
    page.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Pages', value: '10', change: '+12%', icon: FileText },
    { label: 'Published', value: '8', change: '+8%', icon: Check },
    { label: 'Draft', value: '1', change: '-3%', icon: Edit },
    { label: 'Archived', value: '1', change: '0%', icon: Archive }
  ];

  const roles = [
    { name: 'Super Admin', icon: Shield, color: 'bg-purple-100 text-purple-700 border-purple-200', permissions: 'Full access, settings, users, workflows' },
    { name: 'Admin', icon: UserCog, color: 'bg-blue-100 text-blue-700 border-blue-200', permissions: 'Manage content, publish, collections' },
    { name: 'Manager', icon: Users, color: 'bg-emerald-100 text-emerald-700 border-emerald-200', permissions: 'Edit content, submit for review' },
    { name: 'Editor', icon: Edit, color: 'bg-amber-100 text-amber-700 border-amber-200', permissions: 'Edit drafts in assigned pages' }
  ];

  const handlePageAction = (action, page, section) => {
    console.log(`${action} action on ${page} - ${section}`);
  };

  const renderFieldInput = (field, sectionType) => {
    const fieldName = field.replace(/_/g, ' ');
    
    if (field.includes('image') || field.includes('logo') || field.includes('og_image') || field.includes('favicon')) {
      return (
        <div className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-all cursor-pointer">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Image className="text-indigo-600" size={24} />
          </div>
          <p className="text-sm font-medium text-gray-700">Click to upload {fieldName}</p>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, SVG up to 10MB</p>
        </div>
      );
    }
    
    if (field.includes('body') || field.includes('description') || field.includes('content') || field.includes('text') || field.includes('policy')) {
      return (
        <textarea
          rows="6"
          placeholder={`Enter ${fieldName}...`}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
        ></textarea>
      );
    }
    
    if (field.includes('list') || field.includes('items') || field.includes('cards') || field.includes('stats') || field.includes('features') || field.includes('timeline') || field.includes('logos')) {
      return (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={`Add ${fieldName} item...`}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2 shadow-sm">
              <Plus size={16} />
              Add
            </button>
          </div>
          <div className="space-y-2">
            {[1, 2].map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <GripVertical className="text-gray-400 cursor-move" size={16} />
                <span className="flex-1 text-sm text-gray-700 font-medium">{fieldName} {item}</span>
                <button className="text-rose-600 hover:text-rose-700 p-1 hover:bg-rose-50 rounded">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (field.includes('color')) {
      return (
        <div className="flex gap-3">
          <input
            type="color"
            className="w-16 h-10 rounded-lg cursor-pointer border border-gray-300"
          />
          <input
            type="text"
            placeholder="#000000"
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      );
    }
    
    if (field.includes('url') || field.includes('link')) {
      return (
        <input
          type="url"
          placeholder={`Enter ${fieldName}...`}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      );
    }
    
    if (field.includes('email')) {
      return (
        <input
          type="email"
          placeholder={`Enter ${fieldName}...`}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      );
    }
    
    return (
      <input
        type="text"
        placeholder={`Enter ${fieldName}...`}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    );
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
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900">{section.title}</h4>
                <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                  {section.type}
                </span>
              </div>
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
            <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 flex items-center gap-2 shadow-sm">
              <Check size={14} />
            </button>
            <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 flex items-center gap-2 shadow-sm">
              <Archive size={14} />
            </button>
            <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-lg hover:from-rose-700 hover:to-red-700 flex items-center gap-2 shadow-sm">
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {editingSection === section.id && (
          <div className="space-y-5 pt-4 border-t border-gray-200">
            {section.fields.map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {field.replace(/_/g, ' ')}
                </label>
                {renderFieldInput(field, section.type)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderGlobalSettings = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(globalSettings).map(([key, setting]) => {
            const Icon = setting.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedSubsection(key)}
                className={`bg-white rounded-xl p-5 border-2 transition-all text-left group ${
                  selectedSubsection === key
                    ? 'border-indigo-500 shadow-md'
                    : 'border-gray-200 hover:border-indigo-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    selectedSubsection === key
                      ? 'bg-gradient-to-br from-indigo-100 to-purple-100'
                      : 'bg-gray-50 group-hover:bg-indigo-50'
                  } transition-colors`}>
                    <Icon className={selectedSubsection === key ? 'text-indigo-600' : 'text-gray-600'} size={20} />
                  </div>
                  <h3 className="font-semibold text-gray-900">{setting.title}</h3>
                </div>
                <p className="text-xs text-gray-500">{setting.fields.length} settings</p>
              </button>
            );
          })}
        </div>

        {selectedSubsection && selectedSubsection !== 'global' && globalSettings[selectedSubsection] && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              {React.createElement(globalSettings[selectedSubsection].icon, {
                className: 'text-indigo-600',
                size: 24
              })}
              <h3 className="text-lg font-bold text-gray-900">
                {globalSettings[selectedSubsection].title}
              </h3>
            </div>
            <div className="space-y-5">
              {globalSettings[selectedSubsection].fields.map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {field.replace(/_/g, ' ')}
                  </label>
                  {renderFieldInput(field, 'global')}
                </div>
              ))}
            </div>
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
            { id: 'global', label: 'Global Settings', icon: Globe },
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
                  if (item.id === 'global') setSelectedSubsection('global');
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
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">System Online</span>
            </div>
          ) : (
            <div className="h-2 w-2 bg-emerald-500 rounded-full mx-auto animate-pulse"></div>
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
                {activeSection === 'global' && 'Global Settings'}
                {activeSection === 'settings' && 'Settings'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {activeSection === 'dashboard' && 'Monitor your content performance'}
                {activeSection === 'pages' && !selectedPage && 'Manage your website pages'}
                {activeSection === 'pages' && selectedPage && 'Edit page sections with reusable components'}
                {activeSection === 'global' && 'Configure site-wide settings'}
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
                        { action: 'Home page updated', time: '2 hours ago', user: 'John Doe' },
                        { action: 'About page published', time: '5 hours ago', user: 'Jane Smith' },
                        { action: 'Contact page edited', time: '1 day ago', user: 'John Doe' }
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

            {/* Global Settings */}
            {activeSection === 'global' && renderGlobalSettings()}

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
                {loading && <div className="p-4 text-center text-gray-500">Loading...</div>}
                {error && <div className="p-4 text-center text-red-600">{error}</div>}
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
                              {pageTemplates[page]?.sections?.length || 0} sections
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="text-gray-400 group-hover:text-indigo-600 transition-colors flex-shrink-0" size={16} />
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-md font-medium border border-emerald-200">Published</span>
                        <span className="text-gray-500">Updated</span>
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
                    }}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
                  >
                    ← Back to Pages
                  </button>
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2 shadow-sm"
                    onClick={async () => {
                      setLoading(true);
                      setError('');
                      try {
                        await api.updatePageContent(selectedPage.toLowerCase(), pageContent);
                        alert('Page saved!');
                      } catch (e) {
                        setError(e.message);
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    <Plus size={16} />
                    Save Changes
                  </button>
                </div>
                {loading && <div className="p-4 text-center text-gray-500">Loading...</div>}
                {error && <div className="p-4 text-center text-red-600">{error}</div>}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
                      <Layout className="text-indigo-600" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedPage} Page</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Manage all content sections using reusable components
                  </p>
                </div>
                <div className="space-y-4">
                  {/* Render section editors with real data if available */}
                  {pageTemplates[selectedPage]?.sections?.map((section, idx) =>
                    renderSectionEditor({
                      ...section,
                      // Try to inject real content if available
                      ...(pageContent?.sections?.[idx] || {})
                    })
                  )}
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
