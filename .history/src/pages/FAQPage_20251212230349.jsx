 import React, { useState } from 'react';
import { COLORS } from '../constants/config';

// Fallback FAQs in case API fails
const FALLBACK_FAQS = [
  {
    id: 1,
    question: 'How can I donate to Sabri Helpage?',
    answer: 'You can donate through our secure online portal, bank transfer, or by visiting our office. All donations are tax-deductible.'
  },
  {
    id: 2,
    question: 'What areas do you serve?',
    answer: 'We primarily serve communities in and around Kolkata, with special focus on mental health, elderly care, and girl child education.'
  },
  {
    id: 3,
    question: 'How can I volunteer?',
    answer: 'Please visit our Volunteer page or contact our office to learn about current opportunities and requirements.'
  },
  {
    id: 4,
    question: 'Are my donations tax-deductible?',
    answer: 'Yes, Sabri Helpage is a registered non-profit organization and all donations are eligible for tax exemption under section 80G of the Income Tax Act.'
  },
  {
    id: 5,
    question: 'How can I get involved?',
    answer: 'You can get involved by volunteering, donating, or spreading awareness about our causes. Visit our Get Involved page for more details.'
  }
];

const FAQPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const loading = false; // No loading state needed for static content
  const error = false; // No error state needed for static content
  
  // Use fallback FAQs by default
  const displayFaqs = FALLBACK_FAQS;

  return (
    <section className="py-0 bg-white">
      <PageHeader title="FAQ" subtitle="Frequently Asked Questions" />
      <div className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600">Find answers to common questions about our organization and programs</p>
          </div>

          {loading && <div className="text-center py-12">Loading FAQs...</div>}
          {error && !loading && (
            <div className="text-center py-4 text-yellow-600">
              Couldn't load latest FAQs. Showing default information.
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border" style={{ borderColor: COLORS.PRIMARY_PALE }}>
            {displayFaqs.map((faq, index) => (
              <div key={index} className={index !== displayFaqs.length - 1 ? 'border-b border-gray-200' : ''}>
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full px-6 py-4 md:px-8 md:py-6 flex items-center justify-between hover:bg-gray-50 transition duration-200 text-left"
                  aria-expanded={expandedIndex === index}
                  aria-controls={`faq-${index}`}
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  {expandedIndex === index ? (
                    <svg className="h-6 w-6 flex-shrink-0 transform transition-transform" style={{ color: COLORS.PRIMARY }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7-7m0 0L5 14m7-7v12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-gray-400 flex-shrink-0 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7 7 7-7" />
                    </svg>
                  )}
                </button>
                {expandedIndex === index && (
                  <div id={`faq-${index}`} className="px-6 py-4 md:px-8 md:py-6 bg-gray-50">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-lg text-center" style={{ backgroundColor: COLORS.PRIMARY_PALE }}>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Still have questions?</h2>
            <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
              If you couldn't find what you were looking for, our team is here to help.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white transition duration-200 hover:shadow-lg"
              style={{ backgroundColor: COLORS.PRIMARY }}
            >
              Contact Us
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQPage;