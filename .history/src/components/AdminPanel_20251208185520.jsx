import React, { useEffect, useMemo, useState } from 'react';
import { LayoutDashboard, FileText, Settings, Menu, X, Search, Edit, Check, Archive, Trash2, Users, Lock, UserPlus, LogIn, ChevronRight, Plus, GripVertical, Image, Layout, Shield, UserCog, Eye, Globe, Palette, Bell, Database, Package, LogOut, BookOpen, Calendar, Award, FileQuestion, MessageSquare, Briefcase, Heart, Video, Newspaper } from 'lucide-react';
import api from '../api';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedSubsection, setSelectedSubsection] = useState('global');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSection, setEditingSection] = useState(null);
  const [pages, setPages] = useState([]);
  const [pageDoc, setPageDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState(null);
  const [showCreatePage, setShowCreatePage] = useState(false);
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newPageTitle, setNewPageTitle] = useState('');
  const [globalConfig, setGlobalConfig] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [stories, setStories] = useState([]);
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [awards, setAwards] = useState([]);
  const [publications, setPublications] = useState([]);
  const [causes, setCauses] = useState([]);
  const [internships, setInternships] = useState([]);
  const [csrProposals, setCsrProposals] = useState([]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'causes', label: 'Causes', icon: Heart },
    { id: 'stories', label: 'Stories', icon: BookOpen },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'blogs', label: 'Blogs', icon: Newspaper },
    { id: 'faqs', label: 'FAQs', icon: FileQuestion },
    { id: 'awards', label: 'Awards', icon: Award },
    { id: 'publications', label: 'Publications', icon: Briefcase },
    { id: 'contacts', label: 'Contacts', icon: MessageSquare },
    { id: 'internships', label: 'Internships', icon: Users },
    { id: 'csr', label: 'CSR Proposals', icon: Package },
    { id: 'global', label: 'Global Settings', icon: Globe },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const stats = [
    { label: 'Total Pages', value: '10', change: '+12%', icon: FileText },
    { label: 'Published', value: '8', change: '+8%', icon: Check },
    { label: 'Draft', value: '1', change: '-3%', icon: Edit },
    { label: 'Archived', value: '1', change: '0%', icon: Archive }
  ];

  // Fetch basic admin data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUser({ email: 'admin', role: 'admin' });
  }, []);

  useEffect(() => {
    if (activeSection !== 'pages') return;
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    fetch('/api/admin/pages', { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }})
      .then(r => r.ok ? r.json() : Promise.reject(new Error('Failed to load pages')))
      .then(data => {
        const slugs = Array.isArray(data) ? data.map(p => p.slug || p) : [];
        setPages(slugs);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeSection]);

  useEffect(() => {
    if (!selectedPage) return;
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    fetch(`/api/admin/pages/${selectedPage}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : Promise.reject(new Error('Failed to load page')))
      .then(data => setPageDoc(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedPage]);

  useEffect(() => {
    if (activeSection !== 'contacts') return;
    setLoading(true);
    const token = localStorage.getItem('token');
    fetch('/api/admin/contacts', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : [])
      .then(data => setContacts(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [activeSection]);

  useEffect(() => {
    if (activeSection !== 'global') return;
    setGlobalLoading(true);
    setGlobalError('');
    const token = localStorage.getItem('token');
    fetch('/api/admin/config', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : Promise.reject(new Error('Failed to load global config')))
      .then(data => setGlobalConfig(data))
      .catch(err => setGlobalError(err.message))
      .finally(() => setGlobalLoading(false));
  }, [activeSection]);

  const filteredPages = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return pages.filter(p => p.toLowerCase().includes(term));
  }, [pages, searchTerm]);

  const handleLogout = () => {
    localStorage.removeItem('token');
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

  const renderSectionEditor = (section) => {
    return (
      <div key={section.key} className="bg-white rounded-xl p-5 border border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
            <Layout className="text-indigo-600" size={18} />
          </div>
          <h4 className="font-semibold text-gray-900 text-sm">{section.heading || section.key}</h4>
        </div>
        <div className="space-y-3">
          <input
            type="text"
            value={section.heading || ''}
            onChange={(e) => updateSection(section.key, { heading: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            placeholder="Heading"
          />
          <textarea
            value={section.content || ''}
            onChange={(e) => updateSection(section.key, { content: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            rows={4}
            placeholder="Content"
          />
          <button
            onClick={() => savePage()}
            className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm"
          >
            Save Section
          </button>
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
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/pages/${selectedPage}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ sections: pageDoc.sections })
      });
      if (!res.ok) throw new Error('Failed to save page');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const saveGlobalConfig = async () => {
    setGlobalLoading(true);
    setGlobalError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(globalConfig)
      });
      if (!res.ok) throw new Error('Failed to save global config');
    } catch (e) {
      setGlobalError(e.message);
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleCreatePage = async () => {
    if (!newPageSlug) return;
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      // If you have a UI for sections, parse it here
      let sectionsArray = [];
      if (newPageSections) {
        try {
          // Try to parse as JSON array
          const parsed = JSON.parse(newPageSections);
          sectionsArray = Array.isArray(parsed) ? parsed : [parsed];
        } catch {
          // If not JSON, treat as single section object or string
          sectionsArray = [newPageSections];
        }
      }
      const res = await fetch(`/api/admin/pages/${newPageSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ slug: newPageSlug, title: newPageTitle, sections: sectionsArray })
      });
      if (!res.ok) throw new Error('Failed to create page');
      setShowCreatePage(false);
      setNewPageSlug('');
      setNewPageTitle('');
      setActiveSection('pages');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // CRUD functions for different content types
  const handleCreateStory = async (storyData) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(storyData)
      });
      if (!res.ok) throw new Error('Failed to create story');
      const newStory = await res.json();
      setStories(prev => [newStory, ...prev]);
      setSelectedItem(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateStory = async (id, storyData) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/stories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(storyData)
      });
      if (!res.ok) throw new Error('Failed to update story');
      const updatedStory = await res.json();
      setStories(prev => prev.map(s => s._id === id ? updatedStory : s));
      setSelectedItem(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStory = async (id) => {
    if (!confirm('Are you sure you want to delete this story?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/stories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete story');
      setStories(prev => prev.filter(s => s._id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  const handleCreateEvent = async (eventData) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(eventData)
      });
      if (!res.ok) throw new Error('Failed to create event');
      const newEvent = await res.json();
      setEvents(prev => [newEvent, ...prev]);
      setSelectedItem(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateEvent = async (id, eventData) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(eventData)
      });
      if (!res.ok) throw new Error('Failed to update event');
      const updatedEvent = await res.json();
      setEvents(prev => prev.map(e => e._id === id ? updatedEvent : e));
      setSelectedItem(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete event');
      setEvents(prev => prev.filter(e => e._id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  const handleCreateBlog = async (blogData) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(blogData)
      });
      if (!res.ok) throw new Error('Failed to create blog');
      const newBlog = await res.json();
      setBlogs(prev => [newBlog, ...prev]);
      setSelectedItem(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateBlog = async (id, blogData) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(blogData)
      });
      if (!res.ok) throw new Error('Failed to update blog');
      const updatedBlog = await res.json();
      setBlogs(prev => prev.map(b => b._id === id ? updatedBlog : b));
      setSelectedItem(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete blog');
      setBlogs(prev => prev.filter(b => b._id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  const handleCreateFaq = async (faqData) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(faqData)
      });
      if (!res.ok) throw new Error('Failed to create FAQ');
      const newFaq = await res.json();
      setFaqs(prev => [newFaq, ...prev]);
      setSelectedItem(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateFaq = async (id, faqData) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/faqs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(faqData)
      });
      if (!res.ok) throw new Error('Failed to update FAQ');
      const updatedFaq = await res.json();
      setFaqs(prev => prev.map(f => f._id === id ? updatedFaq : f));
      setSelectedItem(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFaq = async (id) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/faqs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete FAQ');
      setFaqs(prev => prev.filter(f => f._id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  const handleCreateAward = async (awardData) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/awards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(awardData)
      });
      if (!res.ok) throw new Error('Failed to create award');
      const newAward = await res.json();
      setAwards(prev => [newAward, ...prev]);
      setSelectedItem(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateAward = async (id, awardData) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/awards/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(awardData)
      });
      if (!res.ok) throw new Error('Failed to update award');
      const updatedAward = await res.json();
      setAwards(prev => prev.map(a => a._id === id ? updatedAward : a));
      setSelectedItem(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAward = async (id) => {
    if (!confirm('Are you sure you want to delete this award?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/awards/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete award');
      setAwards(prev => prev.filter(a => a._id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  const handleCreatePublication = async (publicationData) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/publications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(publicationData)
      });
      if (!res.ok) throw new Error('Failed to create publication');
      const newPublication = await res.json();
      setPublications(prev => [newPublication, ...prev]);
      setSelectedItem(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePublication = async (id, publicationData) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/publications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(publicationData)
      });
      if (!res.ok) throw new Error('Failed to update publication');
      const updatedPublication = await res.json();
      setPublications(prev => prev.map(p => p._id === id ? updatedPublication : p));
      setSelectedItem(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePublication = async (id) => {
    if (!confirm('Are you sure you want to delete this publication?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/publications/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete publication');
      setPublications(prev => prev.filter(p => p._id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  const handleCreateCause = async (causeData) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/causes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(causeData)
      });
      if (!res.ok) throw new Error('Failed to create cause');
      const newCause = await res.json();
      setCauses(prev => [newCause, ...prev]);
      setSelectedItem(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateCause = async (id, causeData) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/causes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(causeData)
      });
      if (!res.ok) throw new Error('Failed to update cause');
      const updatedCause = await res.json();
      setCauses(prev => prev.map(c => c._id === id ? updatedCause : c));
      setSelectedItem(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCause = async (id) => {
    if (!confirm('Are you sure you want to delete this cause?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/causes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete cause');
      setCauses(prev => prev.filter(c => c._id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  const handleUpdateContactStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/contacts/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update contact status');
      setContacts(prev => prev.map(c => c._id === id ? { ...c, status } : c));
    } catch (e) {
      setError(e.message);
    }
  };

  const handleUpdateInternshipStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/internships/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update internship status');
      setInternships(prev => prev.map(i => i._id === id ? { ...i, status } : i));
    } catch (e) {
      setError(e.message);
    }
  };

  const handleUpdateCsrStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/csr/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update CSR status');
      setCsrProposals(prev => prev.map(c => c._id === id ? { ...c, status } : c));
    } catch (e) {
      setError(e.message);
    }
  };

  // Utility to ensure sections is always an array
  function normalizeSections(sections) {
    if (Array.isArray(sections)) return sections;
    if (typeof sections === 'string') {
      try {
        const parsed = JSON.parse(sections);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }

  // Utility to safely parse sections input
  function parseSectionsInput(input) {
    if (!input) return [];
    try {
      // If input is already an array, return as is
      if (Array.isArray(input)) return input;
      // Try to parse JSON
      const parsed = JSON.parse(input);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      // Fallback: wrap as single string in array
      return [input];
    }
  }

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
                <button
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg mb-4"
                  onClick={() => setShowCreatePage(true)}
                >
                  + Create New Page
                </button>
                {showCreatePage && (
                  <div className="bg-white rounded-xl p-6 border border-gray-200 mb-4">
                    <h3 className="text-lg font-bold mb-2">Create New Page</h3>
                    <input
                      type="text"
                      placeholder="Page Slug (e.g. home, about)"
                      value={newPageSlug}
                      onChange={e => setNewPageSlug(e.target.value)}
                      className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Page Title"
                      value={newPageTitle}
                      onChange={e => setNewPageTitle(e.target.value)}
                      className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                      onClick={handleCreatePage}
                    >
                      Create
                    </button>
                    <button
                      className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                      onClick={() => setShowCreatePage(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
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
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2 shadow-sm">
                    <Plus size={16} />
                    Add Section
                  </button>
                </div>

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
                  {pageTemplates[selectedPage]?.sections?.map((section) => renderSectionEditor(section))}
                </div>
              </div>
            )}

            {/* Stories Management */}
            {activeSection === 'stories' && !selectedItem && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Stories</h3>
                      <button
                        onClick={() => setSelectedItem({ _id: null, title: '', content: '', image: '', author: '' })}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add Story
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stories.map((story) => (
                    <div
                      key={story._id}
                      onClick={() => setSelectedItem(story)}
                      className="bg-white rounded-xl p-5 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                    >
                      <h3 className="font-semibold text-gray-900">{story.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{story.content?.substring(0, 100)}...</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-400">{story.author}</span>
                        <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                          Published
                        </span>
                      </div>
                    </div>
                  ))}
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

            {/* Events Management */}
            {activeSection === 'events' && !selectedItem && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Events</h3>
                      <button
                        onClick={() => setSelectedItem({ _id: null, title: '', description: '', date: '', location: '', image: '' })}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add Event
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {events.map((event) => (
                    <div
                      key={event._id}
                      onClick={() => setSelectedItem(event)}
                      className="bg-white rounded-xl p-5 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                    >
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{event.description?.substring(0, 100)}...</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-400">{new Date(event.date).toLocaleDateString()}</span>
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                          {event.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Event Editor */}
            {activeSection === 'events' && selectedItem && (
              <EventEditor
                event={selectedItem}
                onBack={() => setSelectedItem(null)}
                onCreate={handleCreateEvent}
                onUpdate={handleUpdateEvent}
                saving={saving}
              />
            )}

            {/* Blogs Management */}
            {activeSection === 'blogs' && !selectedItem && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Blogs</h3>
                      <button
                        onClick={() => setSelectedItem({ _id: null, title: '', content: '', excerpt: '', image: '', author: '', tags: [] })}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add Blog
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {blogs.map((blog) => (
                    <div
                      key={blog._id}
                      onClick={() => setSelectedItem(blog)}
                      className="bg-white rounded-xl p-5 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                    >
                      <h3 className="font-semibold text-gray-900">{blog.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{blog.excerpt || blog.content?.substring(0, 100)}...</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-400">{blog.author}</span>
                        <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                          Published
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Blog Editor */}
            {activeSection === 'blogs' && selectedItem && (
              <BlogEditor
                blog={selectedItem}
                onBack={() => setSelectedItem(null)}
                onCreate={handleCreateBlog}
                onUpdate={handleUpdateBlog}
                saving={saving}
              />
            )}

            {/* FAQs Management */}
            {activeSection === 'faqs' && !selectedItem && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">FAQs</h3>
                      <button
                        onClick={() => setSelectedItem({ _id: null, question: '', answer: '', order: faqs.length + 1 })}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add FAQ
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div
                      key={faq._id}
                      onClick={() => setSelectedItem(faq)}
                      className="bg-white rounded-xl p-5 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{faq.answer?.substring(0, 150)}...</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                            Order: {faq.order}
                          </span>
                          <ChevronRight className="text-gray-400" size={16} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Editor */}
            {activeSection === 'faqs' && selectedItem && (
              <FaqEditor
                faq={selectedItem}
                onBack={() => setSelectedItem(null)}
                onCreate={handleCreateFaq}
                onUpdate={handleUpdateFaq}
                saving={saving}
              />
            )}

            {/* Awards Management */}
            {activeSection === 'awards' && !selectedItem && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Awards</h3>
                      <button
                        onClick={() => setSelectedItem({ _id: null, title: '', description: '', year: new Date().getFullYear(), image: '' })}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add Award
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {awards.map((award) => (
                    <div
                      key={award._id}
                      onClick={() => setSelectedItem(award)}
                      className="bg-white rounded-xl p-5 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                    >
                      <h3 className="font-semibold text-gray-900">{award.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{award.description?.substring(0, 100)}...</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-400">{award.year}</span>
                        <span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs">
                          Award
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Award Editor */}
            {activeSection === 'awards' && selectedItem && (
              <AwardEditor
                award={selectedItem}
                onBack={() => setSelectedItem(null)}
                onCreate={handleCreateAward}
                onUpdate={handleUpdateAward}
                saving={saving}
              />
            )}

            {/* Publications Management */}
            {activeSection === 'publications' && !selectedItem && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Publications</h3>
                      <button
                        onClick={() => setSelectedItem({ _id: null, title: '', description: '', publishDate: new Date().toISOString().split('T')[0], link: '', image: '' })}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add Publication
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {publications.map((publication) => (
                    <div
                      key={publication._id}
                      onClick={() => setSelectedItem(publication)}
                      className="bg-white rounded-xl p-5 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                    >
                      <h3 className="font-semibold text-gray-900">{publication.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{publication.description?.substring(0, 100)}...</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-400">{new Date(publication.publishDate).toLocaleDateString()}</span>
                        <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
                          Publication
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Publication Editor */}
            {activeSection === 'publications' && selectedItem && (
              <PublicationEditor
                publication={selectedItem}
                onBack={() => setSelectedItem(null)}
                onCreate={handleCreatePublication}
                onUpdate={handleUpdatePublication}
                saving={saving}
              />
            )}

            {/* Causes Management */}
            {activeSection === 'causes' && !selectedItem && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Causes</h3>
                      <button
                        onClick={() => setSelectedItem({ _id: null, title: '', subtitle: '', description: '', image: '', order: causes.length + 1 })}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add Cause
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {causes.map((cause) => (
                    <div
                      key={cause._id}
                      onClick={() => setSelectedItem(cause)}
                      className="bg-white rounded-xl p-5 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                    >
                      <h3 className="font-semibold text-gray-900">{cause.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{cause.subtitle}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-400">Order: {cause.order}</span>
                        <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                          Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cause Editor */}
            {activeSection === 'causes' && selectedItem && (
              <CauseEditor
                cause={selectedItem}
                onBack={() => setSelectedItem(null)}
                onSave={(data) => selectedItem._id ? handleUpdateCause(selectedItem._id, data) : handleCreateCause(data)}
                saving={saving}
              />
            )}

            {/* Internships Management */}
            {activeSection === 'internships' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">Internship Applications</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  {internships.map((internship) => (
                    <div key={internship._id} className="bg-white rounded-xl p-5 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{internship.name}</h3>
                          <p className="text-sm text-gray-600">{internship.email}</p>
                          <p className="text-sm text-gray-500 mt-2">{internship.message}</p>
                          <div className="mt-2 text-xs text-gray-400">
                            <p>Phone: {internship.phone}</p>
                            <p>College: {internship.college}</p>
                            <p>Course: {internship.course}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={internship.status || 'pending'}
                            onChange={(e) => handleUpdateInternshipStatus(internship._id, e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            internship.status === 'accepted' ? 'bg-green-50 text-green-700' :
                            internship.status === 'rejected' ? 'bg-red-50 text-red-700' :
                            internship.status === 'reviewed' ? 'bg-blue-50 text-blue-700' :
                            'bg-yellow-50 text-yellow-700'
                          }`}>
                            {internship.status || 'pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CSR Proposals Management */}
            {activeSection === 'csr' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">CSR Proposals</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  {csrProposals.map((csr) => (
                    <div key={csr._id} className="bg-white rounded-xl p-5 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{csr.organizationName}</h3>
                          <p className="text-sm text-gray-600">{csr.contactEmail}</p>
                          <p className="text-sm text-gray-500 mt-2">{csr.proposal}</p>
                          <div className="mt-2 text-xs text-gray-400">
                            <p>Contact: {csr.contactPerson}</p>
                            <p>Phone: {csr.contactPhone}</p>
                            <p>Organization Type: {csr.organizationType}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={csr.status || 'pending'}
                            onChange={(e) => handleUpdateCsrStatus(csr._id, e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="under_review">Under Review</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            csr.status === 'approved' ? 'bg-green-50 text-green-700' :
                            csr.status === 'rejected' ? 'bg-red-50 text-red-700' :
                            csr.status === 'under_review' ? 'bg-blue-50 text-blue-700' :
                            'bg-yellow-50 text-yellow-700'
                          }`}>
                            {csr.status || 'pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
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

            {/* Global Settings */}
            {activeSection === 'global' && (
              <div className="space-y-6">
                {globalLoading ? <div>Loading...</div> : null}
                {globalError ? <div className="text-red-500">{globalError}</div> : null}
                {globalConfig && (
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Global Settings</h3>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                    <input
                      type="text"
                      value={globalConfig.siteName || ''}
                      onChange={e => setGlobalConfig({ ...globalConfig, siteName: e.target.value })}
                      className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                    <input
                      type="email"
                      value={globalConfig.contact?.email || ''}
                      onChange={e => setGlobalConfig({ ...globalConfig, contact: { ...globalConfig.contact, email: e.target.value } })}
                      className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                      onClick={saveGlobalConfig}
                    >
                      Save Settings
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
export default AdminPanel;