import React, { useState } from 'react';
import { COLORS } from '../constants/config';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import PageHero from '../components/sections/PageHero';

const ContactPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: null,
    success: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus({ loading: true, error: null, success: false });

    // Simulate form submission
    setTimeout(() => {
      // In a real app, you would make an API call here
      console.log('Form submitted:', formData);

      setFormStatus({
        loading: false,
        error: null,
        success: true
      });

      // Reset form after successful submission
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    }, 1000);
  };

  return (
    <div>
      <PageHero title="Contact Us" subtitle="Get in touch with us" />

      <Section>
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Send us a <span style={{ color: COLORS.PRIMARY }}>Message</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
                    className="w-full p-4 border-2 rounded-lg focus:outline-none text-sm bg-[#FDFCFA] transition" style={{ borderColor: COLORS.PRIMARY_PALE }}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email *"
                    className="w-full p-4 border-2 rounded-lg focus:outline-none text-sm bg-[#FDFCFA] transition" style={{ borderColor: COLORS.PRIMARY_PALE }}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full p-4 border-2 rounded-lg focus:outline-none text-sm bg-[#FDFCFA] transition" style={{ borderColor: COLORS.PRIMARY_PALE }}
              />

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message *"
                  rows="5"
                  className="w-full p-4 border-2 rounded-lg focus:outline-none text-sm bg-[#FDFCFA] transition resize-none" style={{ borderColor: COLORS.PRIMARY_PALE }}
                ></textarea>
                <span className="absolute bottom-4 right-4 text-gray-400 text-xl">✎</span>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <div className="text-center pt-2">
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={formStatus.loading}
                    className="disabled:opacity-60 text-white px-10 py-4 rounded-lg font-bold text-base transition shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
                    style={{ backgroundColor: COLORS.PRIMARY }}
                  >
                    {formStatus.loading ? 'Sending…' : 'Send Message ✉'}
                  </button>
                  {formStatus.success && (
                    <div className="text-sm text-green-600">
                      Thank you for your message! We'll get back to you soon.
                    </div>
                  )}
                  {formStatus.error && (
                    <div className="text-sm text-red-600">
                      {formStatus.error}
                    </div>
                  )}
                  {Object.keys(errors).length > 0 && (
                    <div className="text-sm text-red-600 text-left mt-2">
                      Please fill in all required fields correctly.
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900">
              Get in <span style={{ color: COLORS.PRIMARY }}>Touch</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300 border-2 group" style={{ borderColor: COLORS.PRIMARY_PALE }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 transition duration-300" style={{ backgroundColor: COLORS.PRIMARY_PALE }}>
                <svg className="w-8 h-8 transition duration-300" style={{ color: COLORS.PRIMARY }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-3 text-lg">Address</h4>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">7 B, Mysore Road, Rashbehari Avenue,<br />Kolkata - 700026</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=7+B+Mysore+Road+Rashbehari+Avenue+Kolkata+700026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold transition" style={{ color: COLORS.PRIMARY }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                Open in Google Maps
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300 border-2 group" style={{ borderColor: COLORS.PRIMARY_PALE }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 transition duration-300" style={{ backgroundColor: COLORS.PRIMARY_PALE }}>
                <svg className="w-8 h-8 transition duration-300" style={{ color: COLORS.PRIMARY }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-3 text-lg">Email</h4>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">info@sabrihelpage.org</p>
              <a href="mailto:info@sabrihelpage.org" className="inline-flex items-center text-sm font-semibold transition" style={{ color: COLORS.PRIMARY }}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                Send Email
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300 border-2 group" style={{ borderColor: COLORS.PRIMARY_PALE }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 transition duration-300" style={{ backgroundColor: COLORS.PRIMARY_PALE }}>
                <svg className="w-8 h-8 transition duration-300" style={{ color: COLORS.PRIMARY }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.048 1.024a11.042 11.042 0 010 1.986l-2.048 1.024a1 1 0 00-.502.756l-1.498 4.493a1 1 0 00-.948.684H5a2 2 0 01-2-2V5z" /></svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-3 text-lg">Mobile</h4>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">+91 9874021457</p>
              <a href="tel:+919874021457" className="inline-flex items-center text-sm font-semibold transition" style={{ color: COLORS.PRIMARY }}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.048 1.024a11.042 11.042 0 010 1.986l-2.048 1.024a1 1 0 00-.502.756l-1.498 4.493a1 1 0 00-.948.684H5a2 2 0 01-2-2V5z" /></svg>
                Call Now
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300 border-2 group" style={{ borderColor: COLORS.PRIMARY_PALE }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 transition duration-300" style={{ backgroundColor: COLORS.PRIMARY_PALE }}>
                <svg className="w-8 h-8 transition duration-300" style={{ color: COLORS.PRIMARY }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.048 1.024a11.042 11.042 0 010 1.986l-2.048 1.024a1 1 0 00-.502.756l-1.498 4.493a1 1 0 00-.948.684H5a2 2 0 01-2-2V5z" /></svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-3 text-lg">Telephone</h4>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">033 4601 3886</p>
              <a href="tel:03346013886" className="inline-flex items-center text-sm font-semibold transition" style={{ color: COLORS.PRIMARY }}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.048 1.024a11.042 11.042 0 010 1.986l-2.048 1.024a1 1 0 00-.502.756l-1.498 4.493a1 1 0 00-.948.684H5a2 2 0 01-2-2V5z" /></svg>
                Call Now
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default ContactPage;
