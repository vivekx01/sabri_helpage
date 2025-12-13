import React, { useEffect, useState } from 'react';
import { LayoutDashboard, FileText, Settings, Menu, X, Search, Edit, Check, Archive, Trash2, Users, Lock, UserPlus, LogIn, TrendingUp, Eye, Clock } from 'lucide-react';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [pages, setPages] = useState([]);
  const [pageContent, setPageContent] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001/api';

  useEffect(() => {
    // Load pages registry from backend
    fetch(`${API_BASE}/content/pages`)
      .then(r => r.json())
      .then(list => {
        if (Array.isArray(list)) {
          setPages(list.map(p => `${p.name.replace(/\s+/g, '')}Page.jsx`));
        } else {
          setPages([]);
        }
      })
      .catch(() => setPages([]));
  }, []);

  const stats = [
    { label: 'Total Pages', value: '21', icon: FileText, color: 'blue' },
    { label: 'Published', value: '18', icon: Check, color: 'green' },
    { label: 'Draft', value: '2', icon: Clock, color: 'yellow' },
    { label: 'Archived', value: '1', icon: Archive, color: 'gray' }
  ];

  const filteredPages = pages.filter(page => 
    page.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageAction = (action, page) => {
    console.log(`${action} action on ${page}`);
    // TODO: connect actions to backend endpoints
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
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
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeSection === 'dashboard' && 'Dashboard'}
            {activeSection === 'pages' && (selectedPage ? selectedPage : 'Pages Management')}
            {activeSection === 'settings' && 'Settings'}
          </h2>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {/* Dashboard */}
          {activeSection === 'dashboard' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                          <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                          <Icon className={`text-${stat.color}-600`} size={24} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp size={20} className="text-blue-600" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {['HomePage.jsx updated', 'BlogPage.jsx published', 'ContactPage.jsx edited'].map((activity, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Eye size={20} className="text-blue-600" />
                    Quick Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Page Views Today</span>
                      <span className="font-bold text-gray-800">1,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Users</span>
                      <span className="font-bold text-gray-800">89</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Pending Reviews</span>
                      <span className="font-bold text-gray-800">5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pages Management */}
          {activeSection === 'pages' && !selectedPage && (
            <div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search pages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPages.map((page, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedPage(page);
                      const slug = page.replace('Page.jsx','').toLowerCase();
                      const map = {
                        homepage: 'home', aboutpage: 'about', awardspage: 'awards', blogpage: 'blog', contactpage: 'contact',
                        csrsummitpage: 'csr', donatepage: 'donate', elderlycarepage: 'elderly-care', eventspage: 'events', faqpage: 'faq',
                        gallerypage: 'gallery', girleducationpage: 'girl-education', ilcpage: 'ilc', internshippage: 'internship', mentoringpage: 'mentoring',
                        ourcauseslandingpage: 'ourcauses', privacypage: 'privacy', publicationspage: 'publications', sociofarepage: 'sociofare', storiespage: 'stories', termspage: 'terms'
                      };
                      const resolved = map[slug] || slug;
                      fetch(`${API_BASE}/content/page/${resolved}`)
                        .then(r => r.json())
                        .then(data => setPageContent(data))
                        .catch(()=> setPageContent(null));
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="text-blue-600" size={20} />
                        <h3 className="font-semibold text-gray-800">{page}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">Published</span>
                      <span className="text-gray-500">Last updated: 2h ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Page Editor */}
          {activeSection === 'pages' && selectedPage && (
            <div>
              <button
                onClick={() => setSelectedPage(null)}
                className="mb-4 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
              >
                ← Back to Pages
              </button>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{selectedPage}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePageAction('edit', selectedPage)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handlePageAction('approve', selectedPage)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
                      >
                        <Check size={16} />
                        Approve
                      </button>
                      <button
                        onClick={() => handlePageAction('archive', selectedPage)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center gap-2"
                      >
                        <Archive size={16} />
                        Archive
                      </button>
                      <button
                        onClick={() => handlePageAction('delete', selectedPage)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                      <input
                        type="text"
                        defaultValue={(pageContent?.title) || selectedPage.replace('.jsx', '')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Content</label>
                      <textarea
                        rows="10"
                        placeholder="Edit page content here..."
                        defaultValue={(pageContent?.sections || []).map(s => s.text).filter(Boolean).join('\n\n')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                      <input
                        type="text"
                        placeholder="SEO description..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue={pageContent?.status || 'draft'}>
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                        <input
                          type="text"
                          defaultValue="Admin"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings */}
          {activeSection === 'settings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="text-blue-600" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">User Roles</h3>
                </div>
                <div className="space-y-3">
                  {['Administrator', 'Editor', 'Author', 'Contributor'].map((role, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{role}</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Manage
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex itemscenter gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Lock className="text-green-600" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Authentication</h3>
                </div>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <LogIn size={18} className="text-gray-600" />
                      <span className="text-gray-700">Login Settings</span>
                    </div>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <UserPlus size={18} className="text-gray-600" />
                      <span className="text-gray-700">Signup Settings</span>
                    </div>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <Lock size={18} className="text-gray-600" />
                      <span className="text-gray-700">Password Policy</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                    <input
                      type="text"
                      defaultValue="My Website"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                    <input
                      type="email"
                      defaultValue="admin@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Security</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Two-Factor Auth</span>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Login Attempts Limit</span>
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
