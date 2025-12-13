import React from 'react';
import BackButton from '../components/shared/BackButton';
import ResponsiveImage from '../components/shared/ResponsiveImage';

const MentalHealthPage = ({ onNavigate = () => {} }) => (
  <section className="py-20 bg-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <BackButton onClick={() => onNavigate('home')} />
      <ResponsiveImage src="/images/mental-health.jpg" alt="Mental Health" className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg" fallbackText="Mental+Health" />
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Mental Health</h1>
      <p className="text-xl text-gray-700 mb-8 leading-relaxed font-semibold">Placeholder mental health content.</p>
    </div>
  </section>
);

export default MentalHealthPage;
