import React from 'react';
import api from '../services/api.mjs';
import { useApi } from '../hooks/useApi';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';

const AwardsPage = ({ onNavigate }) => {
  const { data: awards, loading, error } = useApi(api.getAwards, { status: 'published' }, []);

  // Fallback awards data when API fails
  const fallbackAwards = [
    {
      _id: 'fallback-1',
      title: 'Best NGO Award 2024',
      organization: 'Ministry of Social Justice and Empowerment',
      year: 2024
    },
    {
      _id: 'fallback-2',
      title: 'Excellence in Community Service',
      organization: 'Rotary International',
      year: 2023
    },
    {
      _id: 'fallback-3',
      title: 'Impact Award for Women Empowerment',
      organization: 'UN Women India',
      year: 2023
    }
  ];

  const displayAwards = awards && awards.length > 0 ? awards : (error ? fallbackAwards : []);

  return (
      <section className="py-0 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
        <PageHeader title="Awards" subtitle="Recognitions of our journey" />
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Awards & Recognition</h1>
          <p className="text-lg text-gray-600">Honors and recognitions celebrating our impact and partners.</p>
        </div>

        {loading && <div className="text-center py-12">Loading awards...</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {displayAwards.map((a) => (
            <div key={a._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg text-center">
              <div className="mb-4 text-4xl">🏆</div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{a.title}</h3>
              <p className="text-gray-600 mb-2">{a.organization || a.description}</p>
              <p className="text-sm text-gray-500">{a.year || new Date(a.createdAt).getFullYear()}</p>
            </div>
          ))}
          {!loading && displayAwards.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-600">No awards available</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AwardsPage;
            