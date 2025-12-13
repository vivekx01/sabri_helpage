import React from 'react';

const PublicationsPage = ({ onNavigate }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Publications</h1>
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-gray-600 mb-8">
          Our research papers, reports, and publications on social welfare and development.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Annual Report 2024</h3>
            <p className="text-gray-600 mb-4">Comprehensive overview of our activities and impact.</p>
            <button className="text-orange-500 hover:text-orange-600">Download PDF</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Research on Elderly Care</h3>
            <p className="text-gray-600 mb-4">Study on elderly care challenges in rural India.</p>
            <button className="text-orange-500 hover:text-orange-600">Download PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationsPage;
