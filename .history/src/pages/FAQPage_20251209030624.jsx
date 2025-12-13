import React, { useState } from 'react';
import api from '../services/api.mjs';
import { useApi } from '../hooks/useApi';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';

const FAQPage = ({ onNavigate }) => {
  const { data: faqs, loading, error } = useApi(api.getFaqs, { status: 'active' }, []);

  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <section className="py-0" style={{ backgroundColor: '#F7F7F7' }}>
      <PageHeader title="FAQ" subtitle="Common questions answered" />
      <div className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">Find answers to common questions about our organization and programs</p>
        </div>

        {loading && <div className="text-center py-12">Loading FAQs...</div>}
        {error && <div className="text-center py-12 text-red-600">Error: {error}</div>}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {faqs && faqs.length > 0 ? faqs.map((faq, index) => (
            <div key={index} className={index !== faqs.length - 1 ? 'border-b border-gray-200' : ''}>
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full px-6 py-4 md:px-8 md:py-6 flex items-center justify-between hover:bg-gray-50 transition duration-200 text-left"
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                {expandedIndex === index ? (
                  <svg className="h-6 w-6 flex-shrink-0 transform transition-transform" style={{ color: COLORS.PRIMARY }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7-7m0 0L5 14m7-7v12" /></svg>
                ) : (
                  <svg className="h-6 w-6 text-gray-400 flex-shrink-0 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7 7 7-7" /></svg>
                )}
              </button>
              {expandedIndex === index && (
                <div className="px-6 py-4 md:px-8 md:py-6 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          )) : !loading && <div className="text-center py-12 text-gray-600">No FAQs available</div>}
        </div>

        <div className="mt-12 bg-blue-50 border-l-4 p-6 rounded-lg" style={{ borderLeftColor: COLORS.PRIMARY }}>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Didn't find your answer?</h2>
          <p className="text-gray-700 mb-4">
            If you have a question that isn't answered here, please feel free to contact us.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center px-4 py-2 rounded-lg font-semibold text-white transition duration-200"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            Contact Us
          </button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default FAQPage;
