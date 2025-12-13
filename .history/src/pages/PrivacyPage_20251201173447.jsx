import React from 'react';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';
import TopBar from '../components/layout/TopBar';

const PrivacyPage = ({ onNavigate }) => {
  const BackButton = ({ onClick }) => (
    <button 
      onClick={onClick} 
      className="flex items-center text-sm font-semibold mb-8 hover:text-gray-700 transition-all duration-300 hover:translate-x-[-4px] group"
      style={{ color: COLORS.PRIMARY }}
    >
      <svg className="w-5 h-5 rotate-180 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      Back
    </button>
  );

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
    <section className="py-0 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <TopBar title="Privacy Policy" />
      <PageHeader title="Privacy Policy" subtitle="How we collect and protect data" />
      <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-12">Last updated: December 2023</p>
        
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
          {sections.map((section, index) => (
            <div key={index} className={index !== sections.length - 1 ? 'pb-8 border-b border-gray-200' : ''}>
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
