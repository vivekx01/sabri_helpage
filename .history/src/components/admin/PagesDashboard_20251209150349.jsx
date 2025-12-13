import React, { useState, useEffect } from 'react';
// Removed react-router-dom usage
import api from '../../services/api.mjs';
import {
  Users, Mail, Calendar, BookOpen, Heart, Home,
  Award, FileText, HelpCircle, Image, Shield, File,
  Globe, Briefcase, GraduationCap, Brain, Newspaper,
  HandHeart, Eye, Edit, Trash2, CheckCircle, XCircle
} from 'lucide-react';

const pageConfigs = {
  About: {
    icon: Users,
    color: 'bg-blue-500',
    description: 'About our organization, mission, and team',
    sections: ['Hero', 'Mission', 'Team', 'History', 'Stats']
  },
  Contact: {
    icon: Mail,
    color: 'bg-green-500',
    description: 'Contact information and form',
    sections: ['Hero', 'Contact Info', 'Contact Form', 'Map']
  },
  CSRSummit: {
    icon: Calendar,
    color: 'bg-purple-500',
    description: 'Corporate Social Responsibility events',
    sections: ['Hero', 'About', 'Schedule', 'Speakers', 'Registration']
  },
  Education: {
    icon: BookOpen,
    color: 'bg-yellow-500',
    description: 'Education programs and initiatives',
    sections: ['Hero', 'Programs', 'Impact', 'How to Help']
  },
  ElderlyCare: {
    icon: Heart,
    color: 'bg-red-500',
    description: 'Programs for elderly care and support',
    sections: ['Hero', 'Services', 'Testimonials', 'Volunteer']
  },
  GirlEducation: {
    icon: GraduationCap,
    color: 'bg-pink-500',
    description: 'Girl education empowerment programs',
    sections: ['Hero', 'Programs', 'Success Stories', 'Donate']
  },
  Home: {
    icon: Home,
    color: 'bg-indigo-500',
    description: 'Main homepage with all sections',
    sections: ['Hero', 'Stats', 'Programs', 'Testimonials', 'CTA']
  },
  ILC: {
    icon: Globe,
    color: 'bg-teal-500',
    description: 'International Learning Center',
    sections: ['Hero', 'Courses', 'Faculty', 'Apply']
  },
  Internship: {
    icon: Briefcase,
    color: 'bg-orange-500',
    description: 'Internship opportunities',
    sections: ['Hero', 'Positions', 'Requirements', 'Apply']
  },
  MentalHealth: {
    icon: Brain,
    color: 'bg-purple-500',
    description: 'Mental health awareness programs',
    sections: ['Hero', 'Services', 'Resources', 'Support']
  },
  News: {
    icon: Newspaper,
    color: 'bg-blue-600',
    description: 'Latest news and updates',
    sections: ['Hero', 'News List', 'Categories', 'Archives']
  },
  Sociofare: {
    icon: HandHeart,
    color: 'bg-red-600',
    description: 'Social welfare programs',
    sections: ['Hero', 'Initiatives', 'Impact', 'Partners']
  },
  Stories: {
    icon: FileText,
    color: 'bg-green-600',
    description: 'Success stories and testimonials',
    sections: ['Hero', 'Story Grid', 'Categories', 'Submit']
  },
  Awards: {
    icon: Award,
    color: 'bg-yellow-600',
    description: 'Awards and recognitions',
    sections: ['Hero', 'Awards Grid', 'Categories', 'Partners']
  },
  Blog: {
    icon: FileText,
    color: 'bg-blue-400',
    description: 'Blog articles and posts',
    sections: ['Hero', 'Blog List', 'Categories', 'Featured']
  },
  FAQ: {
    icon: HelpCircle,
    color: 'bg-green-400',
    description: 'Frequently asked questions',
    sections: ['Hero', 'FAQ Accordion', 'Categories', 'Contact CTA']
  },
  Gallery: {
    icon: Image,
    color: 'bg-purple-400',
    description: 'Photo and video gallery',
    sections: ['Hero', 'Gallery Grid', 'Albums', 'Events']
  },
  Privacy: {
    icon: Shield,
    color: 'bg-gray-600',
    description: 'Privacy policy page',
    sections: ['Hero', 'Policy Sections']
  },
  Publications: {
    icon: File,
    color: 'bg-indigo-400',
    description: 'Reports and publications',
    sections: ['Hero', 'Publications Grid', 'Categories', 'Downloads']
  },
  Terms: {
    icon: FileText,
    color: 'bg-gray-500',
    description: 'Terms of service',
    sections: ['Hero', 'Terms Sections']
  },
  Volunteer: {
    icon: Users,
    color: 'bg-orange-600',
    description: 'Volunteer opportunities',
    sections: ['Hero', 'Positions', 'Requirements', 'Form']
  }
};

const PagesDashboard = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await api.get('/admin/pages');
      setPages(response.data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePageStatus = async (slug, status) => {
    try {
      await api.patch(`/admin/pages/${slug}/status`, { status });
      fetchPages();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deletePage = async (slug) => {
    if (window.confirm('Are you sure you want to delete this page? This action cannot be undone.')) {
      try {
        await api.delete(`/admin/pages/${slug}`);
        fetchPages();
      } catch (error) {
        console.error('Error deleting page:', error);
      }
    }
  };

  const duplicatePage = async (page) => {
    try {
      await api.post('/admin/pages/duplicate', { slug: page.slug });
      fetchPages();
    } catch (error) {
      console.error('Error duplicating page:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading pages...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage All Pages</h1>
        <p className="text-gray-600 mt-2">Edit content for all 21 pages of your website</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-900">{pages.length}</div>
          <div className="text-gray-600">Total Pages</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">
            {pages.filter(p => p.status === 'published').length}
          </div>
          <div className="text-gray-600">Published</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-600">
            {pages.filter(p => p.status === 'draft').length}
          </div>
          <div className="text-gray-600">Draft</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-600">
            {pages.filter(p => p.status === 'archived').length}
          </div>
          <div className="text-gray-600">Archived</div>
        </div>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.entries(pageConfigs).map(([pageName, config]) => {
          const Icon = config.icon;
          const page = pages.find(p => p.name === pageName);
          const isPublished = page?.status === 'published';
          const isDraft = page?.status === 'draft';
          const isArchived = page?.status === 'archived';

          return (
            <div key={pageName} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              {/* Page Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${config.color} bg-opacity-10`}>
                      <Icon className={`w-6 h-6 ${config.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{pageName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isPublished ? 'bg-green-100 text-green-800' :
                          isDraft ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {page?.status || 'Not Created'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {page?.sections?.length || 0} sections
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm">{config.description}</p>

                <div className="mt-4">
                  <div className="text-sm text-gray-500 mb-2">Sections:</div>
                  <div className="flex flex-wrap gap-2">
                    {config.sections.map((section, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded">
                        {section}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Page Actions */}
              <div className="p-4 bg-gray-50 rounded-b-xl">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {page ? (
                      <>
                        <button
                          onClick={() => window.location.href = `/admin/pages/${page.slug}`}
                          className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <a
                          href={`/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </a>
                      </>
                    ) : (
                      <button
                        onClick={() => window.location.href = `/admin/pages/create?name=${pageName}`}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                      >
                        Create Page
                      </button>
                    )}
                  </div>

                  {page && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => updatePageStatus(page.slug, isPublished ? 'archived' : 'published')}
                        className="p-2 hover:bg-gray-200 rounded"
                        title={isPublished ? 'Archive' : 'Publish'}
                      >
                        {isPublished ? (
                          <XCircle className="w-4 h-4 text-gray-600" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                      </button>
                      <button
                        onClick={() => duplicatePage(page)}
                        className="p-2 hover:bg-gray-200 rounded"
                        title="Duplicate"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deletePage(page.slug)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {page && (
                  <div className="mt-3 text-xs text-gray-500">
                    Last edited: {new Date(page.updatedAt).toLocaleDateString()} by {page.lastEditedBy || 'Admin'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PagesDashboard;
