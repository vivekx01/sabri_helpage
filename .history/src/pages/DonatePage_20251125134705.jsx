import React, { useState } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import BackButton from '../components/shared/BackButton';
import { COLORS } from '../constants/config';

const DonatePage = ({ onNavigate }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (donorName && donorEmail && amount > 0) {
      console.log({
        amount,
        frequency,
        supportFor,
        name: donorName,
        email: donorEmail
      });
      alert(`Thank you for your donation of $${amount}!`);
      setStep(1);
      setSelectedAmount(null);
      setCustomAmount('');
      setDonorName('');
      setDonorEmail('');
    }
  };

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <Heart className="h-12 w-12 mx-auto mb-4" style={{ color: COLORS.ACCENT_ORANGE }} />
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Make a Donation</h1>
            <p className="text-gray-600">Your generosity makes a real difference in people's lives</p>
          </div>

          <div className="flex justify-between items-center mb-12">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-orange-600' : 'text-gray-400'}`}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: step >= 1 ? COLORS.ACCENT_ORANGE : '#ccc', color: 'white' }}>1</div>
              <span className="font-semibold">Select Amount</span>
            </div>
            <div className="flex-1 h-1 mx-4" style={{ backgroundColor: step >= 2 ? COLORS.ACCENT_ORANGE : '#e5e7eb' }}></div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-orange-600' : 'text-gray-400'}`}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: step >= 2 ? COLORS.ACCENT_ORANGE : '#ccc', color: 'white' }}>2</div>
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
                      style={{ backgroundColor: selectedAmount === amt ? COLORS.ACCENT_ORANGE : undefined }}
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      style={{ backgroundColor: frequency === 'once' ? COLORS.ACCENT_ORANGE : undefined }}
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
                      style={{ backgroundColor: frequency === 'monthly' ? COLORS.ACCENT_ORANGE : undefined }}
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition duration-200 flex items-center justify-center space-x-2"
              >
                <span>Continue to Details</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-orange-50 p-4 rounded-lg border-l-4" style={{ borderColor: COLORS.ACCENT_ORANGE }}>
                <p className="text-sm text-gray-700"><span className="font-semibold">Donation Summary:</span> ${amount} {frequency === 'monthly' ? '/ month' : ''} · {supportFor}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Donate ${amount}</span>
                  <Heart className="h-5 w-5" />
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
