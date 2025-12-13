'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SOCIAL_LINKS, COLORS } from '../../constants/config';

const Footer = () => {
  const router = useRouter();
  const nav = (page) => {
    const map = {
      home: '/',
      faq: '/faq',
      csr: '/csr',
      awards: '/awards',
      publications: '/publications',
      events: '/events',
      blog: '/blog',
      gallery: '/gallery',
      contact: '/contact',
      about: '/about',
      terms: '/terms',
      privacy: '/privacy'
    };
    router.push(map[page] || '/');
  };
  const footerLinks = {
    quickLinks: [
      { name: 'FAQ', page: 'faq' },
      { name: 'CSR Summit', page: 'csr' },
      { name: 'Awards', page: 'awards' },
      { name: 'Publications', page: 'publications' },
      { name: 'Events', page: 'events' },
      { name: 'Blog', page: 'blog' },
      { name: 'Gallery', page: 'gallery' },
      { name: 'Contact Us', page: 'contact' }
    ],
  };

  return (
    <footer className="pt-16 pb-6" style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <button 
              onClick={() => nav('home')} 
              className="flex flex-col items-start mb-6"
            >
              <span className="text-3xl font-extrabold leading-none" style={{ color: COLORS.LOGO_RED, fontFamily: 'cursive' }}>
                SabriHelpAge
              </span>
              <div className="w-32 h-1 bg-white/20 mt-2 mb-1" />
            </button>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Dedicated to serving humanity through comprehensive welfare programs for the elderly, women, and children.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map(({ Icon, url, label }) => (
                <a 
                  key={label}
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={label}
                  className="bg-white/10 p-2 rounded-full hover:bg-orange-500 transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-orange-500 rounded-full"></span>
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {footerLinks.quickLinks.map(link => (
                <button 
                  key={link.name}
                  onClick={() => nav(link.page)}
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm flex items-center text-left"
                >
                  <ChevronRight className="w-3 h-3 mr-1 text-orange-500" /> {link.name}
                </button> 
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 relative inline-block">
              Stay Updated
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-orange-500 rounded-full"></span>
            </h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest impact stories.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:border-orange-500"
              />
              <button className="bg-orange-500 text-white px-4 py-2 rounded-r-lg font-bold hover:bg-orange-600 transition">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-gray-500">
            © 2025 Sabri Helpage. All rights reserved.
          </div>
          <div className="flex space-x-6 text-xs text-gray-400">
             <button onClick={() => nav('about')} className="hover:text-white transition">About </button>
            <button onClick={() => nav('terms')} className="hover:text-white transition">Terms of Use</button>
            <button onClick={() => nav('privacy')} className="hover:text-white transition">Privacy Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
