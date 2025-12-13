import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-[#F5F0E8] min-h-screen pb-20">
      <div className="pt-10 pb-6 text-center">
        <h1 className="text-4xl font-serif font-bold text-gray-900">Contact <span className="text-[#C75C2E]">Us</span></h1>
      </div>

      <div className="bg-[] py-12 relative overflow-hidden mb-16">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Do you have a Query?</h2>
        </div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[#F5F0E8] opacity-30 hidden md:block">
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
                className="w-full p-4 border-2 border-[#E5DED0] rounded-lg focus:outline-none focus:border-[#C75C2E] text-sm bg-[#FDFCFA] transition"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email *"
                className="w-full p-4 border-2 border-[#E5DED0] rounded-lg focus:outline-none focus:border-[#C75C2E] text-sm bg-[#FDFCFA] transition"
              />
            </div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full p-4 border-2 border-[#E5DED0] rounded-lg focus:outline-none focus:border-[#C75C2E] text-sm bg-[#FDFCFA] transition"
            />
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message *"
                rows="5"
                className="w-full p-4 border-2 border-[#E5DED0] rounded-lg focus:outline-none focus:border-[#C75C2E] text-sm bg-[#FDFCFA] transition resize-none"
              ></textarea>
              <span className="absolute bottom-4 right-4 text-gray-400 text-xl">✎</span>
            </div>
            <div className="text-center pt-2">
              <button
                onClick={handleSubmit}
                className="bg-[#C75C2E] text-white px-10 py-4 rounded-lg font-bold text-base hover:bg-[#A84920] transition shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
              >
                Send Message ✉
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-10">Get in <span className="text-[#C75C2E]">Touch</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300 border-2 border-[#F5F0E8] group">
            <div className="bg-[#FFF5F0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-[#C75C2E] transition duration-300">
              <MapPin className="w-8 h-8 text-[#C75C2E] group-hover:text-white transition duration-300" />
            </div>
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Address</h4>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">7 B, Mysore Road, Rashbehari Avenue,<br />Kolkata - 700026</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=7+B+Mysore+Road+Rashbehari+Avenue+Kolkata+700026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-[#C75C2E] font-semibold hover:text-[#A84920] transition"
            >
              <Globe className="w-4 h-4 mr-2" /> Open in Google Maps
            </a>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300 border-2 border-[#F5F0E8] group">
            <div className="bg-[#FFF5F0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-[#C75C2E] transition duration-300">
              <Mail className="w-8 h-8 text-[#C75C2E] group-hover:text-white transition duration-300" />
            </div>
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Email</h4>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">info@sabrihelpage.org</p>
            <a href="mailto:info@sabrihelpage.org" className="inline-flex items-center text-sm text-[#C75C2E] font-semibold hover:text-[#A84920] transition">
              <ArrowRight className="w-4 h-4 mr-2" /> Send Email
            </a>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300 border-2 border-[#F5F0E8] group">
            <div className="bg-[#FFF5F0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-[#C75C2E] transition duration-300">
              <Phone className="w-8 h-8 text-[#C75C2E] group-hover:text-white transition duration-300" />
            </div>
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Mobile</h4>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">+91 9874021457</p>
            <a href="tel:+919874021457" className="inline-flex items-center text-sm text-[#C75C2E] font-semibold hover:text-[#A84920] transition">
              <Phone className="w-4 h-4 mr-2" /> Call Now
            </a>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300 border-2 border-[#F5F0E8] group">
            <div className="bg-[#FFF5F0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-[#C75C2E] transition duration-300">
              <Phone className="w-8 h-8 text-[#C75C2E] group-hover:text-white transition duration-300" />
            </div>
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Telephone</h4>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">033 4601 3886</p>
            <a href="tel:03346013886" className="inline-flex items-center text-sm text-[#C75C2E] font-semibold hover:text-[#A84920] transition">
              <Phone className="w-4 h-4 mr-2" /> Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
