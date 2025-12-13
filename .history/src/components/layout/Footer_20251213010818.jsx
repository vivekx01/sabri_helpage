import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ChevronRight } from 'lucide-react';
import { COLORS } from '../../constants/config';

const { ACCENT_ORANGE, PRIMARY_DARK } = COLORS;

const Footer = ({ onNavigate }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email submitted:', email);
        // Add your subscription logic here
        setEmail('');
    };

    return (
        <footer className="text-white pt-12 pb-8" style={{ backgroundColor: ACCENT_ORANGE }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 mb-12">
                    {/* Quick Links Section */}
                    <div className="flex-1 min-w-[220px]">
                        <h4 className="text-xl font-bold mb-6 pb-2 border-b-2 border-white inline-block">Quick Links</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 mt-6">
                            {/* Column 1 */}
                            <ul className="space-y-3">
                                <li><button onClick={() => onNavigate('internship')} className="text-white hover:text-gray-200 transition duration-200 text-left w-full flex items-center">› Internship</button></li>
                                <li><button onClick={() => onNavigate('ilc')} className="text-white hover:text-gray-200 transition duration-200 text-left w-full flex items-center">› Club Membership (SSIC)</button></li>
                                <li><button onClick={() => onNavigate('donate')} className="text-white hover:text-gray-200 transition duration-200 text-left w-full flex items-center">› Support a Cause</button></li>
                                <li><button onClick={() => onNavigate('mental-health')} className="text-white hover:text-gray-200 transition duration-200 text-left w-full flex items-center">› Mental Health Awareness</button></li>
                                <li><button onClick={() => onNavigate('events')} className="text-white hover:text-gray-200 transition duration-200 text-left w-full flex items-center">› Upcoming Events</button></li>
                                <li><button onClick={() => onNavigate('contact')} className="text-white hover:text-gray-200 transition duration-200 text-left w-full flex items-center">› Contact Us</button></li>
                            </ul>
                            {/* Column 2 */}
                            <ul className="space-y-3">
                                <li><button onClick={() => onNavigate('internship')} className="text-white hover:text-gray-200 transition duration-200 text-left w-full flex items-center">› Volunteer</button></li>
                                <li><button onClick={() => onNavigate('awards')} className="text-white hover:text-gray-200 transition duration-200 text-left w-full flex items-center">› Award Nomination</button></li>
                                <li><button onClick={() => onNavigate('elderly-care')} className="text-white hover:text-gray-200 transition duration-200 text-left w-full flex items-center">› Elderly Care</button></li>
                                <li><button onClick={() => onNavigate('girl-education')} className="text-white hover:text-gray-200 transition duration-200 text-left w-full flex items-center">› Girl Child</button></li>
                                <li><button onClick={() => onNavigate('publications')} className="text-white hover:text-gray-200 transition duration-200 text-left w-full flex items-center">› Media & Publications</button></li>
                                <li><button onClick={() => onNavigate('gallery')} className="text-white hover:text-gray-200 transition duration-200 text-left w-full flex items-center">› Gallery</button></li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="lg:w-96 w-full mt-10 lg:mt-0 ml-auto">
                        <div className="flex flex-col">
                            <h3 className="text-2xl font-bold pb-2 border-b-2 border-white w-full text-left mb-4">SabriHelpage</h3>
                            <p className="text-white mb-6 leading-relaxed">
                                Dedicated to serving humanity through comprehensive welfare programs for the elderly, women, and children.
                            </p>
                            <h4 className="text-xl font-bold pb-2 border-b-2 border-white w-full text-left">Stay Updated</h4>
                        </div>
                        <p className="text-white mb-4 text-sm">Subscribe to our newsletter for the latest impact stories.</p>
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 px-4 py-3 bg-white text-gray-800 rounded-lg focus:outline-none placeholder-gray-500"
                                required
                            />
                            <button
                                type="submit"
                                className="px-4 py-3 bg-white text-primary rounded-lg transition duration-300 hover:bg-gray-100 flex items-center justify-center"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
                
                {/* Bottom Section */}
                <div className="pt-6 border-t border-white border-opacity-30">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Social Media Icons */}
                        <div className="flex space-x-4 order-1 md:order-1">
                            <a href="#" className="text-white hover:text-gray-200 transition duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                            <a href="#" className="text-white hover:text-gray-200 transition duration-300">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-white hover:text-gray-200 transition duration-300">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-white hover:text-gray-200 transition duration-300">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-white hover:text-gray-200 transition duration-300">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                        
                        {/* Copyright */}
                        <div className="text-center order-2 md:order-2">
                            <p className="text-white text-sm"> {new Date().getFullYear()} Sabri Helpage. All rights reserved.</p>
                        </div>
                        
                        {/* Legal Links - Moved right but slightly inwards */}
                        <div className="flex flex-wrap justify-end gap-6 order-3 pr-4">
                            <button onClick={() => onNavigate('about')} className="text-white hover:text-gray-200 transition duration-300 text-sm font-medium">About Us</button>
                            <button onClick={() => onNavigate('terms')} className="text-white hover:text-gray-200 transition duration-300 text-sm font-medium">Terms of Service</button>
                            <button onClick={() => onNavigate('privacy')} className="text-white hover:text-gray-200 transition duration-300 text-sm font-medium">Privacy Policy</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;