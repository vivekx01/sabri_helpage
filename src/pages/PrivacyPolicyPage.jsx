import React from 'react';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';
import PageSection from '../components/layout/PageSection';

const PrivacyPolicyPage = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content: 'We collect information that you provide directly to us, such as when you make a donation, sign up for our newsletter, or contact us. This may include your name, email address, phone number, payment information, and any other information you choose to provide.'
    },
    {
      title: 'How We Use Your Information',
      content: 'We may use the information we collect for various purposes, including to: Process your donations, send you updates about our work, respond to your inquiries, improve our website and services, comply with legal obligations, and protect against fraudulent or unauthorized transactions.'
    },
    {
      title: 'Information Sharing',
      content: 'We do not sell, trade, or rent your personal information to third parties. We may share information with service providers who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.'
    },
    {
      title: 'Data Security',
      content: 'We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.'
    },
    {
      title: 'Cookies and Tracking',
      content: 'We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.'
    },
    {
      title: 'Your Rights',
      content: 'You have the right to access, correct, or delete your personal information. You may also have the right to object to or restrict certain processing of your data. To exercise these rights, please contact us using the information below.'
    },
    {
      title: 'Children\'s Privacy',
      content: 'Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.'
    },
    {
      title: 'Changes to This Policy',
      content: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <PageHeader
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
        variant="primary"
      />

      <PageSection bg="white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gray-600 mb-8">Last updated: December 2025</p>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 mb-8">
              At Sabri Helpage, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a donation.
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
            <h3 className="text-xl font-semibold mb-4" style={{ color: COLORS.PRIMARY }}>Contact Us</h3>
            <p className="text-gray-700 mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-700 font-medium">
              Email: privacy@sabrihelpagenpo.org<br />
              Address: [Your Organization's Address]<br />
              Phone: +91 XXXXXXXXXX
            </p>
          </div>
        </div>
      </PageSection>
    </div>
  );
};

export default PrivacyPolicyPage;
