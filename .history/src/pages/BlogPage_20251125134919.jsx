import React, { useState } from 'react';
import { Search, Calendar, User, ArrowRight, Bookmark } from 'lucide-react';
import BackButton from '../components/shared/BackButton';
import { COLORS } from '../constants/config';

const BlogPage = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const articles = [
    {
      id: 1,
      title: 'Understanding Mental Health: A Beginner\'s Guide',
      author: 'Dr. Sharma',
      date: 'Dec 20, 2023',
      category: 'Mental Health',
      excerpt: 'Learn the basics of mental health, common misconceptions, and how to support someone struggling with mental health issues.',
      content: 'Full article content about mental health awareness and self-care practices...',
      featured: true
    },
    {
      id: 2,
      title: 'Senior Care Tips: Creating a Safe and Comfortable Home',
      author: 'Elderly Care Team',
      date: 'Dec 18, 2023',
      category: 'Elderly Care',
      excerpt: 'Practical tips for families on how to modify homes and provide adequate care for elderly family members.',
      content: 'Full article about elderly care and safety measures...'
    },
    {
      id: 3,
      title: 'Empowering Girls Through Education: Success Stories',
      author: 'Education Advocate',
      date: 'Dec 15, 2023',
      category: 'Girl Education',
      excerpt: 'Discover how education is transforming the lives of underprivileged girls in our community.',
      content: 'Full article about girl education initiatives...'
    },
    {
      id: 4,
      title: 'The Impact of Volunteering on Mental Wellbeing',
      author: 'Volunteer Coordinator',
      date: 'Dec 12, 2023',
      category: 'Community',
      excerpt: 'Research shows volunteering boosts mental health. Learn why giving back is good for you too.',
      content: 'Full article about volunteering benefits...',
      featured: true
    },
    {
      id: 5,
      title: 'Nutrition Tips for Active Seniors',
      author: 'Health Expert',
      date: 'Dec 10, 2023',
      category: 'Health',
      excerpt: 'Essential nutrition advice for maintaining health and vitality in the senior years.',
      content: 'Full article about senior nutrition...'
    },
    {
      id: 6,
      title: 'Breaking the Stigma: Mental Health Conversations',
      author: 'Counselor\'s Corner',
      date: 'Dec 8, 2023',
      category: 'Mental Health',
      excerpt: 'How to start meaningful conversations about mental health and create supportive environments.',
      content: 'Full article about mental health communication...'
    }
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredArticles = filteredArticles.filter(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Our Blog</h1>
          <p className="text-xl text-gray-600">Insights, stories, and resources on social impact</p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredArticles.map(article => (
                <div key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY, color: COLORS.ACCENT_ORANGE }}>
                        {article.category}
                      </span>
                      <Bookmark className="h-5 w-5 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{article.date}</span>
                        </div>
                      </div>
                      <button className="text-orange-600 hover:text-orange-700 transition">
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Articles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
          <div className="space-y-4">
            {regularArticles.map(article => (
              <div key={article.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-semibold px-2 py-1 rounded" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY, color: COLORS.ACCENT_ORANGE }}>
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-orange-600 cursor-pointer transition">{article.title}</h3>
                    <p className="text-gray-600 mb-3">{article.excerpt}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                      </span>
                    </div>
                  </div>
                  <button className="text-orange-600 hover:text-orange-700 transition ml-4">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No articles found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
