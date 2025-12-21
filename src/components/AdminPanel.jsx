import React, { useEffect, useMemo, useState } from 'react';
import { LayoutDashboard, FileText, Settings, Menu, X, Search, Edit, Check, Archive, Trash2, Users, Lock, UserPlus, LogIn, ChevronRight, Plus, GripVertical, Image, Layout, Shield, UserCog, Eye, Globe, Palette, Bell, Database, Package, LogOut } from 'lucide-react';
import api from '../services/api.mjs';
import { usePagesStore } from '../stores/pageInformationSlice';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSubsection, setSelectedSubsection] = useState('global');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSection, setEditingSection] = useState(null);
  const [pageDoc, setPageDoc] = useState(null);
  
  // Get pages from Zustand store
  const storePages = usePagesStore((state) => state.pages);
  const storeLoading = usePagesStore((state) => state.loading);
  const storeError = usePagesStore((state) => state.error);
  const fetchPages = usePagesStore((state) => state.fetchPages);
  const getPageBySlug = usePagesStore((state) => state.getPageBySlug);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([
    {
      id: 'admin',
      name: 'Administrator',
      icon: Shield,
      color: 'border-blue-200 bg-blue-50',
      permissions: 'Full access to all features',
    },
    {
      id: 'editor',
      name: 'Editor',
      icon: Edit,
      color: 'border-purple-200 bg-purple-50',
      permissions: 'Can create and edit content',
    },
    {
      id: 'author',
      name: 'Author',
      icon: FileText,
      color: 'border-green-200 bg-green-50',
      permissions: 'Can write and manage own content',
    },
    {
      id: 'subscriber',
      name: 'Subscriber',
      icon: Users,
      color: 'border-gray-200 bg-gray-50',
      permissions: 'Can read content and manage profile',
    }
  ]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'global', label: 'Global Settings', icon: Globe },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const stats = [
    { label: 'Total Pages', value: '10', change: '+12%', icon: FileText },
    { label: 'Published', value: '8', change: '+8%', icon: Check },
    { label: 'Draft', value: '1', change: '-3%', icon: Edit },
    { label: 'Archived', value: '1', change: '0%', icon: Archive }
  ];

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      // No token found, redirect to login
      window.location.href = '/admin';
      return;
    }
    
    // Token exists, load user data
    try {
      const userData = JSON.parse(localStorage.getItem('adminUser') || '{}');
      setUser({ email: userData.email || 'admin', role: userData.role || 'admin' });
    } catch (e) {
      console.error('Error parsing user data:', e);
    }
  }, []);

  // Fetch pages from store when active section changes to pages
  useEffect(() => {
    if (activeSection !== 'pages') return;
    
    // Fetch pages if store is empty
    if (storePages.length === 0) {
      fetchPages();
    }
  }, [activeSection, storePages.length, fetchPages]);
  
  // Sync store loading/error states
  useEffect(() => {
    if (activeSection === 'pages') {
      setLoading(storeLoading);
      if (storeError) {
        setError(storeError);
      }
    }
  }, [activeSection, storeLoading, storeError]);

  useEffect(() => {
    if (!selectedPage) {
      setPageDoc(null);
      return;
    }
    
    // Get page data from store instead of making API call
    const pageData = getPageBySlug(selectedPage);
    if (pageData) {
      setPageDoc(pageData);
      setError('');
    } else {
      // If page not found in store, it might not be loaded yet
      setError('Page not found. Please refresh the pages list.');
      setPageDoc(null);
    }
  }, [selectedPage, getPageBySlug]);

  useEffect(() => {
    if (activeSection !== 'contacts') return;
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    fetch('/api/admin/contacts', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : [])
      .then(data => setContacts(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [activeSection]);

  // Extract slugs from store pages and filter
  const filteredPages = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    // Extract slugs from page objects in store
    const pageSlugs = storePages
      .map(page => page.slug || page.name || String(page))
      .filter(Boolean);
    
    return pageSlugs.filter(slug => slug.toLowerCase().includes(term));
  }, [storePages, searchTerm]);

  const handleLogout = async () => {
    await api.logout();
    setUser(null);
  };

  const pageTemplates = useMemo(() => {
    if (!pageDoc || !Array.isArray(pageDoc.sections)) return {};
    return {
      [selectedPage || '']: {
        sections: pageDoc.sections.map((s, idx) => ({ key: s.key || `section-${idx}`, ...s }))
      }
    };
  }, [pageDoc, selectedPage]);

  const renderFieldEditor = (label, value, onChange, type = 'text', placeholder = '') => {
    if (type === 'textarea') {
      return (
        <div key={label} className="space-y-1">
          <label className="text-xs font-medium text-gray-700">{label}</label>
          <textarea
            value={value || ''}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
            placeholder={placeholder}
          />
        </div>
      );
    }
    
    return (
      <div key={label} className="space-y-1">
        <label className="text-xs font-medium text-gray-700">{label}</label>
        <input
          type={type}
          value={value || ''}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder={placeholder}
        />
      </div>
    );
  };

  const renderArrayEditor = (label, items, onUpdate, itemType = 'object') => {
    if (!items || !Array.isArray(items)) return null;
    
    // Get common fields from existing items to use as template for new items
    const getCommonFields = () => {
      if (items.length === 0) return [];
      const firstItem = items.find(item => item && typeof item === 'object' && Object.keys(item).length > 0);
      return firstItem ? Object.keys(firstItem) : [];
    };
    
    const commonFields = getCommonFields();
    
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-700">{label} ({items.length})</label>
          <button
            onClick={() => {
              // Create new item with common fields initialized to empty strings
              const newItem = itemType === 'object' 
                ? commonFields.reduce((acc, key) => ({ ...acc, [key]: '' }), {})
                : '';
              const updated = [...items, newItem];
              onUpdate(updated);
            }}
            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
          >
            + Add Item
          </button>
        </div>
        <div className="space-y-3 border border-gray-200 rounded-lg p-3 bg-gray-50">
          {items.map((item, idx) => {
            const itemKeys = itemType === 'object' && item ? Object.keys(item) : [];
            const hasFields = itemKeys.length > 0;
            
            return (
              <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600">Item {idx + 1}</span>
                  <div className="flex items-center gap-2">
                    {itemType === 'object' && (
                      <button
                        onClick={() => {
                          const fieldName = prompt('Enter field name:');
                          if (fieldName && fieldName.trim()) {
                            const updated = [...items];
                            updated[idx] = { ...item, [fieldName.trim()]: '' };
                            onUpdate(updated);
                          }
                        }}
                        className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                        title="Add Field"
                      >
                        + Field
                      </button>
                    )}
                    <button
                      onClick={() => {
                        const updated = items.filter((_, i) => i !== idx);
                        onUpdate(updated);
                      }}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {itemType === 'object' ? (
                  <div className="space-y-2">
                    {hasFields ? (
                      itemKeys.map((key) => (
                        <div key={key} className="flex items-start gap-2">
                          <div className="flex-1">
                            {typeof item[key] === 'string' || typeof item[key] === 'number' ? (
                              renderFieldEditor(
                                key,
                                item[key],
                                (e) => {
                                  const updated = [...items];
                                  updated[idx] = { ...item, [key]: e.target.value };
                                  onUpdate(updated);
                                },
                                key.toLowerCase().includes('description') || key.toLowerCase().includes('text') || key.toLowerCase().includes('content') ? 'textarea' : 'text'
                              )
                            ) : (
                              <div className="space-y-1">
                                <label className="text-xs font-medium text-gray-700">{key}</label>
                                <input
                                  type="text"
                                  value={JSON.stringify(item[key])}
                                  onChange={(e) => {
                                    try {
                                      const parsed = JSON.parse(e.target.value);
                                      const updated = [...items];
                                      updated[idx] = { ...item, [key]: parsed };
                                      onUpdate(updated);
                                    } catch {}
                                  }}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-xs"
                                  placeholder="JSON value"
                                />
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              const updated = [...items];
                              const newItem = { ...item };
                              delete newItem[key];
                              updated[idx] = newItem;
                              onUpdate(updated);
                            }}
                            className="text-xs text-red-600 hover:text-red-700 mt-6 px-2"
                            title="Remove Field"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-sm text-gray-500">
                        <p className="mb-2">No fields yet</p>
                        <button
                          onClick={() => {
                            const fieldName = prompt('Enter field name:');
                            if (fieldName && fieldName.trim()) {
                              const updated = [...items];
                              updated[idx] = { [fieldName.trim()]: '' };
                              onUpdate(updated);
                            }
                          }}
                          className="text-xs text-indigo-600 hover:text-indigo-700 font-medium border border-indigo-300 rounded px-3 py-1"
                        >
                          + Add First Field
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx] = e.target.value;
                      onUpdate(updated);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Enter value"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderObjectEditor = (label, obj, onUpdate, path = '') => {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return null;
    
    return (
      <div className="space-y-2 border border-gray-200 rounded-lg p-3 bg-gray-50">
        <label className="text-xs font-medium text-gray-700">{label}</label>
        {Object.keys(obj).map((key) => {
          const value = obj[key];
          const fieldPath = path ? `${path}.${key}` : key;
          
          if (typeof value === 'string' || typeof value === 'number') {
            return renderFieldEditor(
              key,
              value,
              (e) => {
                const updated = { ...obj, [key]: e.target.value };
                onUpdate(updated);
              }
            );
          } else if (Array.isArray(value)) {
            return renderArrayEditor(
              key,
              value,
              (updated) => {
                const newObj = { ...obj, [key]: updated };
                onUpdate(newObj);
              },
              typeof value[0] === 'object' ? 'object' : 'string'
            );
          } else if (typeof value === 'object' && value !== null) {
            return renderObjectEditor(
              key,
              value,
              (updated) => {
                const newObj = { ...obj, [key]: updated };
                onUpdate(newObj);
              },
              fieldPath
            );
          }
          return null;
        })}
      </div>
    );
  };

  const renderSectionEditor = (section) => {
    const sectionType = section.type || 'unknown';
    const sectionTitle = section.title || section.headline || section.heading || sectionType;
    
    return (
      <div key={section.key} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
              <Layout className="text-indigo-600" size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">{sectionTitle}</h4>
              <p className="text-xs text-gray-500 capitalize">{sectionType} Section</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Type field */}
          {renderFieldEditor(
            'Type',
            section.type,
            (e) => updateSection(section.key, { type: e.target.value })
          )}
          
          {/* Render all simple fields */}
          {Object.keys(section).filter(key => 
            key !== 'key' && 
            key !== 'type' &&
            typeof section[key] !== 'object' &&
            !Array.isArray(section[key])
          ).map((key) => {
            const value = section[key];
            return renderFieldEditor(
              key,
              value,
              (e) => updateSection(section.key, { [key]: e.target.value }),
              key.toLowerCase().includes('description') || key.toLowerCase().includes('text') || key.toLowerCase().includes('content') ? 'textarea' : 'text'
            );
          })}
          
          {/* Render array fields */}
          {Object.keys(section).filter(key => 
            Array.isArray(section[key])
          ).map((key) => {
            const items = section[key];
            return renderArrayEditor(
              key,
              items,
              (updated) => updateSection(section.key, { [key]: updated }),
              items.length > 0 && typeof items[0] === 'object' ? 'object' : 'string'
            );
          })}
          
          {/* Render object fields */}
          {Object.keys(section).filter(key => 
            typeof section[key] === 'object' && 
            section[key] !== null && 
            !Array.isArray(section[key]) &&
            key !== 'key'
          ).map((key) => {
            const obj = section[key];
            return renderObjectEditor(
              key,
              obj,
              (updated) => updateSection(section.key, { [key]: updated })
            );
          })}
        </div>
      </div>
    );
  };

  const updateSection = (key, patch) => {
    if (!pageDoc) return;
    const updated = { ...pageDoc };
    updated.sections = updated.sections.map(s => (s.key === key || s.key === undefined && (`section-${updated.sections.indexOf(s)}` === key)) ? { ...s, ...patch } : s);
    setPageDoc(updated);
  };

  const savePage = async () => {
    if (!selectedPage || !pageDoc) return;
    setLoading(true);
    setError('');
    try {
      const updatedPage = await api.updateAdminPage(selectedPage, { sections: pageDoc.sections });
      // Update the store with the updated page data
      const updatedPages = storePages.map(page => 
        page.slug === selectedPage ? updatedPage : page
      );
      usePagesStore.getState().setPages(updatedPages);
      // Update pageDoc with the response
      setPageDoc(updatedPage);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

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
                  {filteredPages.map((slug) => (
                    <button
                      key={slug}
                      onClick={() => setSelectedPage(slug)}
                      className="bg-white rounded-xl p-5 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all text-left group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg group-hover:from-indigo-100 group-hover:to-purple-100 transition-colors">
                            <Layout className="text-indigo-600" size={18} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm truncate">{slug}</h3>
                          </div>
                        </div>
                        <ChevronRight className="text-gray-400 group-hover:text-indigo-600 transition-colors flex-shrink-0" size={16} />
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
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={savePage}
                      disabled={loading || !pageDoc}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Check size={16} />
                      {loading ? 'Saving...' : 'Save Page'}
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 shadow-sm">
                      <Plus size={16} />
                      Add Section
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
                      <Layout className="text-indigo-600" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 capitalize">{selectedPage} Page</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Manage all content sections using reusable components
                  </p>
                </div>

                <div className="space-y-4">
                  {pageTemplates[selectedPage]?.sections?.length > 0 ? (
                    pageTemplates[selectedPage].sections.map((section) => renderSectionEditor(section))
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
                      <p className="text-gray-500 text-sm">No sections found for this page</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Causes List */}
            {false && activeSection === 'causes' && !selectedItem && (
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
            {false && activeSection === 'causes' && selectedItem && (
              <CauseEditor
                cause={selectedItem}
                onBack={() => setSelectedItem(null)}
                onSave={handleSaveCause}
                saving={saving}
              />
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

            {/* Global Settings */}
            {false && activeSection === 'global' && renderGlobalSettings()}

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
                </div>
              </div>
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
export default AdminPanel;