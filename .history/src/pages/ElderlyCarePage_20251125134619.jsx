import React from 'react';
import { Heart, Users, Home, Smile, ArrowRight } from 'lucide-react';
import BackButton from '../components/shared/BackButton';
import ResponsiveImage from '../components/shared/ResponsiveImage';
import { COLORS } from '../constants/config';

const ElderlyCarePage = ({ onNavigate }) => {
  const pillars = [
    { icon: Home, title: "Home Visits", description: "Regular health and welfare check-ups at home" },
    { icon: Smile, title: "Medical Camps", description: "Health screening and primary care services" },
    { icon: Users, title: "Day Centers", description: "Social engagement and recreational activities" },
    { icon: Heart, title: "Emotional Support", description: "Companionship and counseling services" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <ResponsiveImage src="/images/elderly-care.jpg" alt="Elderly Care" className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg" fallbackText="Elderly+Care" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Elderly Care Program</h1>
        <p className="text-xl text-gray-700 mb-12 leading-relaxed">We honor the dignity and wellbeing of our elderly citizens through comprehensive care, support, and community engagement programs.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition duration-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{pillar.title}</h3>
                    <p className="mt-2 text-gray-600">{pillar.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-orange-50 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Become a Volunteer</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">Help us make a difference in the lives of our elderly community members. Join our team of dedicated volunteers today.</p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white transition duration-200"
            style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
          >
            Apply Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ElderlyCarePage;
