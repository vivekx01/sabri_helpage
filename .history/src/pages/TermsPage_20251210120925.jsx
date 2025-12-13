import React, { useState, useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { COLORS } from '../constants/config';
import api from '../services/api.mjs';

const TermsPage = () => {
  const [terms, setTerms] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.getPageContent('terms').then((data) => {
      setTerms(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-800">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-0 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <PageHeader title={terms?.title || "Terms of Use"} subtitle={terms?.subtitle || "Please review our terms"} />
      <div className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{terms?.title || "Terms of Use"}</h1>
        <p className="text-gray-600 mb-12">{terms?.lastUpdated || "Last updated: December 2025"}</p>
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
          {(terms?.sections || []).map((section, index) => (
            <div key={index} className={index !== (terms.sections?.length || 0) - 1 ? 'pb-8 border-b border-gray-200' : ''}>
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
