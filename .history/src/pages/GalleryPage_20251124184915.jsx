import React from 'react';
import BackButton from '../components/shared/BackButton';

const GalleryPage = ({ onNavigate = () => {} }) => (
  <div className="min-h-screen bg-white p-8">
    <BackButton onClick={() => onNavigate('home')} />
    <h1 className="text-3xl font-bold">Gallery</h1>
    <p className="mt-4">Placeholder Gallery page.</p>
  </div>
);

export default GalleryPage;
