import React from 'react';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';
import PageSection from '../components/layout/PageSection';

const TermsPage = () => {
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
    },
    {
      title: 'Governing Law',
      content: 'These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.'
    },
    {
      title: 'Changes to Terms',
      content: 'Sabri Helpage reserves the right to revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <PageHeader
        title="Terms of Use"
        subtitle="Please read these terms and conditions carefully before using our website"
        variant="primary"
      />

      <PageSection bg="white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gray-600 mb-8">Last updated: December 2025</p>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 mb-8">
              Welcome to Sabri Helpage. These terms and conditions outline the rules and regulations for the use of our website.
            </p>
          </div>
          
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.PRIMARY_DARK }}>{section.title}</h2>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-4" style={{ color: COLORS.PRIMARY }}>Need Help?</h3>
            <p className="text-gray-700 mb-6">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-gray-700 font-medium">
              Email: info@sabrihelpagenpo.org<br />
              Phone: +91 XXXXXXXXXX
            </p>
          </div>
        </div>
      </PageSection>
    </div>
  );
};

export default TermsPage;