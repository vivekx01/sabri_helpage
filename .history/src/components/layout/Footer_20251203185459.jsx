import React from 'react';
import { ChevronRight } from 'lucide-react';
import { SOCIAL_LINKS, COLORS } from '../../constants/config';

const Footer = ({ onNavigate }) => {
  const footerLinks = {
    categories: [
      {
        title: 'Get Involved',
        items: [
          { name: 'Internship', page: 'internship' },
          { name: 'Volunteer', page: 'volunteer' },
          { name: 'Clubs (SSIC)', page: 'clubs' },
          { name: 'Awards', page: 'awards' },
        ],
      },
      {
        title: 'Causes & Programs',
        items: [
          { name: 'Support a Cause', page: 'support' },
          { name: 'Elderly Care', page: 'elderly-care' },
          { name: 'Mental Health', page: 'mental-health' },
          { name: 'Girl Child', page: 'girl-education' },
        ],
      },
      {
        title: 'Explore',
        items: [
          { name: 'Events', page: 'events' },
          { name: 'Publications', page: 'publications' },
          { name: 'Media', page: 'media' },
          { name: 'Contact', page: 'contact' },
        ],
      },
      {
        // Removed About & Policies category as requested; About/Terms/Privacy live in bottom row
        title: null,
        items: [],
      },
    ],
  };

  return (
    <footer className="pt-12 pb-6" style={{ backgroundColor: COLORS.PRIMARY }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-0 items-start">
          {/* Left: Quick Links under categories (spans 2 cols) */}
          <div className="md:col-span-2">
            <h4 className="text-xl font-bold mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 rounded-full" style={{ backgroundColor: '#fff' }}></span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10">
              {footerLinks.categories.map((cat) => (
                <div key={cat.title} className="min-w-0">
                  <h5 className="text-sm font-medium text-white mb-4">
                    {cat.title}
                  </h5>
                  <ul className="space-y-3">
                    {cat.items.map((link) => (
                      <li key={link.name}>
                        <button
                          onClick={() => onNavigate(link.page)}
                          className="text-white/90 hover:text-white text-sm flex items-center transition-colors"
                        >
                          <ChevronRight className="w-3 h-3 mr-2 opacity-80" />
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sabri Helpage brand + Stay Updated aligned further right */}
          <div className="md:col-span-1 md:justify-self-end w-full max-w-sm md:pl-16 lg:pl-24 xl:pl-32 pr-2 md:pr-4">
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
              <div className="flex mb-4">
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

        <div className="border-t border-white/10 pt-0 flex flex-col md:flex-row justify-between items-center md:items-center gap-4 px-2 md:px-4">
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
          <div className="flex-1 flex md:justify-end justify-center space-x-6 text-sm md:text-base text-white font-semibold pr-6 md:pr-12 lg:pr-16">
            <button onClick={() => onNavigate('about')} className="transition hover:text-gray-200">About</button>
            <button onClick={() => onNavigate('terms')} className="transition hover:text-gray-200">Terms</button>
            <button onClick={() => onNavigate('privacy')} className="transition hover:text-gray-200">Privacy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
