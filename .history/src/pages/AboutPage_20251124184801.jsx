import React from 'react';
import BackButton from '../components/shared/BackButton';

const AboutPage = ({ onNavigate = () => {} }) => (
  <div className="min-h-screen bg-white p-8">
    <BackButton onClick={() => onNavigate('home')} />
    <h1 className="text-3xl font-bold">About</h1>
    <p className="mt-4">Placeholder About page.</p>
  </div>
);

export default AboutPage;
