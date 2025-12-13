import React from 'react';

const AwardsPage = ({ onNavigate }) => {
  const BackButton = ({ onClick }) => (
    <button 
      onClick={onClick} 
      className="flex items-center text-sm font-semibold mb-8 hover:text-gray-700 transition-all duration-300 hover:translate-x-[-4px] group"
      style={{ color: '#FF7A42' }}
    >
      <svg className="w-5 h-5 rotate-180 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      Back
    </button>
  );

  const awards = [
    { year: 2024, title: 'NGO of the Year', org: 'National Social Awards', icon: '🏆' },
    { year: 2023, title: 'Best Mental Health Initiative', org: 'Health Impact Summit', icon: '🏅' },
    { year: 2022, title: 'Community Excellence Award', org: 'Regional NGO Forum', icon: '⭐' }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FFF8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Awards & Recognition</h1>
          <p className="text-lg text-gray-600">Honors and recognitions celebrating our impact and partners.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {awards.map((a, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg text-center">
              <div className="mb-4 text-4xl">{a.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{a.title}</h3>
              <p className="text-gray-600 mb-2">{a.org}</p>
              <p className="text-sm text-gray-500">{a.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsPage;
            