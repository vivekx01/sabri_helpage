import React from 'react';
import { BookOpen, Award, Users, ArrowRight } from 'lucide-react';
import BackButton from '../components/shared/BackButton';
import ResponsiveImage from '../components/shared/ResponsiveImage';
import { COLORS } from '../constants/config';

const GirlEducationPage = ({ onNavigate }) => {
  const initiatives = [
    { icon: BookOpen, title: "Scholarships", description: "Financial support for education of underprivileged girls" },
    { icon: Award, title: "Mentorship", description: "Guidance and career counseling programs" },
    { icon: Users, title: "Life Skills", description: "Workshops on confidence, leadership, and health" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <ResponsiveImage src="/images/girl-education.jpg" alt="Girl Education" className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg" fallbackText="Girl+Child+Support" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Girl Child Education & Empowerment</h1>
        <p className="text-xl text-gray-700 mb-12 leading-relaxed">Education is the foundation of empowerment. We are committed to breaking barriers and creating opportunities for girls to learn, grow, and lead.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {initiatives.map((initiative, index) => {
            const Icon = initiative.icon;
            return (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-xl hover:shadow-lg transition duration-200">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg mb-4" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{initiative.title}</h3>
                <p className="text-gray-600">{initiative.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sponsor a Girl's Education</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">With your support, we can provide scholarships, mentorship, and life skills training to thousands of girls. Make a lasting impact today.</p>
          <button
            onClick={() => onNavigate('donate')}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white transition duration-200"
            style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
          >
            Sponsor Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GirlEducationPage;
