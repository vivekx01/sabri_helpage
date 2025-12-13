import React from 'react';
import { Award, Star, Calendar, Users, ArrowRight } from 'lucide-react';
import BackButton from '../components/shared/BackButton';
import YoutubeEmbed from '../components/shared/YoutubeEmbed';
import { COLORS } from '../constants/config';

const SociofarePage = ({ onNavigate }) => {
  const awards = [
    { year: '2023', title: 'NGO of the Year', organization: 'Social Impact Award', icon: '🏆' },
    { year: '2022', title: 'Best Mental Health Initiative', organization: 'Health Ministry Recognition', icon: '🏅' },
    { year: '2021', title: 'Sustainable Development Award', organization: 'UN SDG Partnership', icon: '⭐' },
    { year: '2020', title: 'Community Excellence Award', organization: 'National Council of NGOs', icon: '🎖️' }
  ];

  const upcomingEvents = [
    { date: 'Mar 15, 2024', event: 'Sociofare Awards Ceremony', location: 'New Delhi Convention Center' },
    { date: 'Apr 22, 2024', event: 'Community Leaders Summit', location: 'Mumbai' },
    { date: 'May 10, 2024', event: 'Volunteer Appreciation Gala', location: 'Bangalore' }
  ];

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Sociofare Platform</h1>
          <p className="text-xl text-gray-600">Celebrating social impact and recognizing changemakers</p>
        </div>

        {/* Video Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16">
          <div className="aspect-video">
            <YoutubeEmbed videoId="dQw4w9WgXcQ" title="Sabri Helpage Impact Video" />
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 md:p-12 mb-16 text-center">
          <blockquote className="text-2xl font-semibold text-gray-900 mb-4">
            "Sabri Helpage has transformed our approach to social impact. Their systematic methodology and dedication is unparalleled."
          </blockquote>
          <p className="text-lg text-gray-700 font-semibold">- Anjali K., Director, Social Impact Circle</p>
        </div>

        {/* Awards Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Awards & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awards.map((award, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-200">
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">{award.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">{award.year}</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{award.title}</h3>
                    <p className="text-gray-600">{award.organization}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-200 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Calendar className="h-6 w-6" style={{ color: COLORS.ACCENT_ORANGE }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.event}</p>
                    <p className="text-sm text-gray-600">{item.date} • {item.location}</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <Award className="h-12 w-12 mx-auto mb-4" style={{ color: COLORS.ACCENT_ORANGE }} />
            <div className="text-4xl font-extrabold text-gray-900 mb-2">25+</div>
            <p className="text-gray-600">Awards & Recognition</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <Users className="h-12 w-12 mx-auto mb-4" style={{ color: COLORS.ACCENT_ORANGE }} />
            <div className="text-4xl font-extrabold text-gray-900 mb-2">500+</div>
            <p className="text-gray-600">Active Members</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <Star className="h-12 w-12 mx-auto mb-4" style={{ color: COLORS.ACCENT_ORANGE }} />
            <div className="text-4xl font-extrabold text-gray-900 mb-2">4.9/5</div>
            <p className="text-gray-600">Community Rating</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-8 md:p-12 text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Visit The Sociofare Platform</h2>
          <p className="text-lg mb-6">Explore impact stories, join the community, and become a changemaker</p>
          <button
            onClick={() => window.open('https://sociofare.com', '_blank')}
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:shadow-lg transition duration-200"
          >
            <span>Explore Platform</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SociofarePage;
