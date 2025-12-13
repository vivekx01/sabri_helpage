import React from 'react';
import BackButton from '../components/shared/BackButton';

const SociofarePage = ({ onNavigate = () => {} }) => (
  <div className="min-h-screen bg-white p-8">
    <BackButton onClick={() => onNavigate('home')} />
    <h1 className="text-3xl font-bold">Sociofare</h1>
    <p className="mt-4">Placeholder Sociofare page.</p>
  </div>
);

export default SociofarePage;
