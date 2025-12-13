import React from 'react';
import BackButton from '../components/shared/BackButton';
import { Award, Star, Users, Globe } from 'lucide-react';
import { COLORS } from '../constants/config';

const AwardsPage = ({ onNavigate }) => {
  const awards = [
    { year: 2024, title: 'NGO of the Year', org: 'National Social Awards' },
    { year: 2023, title: 'Best Mental Health Initiative', org: 'Health Impact Summit' },
    { year: 2022, title: 'Community Excellence Award', org: 'Regional NGO Forum' }
  ];

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Awards & Recognition</h1>
          <p className="text-lg text-gray-600">Honors and recognitions celebrating our impact and partners.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {awards.map((a, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg text-center">
              <div className="mb-4">
                <Award className="h-12 w-12 mx-auto" style={{ color: COLORS.ACCENT_ORANGE }} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{a.title}</h3>
              <p className="text-gray-600 mb-2">{a.org}</p>
              <p className="text-sm text-gray-500">{a.year}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Partner With Us</h2>
          <p className="text-gray-700 mb-6">We collaborate with institutions, corporates and individuals to scale our impact. Explore partnership and sponsorship opportunities.</p>
          <div className="flex justify-center gap-4">
            <button onClick={() => onNavigate('contact')} className="px-6 py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>Contact Us</button>
            <button onClick={() => onNavigate('publications')} className="px-6 py-3 rounded-lg border-2" style={{ borderColor: COLORS.ACCENT_ORANGE, color: COLORS.ACCENT_ORANGE }}>Read Reports</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsPage;
