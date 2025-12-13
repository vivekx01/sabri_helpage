import React, { useState } from 'react';
import { postContact } from '../api';

const ContactPage = ({ onNavigate }) => {
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ loading: true });
    postContact(formData)
      .then(() => {
        setStatus({ success: true, message: 'Message sent — thank you!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((err) => {
        setStatus({ error: true, message: err.message || 'Failed to send message' });
      })
      .finally(() => setTimeout(() => setStatus(null), 4000));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#FF7F50] text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          return (
            <section className="py-16 md:py-24 bg-[#FFF8F0] flex justify-center">
              <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col items-center">
                {/* Page Header Box */}
                <div className="w-full flex justify-center mb-12">
                  <div className="bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col items-center border border-[#FFE4D6]">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3 text-center">Contact Us</h1>
                    <p className="text-lg text-gray-600 text-center">Do you have a Query?</p>
                  </div>
                </div>

                {/* Contact Form Box */}
                <div className="w-full flex flex-col gap-10">
                  <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-[#FFE4D6] mb-10">
                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Send us a Message</h3>
                    <div className="space-y-6 w-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name *"
                          className="w-full p-4 border-2 border-[#E5DED0] rounded-lg focus:outline-none focus:border-[#FF7A42] text-sm bg-[#FDFCFA] transition"
                        />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your Email *"
                          className="w-full p-4 border-2 border-[#E5DED0] rounded-lg focus:outline-none focus:border-[#FF7A42] text-sm bg-[#FDFCFA] transition"
                        />
                      </div>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="w-full p-4 border-2 border-[#E5DED0] rounded-lg focus:outline-none focus:border-[#FF7A42] text-sm bg-[#FDFCFA] transition"
                      />
                      <div className="relative">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your Message *"
                          rows="5"
                          className="w-full p-4 border-2 border-[#E5DED0] rounded-lg focus:outline-none focus:border-[#FF7A42] text-sm bg-[#FDFCFA] transition resize-none"
                        ></textarea>
                        <span className="absolute bottom-4 right-4 text-gray-400 text-xl">✎</span>
                      </div>
                      <div className="text-center pt-2">
                        <div className="space-y-3">
                          <button
                            onClick={handleSubmit}
                            disabled={status && status.loading}
                            className="bg-[#FF7A42] disabled:opacity-60 text-white px-10 py-4 rounded-lg font-bold text-base hover:bg-[#E86830] transition shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
                          >
                            {status && status.loading ? 'Sending…' : 'Send Message ✉'}
                          </button>
                          {status && status.success && <div className="text-sm text-green-600">{status.message}</div>}
                          {status && status.error && <div className="text-sm text-red-600">{status.message}</div>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info Boxes */}
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-[#FFE4D6] flex flex-col items-center">
                      <div className="bg-[#FFF5F0] w-16 h-16 rounded-full flex items-center justify-center mb-5 text-2xl">🏠</div>
                      <h4 className="font-bold text-gray-900 mb-3 text-lg">Address</h4>
                      <p className="text-sm text-gray-600 mb-5 leading-relaxed">7 B, Mysore Road, Rashbehari Avenue,<br />Kolkata - 700026</p>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=7+B+Mysore+Road+Rashbehari+Avenue+Kolkata+700026"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-[#FF7A42] font-semibold hover:text-[#E86830] transition"
                      >
                        <span className="mr-2">🗺️</span>Open in Google Maps
                      </a>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-[#FFE4D6] flex flex-col items-center">
                      <div className="bg-[#FFF5F0] w-16 h-16 rounded-full flex items-center justify-center mb-5 text-2xl">✉️</div>
                      <h4 className="font-bold text-gray-900 mb-3 text-lg">Email</h4>
                      <p className="text-sm text-gray-600 mb-5 leading-relaxed">info@sabrihelpage.org</p>
                      <a href="mailto:info@sabrihelpage.org" className="inline-flex items-center text-sm text-[#FF7A42] font-semibold hover:text-[#E86830] transition">
                        <span className="mr-2">📧</span>Send Email
                      </a>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-[#FFE4D6] flex flex-col items-center">
                      <div className="bg-[#FFF5F0] w-16 h-16 rounded-full flex items-center justify-center mb-5 text-2xl">📱</div>
                      <h4 className="font-bold text-gray-900 mb-3 text-lg">Mobile</h4>
                      <p className="text-sm text-gray-600 mb-5 leading-relaxed">+91 9874021457</p>
                      <a href="tel:+919874021457" className="inline-flex items-center text-sm text-[#FF7A42] font-semibold hover:text-[#E86830] transition">
                        <span className="mr-2">📞</span>Call Now
                      </a>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-[#FFE4D6] flex flex-col items-center">
                      <div className="bg-[#FFF5F0] w-16 h-16 rounded-full flex items-center justify-center mb-5 text-2xl">☎️</div>
                      <h4 className="font-bold text-gray-900 mb-3 text-lg">Telephone</h4>
                      <p className="text-sm text-gray-600 mb-5 leading-relaxed">033 4601 3886</p>
                      <a href="tel:03346013886" className="inline-flex items-center text-sm text-[#FF7A42] font-semibold hover:text-[#E86830] transition">
                        <span className="mr-2">📞</span>Call Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Telephone</h4>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">033 4601 3886</p>
            <a href="tel:03346013886" className="inline-flex items-center text-sm text-[#FF7A42] font-semibold hover:text-[#E86830] transition">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.048 1.024a11.042 11.042 0 010 1.986l-2.048 1.024a1 1 0 00-.502.756l-1.498 4.493a1 1 0 00-.948.684H5a2 2 0 01-2-2V5z" /></svg>
              Call Now
            </a>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
