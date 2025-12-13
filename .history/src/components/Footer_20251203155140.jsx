import React from 'react';
import { COLORS } from '../constants/config';

// --- ICONS ---
const ChevronRight = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const Linkedin = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const Twitter = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const Facebook = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const Instagram = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YouTube = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
);

// Fallback color if config fails
const ACCENT_ORANGE = COLORS?.PRIMARY || '#eb4c28';

const Footer = () => {
    // Styling constants
    const linkClass = "block text-sm text-gray-300 hover:text-white transition duration-300 hover:translate-x-1";
    const titleClass = "text-3xl font-bold font-serif text-white tracking-wide"; // Serif font for main titles
    const yellowButtonColor = "#FFD700"; // Specific yellow from the image

    // Updated data structure based on the image's 5 columns
    const quickLinks = [
        ["Search a Doctor", "Search a Clinic", "Insurance & Pricing", "FAQs", "Contact"],
        ["Survey", "Course", "Self Understanding", "Campus", "Workplace"],
        ["Disorder", "Therapy", "Psychoactive Drugs", "Franchise", "Jobs"],
        ["Career", "Feedback", "Events", "Videos"],
        ["About Us", "Terms", "Privacy", "Support"], // Terms and Privacy separated here in the list
    ];

    return (
        <footer className="bg-[#0f111a] text-white pt-16 pb-8 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Top Grid Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                
                    {/* Left Side: Quick Links (approx 75% width / 9 cols) */}
                    <div className="lg:col-span-9">
                        <div className="flex flex-col items-center lg:items-center mb-8">
                            {/* Centered Title for the links section */}
                            <h4 className={titleClass + " border-b-2 border-gray-700 pb-2 mb-8"}>Quick Links</h4>
                        </div>
                        
                        {/* 5 Column Grid for Links */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-8 gap-x-4">
                            {quickLinks.map((column, colIndex) => (
                                <ul key={colIndex} className="space-y-4">
                                    {column.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a href="#" className={linkClass}>
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>
                
                    {/* Right Side: Newsletter (approx 25% width / 3 cols) */}
                    <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left pt-2 lg:pt-0">
                        <h3 className={titleClass + " mb-3"}>ShareYrHeart</h3>
                        
                        {/* Pill Shape Badge */}
                        <div className="border border-gray-500 rounded-full px-4 py-1.5 mb-6">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-300 font-semibold">
                                Mental Health at Any Age
                            </span>
                        </div>
                        
                        {/* Wave Graphic / Divider */}
                        <div className="w-full max-w-[200px] lg:max-w-full mb-6 opacity-50">
                             <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-3 stroke-gray-500 fill-none">
                                <path d="M0 5 Q 12.5 0, 25 5 T 50 5 T 75 5 T 100 5" strokeWidth="1" />
                             </svg>
                        </div>
                        
                        <h4 className="text-lg font-serif mb-4 text-white">Subscribe to our newsletter!</h4>
                        
                        {/* Newsletter Input */}
                        <form className="relative w-full max-w-xs">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full px-5 py-3 rounded-full bg-[#1a1d29] border border-gray-700 text-sm text-gray-300 focus:outline-none focus:border-orange-500 pr-12"
                            />
                            <button
                                type="submit"
                                className="absolute right-1 top-1 bottom-1 w-10 h-10 rounded-full flex items-center justify-center transition hover:opacity-90"
                                style={{ backgroundColor: yellowButtonColor }}
                            >
                                <ChevronRight className="w-5 h-5 text-gray-900" />
                            </button>
                        </form>
                    </div>
                </div>
            
                {/* Bottom Section */}
                <div className="mt-16 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                        
                        {/* Left: Social Icons */}
                        <div className="flex items-center space-x-6 order-2 md:order-1">
                            <a href="#" className="text-white hover:text-gray-400 transition"><YouTube className="w-5 h-5" /></a>
                            <a href="#" className="text-white hover:text-gray-400 transition"><Linkedin className="w-5 h-5" /></a>
                            <a href="#" className="text-white hover:text-gray-400 transition"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-white hover:text-gray-400 transition"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-white hover:text-gray-400 transition"><Instagram className="w-5 h-5" /></a>
                        </div>
                        
                        {/* Center: Copyright */}
                        <div className="text-center order-1 md:order-2">
                            <p className="text-sm text-gray-400 font-serif">
                                © {new Date().getFullYear()} Presah H & H | All Rights Reserved
                            </p>
                        </div>
                        
                        {/* Right: Footer Links (Explicitly Separated) */}
                        <div className="flex items-center space-x-8 order-3 text-sm text-white font-serif">
                            <a href="#" className="hover:text-gray-300 transition">About</a>
                            <a href="#" className="hover:text-gray-300 transition">Terms</a>
                            <a href="#" className="hover:text-gray-300 transition">Privacy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;