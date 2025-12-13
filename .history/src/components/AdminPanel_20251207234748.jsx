import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, Settings, Menu, X, Search, Edit, Check, 
  Archive, Trash2, Users, Lock, UserPlus, LogIn, ChevronRight, Plus, 
  GripVertical, Image, Layout, Shield, UserCog, Eye, LogOut, AlertCircle,
  BookOpen, Award, Calendar, HelpCircle, Camera, FileImage, Book
} from 'lucide-react';

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
  
  // Data states
  const [pages, setPages] = useState([]);
  const [causes, setCauses] = useState([]);
  const [stories, setStories] = useState([]);
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [awards, setAwards] = useState([]);
  const [publications, setPublications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [globalConfig, setGlobalConfig] = useState(null);
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [saving, setSaving] = useState(false);

  // API Base URL
  const API_BASE = 'http://localhost:5000/api';

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated, activeSection]);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      const userData = JSON.parse(localStorage.getItem('adminUser') || '{}');
      setUser(userData);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      const data = await response.json();
      
      if (response.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        setIsAuthenticated(true);
        setUser(data.user);
        setLoginEmail('');
        setLoginPassword('');
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Failed to connect to server. Make sure backend is running on port 5000.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    setUser(null);
    setSelectedPage(null);
  };

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
  });

  const fetchAllData = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      switch (activeSection) {
        case 'pages':
          const pagesRes = await fetch(`${API_BASE}/admin/pages`, {
            headers: getAuthHeaders()
          });
          setPages(await pagesRes.json());
          break;

        case 'causes':
          const causesRes = await fetch(`${API_BASE}/admin/causes`, {
            headers: getAuthHeaders()
          });
          setCauses(await causesRes.json());
          break;

        case 'stories':
          const storiesRes = await fetch(`${API_BASE}/admin/stories`, {
            headers: getAuthHeaders()
          });
          setStories(await storiesRes.json());
          break;

        case 'events':
          const eventsRes = await fetch(`${API_BASE}/admin/events`, {
            headers: getAuthHeaders()
          });
          setEvents(await eventsRes.json());
          break;

        case 'blogs':
          const blogsRes = await fetch(`${API_BASE}/admin/blogs`, {
            headers: getAuthHeaders()
          });
          setBlogs(await blogsRes.json());
          break;

        case 'faqs':
          const faqsRes = await fetch(`${API_BASE}/admin/faqs`, {
            headers: getAuthHeaders()
          });
          setFaqs(await faqsRes.json());
          break;

        case 'awards':
          const awardsRes = await fetch(`${API_BASE}/admin/awards`, {
            headers: getAuthHeaders()
          });
          setAwards(await awardsRes.json());
          break;

        case 'publications':
          const pubsRes = await fetch(`${API_BASE}/admin/publications`, {
            headers: getAuthHeaders()
          });
          setPublications(await pubsRes.json());
          break;

        case 'contacts':
          const contactsRes = await fetch(`${API_BASE}/admin/contacts`, {
            headers: getAuthHeaders()
          });
          setContacts(await contactsRes.json());
          break;

        case 'settings':
          const configRes = await fetch(`${API_BASE}/admin/config`, {
            headers: getAuthHeaders()
          });
          setGlobalConfig(await configRes.json());
          break;
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  // CRUD Operations
  const handleSavePage = async (slug, data) => {
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE}/admin/pages/${slug}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Page saved successfully!');
        fetchAllData();
      } else {
        alert('Failed to save page');
      }
    } catch (error) {
      alert('Error saving page: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCause = async (slug, data) => {
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE}/admin/causes/${slug}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Cause saved successfully!');
        fetchAllData();
      } else {
        alert('Failed to save cause');
      }
    } catch (error) {
      alert('Error saving cause: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateStory = async (data) => {
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE}/admin/stories`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Story created successfully!');
        setSelectedItem(null);
        fetchAllData();
      } else {
        alert('Failed to create story');
      }
    } catch (error) {
      alert('Error creating story: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateStory = async (id, data) => {
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE}/admin/stories/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Story updated successfully!');
        fetchAllData();
      } else {
        alert('Failed to update story');
      }
    } catch (error) {
      alert('Error updating story: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStory = async (id) => {
    if (!confirm('Are you sure you want to delete this story?')) return;
    
    try {
      const response = await fetch(`${API_BASE}/admin/stories/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        alert('Story deleted successfully!');
        fetchAllData();
      } else {
        alert('Failed to delete story');
      }
    } catch (error) {
      alert('Error deleting story: ' + error.message);
    }
  };

  const handleSaveGlobalConfig = async (data) => {
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE}/admin/config`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Settings saved successfully!');
        fetchAllData();
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      alert('Error saving settings: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

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
            <p className="text-gray-600 mt-2">Sabri Helpage CMS</p>
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
                placeholder="admin@sabrihelpage.org"
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

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              First time? Use <code className="bg-gray-100 px-2 py-1 rounded">POST /api/auth/register</code> to create an admin account
            </p>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'causes', label: 'Causes', icon: Users },
    { id: 'stories', label: 'Stories', icon: BookOpen },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'blogs', label: 'Blogs', icon: Book },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'awards', label: 'Awards', icon: Award },
    { id: 'publications', label: 'Publications', icon: FileImage },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const stats = [
    { label: 'Total Pages', value: pages.length || '21', icon: FileText },
    { label: 'Stories', value: stories.length || '0', icon: BookOpen },
    { label: 'Events', value: events.length || '0', icon: Calendar },
    { label: 'Contacts', value: contacts.length || '0', icon: Users }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 transition-all duration-300 flex flex-col relative z-10 shadow-2xl`}>
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Sabri CMS
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

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSelectedPage(null);
                  setSelectedItem(null);
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
                  <p className="text-xs text-gray-500 capitalize">{user.role || 'admin'}</p>
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
              <h2 className="text-xl font-bold text-gray-900 capitalize">{activeSection}</h2>
              <p className="text-sm text-gray-600 mt-1">
                Manage your {activeSection} content
              </p>
            </div>
            {activeSection !== 'dashboard' && activeSection !== 'settings' && activeSection !== 'contacts' && (
              <button
                onClick={() => setSelectedItem({ _id: null })}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2"
              >
                <Plus size={16} />
                Create New
              </button>
            )}
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
                          </div>
                          <div className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                            <Icon className="text-indigo-600" size={20} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-base font-semibold text-gray-900 mb-6">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['pages', 'stories', 'events', 'blogs'].map((section) => (
                      <button
                        key={section}
                        onClick={() => setActiveSection(section)}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all text-center capitalize"
                      >
                        {section}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Pages List */}
            {activeSection === 'pages' && !selectedPage && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                  <input
                    type="text"
                    placeholder="Search pages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pages.filter(p => p.slug.includes(searchTerm.toLowerCase())).map((page) => (
                    <div
                      key={page._id}
                      onClick={() => setSelectedPage(page)}
                      className="bg-white rounded-xl p-5 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                    >
                      <h3 className="font-semibold text-gray-900 capitalize">{page.slug}</h3>
                      <p className="text-sm text-gray-500 mt-1">{page.title || 'No title'}</p>
                      <span className="inline-block mt-3 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                        {page.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Page Editor */}
            {activeSection === 'pages' && selectedPage && (
              <PageEditor
                page={selectedPage}
                onBack={() => setSelectedPage(null)}
                onSave={handleSavePage}
                saving={saving}
              />
            )}

            {/* Causes List */}
            {activeSection === 'causes' && !selectedItem && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {causes.map((cause) => (
                  <div
                    key={cause._id}
                    onClick={() => setSelectedItem(cause)}
                    className="bg-white rounded-xl p-5 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                  >
                    <h3 className="font-semibold text-gray-900">{cause.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{cause.subtitle}</p>
                    <span className="inline-block mt-3 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                      {cause.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Cause Editor */}
            {activeSection === 'causes' && selectedItem && (
              <CauseEditor
                cause={selectedItem}
                onBack={() => setSelectedItem(null)}
                onSave={handleSaveCause}
                saving={saving}
              />
            )}

            {/* Stories List */}
            {activeSection === 'stories' && !selectedItem && (
              <div className="space-y-4">
                {stories.map((story) => (
                  <div
                    key={story._id}
                    className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{story.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{story.excerpt}</p>
                        <span className="inline-block mt-3 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                          {story.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedItem(story)}
                          className="px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteStory(story._id)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Story Editor */}
            {activeSection === 'stories' && selectedItem && (
              <StoryEditor
                story={selectedItem}
                onBack={() => setSelectedItem(null)}
                onCreate={handleCreateStory}
                onUpdate={handleUpdateStory}
                saving={saving}
              />
            )}

            {/* Settings */}
            {activeSection === 'settings' && (
              <GlobalConfigEditor
                config={globalConfig}
                onSave={handleSaveGlobalConfig}
                saving={saving}
              />
            )}

            {/* Contacts */}
            {activeSection === 'contacts' && (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact._id} className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                        <p className="text-sm text-gray-500 mt-2">{contact.message}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        contact.status === 'new' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-700'
                      }`}>
                        {contact.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

// Simple editors for different content types
const PageEditor = ({ page, onBack, onSave, saving }) => {
  const [formData, setFormData] = useState(page);

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-indigo-600 hover:text-indigo-700">← Back</button>
      
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold mb-4 capitalize">{formData.slug}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subtitle</label>
            <input
              type="text"
              value={formData.subtitle || ''}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          <button
            onClick={() => onSave(formData.slug, formData)}
            disabled={saving}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

const CauseEditor = ({ cause, onBack, onSave, saving }) => {
  const [formData, setFormData] = useState(cause);

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-indigo-600 hover:text-indigo-700">← Back</button>
      
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold mb-4">{formData.title || 'New Cause'}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
<input
type="text"
value={formData.title || ''}
onChange={(e) => setFormData({ ...formData, title: e.target.value })}
className="w-full px-4 py-3 border rounded-lg"
/>
</div>
      <div>
        <label className="block text-sm font-medium mb-2">Subtitle</label>
        <input
          type="text"
          value={formData.subtitle || ''}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          rows="4"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      <button
        onClick={() => onSave(formData.slug, formData)}
        disabled={saving}
        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  </div>
</div>
);
};
const StoryEditor = ({ story, onBack, onCreate, onUpdate, saving }) => {
const [formData, setFormData] = useState(story);
const handleSubmit = () => {
if (formData._id) {
onUpdate(formData._id, formData);
} else {
onCreate(formData);
}
};
return (
<div className="space-y-6">
<button onClick={onBack} className="text-indigo-600 hover:text-indigo-700">← Back</button>
  <div className="bg-white rounded-xl p-6 border border-gray-200">
    <h3 className="text-xl font-bold mb-4">{formData._id ? 'Edit Story' : 'Create Story'}</h3>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Excerpt</label>
        <textarea
          rows="3"
          value={formData.excerpt || ''}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Content</label>
        <textarea
          rows="8"
          value={formData.content || ''}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={saving}
        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg disabled:opacity-50"
      >
        {saving ? 'Saving...' : (formData._id ? 'Update Story' : 'Create Story')}
      </button>
    </div>
  </div>
</div>
);
};
const GlobalConfigEditor = ({ config, onSave, saving }) => {
const [formData, setFormData] = useState(config || {});
return (
<div className="space-y-6">
<div className="bg-white rounded-xl p-6 border border-gray-200">
<h3 className="text-xl font-bold mb-4">Global Settings</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Site Name</label>
        <input
          type="text"
          value={formData.siteName || ''}
          onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tagline</label>
        <input
          type="text"
          value={formData.tagline || ''}
          onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      <button
        onClick={() => onSave(formData)}
        disabled={saving}
        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Settings'}
      </button>
    </div>
  </div>
</div>
);
};
export default AdminPanel;