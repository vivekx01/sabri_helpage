import React from 'react';
import BackButton from '../components/shared/BackButton';

const TermsPage = ({ onNavigate = () => {} }) => (
  <section className="py-20 bg-white">
    <div className="max-w-4xl mx-auto px-4">
      <BackButton onClick={() => onNavigate('home')} />
      <h1 className="text-4xl font-bold mb-6">Terms of Use</h1>
      <div className="space-y-6 text-gray-700">
        <p>Placeholder terms of use content.</p>
      </div>
    </div>
  </section>
);

export default TermsPage;
