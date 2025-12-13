import React, { useState } from 'react';
import BackButton from '../components/shared/BackButton';
import { Briefcase, Calendar, Mail } from 'lucide-react';
import { COLORS } from '../constants/config';

const InternshipPage = ({ onNavigate }) => {
  const internships = [
    { id: 1, title: 'Program Coordinator Intern', location: 'Delhi', duration: '3 months', stipend: '₹8,000' },
    { id: 2, title: 'Communications & Social Media Intern', location: 'Remote', duration: '3 months', stipend: '₹6,000' },
    { id: 3, title: 'Research & Impact Intern', location: 'Bangalore', duration: '6 months', stipend: '₹10,000' }
  ];

  const [email, setEmail] = useState('');
  const [applied, setApplied] = useState(false);

  const handleApply = (role) => {
    if (!email) return alert('Please enter your email to apply.');
    console.log('Applied for', role, 'from', email);
    setApplied(true);
    setEmail('');
    setTimeout(() => setApplied(false), 3000);
  };

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Internship Opportunities</h1>
          <p className="text-lg text-gray-600">Hands-on roles for students and early-career professionals to learn and contribute.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {internships.map(i => (
            <div key={i.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center space-x-3 mb-4">
                <Briefcase className="h-6 w-6" style={{ color: COLORS.ACCENT_ORANGE }} />
                <h3 className="text-lg font-bold text-gray-900">{i.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Location: {i.location}</p>
              <p className="text-sm text-gray-600 mb-2">Duration: {i.duration}</p>
              <p className="text-sm text-gray-600 mb-4">Stipend: {i.stipend}</p>
              <button onClick={() => handleApply(i.title)} className="px-4 py-2 rounded-lg font-semibold text-white" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>Apply</button>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Apply Now</h2>
          <p className="text-gray-700 mb-4">Enter your email and select the role you'd like to apply for from the cards above.</p>
          <div className="flex max-w-md">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="flex-1 px-4 py-2 border rounded-l-lg focus:ring-2 focus:ring-orange-500" />
            <button onClick={() => { if (!email) return alert('Enter email'); alert('Use the individual Apply buttons on roles.'); }} className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-r-lg">Submit</button>
          </div>
          {applied && <p className="text-green-600 mt-4">Thanks — your application has been received.</p>}
        </div>
      </div>
    </section>
  );
};

export default InternshipPage;
