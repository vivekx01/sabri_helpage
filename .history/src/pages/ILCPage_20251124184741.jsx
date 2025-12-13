import React from 'react';
import BackButton from '../components/shared/BackButton';

const ILCPage = ({ onNavigate = () => {} }) => (
  <div className="min-h-screen bg-white p-8">
    <BackButton onClick={() => onNavigate('home')} />
    <h1 className="text-3xl font-bold">ILC / SSIC</h1>
    <p className="mt-4">Placeholder ILC page.</p>
  </div>
);

export default ILCPage;
