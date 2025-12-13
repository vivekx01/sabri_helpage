import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import BackButton from '../components/shared/BackButton';
import { COLORS } from '../constants/config';

const FAQPage = ({ onNavigate }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: 'How can I donate to Sabri Helpage?',
      answer: 'You can donate on our website through our secure donation portal. We accept credit cards, debit cards, and online transfers. You can also set up recurring monthly donations.'
    },
    {
      question: 'Is my donation tax-deductible?',
      answer: 'Yes! Sabri Helpage is a registered 80G organization. All donations are eligible for tax deduction under Section 80G of the Indian Income Tax Act.'
    },
    {
      question: 'How can I volunteer with Sabri Helpage?',
      answer: 'We welcome volunteers! Please visit our Volunteer page or contact us directly. We have opportunities in counseling, elderly care, education, and community outreach.'
    },
    {
      question: 'What programs does Sabri Helpage run?',
      answer: 'We primarily focus on three key areas: Mental Health Support, Elderly Care, and Girl Child Education. Each program is designed to create sustainable impact.'
    },
    {
      question: 'How does my donation help?',
      answer: 'Your donation directly funds our programs. $10 supports one counseling session, $25 funds a medical checkup, and $100 sponsors a girl\'s education for a month.'
    },
    {
      question: 'Can I visit the organization?',
      answer: 'Yes! We welcome visits from donors, volunteers, and interested community members. Please contact us to schedule a visit to our centers.'
    },
    {
      question: 'How is Sabri Helpage governed?',
      answer: 'We are governed by a Board of Trustees comprising experienced professionals and social workers. Our operations are transparent and regularly audited.'
    },
    {
      question: 'Can I corporate partnership opportunities?',
      answer: 'Absolutely! We welcome partnerships with corporates for CSR initiatives. Please contact our partnerships team for more information.'
    }
  ];

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">Find answers to common questions about our organization and programs</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={index} className={index !== faqs.length - 1 ? 'border-b border-gray-200' : ''}>
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full px-6 py-4 md:px-8 md:py-6 flex items-center justify-between hover:bg-gray-50 transition duration-200 text-left"
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                {expandedIndex === index ? (
                  <ChevronUp className="h-6 w-6 text-orange-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {expandedIndex === index && (
                <div className="px-6 py-4 md:px-8 md:py-6 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Didn't find your answer?</h2>
          <p className="text-gray-700 mb-4">
            If you have a question that isn't answered here, please feel free to contact us.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center px-4 py-2 rounded-lg font-semibold text-white transition duration-200"
            style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
