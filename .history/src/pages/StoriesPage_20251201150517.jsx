import React from 'react';
import api from '../services/api';
import { useApi } from '../hooks/useApi';
import { COLORS } from '../constants/config';

const StoriesPage = ({ onNavigate }) => {
  const { data: stories, loading, error } = useApi(api.getStories, { status: 'published' }, []);
  const BackButton = ({ onClick }) => (
    <button 
      onClick={onClick} 
      className="flex items-center text-sm font-semibold mb-8 hover:text-gray-700 transition-all duration-300 hover:translate-x-[-4px] group"
      style={{ color: COLORS.PRIMARY }}
    >
      <svg className="w-5 h-5 rotate-180 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      Back
    </button>
  );

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />

        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Impact Stories</h1>
          <p className="text-xl text-gray-600">Real stories of transformation and hope from our community members</p>
        </div>

        {loading && <div className="text-center py-12">Loading stories...</div>}
        {error && <div className="text-center py-12 text-red-600">Error: {error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories && stories.length > 0 ? stories.map(story => (
            <div key={story.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/400x250?text=${encodeURIComponent(story.title)}`;
                }}
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: COLORS.PRIMARY_PALE, color: COLORS.PRIMARY }}>
                    {story.category}
                  </span>
                  <span className="text-xs text-gray-500">{story.read_time}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{story.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{story.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500">{story.author}</p>
                    <p className="text-xs text-gray-400">{story.date}</p>
                  </div>
                  <button className="transition" style={{ color: COLORS.PRIMARY }}>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </div>
          )) : !loading && <div className="col-span-full text-center py-12 text-gray-600">No stories available</div>}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-white rounded-xl p-8 md:p-12 text-center" style={{ backgroundColor: COLORS.PRIMARY }}>
          <div className="text-5xl mx-auto mb-4">❤️</div>
          <h2 className="text-3xl font-bold mb-4">Your Story Matters</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto" style={{ color: COLORS.PRIMARY_PALE }}>If you or someone you know has been transformed by our programs, we'd love to share your story with our community.</p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center justify-center px-8 py-3 bg-white font-semibold rounded-lg hover:shadow-lg transition duration-200"
            style={{ color: COLORS.PRIMARY }}
          >
            <span>Share Your Story</span>
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default StoriesPage;
