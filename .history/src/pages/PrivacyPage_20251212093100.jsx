import React from 'react';

const PrivacyPage = ({ onNavigate }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
      <div className="max-w-4xl mx-auto prose">
        <p className="text-gray-600 mb-6">
          This privacy policy explains how Sabri Helpage collects, uses, and protects your personal information.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p className="text-gray-600 mb-6">
          We collect information you provide directly to us, such as when you make a donation or contact us.
        </p>
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="text-gray-600">
          We use the information to provide services, communicate with you, and improve our programs.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
