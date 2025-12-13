import React, { useState, useCallback, useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { 
  Users, MapPin, Clock, BookOpen, CheckCircle, Wallet, Heart, ChevronRight 
} from 'lucide-react';
import { COLORS } from '../constants/config';
import api from '../services/api';

// Donate Page (replacing existing page) — two-step flow with improved UI
const DonatePage = ({ onNavigate = () => {} }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(5000);
  const [customAmount, setCustomAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [supportCategory, setSupportCategory] = useState('Elderly Care');
  const [citizenType, setCitizenType] = useState('indian');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [pan, setPan] = useState('');
  const [isExistingDonor, setIsExistingDonor] = useState(false);

  const [cfg, setCfg] = useState(null);
  useEffect(() => {
    let mounted = true;
    api.getConfig().then((res) => {
      const data = res?.data || res;
      if (mounted) setCfg(data);
    }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  const texts = cfg?.texts;
  const getText = (key, fallback) => (texts && typeof texts.get === 'function' && texts.get(key)) || fallback;

  const donationOptions = [
    Number(getText('donateOption1','5000')),
    Number(getText('donateOption2','15000')),
    Number(getText('donateOption3','25000')),
  ];
  const finalAmount = customAmount ? parseFloat(customAmount) : amount;

  const handleSelectAmount = useCallback((val) => {
    setAmount(val);
    setCustomAmount('');
  }, []);

  const handleCustomAmountChange = useCallback((e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setAmount(0);
    } else if (donationOptions.includes(amount)) {
      setAmount(donationOptions[0]);
    }
  }, [amount]);

  const handleNext = useCallback(() => {
    if (finalAmount <= 0) return;
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [finalAmount]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Donation submitted:', { finalAmount, isRecurring, firstName, lastName, email, mobile, supportCategory });
    onNavigate('home');
  }, [finalAmount, isRecurring, firstName, lastName, email, mobile, supportCategory, onNavigate]);

  const FormInput = ({ id, label, type = 'text', value, onChange, required = false }) => (
    <div className="group">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-focus-within:text-orange-500">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-gray-400"
      />
    </div>
  );

  const StatCard = ({ icon: Icon, value, label }) => (
    <div className="flex flex-col items-center text-white p-3 transform transition-all duration-300 hover:scale-110">
      <Icon className="w-8 h-8 mb-1 animate-pulse" />
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm font-medium text-white/90">{label}</div>
    </div>
  );

  const FocusAreaCard = ({ icon: Icon, title, subtitle, iconColor }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg border-b-4 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer group">
      <div 
        className="p-4 rounded-full mb-3 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" 
        style={{ backgroundColor: iconColor.bg }}
      >
        <Icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" style={{ color: iconColor.fg }} />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-1 transition-colors duration-300 group-hover:text-orange-500">{title}</h3>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen font-sans antialiased" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <PageHeader title="Donate" subtitle="Your support fuels our mission" />
      <div className="max-w-5xl mx-auto px-6 py-6 sm:py-10">

        {/* Step 1 - Donation Form */}
        <div 
          className={`transition-all duration-500 ${step === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'}`}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div
              className="grid grid-cols-1 lg:grid-cols-2 relative z-10 border-b-8 shadow-2xl"
              style={{
                backgroundColor: COLORS.PRIMARY,
                borderColor: COLORS.PRIMARY_DARK,
              }}
            >
              {/* Left Side - Hero Section */}
              <div className="p-6 sm:p-8 lg:p-10 text-center lg:text-left flex flex-col justify-center animate-fadeIn">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
                  {getText('donateHeroTitle','Transform Lives, Empower Communities')}
                </h1>
                <p className="text-base sm:text-lg text-white/90 max-w-3xl lg:max-w-none mx-auto mb-6 sm:mb-10">
                  {getText('donateHeroBody','Join us in building a compassionate world where every elderly person can thrive with dignity.')}
                </p>
                
                <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-b border-white/30 py-4 max-w-xl lg:max-w-none mx-auto">
                  <StatCard icon={Users} value="50K+" label="Lives Touched" />
                  <StatCard icon={MapPin} value="25" label="Regions Served" />
                  <StatCard icon={Clock} value="10+" label="Years of Service" />
                </div>
              </div>

              {/* Right Side - Donation Form */}
              <div className="p-4 sm:p-4 lg:p-6 flex flex-col justify-center">
                <div 
                  className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl border-4 transition-all duration-300 hover:shadow-3xl" 
                  style={{ borderColor: COLORS.PRIMARY_DARK }}
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">{getText('donateFormTitle','Sabri Helpage Donation')}</h2>
                  
                  <form className="space-y-4 sm:space-y-5">
                    {/* Amount Selection */}
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      {donationOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectAmount(opt)}
                          className={`flex-1 py-2 sm:py-3 rounded-xl text-base sm:text-lg font-bold transition-all duration-300 shadow-md transform hover:scale-105 active:scale-95 ${
                            amount === opt
                              ? 'text-white scale-105'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          style={amount === opt ? { backgroundColor: COLORS.PRIMARY } : {}}
                        >
                          ₹{opt.toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount */}
                    <div>
                      <input
                        type="number"
                        placeholder="₹ Other Amount (Min ₹ 100)"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        min="100"
                        className={`w-full p-3 rounded-xl text-base sm:text-lg text-gray-800 border-2 transition-all duration-300 focus:outline-none hover:border-gray-400 ${
                          finalAmount > 0 && customAmount && amount === 0 ? '' : 'border-gray-300'
                        }`}
                        style={finalAmount > 0 && customAmount && amount === 0 ? { borderColor: COLORS.PRIMARY, boxShadow: `0 0 0 2px ${COLORS.PRIMARY}33` } : {}}
                      />
                    </div>
                    
                    {finalAmount <= 0 && (
                      <p className="text-red-500 text-sm animate-pulse">Please select or enter an amount.</p>
                    )}

                    {/* Support Category */}
                    <div>
                      <label htmlFor="support-category" className="block text-sm font-semibold text-gray-700 mb-2">
                        {getText('donateSupportLabel','I offer my support for')}
                      </label>
                      <select
                        id="support-category"
                        value={supportCategory}
                        onChange={(e) => setSupportCategory(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white text-gray-800 border-2 border-gray-300 focus:outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer"
                      >
                        <option>{getText('donateSupportOpt1','Elderly Care')}</option>
                        <option>{getText('donateSupportOpt2','Education')}</option>
                        <option>{getText('donateSupportOpt3','Mental Health')}</option>
                        <option>{getText('donateSupportOpt4','General Fund')}</option>
                      </select>
                    </div>

                    {/* Login Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        className="w-full py-3 rounded-xl text-base sm:text-lg font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-md border-2 border-transparent hover:border-gray-300 transform hover:scale-[1.02] active:scale-95"
                      >
                        <span className="text-xs sm:text-sm font-medium block mb-1 text-gray-500">For Regular Donors</span>
                        Login
                      </button>
                    </div>

                    {/* One-time / Recurring */}
                    <div className="flex justify-between gap-3 sm:gap-4 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsRecurring(false)}
                        className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 border transform hover:scale-105 active:scale-95 ${
                          !isRecurring ? 'text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                        style={!isRecurring ? { backgroundColor: COLORS.PRIMARY, borderColor: COLORS.PRIMARY } : {}}
                      >
                        {getText('donateOneTime','One-time')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsRecurring(true)}
                        className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 border transform hover:scale-105 active:scale-95 ${
                          isRecurring ? 'text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                        style={isRecurring ? { backgroundColor: COLORS.PRIMARY, borderColor: COLORS.PRIMARY } : {}}
                      >
                        {getText('donateRecurring','Monthly Recurring')}
                      </button>
                    </div>
                    
                    {/* Next Button */}
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={finalAmount <= 0}
                        className="w-full py-3 rounded-xl text-lg sm:text-xl font-bold text-white transition-all duration-300 shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-95 hover:shadow-2xl"
                        style={{ backgroundColor: finalAmount > 0 ? COLORS.PRIMARY : undefined }}
                      >
                        {getText('donateNext','Next')}
                      </button>
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center pt-2">
                      {getText('donateTaxNote','All Donations to Sabri Helpage are tax exempted.')}
                    </p>
                  </form>
                </div>
              </div>
            </div>
                
            {/* Focus Areas Section */}
            <div className="py-10 sm:py-16 px-4 sm:px-10 lg:px-20">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-2">Our Focus Areas</h2>
              <p className="text-sm sm:text-md text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
                We're committed to creating sustainable change across critical sectors that impact the most vulnerable members of society.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <FocusAreaCard
                  icon={Heart}
                  title="Mental Health"
                  subtitle="Ensuring mental health and healthcare."
                  iconColor={{ fg: '#b73d34', bg: '#f8e9e8' }}
                />
                <FocusAreaCard
                  icon={Users}
                  title="Elderly Care"
                  subtitle="Dignity and support for senior citizens."
                  iconColor={{ fg: '#b73d34', bg: '#f8e9e8' }}
                />
                <FocusAreaCard
                  icon={BookOpen}
                  title="Girl Child Education"
                  subtitle="Education and girl child empowerment."
                  iconColor={{ fg: '#b73d34', bg: '#f8e9e8' }}
                />
              </div>
            </div>

            {/* Impact Section */}
            <div className="py-10 sm:py-16 px-4 sm:px-10 lg:px-20" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
              <div className="grid grid-cols-1">
                <div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 text-gray-900" style={{ color: COLORS.ACCENT_ORANGE }}>
                    Your Support Creates Impact
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
                    When you donate, you're not just giving money. You're providing education, healthcare, protection, and hope to those who need it most. Every rupee is a step towards a more equitable world.
                  </p>

                  <div className="bg-white p-4 rounded-xl shadow-md border-l-4 transition-all duration-300 hover:shadow-lg" style={{ borderColor: COLORS.PRIMARY_DARK }}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center text-xs sm:text-sm font-semibold text-gray-800 space-y-2 sm:space-y-0 sm:space-x-4 mb-2">
                      <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> 100% Transparent</span>
                      <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Verified NGO</span>
                      <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Direct Impact</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {getText('donateSummaryBody','We ensure that your donation reaches those who need it most, with complete transparency and accountability.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 - Donor Details */}
        <div 
          className={`transition-all duration-500 ${step === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'}`}
        >
          <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 lg:p-10 rounded-2xl shadow-2xl border-t-8" style={{ borderColor: COLORS.PRIMARY_DARK }}>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-2">Donor Details</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Please provide your details for tax receipt generation and confirmation.
            </p>
            
            {/* Donation Summary */}
            <div className="bg-gray-50 p-4 rounded-xl mb-6 sm:mb-8 border border-gray-200 transition-all duration-300 hover:shadow-md">
              <h3 className="text-base sm:text-lg font-bold text-gray-700 flex items-center mb-2">
                <Wallet className="w-5 h-5 mr-2 text-green-600" /> {getText('donateSummaryTitle','Donation Summary')}
              </h3>
              <div className="flex justify-between text-sm text-gray-600 border-b border-gray-100 pb-2 mb-2">
                <span>Amount:</span>
                <span className="font-semibold text-gray-800">₹{finalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 border-b border-gray-100 pb-2 mb-2">
                <span>Support Category:</span>
                <span className="font-semibold text-gray-800">{supportCategory}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Frequency:</span>
                <span className="font-semibold text-gray-800">{isRecurring ? 'Monthly Recurring' : 'One-time'}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Citizenship */}
              <div>
                <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3">Citizenship</label>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {['indian', 'foreign'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setCitizenType(type)}
                      className={`flex-1 p-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 flex items-center justify-center transform hover:scale-[1.02] active:scale-95 ${
                        citizenType === type ? 'text-white shadow-lg scale-[1.02]' : 'bg-gray-100 text-gray-800 border-2 border-gray-300 hover:border-gray-500'
                      }`}
                      style={citizenType === type ? { backgroundColor: COLORS.PRIMARY_DARK } : {}}
                    >
                      {type === 'indian' ? 'Indian Citizens' : 'Foreign Citizens/OCI'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput id="first-name" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <FormInput id="last-name" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <FormInput id="mobile" label="Mobile Number" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
              </div>

              {/* DOB and PAN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput id="dob" label="Date of Birth" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                {citizenType === 'indian' && (
                  <FormInput id="pan" label="PAN Number" value={pan} onChange={(e) => setPan(e.target.value)} required />
                )}
              </div>

              {/* Address Section */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-700 pt-4 border-t border-gray-100">Address Details</h3>
              <FormInput id="address" label="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} required />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInput id="zip" label="Zip/Postal Code" value={zip} onChange={(e) => setZip(e.target.value)} required />
                <FormInput id="city" label="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                <FormInput id="province" label="State/Province" value={province} onChange={(e) => setProvince(e.target.value)} required />
              </div>
              
              {/* Existing Donor */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Are you an existing donor?</label>
                <div className="flex gap-6">
                  <div className="flex items-center group cursor-pointer">
                    <input
                      id="existing-yes"
                      name="existing-donor"
                      type="radio"
                      checked={isExistingDonor === true}
                      onChange={() => setIsExistingDonor(true)}
                      className="h-4 w-4 cursor-pointer transition-transform duration-200 group-hover:scale-110"
                      style={{ accentColor: COLORS.PRIMARY_DARK }}
                    />
                    <label htmlFor="existing-yes" className="ml-2 block text-sm text-gray-900 cursor-pointer group-hover:text-orange-500 transition-colors">Yes</label>
                  </div>
                  <div className="flex items-center group cursor-pointer">
                    <input
                      id="existing-no"
                      name="existing-donor"
                      type="radio"
                      checked={isExistingDonor === false}
                      onChange={() => setIsExistingDonor(false)}
                      className="h-4 w-4 cursor-pointer transition-transform duration-200 group-hover:scale-110"
                      style={{ accentColor: COLORS.PRIMARY_DARK }}
                    />
                    <label htmlFor="existing-no" className="ml-2 block text-sm text-gray-900 cursor-pointer group-hover:text-orange-500 transition-colors">No</label>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
                By sharing your details, you agree to receive tax receipt, stories and updates via mobile, WhatsApp, landline, email, and post.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 order-2 sm:order-1 w-full py-3 px-6 rounded-xl text-base sm:text-lg font-bold text-gray-800 bg-gray-200 hover:bg-gray-300 transition-all duration-300 shadow-md transform hover:scale-[1.02] active:scale-95"
                >
                  {getText('donateBack','Back to Amount')}
                </button>
                <button
                  type="submit"
                  disabled={
                    !firstName || !lastName || !email || !mobile || !address || !zip || !city || !province || (citizenType === 'indian' && !pan)
                  }
                  className="flex-1 order-1 sm:order-2 w-full py-3 px-6 rounded-xl text-base sm:text-lg font-bold text-white transition-all duration-300 shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-95 hover:shadow-2xl"
                  style={{ backgroundColor: COLORS.PRIMARY }}
                >
                  {getText('donatePayLabel','Pay')} ₹{finalAmount.toLocaleString('en-IN')} {getText('donatePaySuffix','Now')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        input:focus, select:focus {
          transform: scale(1.01);
        }

        button:active {
          transform: scale(0.95);
        }

        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }

        .group:hover .group-hover\\:rotate-6 {
          transform: rotate(6deg);
        }

        .group:hover .group-hover\:text-orange-500 {
          color: #b73d34;
        }

        .group:hover .group-hover\\:translate-x-\\[-2px\\] {
          transform: translateX(-2px);
        }

        .group-focus-within\:text-orange-500:focus-within {
          color: #b73d34;
        }

        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default DonatePage;