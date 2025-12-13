import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { pageConfigs } from './PagesDashboard';

// Page-specific editor components
const PageTypeEditors = {
  Awards: ({ page, updatePage }) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Awards List</h3>
        {page.awards?.map((award, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3">
            <input
              type="text"
              value={award.title || ''}
              onChange={(e) => {
                const awards = [...page.awards];
                awards[index].title = e.target.value;
                updatePage({ awards });
              }}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Award Title"
            />
            <input
              type="text"
              value={award.organization || ''}
              onChange={(e) => {
                const awards = [...page.awards];
                awards[index].organization = e.target.value;
                updatePage({ awards });
              }}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Organization"
            />
            <textarea
              value={award.description || ''}
              onChange={(e) => {
                const awards = [...page.awards];
                awards[index].description = e.target.value;
                updatePage({ awards });
              }}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Description"
              rows="3"
            />
          </div>
        ))}
        <button
          onClick={() => {
            const awards = [...(page.awards || []), { title: '', organization: '', description: '', year: new Date().getFullYear().toString() }];
            updatePage({ awards });
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Award
        </button>
      </div>
    </div>
  ),

  Blog: ({ page, updatePage }) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Blog Posts</h3>
        {page.blogs?.map((blog, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
            <input
              type="text"
              value={blog.title || ''}
              onChange={(e) => {
                const blogs = [...page.blogs];
                blogs[index].title = e.target.value;
                updatePage({ blogs });
              }}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Blog Title"
            />
            <textarea
              value={blog.excerpt || ''}
              onChange={(e) => {
                const blogs = [...page.blogs];
                blogs[index].excerpt = e.target.value;
                updatePage({ blogs });
              }}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Excerpt"
              rows="2"
            />
            <textarea
              value={blog.content || ''}
              onChange={(e) => {
                const blogs = [...page.blogs];
                blogs[index].content = e.target.value;
                updatePage({ blogs });
              }}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Content"
              rows="4"
            />
          </div>
        ))}
        <button
          onClick={() => {
            const blogs = [...(page.blogs || []), { title: '', excerpt: '', content: '', date: new Date() }];
            updatePage({ blogs });
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Blog Post
        </button>
      </div>
    </div>
  ),

  FAQ: ({ page, updatePage }) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">FAQs</h3>
        {page.faqs?.map((faq, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
            <input
              type="text"
              value={faq.question || ''}
              onChange={(e) => {
                const faqs = [...page.faqs];
                faqs[index].question = e.target.value;
                updatePage({ faqs });
              }}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Question"
            />
            <textarea
              value={faq.answer || ''}
              onChange={(e) => {
                const faqs = [...page.faqs];
                faqs[index].answer = e.target.value;
                updatePage({ faqs });
              }}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Answer"
              rows="3"
            />
          </div>
        ))}
        <button
          onClick={() => {
            const faqs = [...(page.faqs || []), { question: '', answer: '', category: 'general' }];
            updatePage({ faqs });
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add FAQ
        </button>
      </div>
    </div>
  ),

  Gallery: ({ page, updatePage }) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Gallery Images</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {page.events?.flatMap(event => event.images || []).map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt="" className="w-full h-32 object-cover rounded" />
              <button
                onClick={() => {
                  const events = page.events.map(event => ({
                    ...event,
                    images: event.images.filter(img => img !== image)
                  }));
                  updatePage({ events });
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Add image URL"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && e.target.value) {
              const events = [...(page.events || [])];
              if (!events[0]) events[0] = { title: 'Gallery', images: [] };
              events[0].images.push(e.target.value);
              updatePage({ events });
              e.target.value = '';
            }
          }}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  ),

  // Default editor for content pages
  Default: ({ page, updatePage }) => (
    <div className="space-y-6">
      {page.sections?.map((section, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold">Section {index + 1}: {section.type || 'Content'}</h4>
            <button
              onClick={() => {
                const sections = page.sections.filter((_, i) => i !== index);
                updatePage({ sections });
              }}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>

          <input
            type="text"
            value={section.title || ''}
            onChange={(e) => {
              const sections = [...page.sections];
              sections[index].title = e.target.value;
              updatePage({ sections });
            }}
            className="w-full mb-3 p-2 border rounded"
            placeholder="Section Title"
          />

          <textarea
            value={section.content || ''}
            onChange={(e) => {
              const sections = [...page.sections];
              sections[index].content = e.target.value;
              updatePage({ sections });
            }}
            className="w-full mb-3 p-2 border rounded"
            placeholder="Section Content"
            rows="6"
          />

          {section.items && (
            <div className="mt-4">
              <h5 className="font-medium mb-2">Items</h5>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => {
                      const sections = [...page.sections];
                      sections[index].items[itemIndex].title = e.target.value;
                      updatePage({ sections });
                    }}
                    className="flex-1 p-2 border rounded"
                    placeholder="Item Title"
                  />
                  <button
                    onClick={() => {
                      const sections = [...page.sections];
                      sections[index].items = sections[index].items.filter((_, i) => i !== itemIndex);
                      updatePage({ sections });
                    }}
                    className="px-3 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const sections = [...page.sections];
                  if (!sections[index].items) sections[index].items = [];
                  sections[index].items.push({ title: '', description: '' });
                  updatePage({ sections });
                }}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                + Add Item
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => {
          const sections = [...(page.sections || []), { title: '', content: '', type: 'content' }];
          updatePage({ sections });
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Section
      </button>
    </div>
  )
};

const PageEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPage();
  }, [slug]);

  const fetchPage = async () => {
    try {
      if (slug === 'create') {
        const urlParams = new URLSearchParams(window.location.search);
        const pageName = urlParams.get('name');
        setPage({
          name: pageName,
          slug: pageName.toLowerCase(),
          pageTitle: `${pageName} Page`,
          sections: [],
          status: 'draft'
        });
      } else {
        const response = await api.get(`/admin/pages/${slug}`);
        setPage(response.data);
      }
    } catch (error) {
      console.error('Error fetching page:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePage = (updates) => {
    setPage(prev => ({ ...prev, ...updates }));
  };

  const savePage = async () => {
    setSaving(true);
    try {
      if (slug === 'create') {
        await api.post('/admin/pages', page);
      } else {
        await api.put(`/admin/pages/${slug}`, {
          ...page,
          lastEdited: new Date(),
          lastEditedBy: 'Admin User' // Replace with actual user
        });
      }
      navigate('/admin/pages');
    } catch (error) {
      console.error('Error saving page:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!page) return <div className="p-8 text-center">Page not found</div>;

  const PageEditorComponent = PageTypeEditors[page.name] || PageTypeEditors.Default;
  const config = pageConfigs[page.name] || {};

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Editing: {page.name} Page</h1>
            <p className="text-gray-600">{config.description}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={savePage}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <a
              href={`/${page.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Preview Page
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Page Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-lg mb-4">Page Settings</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                <input
                  type="text"
                  value={page.pageTitle || ''}
                  onChange={(e) => updatePage({ pageTitle: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
                <input
                  type="text"
                  value={page.heroTitle || ''}
                  onChange={(e) => updatePage({ heroTitle: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Content</label>
                <textarea
                  value={page.heroContent || ''}
                  onChange={(e) => updatePage({ heroContent: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={page.status || 'draft'}
                  onChange={(e) => updatePage({ status: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-lg mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                <input
                  type="text"
                  value={page.seo?.title || ''}
                  onChange={(e) => updatePage({ seo: { ...page.seo, title: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
                <textarea
                  value={page.seo?.description || ''}
                  onChange={(e) => updatePage({ seo: { ...page.seo, description: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="3"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Page Content Editor */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-lg mb-6">Page Content</h3>
            <PageEditorComponent page={page} updatePage={updatePage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageEditor;
