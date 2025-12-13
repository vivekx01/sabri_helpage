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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#FF7F50] text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Awards</h1>
          <div className="flex space-x-6">
            <button className="hover:underline">Home</button>
            <button className="hover:underline">About</button>
            <button className="hover:underline">Contact</button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-[#FF7F50] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Awards & Recognition</h1>
          <p className="text-xl text-[#FFE4D6] max-w-3xl mx-auto">
            Honors and recognitions celebrating our impact and partners.
          </p>
          <div className="h-1 w-24 bg-white mx-auto mt-8 opacity-50"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 -mt-10">
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
    </div>
  );
};


export default AwardsPage;
