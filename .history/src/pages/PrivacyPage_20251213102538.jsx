
import React from 'react';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';

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
    <section className="py-0 md:py-24 min-h-screen" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <PageHeader title="Privacy Policy" subtitle="How we protect and use your information" />
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.PRIMARY_DARK }}>Privacy Policy</h1>
            <p className="text-lg text-gray-600">Your privacy is important to us. This policy explains how we handle your data.</p>
          </div>
          <div className="space-y-10">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPage;
