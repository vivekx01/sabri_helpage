import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import { COLORS } from '../constants/config';

const TermsPage = ({ onNavigate }) => {
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
      title: 'Acceptance of Terms',
      content: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
    },
    {
      title: 'Intellectual Property Rights',
      content: 'Unless otherwise stated, Sabri Helpage owns the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this content from the website purely for personal non-commercial use, subject to restrictions set in these terms and conditions.'
    },
    {
      title: 'User Content',
      content: 'In these terms of use, "User Content" shall mean any audio, video, text, images, or other material you choose to display on this website. By displaying User Content, you grant Sabri Helpage a non-exclusive, worldwide irrevocable license to reproduce, adapt, modify, and distribute it.'
    },
    {
      title: 'Donations and Payments',
      content: 'All donations are non-refundable except in cases of processing errors. Donations are made voluntarily and in no way constitute a contract for services. Your donation supports our programs and initiatives.'
    },
    {
      title: 'Disclaimer',
      content: 'The information on this website is provided on an "as is" basis. Sabri Helpage makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.'
    },
    {
      title: 'Limitations of Liability',
      content: 'In no event shall Sabri Helpage or its suppliers be liable for any damages including, without limitation, direct, indirect, special, consequential, or incidental damages arising out of the use or inability to use the materials on this website.'
    }
  ];

  return (
    <section className="py-0 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <PageHeader title="Terms of Use" subtitle="Please review our terms" />
      <div className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <BackButton onClick={() => onNavigate('home')} />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Use</h1>
        <p className="text-gray-600 mb-12">Last updated: December 2025</p>
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

export default TermsPage;
