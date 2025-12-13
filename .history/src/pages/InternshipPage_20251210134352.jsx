import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import api from '../services/api.mjs';
import { useApiMutation } from '../hooks/useApi';
import { COLORS } from '../constants/config';

const InternshipPage = ({ onNavigate }) => {
  const { mutate, loading: submitting, error: submitError, success, reset } = useApiMutation(api.createInternship);

  const internships = [
    { id: 1, title: 'Program Coordinator Intern', location: 'Delhi', duration: '3 months', stipend: '₹8,000' },
    { id: 2, title: 'Communications & Social Media Intern', location: 'Remote', duration: '3 months', stipend: '₹6,000' },
    { id: 3, title: 'Research & Impact Intern', location: 'Bangalore', duration: '6 months', stipend: '₹10,000' }
  ];

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleApply = async (role) => {
    if (!email || !name) return alert('Please enter your name and email to apply.');
    try {
      await mutate({
        name,
        email,
        phone,
        position: role,
        coverLetter: `Applying for ${role}`,
      });
      alert('Application submitted successfully!');
      setEmail('');
      setName('');
      setPhone('');
      setTimeout(reset, 3000);
    } catch (err) {
      console.error('Application error:', err);
    }
  };

  return (
    <section className="py-0" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <PageHeader title="Internships" subtitle="Join us and learn by doing" />
      <div className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Internship Opportunities</h1>
          <p className="text-lg text-gray-600">Hands-on roles for students and early-career professionals to learn and contribute.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {internships.map(i => (
            <div key={i.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">💼</div>
                <h3 className="text-lg font-bold text-gray-900">{i.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Location: {i.location}</p>
              <p className="text-sm text-gray-600 mb-2">Duration: {i.duration}</p>
              <p className="text-sm text-gray-600 mb-4">Stipend: {i.stipend}</p>
              <button onClick={() => handleApply(i.title)} className="px-4 py-2 rounded-lg font-semibold text-white" style={{ backgroundColor: COLORS.PRIMARY }}>Apply</button>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Form</h2>
          <p className="text-gray-700 mb-4">Fill in your details below, then use the Apply buttons on the role cards above.</p>
          <div className="space-y-4 max-w-md">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg focus:ring-2" style={{ ['--tw-ring-color']: COLORS.PRIMARY }} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className="w-full px-4 py-2 border rounded-lg focus:ring-2" style={{ ['--tw-ring-color']: COLORS.PRIMARY }} />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Phone Number" className="w-full px-4 py-2 border rounded-lg focus:ring-2" style={{ ['--tw-ring-color']: COLORS.PRIMARY }} />
          </div>
          {success && <p className="text-green-600 mt-4">Application submitted successfully!</p>}
          {submitError && <p className="text-red-600 mt-4">{submitError}</p>}
        </div>
      </div>
      </div>
    </section>
  );
};

export default InternshipPage;
