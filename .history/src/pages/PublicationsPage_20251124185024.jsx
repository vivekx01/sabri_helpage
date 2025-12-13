import React from 'react';
import BackButton from '../components/shared/BackButton';

const PublicationsPage = ({ onNavigate = () => {} }) => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <BackButton onClick={() => onNavigate('home')} />
      <h1 className="text-4xl font-bold mb-12 text-center">Publications</h1>
      <p className="text-gray-700">Placeholder publications content.</p>
    </div>
  </section>
);

export default PublicationsPage;
