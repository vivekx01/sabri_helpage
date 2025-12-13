import React from 'react';
import BackButton from '../components/shared/BackButton';

const PrivacyPage = ({ onNavigate = () => {} }) => (
  <section className="py-20 bg-white">
    <div className="max-w-4xl mx-auto px-4">
      <BackButton onClick={() => onNavigate('home')} />
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <div className="space-y-6 text-gray-700">
        <p>Placeholder privacy policy content.</p>
      </div>
    </div>
  </section>
);

export default PrivacyPage;
