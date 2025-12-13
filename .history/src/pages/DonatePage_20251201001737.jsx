import React, { useState } from 'react';
import api from '../services/api';
import { useApiMutation } from '../hooks/useApi';

const DonatePage = ({ onNavigate }) => {
  const { mutate, loading: submitting, error: submitError, success, reset } = useApiMutation(api.createDonor);
  const BackButton = ({ onClick }) => (
    <button 
      onClick={onClick} 
      className="flex items-center text-sm font-semibold mb-8 hover:text-gray-700 transition-all duration-300 hover:translate-x-[-4px] group"
      style={{ color: '#FF7A42' }}
    >
      <svg className="w-5 h-5 rotate-180 mr-1 transition-transform duration-300 group-hover:translate-x-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      Back
    </button>
  );

  const [step, setStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('once');
  const [supportFor, setSupportFor] = useState('general');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');

  const amounts = [10, 25, 50, 100, 250];
  const amount = selectedAmount || (customAmount ? parseInt(customAmount) : 0);

  const handleNext = () => {
    if (amount > 0) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (donorName && donorEmail && amount > 0) {
      try {
        await mutate({
          name: donorName,
          email: donorEmail,
          amount,
          frequency,
          purpose: supportFor
        });
        alert(`Thank you for your donation of $${amount}!`);
        setStep(1);
        setSelectedAmount(null);
        setCustomAmount('');
        setDonorName('');
        setDonorEmail('');
        setTimeout(reset, 3000);
      } catch (err) {
        console.error('Donation submission error:', err);
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#FFF8F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <svg className="h-12 w-12 mx-auto mb-4 text-[#FF7A42]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Make a Donation</h1>
            <p className="text-gray-600">Your generosity makes a real difference in people's lives</p>
          </div>

          <div className="flex justify-between items-center mb-12">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-[#FF7A42]' : 'text-gray-400'}`}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: step >= 1 ? '#FF7A42' : '#ccc', color: 'white' }}>1</div>
              <span className="font-semibold">Select Amount</span>
            </div>
            <div className="flex-1 h-1 mx-4" style={{ backgroundColor: step >= 2 ? '#FF7A42' : '#e5e7eb' }}></div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-[#FF7A42]' : 'text-gray-400'}`}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: step >= 2 ? '#FF7A42' : '#ccc', color: 'white' }}>2</div>
              <span className="font-semibold">Your Details</span>
            </div>
          </div>

          {step === 1 ? (
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">Choose an Amount</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                  {amounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-3 px-4 rounded-lg font-semibold transition duration-200 ${
                        selectedAmount === amt
                          ? 'text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                      style={{ backgroundColor: selectedAmount === amt ? '#FF7A42' : undefined }}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Or enter custom amount</label>
                  <input
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder="Enter amount in USD"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7A42] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Frequency</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setFrequency('once')}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition duration-200 ${
                        frequency === 'once'
                          ? 'text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                      style={{ backgroundColor: frequency === 'once' ? '#FF7A42' : undefined }}
                    >
                      One-time
                    </button>
                    <button
                      onClick={() => setFrequency('monthly')}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition duration-200 ${
                        frequency === 'monthly'
                          ? 'text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                      style={{ backgroundColor: frequency === 'monthly' ? '#FF7A42' : undefined }}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Support For</label>
                  <select
                    value={supportFor}
                    onChange={(e) => setSupportFor(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7A42] focus:border-transparent"
                  >
                    <option value="general">General Fund</option>
                    <option value="mental">Mental Health</option>
                    <option value="elderly">Elderly Care</option>
                    <option value="education">Girl Education</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full text-white font-semibold py-3 rounded-lg hover:shadow-lg transition duration-200 flex items-center justify-center space-x-2"
                style={{ backgroundColor: '#FF7A42' }}
              >
                <span>Continue to Details</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-orange-50 p-4 rounded-lg border-l-4" style={{ borderColor: '#FF7A42' }}>
                <p className="text-sm text-gray-700"><span className="font-semibold">Donation Summary:</span> ${amount} {frequency === 'monthly' ? '/ month' : ''} · {supportFor}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7A42] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7A42] focus:border-transparent"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-lg font-semibold text-gray-900 hover:bg-gray-50 transition duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition duration-200 flex items-center justify-center space-x-2"
                  style={{ backgroundColor: '#FF7A42' }}
                >
                  <span>Donate ${amount}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default DonatePage;
