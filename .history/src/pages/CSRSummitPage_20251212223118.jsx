import React, { useState } from 'react';
import api from '../services/api';
import { useApiMutation } from '../hooks/useApi';
import PageHeader from '../components/layout/PageHeader';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';

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

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHeader title="CSR Summit" subtitle="Collaborating for greater impact" />
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">Annual CSR & ESG Summit 2025</h1>
            <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto">A gathering of corporate leaders, non-profit pioneers, and social innovators.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Summit</h2>
              <p className="text-gray-700 leading-relaxed">The Annual CSR & ESG Summit brings together corporate CSR teams, sustainability leaders, and community organizations to share best practices, forge partnerships, and scale impact.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Should Attend</h2>
              <ul className="space-y-2.5 text-gray-700">
                <li>CSR & Sustainability Leaders</li>
                <li>Social Enterprise Founders</li>
                <li>NGO Program Heads</li>
                <li>Policy Makers & Researchers</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Summit Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
              <div>
                <p className="font-semibold">Expert Keynotes</p>
              </div>
              <div>
                <p className="font-semibold">Interactive Workshops</p>
              </div>
              <div>
                <p className="font-semibold">Partnership Marketplace</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Register Now</h2>
            <p className="text-gray-700 mb-8 text-center max-w-2xl mx-auto">Seats are limited — register early to secure your spot and benefit from early-bird pricing.</p>
            <form onSubmit={handleRegister} className="max-w-md mx-auto space-y-5">
              <input type="text" placeholder="Company Name *" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A42]" required />
              <input type="text" placeholder="Contact Person *" value={formData.contactPerson} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A42]" required />
              <input type="email" placeholder="Email Address *" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A42]" required />
              <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A42]" />
              <button type="submit" disabled={submitting} className="w-full inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white transition duration-200 disabled:opacity-50" style={{ backgroundColor: '#FF7A42' }}>
                <span>{submitting ? 'Submitting...' : 'Register for Summit'}</span>
              </button>
              {success && <p className="text-green-600 text-center">Registration submitted successfully!</p>}
              {submitError && <p className="text-red-600 text-center">{submitError}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CSRSummitPage;