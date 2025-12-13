import React from 'react';
import api from '../services/api';
import { useApi } from '../hooks/useApi';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';

const PublicationsPage = ({ onNavigate = () => {} }) => {
  const { data: publications, loading, error } = useApi(api.getPublications, { status: 'published' }, []);

  return (
    <section className="py-0 bg-white">
      <PageHeader title="Publications" subtitle="Reports and resources" />
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 text-center">Publications & Reports</h1>
        
        {loading && <div className="text-center py-12">Loading publications...</div>}
        {error && <div className="text-center py-12 text-red-600">Error: {error}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publications && publications.length > 0 ? publications.map((pub) => (
            <div key={pub._id} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg text-center">
              <div className="text-5xl mb-4">📄</div>
              <h3 className="text-lg font-bold mb-2">{pub.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{pub.type || 'PDF'}</p>
              <a href={pub.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 text-white rounded-lg font-semibold" style={{ backgroundColor: COLORS.PRIMARY }}>Download</a>
            </div>
          )) : !loading && <div className="col-span-full text-center py-12 text-gray-600">No publications available</div>}
        </div>
      </div>
    </section>
  );
};

export default PublicationsPage;
