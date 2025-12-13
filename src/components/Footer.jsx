import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { COLORS } from '../constants/config';

const { PRIMARY, PRIMARY_DARK } = COLORS;

const Footer = () => {
    const [email, setEmail] = useState('');
    const [activeTab, setActiveTab] = useState('quick-links');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email submitted:', email);
        setEmail('');
    };

    const toggleTab = (tab) => {
        setActiveTab(activeTab === tab ? null : tab);
    };

    return (
        <footer className="text-white pt-12 pb-6" style={{ backgroundColor: PRIMARY }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Mobile Tabs */}
                <div className="lg:hidden flex justify-between border-b border-white/30 mb-6">
                    <button 
                        onClick={() => toggleTab('quick-links')}
                        className={`py-3 px-4 font-medium ${activeTab === 'quick-links' ? 'border-b-2 border-white' : ''}`}
                    >
                        Quick Links
                    </button>
                    <button 
                        onClick={() => toggleTab('contact')}
                        className={`py-3 px-4 font-medium ${activeTab === 'contact' ? 'border-b-2 border-white' : ''}`}
                    >
                        Contact
                    </button>
                </div>

                {/* Main Footer Content */}
                <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
                    {/* Quick Links Section */}
                    <div className={`${activeTab === 'quick-links' || !activeTab ? 'block' : 'hidden'} lg:block flex-1`}>
                        <h4 className="text-xl font-bold mb-6">Quick Links</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-4 mt-6">
                            <ul className="space-y-3">
                                <li><a href="/about" className="flex items-center text-white hover:text-gray-200 transition duration-200">About</a></li>
                                <li><a href="/contact" className="flex items-center text-white hover:text-gray-200 transition duration-200">Contact Us</a></li>
                                <li><a href="/gallery" className="flex items-center text-white hover:text-gray-200 transition duration-200">Gallery</a></li>
                            </ul>
                            <ul className="space-y-3">
                                <li><a href="/terms" className="flex items-center text-white hover:text-gray-200 transition duration-200">Terms</a></li>
                                <li><a href="/privacy" className="flex items-center text-white hover:text-gray-200 transition duration-200">Privacy Policy</a></li>
                                <li><a href="/support" className="flex items-center text-white hover:text-gray-200 transition duration-200">Support a Cause</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Contact & Newsletter Section */}
                    <div className={`${activeTab === 'contact' || !activeTab ? 'block' : 'hidden'} lg:block lg:w-96`}>
                        <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex items-start">
                                <MapPin className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                                <p>123 Helping Street, Community Area, City - 123456, India</p>
                            </div>
                            <div className="flex items-center">
                                <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                                <a href="mailto:contact@sabrihelpage.org" className="hover:underline">contact@sabrihelpage.org</a>
                            </div>
                            <div className="flex items-center">
                                <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                                <a href="tel:+911234567890" className="hover:underline">+91 12345 67890</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-6 border-t border-white/30 mt-8 lg:mt-12">
                    {/* Centered Copyright */}
                    <div className="text-center mb-4">
                        <p className="text-white text-sm">© {new Date().getFullYear()} Sabri Helpage. All rights reserved.</p>
                    </div>
                    
                    {/* Centered Navigation Links */}
                    <div className="flex justify-center space-x-6 flex-wrap">
                        <a href="/about" className="text-white hover:text-gray-200 text-sm transition duration-300">About</a>
                        <a href="/terms" className="text-white hover:text-gray-200 text-sm transition duration-300">Terms</a>
                        <a href="/privacy" className="text-white hover:text-gray-200 text-sm transition duration-300">Privacy</a>
                    </div>
                    
                    {/* Social Media Icons */}
                    <div className="flex justify-center space-x-4 mt-4">
                        <a href="#" className="text-white hover:text-gray-200 transition duration-300" aria-label="YouTube">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </a>
                        <a href="#" className="text-white hover:text-gray-200 transition duration-300" aria-label="Instagram">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-white hover:text-gray-200 transition duration-300" aria-label="LinkedIn">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-white hover:text-gray-200 transition duration-300" aria-label="Facebook">
                            <Facebook className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
