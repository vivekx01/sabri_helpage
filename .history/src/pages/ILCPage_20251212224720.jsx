import React, { useState, useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import { COLORS } from '../constants/config';

const ILCPage = () => {
  // Add effect to handle body overflow when modal is open/closed
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFocusAreas, setSelectedFocusAreas] = useState([]);
  const [otherFocusArea, setOtherFocusArea] = useState('');

  // OTP State Management
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const toggleFocusArea = (area) => {
    setSelectedFocusAreas(prev =>
      prev.includes(area)
        ? prev.filter(item => item !== area)
        : [...prev, area]
    );
  };

  // OTP Handlers
  const handleSendOtp = () => {
    if (mobileNumber.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    // Simulate sending OTP
    setShowOtpInput(true);
    alert("OTP sent to " + mobileNumber + ". Use '1234' to verify.");
  };

  const handleVerifyOtp = () => {
    if (otp === '1234') {
      setIsPhoneVerified(true);
      setShowOtpInput(false);
      alert("Mobile number verified successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = () => {
    if (!isPhoneVerified) {
      alert("Please verify your mobile number before submitting.");
      return;
    }
    alert("Registration Submitted!");
    toggleModal();
  };

  const focusAreas = [
    "Community Development",
    "Research & Innovation",
    "Education & Youth",
    "Girl Child Empowerment",
    "Sustainability & Environment",
    "Social Welfare",
    "Skill Development",
    "Health & Well-being"
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <PageHeader title="SSIC" subtitle="Sabri Social Impact Club" />
      <Section>
        <Container>
          {/* Welcome Title */}
          <div className="text-center mb-12 mt-8">
            <h2 className="text-4xl font-bold mb-4" style={{ color: COLORS.PRIMARY }}>
              Welcome to Sabri Social Impact Club!
            </h2>
            <div className="h-1 w-24 mx-auto" style={{ backgroundColor: COLORS.PRIMARY }}></div>
          </div>

          {/* Body Text */}
          <div className="prose max-w-none text-gray-700 leading-relaxed text-justify mb-16">
            <p className="mb-4 text-lg">
              <span className="font-bold" style={{ color: COLORS.PRIMARY }}>SSIC</span> is the vision of Sabri Helpage to create a caring and socially responsible community where businesses and nonprofits work together to make a difference in society that lasts.
            </p>
            <p className="text-lg">
              The Sabri Social Impact Club wants to see a future where people work together to help weak communities, give youth power, support girls, and make India's environmental and social welfare system stronger.
            </p>
          </div>

          {/* Register Button */}
          <div className="flex justify-center mb-16">
            <button 
              onClick={toggleModal}
              className="group relative px-8 py-4 text-white font-bold rounded-full shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-3"
              style={{ backgroundColor: COLORS.PRIMARY }}
            >
              Register for SSIC Membership
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>

          {/* Mission Banner */}
          <div className="w-full py-16 px-6 text-center shadow-inner relative overflow-hidden" style={{ backgroundColor: COLORS.PRIMARY }}>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-white"></div>
            <div className="max-w-4xl mx-auto relative z-10">
              <p className="text-2xl md:text-3xl text-white font-serif italic leading-normal">
                "To create a thriving ecosystem that connects people and organisations that care about social welfare and making a difference."
              </p>
              <p className="mt-4 font-semibold tracking-wider uppercase text-sm" style={{ color: COLORS.PRIMARY_PALE }}>
                 SSIC Mission Statement
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h3 className="text-3xl mb-8 font-serif border-b pb-4" style={{ color: COLORS.PRIMARY, borderColor: COLORS.PRIMARY_PALE }}>Our Mission</h3>
            <div className="space-y-6 text-gray-700">
              {[
                "To create a thriving ecosystem that connects people and organisations that care about social welfare and making a difference.",
                "To promote solutions based on research and new ways of doing things that deal with important social problems in a way that has a lasting, large-scale effect.",
                "To help businesses and non-profits share information, work together, and build their skills so that social development efforts are stronger and more unified.",
                "To encourage people to act in a socially responsible way through structured programs, partnerships, and initiatives that make communities stronger.",
                "To create a welcoming space where people can share their thoughts, resources, and chances to make society stronger, healthier, and more caring."
              ].map((mission, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="font-bold text-xl" style={{ color: COLORS.PRIMARY }}></span>
                  <p className="leading-relaxed">{mission}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl my-8 flex flex-col max-h-[90vh]" style={{ backgroundColor: COLORS.PRIMARY_PALE }}>
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10 rounded-t-xl" style={{ backgroundColor: COLORS.PRIMARY_PALE, borderColor: COLORS.PRIMARY_PALE }}>
              <div>
                <h2 className="text-2xl font-bold" style={{ color: COLORS.PRIMARY }}>SSIC Registration</h2>
                <p className="text-sm text-gray-600">Please fill out all details below to apply.</p>
              </div>
              <button onClick={toggleModal} className="p-2 rounded-full transition-colors" style={{ backgroundColor: 'transparent' }}>
                <i className="fas fa-times text-gray-500"></i>
              </button>
            </div>

            {/* Form Content */}
            <div className="min-h-screen bg-white font-sans text-gray-800">
              <PageHeader title="SSIC" subtitle="Sabri Social Impact Club" />
              <Section>
                <Container>
                  {/* Welcome Title */}
                  <div className="text-center mb-12 mt-8">
                    <h2 className="text-4xl font-bold mb-4" style={{ color: COLORS.PRIMARY }}>
                      Welcome to Sabri Social Impact Club!
                    </h2>
                    <div className="h-1 w-24 mx-auto" style={{ backgroundColor: COLORS.PRIMARY }}></div>
                  </div>
                  {/* Body Text */}
                  <div className="prose max-w-none text-gray-700 leading-relaxed text-justify mb-16">
                    <p className="mb-4 text-lg">
                      <span className="font-bold" style={{ color: COLORS.PRIMARY }}>SSIC</span> is the vision of Sabri Helpage to create a caring and socially responsible community where businesses and nonprofits work together to make a difference in society that lasts.
                    </p>
                    <p className="text-lg">
                      The Sabri Social Impact Club wants to see a future where people work together to help weak communities, give youth power, support girls, and make India's environmental and social welfare system stronger.
                    </p>
                  </div>
                  {/* Register Button */}
                  <div className="flex justify-center mb-16">
                    <button 
                      onClick={toggleModal}
                      className="group relative px-8 py-4 text-white font-bold rounded-full shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-3"
                      style={{ backgroundColor: COLORS.PRIMARY }}
                    >
                      Register for SSIC Membership
                      <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </button>
                  </div>
                  {/* Mission Banner */}
                  <div className="w-full py-16 px-6 text-center shadow-inner relative overflow-hidden" style={{ backgroundColor: COLORS.PRIMARY }}>
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-white"></div>
                    <div className="max-w-4xl mx-auto relative z-10">
                      <p className="text-2xl md:text-3xl text-white font-serif italic leading-normal">
                        "To create a thriving ecosystem that connects people and organisations that care about social welfare and making a difference."
                      </p>
                      <p className="mt-4 font-semibold tracking-wider uppercase text-sm" style={{ color: COLORS.PRIMARY_PALE }}>
                        — SSIC Mission Statement
                      </p>
                    </div>
                  </div>
                  {/* Mission Section */}
                  <div className="max-w-5xl mx-auto px-6 py-16">
                    <h3 className="text-3xl mb-8 font-serif border-b pb-4" style={{ color: COLORS.PRIMARY, borderColor: COLORS.PRIMARY_PALE }}>Our Mission</h3>
                    <div className="space-y-6 text-gray-700">
                      {[
                        "To create a thriving ecosystem that connects people and organisations that care about social welfare and making a difference.",
                        "To promote solutions based on research and new ways of doing things that deal with important social problems in a way that has a lasting, large-scale effect.",
                        "To help businesses and non-profits share information, work together, and build their skills so that social development efforts are stronger and more unified.",
                        "To encourage people to act in a socially responsible way through structured programs, partnerships, and initiatives that make communities stronger.",
                        "To create a welcoming space where people can share their thoughts, resources, and chances to make society stronger, healthier, and more caring."
                      ].map((mission, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                          <span className="font-bold text-xl" style={{ color: COLORS.PRIMARY }}></span>
                          <p className="leading-relaxed">{mission}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Container>
              </Section>

              {/* Registration Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
                  <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl my-8 flex flex-col max-h-[90vh]" style={{ backgroundColor: COLORS.PRIMARY_PALE }}>
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10 rounded-t-xl" style={{ backgroundColor: COLORS.PRIMARY_PALE, borderColor: COLORS.PRIMARY_PALE }}>
                      <div>
                        <h2 className="text-2xl font-bold" style={{ color: COLORS.PRIMARY }}>SSIC Registration</h2>
                        <p className="text-sm text-gray-600">Please fill out all details below to apply.</p>
                      </div>
                      <button onClick={toggleModal} className="p-2 rounded-full transition-colors" style={{ backgroundColor: 'transparent' }}>
                        <i className="fas fa-times text-gray-500"></i>
                      </button>
                    </div>

                    {/* Form Content */}
                    <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">
                      {/* Section A: Org Details */}
                      <section className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4" style={{ color: COLORS.PRIMARY }}>
                          <i className="fas fa-building text-lg"></i>
                          <h3 className="font-bold text-lg">A. Organisation Details</h3>
                        </div>
                        {/* ...existing code... */}
                      </section>
                      {/* ...other sections... */}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t bg-white rounded-b-xl flex flex-col sm:flex-row justify-between items-center gap-4" style={{ backgroundColor: COLORS.PRIMARY_PALE, borderColor: COLORS.PRIMARY_PALE }}>
                      <p className="text-sm text-gray-600 text-center sm:text-left">
                        All fields are mandatory unless specified otherwise
                      </p>
                      <div className="flex gap-3">
                        <button 
                          onClick={toggleModal}
                          className="px-6 py-2.5 text-gray-600 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleSubmit}
                          className={`px-8 py-2.5 text-white font-semibold rounded-lg transition-colors shadow-md flex items-center gap-2 ${
                            isPhoneVerified 
                            ? "" 
                            : "bg-gray-400 cursor-not-allowed"
                          }`}
                          style={isPhoneVerified ? { backgroundColor: COLORS.PRIMARY } : {}}
                        >
                          <i className="fas fa-paper-plane"></i>
                          Submit Registration
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        };
                        </button>
                      )}
                    </div>

                    {/* OTP INPUT ROW */}
                    {showOtpInput && !isPhoneVerified && (
                      <div className="mt-3 flex flex-col sm:flex-row gap-3 animate-fade-in-up">
                        <input 
                          type="text" 
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="flex-1 p-3 bg-white border rounded-lg focus:ring-2 outline-none" 
                          style={{ borderColor: COLORS.PRIMARY_PALE, ['--tw-ring-color']: COLORS.PRIMARY }} 
                          placeholder="Enter 4-digit OTP" 
                        />
                        <button 
                          type="button"
                          onClick={handleVerifyOtp}
                          className="px-6 py-3 text-white font-medium rounded-lg transition-colors whitespace-nowrap" style={{ backgroundColor: COLORS.PRIMARY }}
                        >
                          Verify OTP
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" className="w-full p-3 bg-white border rounded-lg focus:ring-2 outline-none" style={{ borderColor: COLORS.PRIMARY_PALE, ['--tw-ring-color']: COLORS.PRIMARY }} placeholder="your@email.com" />
                  </div>
                </div>
              </section>

              {/* Section D: Focus Areas */}
              <section className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4" style={{ color: COLORS.PRIMARY }}>
                  <i className="fas fa-bullseye text-lg"></i>
                  <h3 className="font-bold text-lg">D. Organisational Focus Areas</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {focusAreas.map((area) => (
                    <label key={area} className="flex items-center gap-3 p-3 bg-white border rounded-lg cursor-pointer transition-colors" style={{ borderColor: COLORS.PRIMARY_PALE }}>
                      <input 
                        type="checkbox" 
                        checked={selectedFocusAreas.includes(area)}
                        onChange={() => toggleFocusArea(area)}
                        className="w-4 h-4 rounded border-gray-300" 
                        style={{ accentColor: COLORS.PRIMARY }} 
                      />
                      <span className="text-gray-700 text-sm font-medium">{area}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-white rounded-b-xl flex flex-col sm:flex-row justify-between items-center gap-4" style={{ backgroundColor: COLORS.PRIMARY_PALE, borderColor: COLORS.PRIMARY_PALE }}>
              <p className="text-sm text-gray-600 text-center sm:text-left">
                All fields are mandatory unless specified otherwise
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={toggleModal}
                  className="px-6 py-2.5 text-gray-600 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit}
                  className={`px-8 py-2.5 text-white font-semibold rounded-lg transition-colors shadow-md flex items-center gap-2 ${
                    isPhoneVerified 
                    ? "" 
                    : "bg-gray-400 cursor-not-allowed"
                  }`}
                  style={isPhoneVerified ? { backgroundColor: COLORS.PRIMARY } : {}}
                >
                  <i className="fas fa-paper-plane"></i>
                  Submit Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ILCPage;