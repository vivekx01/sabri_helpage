import React from 'react';
import BackButton from '../components/shared/BackButton';

const StoriesPage = ({ onNavigate = () => {} }) => (
  <div className="min-h-screen bg-white p-8">
    <BackButton onClick={() => onNavigate('home')} />
    <h1 className="text-3xl font-bold">Stories</h1>
    <p className="mt-4">Placeholder Stories page.</p>
  </div>
);

export default StoriesPage;
