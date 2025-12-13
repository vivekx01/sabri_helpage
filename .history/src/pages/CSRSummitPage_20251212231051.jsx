import PageHeader from '../components/layout/PageHeader';
import React from 'react';

const CSRSummitPage = ({ onNavigate }) => {
  const BackButton = ({ onClick }) => (
    <button 
      onClick={onClick} 
      className="flex items-center text-sm font-semibold mb-8 hover:text-gray-700 transition-all duration-300 hover:translate-x-[-4px] group"
      style={{ color: '#FF7A42' }}
    >
      <svg className="w-5 h-5 rotate-180 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      Back
    </button>
  );

  return (
    <section className="py-0 md:py-24 bg-[#FFF8F0]">
      <PageHeader title="Annual CSR & ESG Summit 2025" subtitle="A gathering of corporate leaders, non-profit pioneers, and social innovators." />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Summit</h2>
            <p className="text-gray-700 leading-relaxed">The Annual CSR & ESG Summit brings together corporate CSR teams, sustainability leaders, and community organizations to share best practices, forge partnerships, and scale impact.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Should Attend</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• CSR & Sustainability Leaders</li>
              <li>• Social Enterprise Founders</li>
              <li>• NGO Program Heads</li>
              <li>• Policy Makers & Researchers</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Summit Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mx-auto mb-2">⭐</div>
              <p className="font-semibold">Expert Keynotes</p>
            </div>
            <div>
              <div className="text-4xl mx-auto mb-2">👥</div>
              <p className="font-semibold">Interactive Workshops</p>
            </div>
            <div>
              <div className="text-4xl mx-auto mb-2">🤝</div>
              <p className="font-semibold">Partnership Marketplace</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Register Now</h2>
          <p className="text-gray-700 mb-6">Seats are limited — register early to secure your spot and benefit from early-bird pricing.</p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white transition duration-200"
            style={{ backgroundColor: '#FF7A42' }}
          >
            <span>Register for Summit</span>
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CSRSummitPage;
