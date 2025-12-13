import React from 'react';
import api from '../services/api';
import { useApi } from '../hooks/useApi';

const PublicationsPage = ({ onNavigate = () => {} }) => {
  const { data: publications, loading, error } = useApi(api.getPublications, { status: 'published' }, []);
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

  return (
    <section className="py-20 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-4">
        <BackButton onClick={() => onNavigate('home')} />
        <h1 className="text-4xl font-bold mb-12 text-center">Publications & Reports</h1>
        
        {loading && <div className="text-center py-12">Loading publications...</div>}
        {error && <div className="text-center py-12 text-red-600">Error: {error}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publications && publications.length > 0 ? publications.map((pub, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg text-center">
              <div className="text-5xl mb-4">{pub.icon}</div>
              <h3 className="text-lg font-bold mb-2">{pub.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{pub.type}</p>
              <button className="px-4 py-2 bg-[#FF7A42] text-white rounded-lg font-semibold">Download</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsPage;
