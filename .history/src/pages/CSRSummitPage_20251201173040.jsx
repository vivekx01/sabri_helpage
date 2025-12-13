import React, { useState } from 'react';
import api from '../services/api';
import { useApiMutation } from '../hooks/useApi';
import PageHeader from '../components/layout/PageHeader';
import TopBar from '../components/layout/TopBar';

const CSRSummitPage = ({ onNavigate }) => {
  const { mutate, loading: submitting, error: submitError, success, reset } = useApiMutation(api.submitCSR);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email) {
      alert('Please fill in required fields');
      return;
    }
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      submitData.append('proposalDetails', 'CSR Summit 2025 Registration');
      await mutate(submitData);
      alert('Registration submitted successfully!');
      setFormData({ companyName: '', contactPerson: '', email: '', phone: '' });
      setTimeout(reset, 3000);
    } catch (err) {
      console.error('Registration error:', err);
    }
  };
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
    <section className="py-0 bg-white">
      <TopBar title="CSR Summit" />
      <PageHeader title="CSR Summit" subtitle="Collaborating for greater impact" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-[#FF7A42] to-[#FF9500] text-white p-8 md:p-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Annual CSR & ESG Summit 2025</h1>
            <p className="text-xl mb-6">A gathering of corporate leaders, non-profit pioneers, and social innovators.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span>March 20-21, 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                <span>New Delhi Convention Center</span>
              </div>
            </div>
          </div>
        </div>

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

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Register Now</h2>
          <p className="text-gray-700 mb-6 text-center">Seats are limited — register early to secure your spot and benefit from early-bird pricing.</p>
          <form onSubmit={handleRegister} className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              placeholder="Company Name *"
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF7A42]"
              required
            />
            <input
              type="text"
              placeholder="Contact Person *"
              value={formData.contactPerson}
              onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF7A42]"
              required
            />
            <input
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF7A42]"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF7A42]"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white transition duration-200 disabled:opacity-50"
              style={{ backgroundColor: '#FF7A42' }}
            >
              <span>{submitting ? 'Submitting...' : 'Register for Summit'}</span>
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            {success && <p className="text-green-600 text-center">Registration submitted successfully!</p>}
            {submitError && <p className="text-red-600 text-center">{submitError}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default CSRSummitPage;
