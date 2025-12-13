import React from 'react';

const AboutPage = ({ onNavigate }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-600 mb-6">
          Sabri Helpage is dedicated to serving society and making a positive impact on marginalized communities.
        </p>
        <p className="text-gray-600">
          Our mission is to provide support, resources, and advocacy for those in need across India.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
