import React from 'react';

const PublicationsPage = ({ onNavigate = () => {} }) => {
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

  const publications = [
    { title: 'Annual Report 2023', type: 'PDF', icon: '📄' },
    { title: 'Impact Assessment Study', type: 'PDF', icon: '📊' },
    { title: 'Mental Health Initiative White Paper', type: 'PDF', icon: '📋' }
  ];

  return (
    <section className="py-20 bg-[#f8e9e8]">
      <div className="max-w-7xl mx-auto px-4">
        <BackButton onClick={() => onNavigate('home')} />
        <h1 className="text-4xl font-bold mb-12 text-center text-[#b73d34]">Publications & Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publications.map((pub, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg text-center">
              <div className="text-5xl mb-4">{pub.icon}</div>
              <h3 className="text-lg font-bold mb-2">{pub.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{pub.type}</p>
              <button className="px-4 py-2 bg-[#b73d34] text-white rounded-lg font-semibold">Download</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsPage;
