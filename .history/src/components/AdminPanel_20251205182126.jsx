import React, { useState } from 'react';
import { LayoutDashboard, FileText, Settings, Menu, X, Search, Edit, Check, Archive, Trash2, Users, Lock, UserPlus, LogIn, TrendingUp, Eye, Clock, ChevronRight } from 'lucide-react';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const pages = [
    'AboutPage.jsx', 'AwardsPage.jsx', 'BlogPage.jsx', 'ContactPage.jsx',
    'CSRSummitPage.jsx', 'DonatePage.jsx', 'ElderlyCarePage.jsx', 'EventsPage.jsx',
    'FAQPage.jsx', 'GalleryPage.jsx', 'GirlEducationPage.jsx', 'HomePage.jsx',
    'ILCPage.jsx', 'InternshipPage.jsx', 'MentoringPage.jsx', 'OurCausesLandingPage.jsx',
    'PrivacyPage.jsx', 'PublicationsPage.jsx', 'SociofarePage.jsx', 'StoriesPage.jsx',
    'TermsPage.jsx'
  ];

  const stats = [
    { label: 'Total Pages', value: '21', icon: FileText, change: '+12%' },
    { label: 'Published', value: '18', icon: Check, change: '+8%' },
    { label: 'Draft', value: '2', icon: Clock, change: '-3%' },
    { label: 'Archived', value: '1', icon: Archive, change: '0%' }
  ];

  const filteredPages = pages.filter(page => 
    page.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageAction = (action, page) => {
    console.log(`${action} action on ${page}`);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 transition-all duration-300 flex flex-col relative z-10`}>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-lg font-semibold text-white tracking-tight">Admin Panel</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
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
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          {sidebarOpen ? (
            <div className="text-xs text-slate-500">v1.0.0</div>
          ) : (
            <div className="h-2 w-2 bg-emerald-500 rounded-full mx-auto"></div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {activeSection === 'dashboard' && 'Dashboard'}
                {activeSection === 'pages' && (selectedPage ? selectedPage : 'Pages')}
                {activeSection === 'settings' && 'Settings'}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {activeSection === 'dashboard' && 'Monitor your content performance'}
                {activeSection === 'pages' && !selectedPage && 'Manage your website pages'}
                {activeSection === 'pages' && selectedPage && 'Edit page content and metadata'}
                {activeSection === 'settings' && 'Configure system preferences'}
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard */}
            {activeSection === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="bg-white rounded-lg p-6 border border-slate-200">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-600 mb-2">{stat.label}</p>
                            <p className="text-3xl font-semibold text-slate-900">{stat.value}</p>
                            <p className="text-xs text-slate-500 mt-2">{stat.change} from last month</p>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <Icon className="text-slate-600" size={20} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-base font-semibold text-slate-900">Recent Activity</h3>
                      <button className="text-sm text-slate-600 hover:text-slate-900">View all</button>
                    </div>
                    <div className="space-y-4">
                      {[
                        { action: 'HomePage.jsx updated', time: '2 hours ago', user: 'John Doe' },
                        { action: 'BlogPage.jsx published', time: '5 hours ago', user: 'Jane Smith' },
                        { action: 'ContactPage.jsx edited', time: '1 day ago', user: 'John Doe' }
                      ].map((activity, idx) => (
                        <div key={idx} className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">{activity.action}</p>
                            <p className="text-xs text-slate-500 mt-0.5">by {activity.user}</p>
                          </div>
                          <span className="text-xs text-slate-500 flex-shrink-0">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-slate-200">
                    <h3 className="text-base font-semibold text-slate-900 mb-6">Quick Stats</h3>
                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">Page Views</span>
                          <span className="text-sm font-semibold text-slate-900">1,234</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div className="bg-slate-900 h-2 rounded-full" style={{width: '65%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">Active Users</span>
                          <span className="text-sm font-semibold text-slate-900">89</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div className="bg-slate-900 h-2 rounded-full" style={{width: '45%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">Pending</span>
                          <span className="text-sm font-semibold text-slate-900">5</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div className="bg-slate-900 h-2 rounded-full" style={{width: '25%'}}></div>
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
                <div className="bg-white rounded-lg border border-slate-200">
                  <div className="p-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        placeholder="Search pages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPages.map((page, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPage(page)}
                      className="bg-white rounded-lg p-5 border border-slate-200 hover:border-slate-300 transition-all text-left group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">
                            <FileText className="text-slate-600" size={18} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-medium text-slate-900 text-sm truncate">{page}</h3>
                          </div>
                        </div>
                        <ChevronRight className="text-slate-400 group-hover:text-slate-600 transition-colors flex-shrink-0" size={16} />
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded font-medium">Published</span>
                        <span className="text-slate-500">Updated 2h ago</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Page Editor */}
            {activeSection === 'pages' && selectedPage && (
              <div className="space-y-6">
                <button
                  onClick={() => setSelectedPage(null)}
                  className="text-sm text-slate-600 hover:text-slate-900 font-medium flex items-center gap-2"
                >
                  ← Back to Pages
                </button>

                <div className="bg-white rounded-lg border border-slate-200">
                  <div className="p-6 border-b border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <h3 className="text-lg font-semibold text-slate-900">{selectedPage}</h3>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handlePageAction('edit', selectedPage)}
                          className="px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 flex items-center gap-2"
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handlePageAction('approve', selectedPage)}
                          className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 flex items-center gap-2"
                        >
                          <Check size={16} />
                          Approve
                        </button>
                        <button
                          onClick={() => handlePageAction('archive', selectedPage)}
                          className="px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 flex items-center gap-2"
                        >
                          <Archive size={16} />
                          Archive
                        </button>
                        <button
                          onClick={() => handlePageAction('delete', selectedPage)}
                          className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 flex items-center gap-2"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Page Title</label>
                      <input
                        type="text"
                        defaultValue={selectedPage.replace('.jsx', '')}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Page Content</label>
                      <textarea
                        rows="12"
                        placeholder="Edit page content here..."
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent font-mono"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Meta Description</label>
                      <input
                        type="text"
                        placeholder="SEO description..."
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                        <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent">
                          <option>Published</option>
                          <option>Draft</option>
                          <option>Archived</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Author</label>
                        <input
                          type="text"
                          defaultValue="Admin"
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings */}
            {activeSection === 'settings' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <Users className="text-slate-600" size={20} />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">User Roles</h3>
                  </div>
                  <div className="space-y-3">
                    {['Administrator', 'Editor', 'Author', 'Contributor'].map((role, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                        <span className="text-sm font-medium text-slate-900">{role}</span>
                        <button className="text-sm text-slate-600 hover:text-slate-900 font-medium">
                          Manage
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <Lock className="text-slate-600" size={20} />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">Authentication</h3>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <LogIn size={18} className="text-slate-600" />
                        <span className="text-sm font-medium text-slate-900">Login Settings</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <UserPlus size={18} className="text-slate-600" />
                        <span className="text-sm font-medium text-slate-900">Signup Settings</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <Lock size={18} className="text-slate-600" />
                        <span className="text-sm font-medium text-slate-900">Password Policy</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <h3 className="text-base font-semibold text-slate-900 mb-6">General Settings</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Site Name</label>
                      <input
                        type="text"
                        defaultValue="My Website"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Admin Email</label>
                      <input
                        type="email"
                        defaultValue="admin@example.com"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <h3 className="text-base font-semibold text-slate-900 mb-6">Security</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <span className="text-sm font-medium text-slate-900">Two-Factor Auth</span>
                      <label className="relative inline-block w-11 h-6">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-slate-900 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <span className="text-sm font-medium text-slate-900">Login Attempts</span>
                      <input
                        type="number"
                        defaultValue="5"
                        className="w-16 px-3 py-1.5 border border-slate-200 rounded text-sm text-center focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
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
