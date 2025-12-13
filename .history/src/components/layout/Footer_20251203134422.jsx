import React from 'react';
import { ChevronRight } from 'lucide-react';
import { SOCIAL_LINKS, COLORS } from '../../constants/config';

const Footer = ({ onNavigate }) => {
  const footerLinks = {
    quickLinks: [
      { name: 'Internship', page: 'internship' },
      { name: 'Volunteer', page: 'volunteer' },
      { name: 'Club Membership (SSIC)', page: 'clubs' },
      { name: 'Award Nomination', page: 'awards' },
      { name: 'Support a Cause → Donate', page: 'donate' },
      { name: 'Elderly Care', page: 'elderly-care' },
      { name: 'Mental Health Awareness', page: 'mental-health' },
      { name: 'Girl Child', page: 'girl-education' },
      { name: 'Upcoming Events', page: 'events' },
      { name: 'Media & Publications', page: 'publications' },
    ],
  };

  return (
    <footer className="pt-12 pb-6" style={{ backgroundColor: COLORS.PRIMARY }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Left: Quick Links takes more space (spans 2 cols) */}
          <div className="md:col-span-2">
            <h4 className="text-xl font-bold mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 rounded-full" style={{ backgroundColor: '#fff' }}></span>
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {footerLinks.quickLinks.map(link => (
                <button
                  key={link.name}
                  onClick={() => onNavigate(link.page)}
                  className="text-white hover:translate-x-1 transition-all duration-200 text-sm flex items-center text-left leading-tight"
                >
                  <ChevronRight className="w-3 h-3 mr-1" style={{ color: '#fff' }} /> {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Sabri Helpage brand + Stay Updated below (less space, align right) */}
          <div className="md:col-span-1 md:justify-self-end w-full max-w-sm">
            <button
              onClick={() => onNavigate('home')}
              className="flex flex-col items-start mb-4"
            >
              <span className="text-3xl font-extrabold leading-none" style={{ color: '#fff', fontFamily: 'cursive' }}>
                SabriHelpAge
              </span>
              <div className="w-24 h-1 bg-white/20 mt-2" />
            </button>
            <p className="text-white text-sm leading-relaxed mb-6 max-w-xs">
              Dedicated to serving humanity through comprehensive welfare programs for the elderly, women, and children.
            </p>
            <div>
              <h4 className="text-xl font-bold mb-4 relative inline-block">
                Stay Updated
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 rounded-full" style={{ backgroundColor: '#fff' }}></span>
              </h4>
              <p className="text-white text-sm mb-3">Subscribe to our newsletter for the latest impact stories.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg_white/10 border border-white/20 text-white px-3 py-2 rounded-l-lg w-full focus:outline-none focus:border-orange-500"
                />
                <button className="text-white px-3 py-2 rounded-r-lg font-bold transition" style={{ backgroundColor: '#fff', color: COLORS.PRIMARY }}>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
          <div className="flex-1 flex items-center md:items-start md:justify-start justify-center">
            <div className="flex space-x-2">
              {SOCIAL_LINKS.map(({ Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="bg-white/10 p-2 rounded-full transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#fff' }} />
                </a>
              ))}
            </div>
          </div>
          <div className="flex-1 text-center text-xs text-white">
            © 2025 Sabri Helpage. All rights reserved.
          </div>
          <div className="flex-1 flex md:justify-end justify-center space-x-4 text-xs text-white">
            <button onClick={() => onNavigate('terms')} className="transition">Terms & Privacy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
