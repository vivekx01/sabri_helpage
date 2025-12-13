'use client';

import React, { useState } from 'react';
import { postContact } from '../../../src/api';

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
    <div className="bg-[#FFF8F0] min-h-screen pb-20">
      <div className="pt-10 pb-6 text-center">
        <h1 className="text-4xl font-serif font-bold text-gray-900">Contact <span className="text-[#FF7A42]">Us</span></h1>
      </div>

      <div className="bg-[#FF7A42] py-12 relative overflow-hidden mb-16">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Do you have a Query?</h2>
        </div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[#FFF8F0] opacity-30 hidden md:block">
          <div className="text-8xl">✉</div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-8 relative z-20 mb-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-[#E5DED0]">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Send us a Message</h3>
          <div className="space-y-6">
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
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-10">Get in <span className="text-[#FF7A42]">Touch</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300 border-2 border-[#FFF8F0] group">
            <div className="bg-[#FFF5F0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-[#FF7A42] transition duration-300">
              <svg className="w-8 h-8 text-[#FF7A42] group-hover:text-white transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Address</h4>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">7 B, Mysore Road, Rashbehari Avenue,<br />Kolkata - 700026</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=7+B+Mysore+Road+Rashbehari+Avenue+Kolkata+700026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-[#FF7A42] font-semibold hover:text-[#E86830] transition"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              Open in Google Maps
            </a>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300 border-2 border-[#FFF8F0] group">
            <div className="bg-[#FFF5F0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-[#FF7A42] transition duration-300">
              <svg className="w-8 h-8 text-[#FF7A42] group-hover:text-white transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Email</h4>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">info@sabrihelpage.org</p>
            <a href="mailto:info@sabrihelpage.org" className="inline-flex items-center text-sm text-[#FF7A42] font-semibold hover:text-[#E86830] transition">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              Send Email
            </a>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300 border-2 border-[#FFF8F0] group">
            <div className="bg-[#FFF5F0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-[#FF7A42] transition duration-300">
              <svg className="w-8 h-8 text-[#FF7A42] group-hover:text-white transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.048 1.024a11.042 11.042 0 010 1.986l-2.048 1.024a1 1 0 00-.502.756l-1.498 4.493a1 1 0 00-.948.684H5a2 2 0 01-2-2V5z" /></svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Mobile</h4>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">+91 9874021457</p>
            <a href="tel:+919874021457" className="inline-flex items-center text-sm text-[#FF7A42] font-semibold hover:text-[#E86830] transition">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.048 1.024a11.042 11.042 0 010 1.986l-2.048 1.024a1 1 0 00-.502.756l-1.498 4.493a1 1 0 00-.948.684H5a2 2 0 01-2-2V5z" /></svg>
              Call Now
            </a>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300 border-2 border-[#FFF8F0] group">
            <div className="bg-[#FFF5F0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-[#FF7A42] transition duration-300">
              <svg className="w-8 h-8 text-[#FF7A42] group-hover:text-white transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.048 1.024a11.042 11.042 0 010 1.986l-2.048 1.024a1 1 0 00-.502.756l-1.498 4.493a1 1 0 00-.948.684H5a2 2 0 01-2-2V5z" /></svg>
            </div>
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
  );
};

export default ContactPage;
