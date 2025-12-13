import React from 'react';
import api from '../services/api';
import { useApi } from '../hooks/useApi';

const AwardsPage = ({ onNavigate }) => {
  const { data: awards, loading, error } = useApi(api.getAwards, { status: 'published' }, []);
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
    <section className="py-16 md:py-24 bg-[#FFF8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Awards & Recognition</h1>
          <p className="text-lg text-gray-600">Honors and recognitions celebrating our impact and partners.</p>
        </div>

        {loading && <div className="text-center py-12">Loading awards...</div>}
        {error && <div className="text-center py-12 text-red-600">Error: {error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {awards && awards.length > 0 ? awards.map((a) => (
            <div key={a._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg text-center">
              <div className="mb-4 text-4xl">🏆</div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{a.title}</h3>
              <p className="text-gray-600 mb-2">{a.organization || a.description}</p>
              <p className="text-sm text-gray-500">{a.year || new Date(a.createdAt).getFullYear()}</p>
            </div>
          )) : !loading && <div className="col-span-full text-center py-12 text-gray-600">No awards available</div>}
        </div>
      </div>
    </section>
  );
};

export default AwardsPage;
            