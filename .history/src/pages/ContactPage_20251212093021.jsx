import React from 'react';

const ContactPage = ({ onNavigate }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      <div className="max-w-2xl mx-auto">
        <p className="text-center text-gray-600 mb-8">
          Get in touch with us for any inquiries or support.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p>Contact form coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
