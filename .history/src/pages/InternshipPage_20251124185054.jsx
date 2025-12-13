import React from 'react';
import BackButton from '../components/shared/BackButton';

const InternshipPage = ({ onNavigate = () => {} }) => (
  <section className="py-20 bg-white">
    <div className="max-w-4xl mx-auto px-4">
      <BackButton onClick={() => onNavigate('home')} />
      <h1 className="text-4xl font-bold mb-6">Internship Opportunities</h1>
      <p className="text-lg text-gray-700 mb-8">Placeholder internship content.</p>
    </div>
  </section>
);

export default InternshipPage;
