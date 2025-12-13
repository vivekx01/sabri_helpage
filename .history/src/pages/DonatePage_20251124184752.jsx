import React from 'react';
import BackButton from '../components/shared/BackButton';

const DonatePage = ({ onNavigate = () => {} }) => (
  <div className="min-h-screen bg-white p-8">
    <BackButton onClick={() => onNavigate('home')} />
    <h1 className="text-3xl font-bold">Donate</h1>
    <p className="mt-4">Placeholder Donate page.</p>
  </div>
);

export default DonatePage;
