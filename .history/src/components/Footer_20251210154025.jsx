import React from 'react';
import { COLORS } from '../constants/config';

// Assuming you have these icons imported or define them
const ChevronRight = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
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

const ACCENT_ORANGE = COLORS.PRIMARY || '#eb4c28';

const Footer = () => {
    // Class for individual quick links (increased padding and rounded-xl for better visual separation)
    const linkClass = "block w-full h-full px-6 py-4 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition duration-300 transform hover:scale-[1.01]";
    
    // Class for list items (increased vertical space)
    const ulClass = "space-y-6";

    // Data structure for the quick links
    const quickLinks = [
        ["Internship", "Volunteer", "Clubs (SSIC)", "Awards"],
        ["Support a Cause", "Elderly Care", "Mental Health", "Girl Child"],
        ["Events", "Publications", "Gallery", "Contact"],
        ["About Us", "Terms", "Privacy", "Support"],
    ];

    return (
        <footer className="bg-gray-900 text-white pt-10 pb-6 font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Quick Links Section - Takes 9/12 (75%) of the space */}
                <div className="lg:col-span-9">
                    <h4 className="text-xl font-bold mb-6 text-gray-100 border-b border-orange-600/30 pb-2 inline-block">Quick Links</h4>
                    
                    {/* Inner Grid for Quick Links: Using lg:grid-cols-5 to match the 5 lists and spread them evenly */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-14 gap-y-14 items-stretch">
                        {quickLinks.map((column, colIndex) => (
                            <ul key={colIndex} className={ulClass}>
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
                
                {/* Newsletter Section - Takes 3/12 (25%) of the space */}
                <div className="lg:col-span-3">
                    <h3 className="text-2xl font-extrabold mb-1 tracking-tight">ShareYrHeart</h3>
                    <p className="text-xs text-orange-400 mb-6 uppercase tracking-widest font-semibold">Mental Health at Any Age</p>
                    
                    <div className="h-px bg-gray-700 mb-6"></div>
                    
                    <h4 className="text-base font-semibold mb-3 text-gray-200">Subscribe to our newsletter!</h4>
                    <form className="flex shadow-lg rounded-lg overflow-hidden">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="flex-1 px-4 py-3 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-3 transition duration-300 hover:opacity-90 flex items-center justify-center"
                            style={{ backgroundColor: ACCENT_ORANGE }}
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </form>

                    <p className='text-xs text-gray-500 mt-4'>*We respect your privacy and will never share your email.</p>
                </div>
            </div>
            
            {/* Bottom Section */}
            <div className="mt-12 pt-6 border-t border-gray-800 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    
                    {/* Gallery Link */}
                    <div className="order-2 md:order-1">
                        <a href="#" className="text-gray-400 hover:text-orange-400 transition duration-300 font-semibold text-lg">Gallery</a>
                    </div>
                    
                    {/* Copyright */}
                    <div className="text-center order-1 md:order-2">
                        <p className="text-sm text-gray-400">© {new Date().getFullYear()} Presah H & H | All Rights Reserved</p>
                    </div>
                    
                    {/* Footer Links (About, Terms, Privacy side by side at bottom-right) */}
                    <div className="order-3 w-full md:w-auto flex md:justify-end justify-end">
                        <div className="flex flex-row items-center space-x-6">
                            <a href="#" className="text-gray-300 hover:text-orange-400 text-sm transition duration-300">About</a>
                            <a href="#" className="text-gray-300 hover:text-orange-400 text-sm transition duration-300">Terms</a>
                            <a href="#" className="text-gray-300 hover:text-orange-400 text-sm transition duration-300">Privacy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;