import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, FileText, Settings, Menu, X, Search, Edit,
  Check, Archive, Trash2, Users, Lock, UserPlus, LogIn,
  TrendingUp, Eye, Clock, ChevronRight, MoreVertical,
  ArrowLeft, Bell, Globe, Plus
} from 'lucide-react';

// Frontend-only flag; uses localStorage instead of backend API
const FRONTEND_ONLY = true;

// Local storage helpers
const REGISTRY_KEY = 'admin_pages_registry';
const PAGE_KEY = (slug) => `admin_page_${slug}`;

const DEFAULT_REGISTRY = [
  { slug: 'home', name: 'Home' },
  { slug: 'about', name: 'About' },
  { slug: 'awards', name: 'Awards' },
  { slug: 'blog', name: 'Blog' },
  { slug: 'contact', name: 'Contact' },
  { slug: 'csr-summit', name: 'CSR Summit' },
  { slug: 'donate', name: 'Donate' },
  { slug: 'elderly-care', name: 'Elderly Care' },
  { slug: 'events', name: 'Events' },
  { slug: 'faq', name: 'FAQ' },
];

const DEFAULT_PAGE = (slug, name) => {
  switch (slug) {
    case 'home':
      return {
        slug, name,
        header: { title: 'Serving society for more than a decade.' },
        meta: { description: 'Compassionate action at Sabri Helpage' },
        sections: [
          { type: 'richText', html: '<h1>Hero</h1><p>Read More | Support Us</p>' },
          { type: 'paragraph', text: 'What We Stand For: Shaping Lives Through Compassionate Action.' },
          { type: 'list', items: ['75.5K People Helped', '34.2K Happy Lives', '57.4 Locations'] },
          { type: 'richText', html: '<h2>Core Causes</h2><ul><li>Mental Health</li><li>Elderly Care</li><li>Girl Education</li></ul>' },
          { type: 'list', items: ['Google', 'Microsoft', 'Tata Trusts', 'Reliance Foundation', 'HDFC Bank'] },
          { type: 'richText', html: '<h2>Stories</h2><p>Legal Aid Camp, Food Drive, Water Project</p>' },
        ],
        status: 'published',
      };
    case 'about':
      return {
        slug, name,
        header: { title: 'About', subtitle: 'Founding, purpose and governing body' },
        meta: { description: 'About Sabri Helpage' },
        sections: [
          { type: 'richText', html: '<h1>About Us</h1><p>Our founding and purpose.</p>' },
          { type: 'paragraph', text: 'We are guided by a diverse governing body.' },
        ],
        status: 'published',
      };
    default:
      return {
        slug, name,
        header: { title: name },
        meta: { description: '' },
        sections: [{ type: 'richText', html: '' }],
        status: 'draft',
      };
  }
};

const loadRegistry = () => {
  try {
    const raw = localStorage.getItem(REGISTRY_KEY);
    if (raw) return JSON.parse(raw);
    localStorage.setItem(REGISTRY_KEY, JSON.stringify(DEFAULT_REGISTRY));
    return DEFAULT_REGISTRY;
  } catch (_) {
    return DEFAULT_REGISTRY;
  }
};

const loadPageLocal = (slug, nameFallback) => {
  try {
    const raw = localStorage.getItem(PAGE_KEY(slug));
    if (raw) return JSON.parse(raw);
    const def = DEFAULT_PAGE(slug, nameFallback || slug);
    localStorage.setItem(PAGE_KEY(slug), JSON.stringify(def));
    return def;
  } catch (_) {
    return DEFAULT_PAGE(slug, nameFallback || slug);
  }
};

const savePageLocal = (slug, payload) => {
  try { localStorage.setItem(PAGE_KEY(slug), JSON.stringify(payload)); } catch (_) {}
};

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications] = useState(3);

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [pages, setPages] = useState([]);
  const [pageDoc, setPageDoc] = useState(null);

  // Load pages registry (frontend-only)
  useEffect(() => {
    const list = loadRegistry();
    setPages(list);
  }, []);

  const stats = [
    { label: 'Total Pages', value: '21', icon: FileText, change: '+12%', trend: 'up' },
    { label: 'Published', value: '18', icon: Check, change: '+8%', trend: 'up' },
    { label: 'Drafts', value: '2', icon: Clock, change: '-3%', trend: 'down' },
    { label: 'Archived', value: '1', icon: Archive, change: '0%', trend: 'neutral' }
  ];

  const filteredPages = pages.filter(p =>
    (p.name || p.slug || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenPage = (slug) => {
    setSelectedPage(slug);
    const name = pages.find(p => p.slug === slug)?.name || slug;
    const doc = loadPageLocal(slug, name);
    setPageDoc(doc);
  };

  const handleSave = () => {
    if (!selectedPage) return;
    const titleInput = document.getElementById('admin-editor-title');
    const metaDescInput = document.getElementById('admin-editor-meta');
    const bodyTextarea = document.getElementById('admin-editor-body');
    const payload = {
      slug: selectedPage,
      name: pageDoc?.name || selectedPage,
      header: { title: titleInput?.value || selectedPage },
      meta: { description: metaDescInput?.value || '' },
      sections: [{ type: 'richText', html: bodyTextarea?.value || '' }],
      status: 'published',
    };
    savePageLocal(selectedPage, payload);
    alert('Saved locally');
  };

  const NavItem = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => {
        setActiveSection(id);
        if (id !== 'pages') setSelectedPage(null);
        setMobileMenuOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        activeSection === id
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <Icon size={20} className={activeSection === id ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'} />
      <span className={`font-medium text-sm transition-opacity duration-200 ${!sidebarOpen && 'lg:hidden'}`}>
        {label}
      </span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-gray-200
          transition-all duration-300 ease-in-out flex flex-col
          ${mobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'}
          ${sidebarOpen ? 'lg:w-72' : 'lg:w-20'}
        `}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <div className={`flex items-center gap-2 font-bold text-xl tracking-tight transition-opacity duration-200 ${!sidebarOpen && 'lg:hidden'}`}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <span className="text-lg">A</span>
            </div>
            <span>Admin</span>
          </div>
          {/* Logo fallback for collapsed state */}
          <div className={`hidden ${sidebarOpen ? 'hidden' : 'lg:flex lg:w-full lg:justify-center'}`}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <span className="text-sm">A</span>
            </div>
          </div>
          
          <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
          <NavItem id="pages" label="Pages" icon={FileText} />
          <NavItem id="settings" label="Settings" icon={Settings} />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex w-full items-center justify-center p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {sidebarOpen ? <ChevronRight className="rotate-180" size={20} /> : <ChevronRight size={20} />}
          </button>
          
          <div className={`flex items-center gap-3 mt-4 ${!sidebarOpen && 'lg:hidden'}`}>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">admin@site.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {activeSection === 'dashboard' && 'Overview'}
              {activeSection === 'pages' && (selectedPage ? 'Edit Page' : 'Content Pages')}
              {activeSection === 'settings' && 'System Settings'}
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
              <Globe size={14} />
              View Site
            </button>
            <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              )}
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto bg-gray-50/50 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Dashboard View */}
            {activeSection === 'dashboard' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${
                          idx === 0 ? 'bg-indigo-50 text-indigo-600' :
                          idx === 1 ? 'bg-emerald-50 text-emerald-600' :
                          idx === 2 ? 'bg-amber-50 text-amber-600' :
                          'bg-gray-50 text-gray-600'
                        }`}>
                          <stat.icon size={22} />
                        </div>
                        <span className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                          stat.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 
                          stat.trend === 'down' ? 'text-red-700 bg-red-50' : 'text-gray-600 bg-gray-100'
                        }`}>
                          {stat.change}
                          {stat.trend === 'up' ? <TrendingUp size={12} className="ml-1" /> : null}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</h3>
                        <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Activity Feed */}
                  <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                      <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {[
                        { action: 'Updated HomePage content', time: '2h ago', user: 'John Doe', type: 'edit' },
                        { action: 'Published BlogPage', time: '5h ago', user: 'Jane Smith', type: 'publish' },
                        { action: 'Modified ContactPage meta', time: '1d ago', user: 'John Doe', type: 'edit' },
                        { action: 'Archived old events', time: '2d ago', user: 'Mike Johnson', type: 'archive' },
                      ].map((activity, idx) => (
                        <div key={idx} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            activity.type === 'edit' ? 'bg-indigo-50 text-indigo-600' :
                            activity.type === 'publish' ? 'bg-emerald-50 text-emerald-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {activity.type === 'edit' ? <Edit size={16} /> :
                             activity.type === 'publish' ? <Check size={16} /> :
                             <Archive size={16} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <p className="text-xs text-gray-500 mt-0.5">by {activity.user}</p>
                          </div>
                          <span className="text-xs font-medium text-gray-400 whitespace-nowrap">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* System Status */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-gray-900">System Health</h3>
                      <p className="text-gray-500 text-sm">All systems operational</p>
                    </div>
                    
                    <div className="space-y-6 mt-8">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-500">Server Load</span>
                          <span className="font-medium text-gray-900">24%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[24%] rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-500">Memory Usage</span>
                          <span className="font-medium text-gray-900">58%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 w-[58%] rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-500">Storage</span>
                          <span className="font-medium text-gray-900">85%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 w-[85%] rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pages View */}
            {activeSection === 'pages' && !selectedPage && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search pages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 w-full sm:w-auto justify-center">
                    <Plus size={18} />
                    Create Page
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredPages.map((page, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOpenPage(page.slug)}
                      className="group bg-white rounded-xl p-5 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all text-left relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={18} className="text-gray-400" />
                      </div>
                      
                      <div className="mb-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                          <FileText size={20} />
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900 text-sm truncate pr-6">{page.name || page.slug}</h3>
                        <p className="text-xs text-gray-500">Last edited 2h ago</p>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] uppercase tracking-wider font-semibold rounded">Published</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Page Editor */}
            {activeSection === 'pages' && selectedPage && (
              <div className="flex flex-col h-[calc(100vh-8rem)]">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setSelectedPage(null)}
                    className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <div className="p-1 rounded-md bg-white border border-gray-200 group-hover:border-gray-300 transition-colors">
                      <ArrowLeft size={14} />
                    </div>
                    Back to Pages
                  </button>
                  
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                      Preview
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200">
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col lg:flex-row">
                  {/* Main Editor */}
                  <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                      <input
                        type="text"
                        defaultValue={pageDoc?.header?.title || (pageDoc?.name || selectedPage)}
                        id="admin-editor-title"
                        className="w-full text-2xl font-bold text-gray-900 placeholder-gray-300 focus:outline-none"
                        placeholder="Page Title"
                      />
                    </div>
                    <div className="flex-1 p-6 bg-gray-50/30 overflow-y-auto">
                      <textarea
                        className="w-full h-full resize-none bg-transparent border-none focus:ring-0 p-0 text-gray-600 font-mono text-sm leading-relaxed"
                        placeholder="// Start editing your page content..."
                        defaultValue={pageDoc?.sections?.[0]?.html || ''}
                        id="admin-editor-body"
                      />
                    </div>
                  </div>

                  {/* Sidebar Settings */}
                  <div className="w-full lg:w-80 bg-white p-6 space-y-6 overflow-y-auto">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Page Settings</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1.5">URL Slug</label>
                          <div className="flex items-center px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                            <span className="text-gray-400 text-xs mr-1">/</span>
                            <input 
                              type="text" 
                              defaultValue={selectedPage.toLowerCase().replace('.jsx', '')}
                              className="bg-transparent text-sm text-gray-900 focus:outline-none w-full"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1.5">Meta Description</label>
                          <textarea 
                            rows="3"
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 transition-colors resize-none"
                            placeholder="SEO description..."
                            defaultValue={pageDoc?.meta?.description || ''}
                            id="admin-editor-meta"
                          ></textarea>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1.5">Status</label>
                          <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400">
                            <option>Published</option>
                            <option>Draft</option>
                            <option>Archived</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                      <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Actions</h4>
                      <div className="space-y-2">
                        <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left">
                          <span>Duplicate Page</span>
                          <FileText size={14} />
                        </button>
                        <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left">
                          <span>Delete Page</span>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings */}
            {activeSection === 'settings' && (
              <div className="max-w-4xl">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gray-100 rounded-xl">
                        <Users size={24} className="text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                        <p className="text-sm text-gray-500">Manage access and roles for your team</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {['Administrator', 'Editor', 'Author'].map((role, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                              {role[0]}
                            </div>
                            <span className="font-medium text-gray-900 text-sm">{role}</span>
                          </div>
                          <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">Edit Permissions</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gray-100 rounded-xl">
                        <Lock size={24} className="text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                        <p className="text-sm text-gray-500">Password policies and authentication</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify_between">
                        <div>
                          <p className="text_sm font-medium text_gray-900">Two-Factor Authentication</p>
                          <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 bg-gray-50/50">
                    <div className="flex justify-end gap-3">
                      <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200">
                        Save Preferences
                      </button>
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
