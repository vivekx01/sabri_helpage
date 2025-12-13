import React from 'react';
import BackButton from '../components/shared/BackButton';

const OurCausesLandingPage = ({ onNavigate = () => {} }) => (
  <div className="min-h-screen bg-white p-8">
    <BackButton onClick={() => onNavigate('home')} />
    <h1 className="text-3xl font-bold">Our Causes</h1>
    <p className="mt-4">Placeholder Our Causes landing page.</p>
  </div>
);

export default OurCausesLandingPage;
