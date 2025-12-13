import React from 'react';
import { ArrowRight } from 'lucide-react';
import BackButton from '../components/shared/BackButton';
import ResponsiveImage from '../components/shared/ResponsiveImage';
import { COLORS } from '../constants/config';

const MentalHealthPage = ({ onNavigate }) => {
  const approaches = [
    "Free counseling and therapeutic services",
    "Awareness workshops and mental health education",
    "Digital resources and self-help tools",
    "Support groups and community engagement"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <ResponsiveImage src="/images/mental-health.jpg" alt="Mental Health" className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg" fallbackText="Mental+Health" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Mental Health Support</h1>
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">We believe mental health is fundamental to overall wellbeing. Our comprehensive mental health program provides accessible, stigma-free support to individuals and communities.</p>
        
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Approach</h2>
          <div className="space-y-4">
            {approaches.map((approach, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </div>
                <p className="text-lg text-gray-700">{approach}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Support Today</h2>
          <p className="text-gray-700 mb-6">Our trained professionals are ready to help. Reach out to schedule a confidential consultation.</p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white transition duration-200"
            style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
          >
            Contact Our Team
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MentalHealthPage;
