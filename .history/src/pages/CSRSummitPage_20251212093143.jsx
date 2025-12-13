import React from 'react';

const CSRSummitPage = ({ onNavigate }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">CSR Summit</h1>
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-gray-600 mb-8">
          Join us for our annual Corporate Social Responsibility summit focused on sustainable development.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Upcoming Event</h3>
          <p className="text-gray-600 mb-4">Date: December 15, 2025</p>
          <p className="text-gray-600 mb-4">Location: Mumbai, India</p>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CSRSummitPage;
