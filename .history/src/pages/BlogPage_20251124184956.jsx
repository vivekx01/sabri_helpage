import React from 'react';
import BackButton from '../components/shared/BackButton';

const BlogPage = ({ onNavigate = () => {} }) => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <BackButton onClick={() => onNavigate('home')} />
      <h1 className="text-4xl font-bold mb-12 text-center">Our Blog</h1>
      <p className="text-gray-700">Placeholder blog content.</p>
    </div>
  </section>
);

export default BlogPage;
