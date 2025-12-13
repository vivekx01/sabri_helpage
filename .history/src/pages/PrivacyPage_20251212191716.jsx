import React from 'react';
import PageLayout from '../components/layout/PageLayout';

const PrivacyPage = ({ onNavigate }) => {
  const sections = [
    {
      title: 'Information We Collect',
      content: 'We collect information you provide directly such as your name, email, phone number, and donation information. We also automatically collect certain information when you visit our website.'
    },
    {
      title: 'How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, process donations, send important notices, and respond to your inquiries and requests.'
    },
    {
      title: 'Information Sharing',
      content: 'We do not sell, trade, or rent your personal information. We may share information with trusted third parties who assist us in operating our website and conducting our business.'
    },
    {
      title: 'Security',
      content: 'We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, and destruction.'
    },
    {
      title: 'Contact Us',
      content: 'If you have questions about this Privacy Policy, please contact us at privacy@sabrihelpage.org or call our office for more information.'
    }
  ];

  return (
    <PageLayout page="privacy" onNavigate={onNavigate}>
      <div className="space-y-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`pb-8 ${index !== sections.length - 1 ? 'border-b border-gray-200' : ''}`}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{section.title}</h2>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default PrivacyPage;
