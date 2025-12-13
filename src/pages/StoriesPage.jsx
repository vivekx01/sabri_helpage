import React from 'react';

const StoriesPage = ({ onNavigate }) => {
  const BackButton = ({ onClick }) => (
    <button 
      onClick={onClick} 
      className="flex items-center text-sm font-semibold mb-8 hover:text-gray-700 transition-all duration-300 hover:translate-x-[-4px] group"
      style={{ color: '#b73d34' }}
    >
      <svg className="w-5 h-5 rotate-180 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      Back
    </button>
  );

  const stories = [
    {
      id: 1,
      title: 'From Struggle to Strength: Riya\'s Journey',
      author: 'Counseling Team',
      date: 'Dec 15, 2023',
      category: 'Mental Health',
      excerpt: 'How a 22-year-old overcame depression through our mental health support program and is now helping others.',
      image: 'https://via.placeholder.com/400x250?text=Riya',
      read_time: '5 min read'
    },
    {
      id: 2,
      title: 'Teaching Elder Care Through Love: Volunteer Diaries',
      author: 'Elderly Care Program',
      date: 'Dec 8, 2023',
      category: 'Elderly Care',
      excerpt: 'Meet Amit, a volunteer who dedicates weekends to caring for elderly residents and has become their family.',
      image: 'https://via.placeholder.com/400x250?text=Volunteer',
      read_time: '6 min read'
    },
    {
      id: 3,
      title: 'Priya\'s Dream: From Scholarship to Scholar',
      author: 'Education Team',
      date: 'Nov 30, 2023',
      category: 'Girl Education',
      excerpt: 'How our girl child education initiative helped Priya become the first graduate in her family.',
      image: 'https://via.placeholder.com/400x250?text=Education',
      read_time: '7 min read'
    },
    {
      id: 4,
      title: 'The Power of Listening: Our Counselors Share',
      author: 'Mental Health',
      date: 'Nov 22, 2023',
      category: 'Mental Health',
      excerpt: 'Insights from our professional counselors on what makes our mental health support program effective.',
      image: 'https://via.placeholder.com/400x250?text=Counseling',
      read_time: '5 min read'
    },
    {
      id: 5,
      title: 'Community Unites: Winter Support Drive Success',
      author: 'Community Team',
      date: 'Nov 15, 2023',
      category: 'Community',
      excerpt: 'How our community volunteers distributed food and warmth to 500+ families this winter season.',
      image: 'https://via.placeholder.com/400x250?text=Community',
      read_time: '6 min read'
    },
    {
      id: 6,
      title: 'Breaking Barriers: Elderly Women in Technology',
      author: 'Special Features',
      date: 'Nov 8, 2023',
      category: 'Elderly Care',
      excerpt: 'An inspiring feature on how we\'re introducing digital literacy to elderly citizens.',
      image: 'https://via.placeholder.com/400x250?text=Tech',
      read_time: '8 min read'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#f8e9e8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />

        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Impact Stories</h1>
          <p className="text-xl text-gray-600">Real stories of transformation and hope from our community members</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map(story => (
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
                  <span className="text-sm font-semibold px-3 py-1 rounded-full bg-[#f8e9e8]" style={{ color: '#b73d34' }}>
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
                  <button className="transition" style={{ color: '#b73d34' }}>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-[#b73d34] to-[#8c2b23] text-white rounded-xl p-8 md:p-12 text-center">
          <div className="text-5xl mx-auto mb-4">❤️</div>
          <h2 className="text-3xl font-bold mb-4">Your Story Matters</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">If you or someone you know has been transformed by our programs, we'd love to share your story with our community.</p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center justify-center px-8 py-3 bg-white font-semibold rounded-lg hover:shadow-lg transition duration-200"
            style={{ color: '#b73d34' }}
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
