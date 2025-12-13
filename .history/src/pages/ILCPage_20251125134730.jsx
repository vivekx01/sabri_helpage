import React, { useState } from 'react';
import { X, Check, Upload, AlertCircle, Eye, EyeOff } from 'lucide-react';
import BackButton from '../components/shared/BackButton';
import { COLORS } from '../constants/config';

const ILCPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    orgName: '',
    orgType: 'ngo',
    regNumber: '',
    estYear: new Date().getFullYear(),
    sector: '',
    address: '',
    city: '',
    state: '',
    contactPerson: '',
    designation: '',
    mobile: '',
    email: '',
    membershipType: 'annual'
  });

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [focusAreas, setFocusAreas] = useState([]);
  const [impact, setImpact] = useState('');
  const [documents, setDocuments] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const focusAreaOptions = [
    'Mental Health',
    'Elderly Care',
    'Girl Child Education',
    'Environmental Sustainability',
    'Rural Development',
    'Healthcare',
    'Disaster Relief',
    'Other'
  ];

  const documentTypes = ['NGO Registration', 'Pan Certificate', 'Bank Statement', 'MOU', 'Impact Report'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = () => {
    if (formData.mobile.length === 10) {
      setOtpSent(true);
    } else {
      alert('Please enter a valid 10-digit mobile number');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === '123456') {
      setOtpVerified(true);
      setOtp('');
    } else {
      alert('Invalid OTP. Try 123456 for demo');
    }
  };

  const toggleFocusArea = (area) => {
    setFocusAreas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const handleFileUpload = (docType) => {
    setDocuments(prev => ({ ...prev, [docType]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpVerified && focusAreas.length > 0 && impact.trim()) {
      console.log({
        ...formData,
        otp,
        focusAreas,
        impact,
        documents
      });
      setSubmitted(true);
      alert('Registration submitted successfully!');
      setTimeout(() => onNavigate('home'), 2000);
    } else {
      alert('Please complete all required fields and verify OTP');
    }
  };

  if (submitted) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Check className="h-16 w-16 mx-auto mb-4 text-green-500" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600">Your SSIC membership application has been received. We'll get back to you soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">SSIC Membership</h1>
          <p className="text-gray-600 mb-8">Join Sabri Helpage's Social Service Impact Circle and amplify your organization's impact.</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Organization Details */}
            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Organization Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" name="orgName" placeholder="Organization Name" value={formData.orgName} onChange={handleInputChange} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
                <select name="orgType" value={formData.orgType} onChange={handleInputChange} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option value="ngo">NGO</option>
                  <option value="section8">Section 8 Company</option>
                  <option value="trust">Trust</option>
                  <option value="other">Other</option>
                </select>
                <input type="text" name="regNumber" placeholder="Registration Number" value={formData.regNumber} onChange={handleInputChange} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                <input type="number" name="estYear" placeholder="Year Established" value={formData.estYear} onChange={handleInputChange} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                <input type="text" name="sector" placeholder="Primary Sector of Work" value={formData.sector} onChange={handleInputChange} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
              </div>
            </div>

            {/* Contact Person */}
            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Person</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" name="contactPerson" placeholder="Full Name" value={formData.contactPerson} onChange={handleInputChange} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
                  <input type="text" name="designation" placeholder="Designation" value={formData.designation} onChange={handleInputChange} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
                </div>

                <div className="flex gap-2">
                  <input type="tel" name="mobile" placeholder="Mobile Number (10 digits)" maxLength="10" value={formData.mobile} onChange={handleInputChange} className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
                  <button type="button" onClick={handleSendOtp} className="px-6 py-2 rounded-lg font-semibold text-white transition duration-200" style={{ backgroundColor: otpVerified ? '#10b981' : COLORS.ACCENT_ORANGE }}>
                    {otpVerified ? '✓ Verified' : 'Send OTP'}
                  </button>
                </div>

                {otpSent && !otpVerified && (
                  <div className="flex gap-2">
                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" maxLength="6" className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                    <button type="button" onClick={handleVerifyOtp} className="px-6 py-2 rounded-lg font-semibold text-white transition duration-200" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>Verify</button>
                  </div>
                )}

                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
              </div>
            </div>

            {/* Membership Type */}
            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Membership Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="p-4 border-2 rounded-lg cursor-pointer transition" style={{ borderColor: formData.membershipType === 'annual' ? COLORS.ACCENT_ORANGE : '#e5e7eb' }}>
                  <input type="radio" value="annual" checked={formData.membershipType === 'annual'} onChange={handleInputChange} name="membershipType" />
                  <span className="ml-2 font-semibold">Annual Membership</span>
                </label>
                <label className="p-4 border-2 rounded-lg cursor-pointer transition" style={{ borderColor: formData.membershipType === 'three-year' ? COLORS.ACCENT_ORANGE : '#e5e7eb' }}>
                  <input type="radio" value="three-year" checked={formData.membershipType === 'three-year'} onChange={handleInputChange} name="membershipType" />
                  <span className="ml-2 font-semibold">3-Year Membership</span>
                </label>
              </div>
            </div>

            {/* Focus Areas */}
            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Areas of Focus</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {focusAreaOptions.map(area => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleFocusArea(area)}
                    className={`p-3 rounded-lg font-semibold transition duration-200 ${
                      focusAreas.includes(area)
                        ? 'text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                    style={{ backgroundColor: focusAreas.includes(area) ? COLORS.ACCENT_ORANGE : undefined }}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Impact */}
            <div className="border-t pt-6">
              <label className="block text-lg font-semibold text-gray-900 mb-2">Tell us about your social impact initiatives</label>
              <textarea value={impact} onChange={(e) => setImpact(e.target.value)} placeholder="Describe your programs and impact..." className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 h-32" required />
            </div>

            {/* Documents */}
            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Supporting Documents</h2>
              <div className="space-y-3">
                {documentTypes.map(doc => (
                  <div key={doc} className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="font-medium text-gray-900">{doc}</span>
                    <button
                      type="button"
                      onClick={() => handleFileUpload(doc)}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white transition duration-200"
                      style={{ backgroundColor: documents[doc] ? '#10b981' : COLORS.ACCENT_ORANGE }}
                    >
                      {documents[doc] ? <Check className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
                      <span>{documents[doc] ? 'Uploaded' : 'Upload'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="border-t pt-6 flex gap-4">
              <button type="button" onClick={() => onNavigate('home')} className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-lg font-semibold text-gray-900 hover:bg-gray-50">Cancel</button>
              <button type="submit" className="flex-1 py-3 px-6 rounded-lg font-semibold text-white transition duration-200" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>Submit Application</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ILCPage;
