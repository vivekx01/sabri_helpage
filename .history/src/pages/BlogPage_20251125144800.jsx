import React from 'react';

const BlogPage = ({ onNavigate }) => {
  const BackButton = ({ onClick }) => (
    <button 
      onClick={onClick} 
      className="flex items-center text-sm font-semibold mb-8 hover:text-gray-700 transition-all duration-300 hover:translate-x-[-4px] group"
      style={{ color: '#FF7A42' }}
    >
      <svg className="w-5 h-5 rotate-180 mr-1 transition-transform duration-300 group-hover:translate-x-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      Back
    </button>
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <BackButton onClick={() => onNavigate('home')} />
        <h1 className="text-4xl font-bold mb-12 text-center">Our Blog</h1>
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
              <span className="text-orange-500 text-sm font-semibold">November {i}, 2025</span>
              <h2 className="text-2xl font-bold mt-2 mb-3">Blog Post Title {i}</h2>
              <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
              <button className="text-orange-500 font-semibold hover:text-orange-600">Read More →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
                      