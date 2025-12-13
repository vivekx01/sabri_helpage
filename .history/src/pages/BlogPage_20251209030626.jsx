import React from 'react';
import api from '../services/api.mjs';
import { useApi } from '../hooks/useApi';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';

const BlogPage = ({ onNavigate }) => {
  const { data: blogs, loading, error } = useApi(api.getBlogs, { status: 'published' }, []);

  return (
    <section className="py-0 bg-white">
      <PageHeader title="Blog" subtitle="Stories and updates" />
      <div className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 text-center">Our Blog</h1>
        
        {loading && <div className="text-center py-12">Loading blogs...</div>}
        {error && <div className="text-center py-12 text-red-600">Error: {error}</div>}
        
        <div className="space-y-8">
          {blogs && blogs.length > 0 ? blogs.map((blog) => (
            <div key={blog._id} className="bg-white p-6 rounded-xl shadow-lg border-l-4" style={{ borderLeftColor: COLORS.PRIMARY }}>
              <span className="text-sm font-semibold" style={{ color: COLORS.PRIMARY }}>
                {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <h2 className="text-2xl font-bold mt-2 mb-3">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.excerpt || blog.content?.substring(0, 150) + '...'}</p>
              <button className="font-semibold hover:underline" style={{ color: COLORS.PRIMARY }}>Read More →</button>
            </div>
          )) : !loading && <div className="text-center py-12 text-gray-600">No blogs available</div>}
        </div>
      </div>
      </div>
    </section>
  );
};

export default BlogPage;
                      