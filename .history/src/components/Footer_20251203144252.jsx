import React from 'react';
import { ChevronRight, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { COLORS } from '../constants/config';

const ACCENT_ORANGE = COLORS.PRIMARY || '#eb4c28';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Quick Links Section - fills remaining space */}
                    <div className="lg:col-span-10 min-h-full">
                        <h4 className="text-lg font-semibold mb-8">Quick Links</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-12 gap-y-10">
                            <ul className="space-y-4">
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Search a Doctor</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Search a Clinic</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Insurance & Pricing</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">FAQs</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Contact</a></li>
                            </ul>
                            <ul className="space-y-4">
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Survey</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Course</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Self Understanding</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Campus</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Workplace</a></li>
                            </ul>
                            <ul className="space-y-4">
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Disorder</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Therapy</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Psychoactive Drugs</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Franchise</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Jobs</a></li>
                            </ul>
                            <ul className="space-y-4">
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Career</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Feedback</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Events</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Videos</a></li>
                            </ul>
                            <ul className="space-y-4">
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">About Us</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Terms</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Privacy</a></li>
                                <li><a href="#" className="block w-full px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition duration-300">Support</a></li>
                            </ul>
                        </div>
                    </div>
                
                {/* Newsletter Section */}
                  <div className="lg:col-span-2 lg:max-w-xs lg:ml-auto w-full">
                    <h3 className="text-xl font-bold mb-2">ShareYrHeart</h3>
                    <p className="text-xs text-gray-400 mb-6 uppercase tracking-wider">Mental Health at Any Age</p>
                    <div className="h-px bg-gray-700 mb-6"></div>
                    <h4 className="text-base font-semibold mb-4">Subscribe to our newsletter!</h4>
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="flex-1 px-4 py-3 bg-gray-800 text-white text-sm rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-3 rounded-r-lg transition duration-300"
                            style={{ backgroundColor: ACCENT_ORANGE }}
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </form>
                </div>
            </div>
            
            {/* Bottom Section */}
            <div className="mt-12 pt-8 border-t border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Social Media Icons */}
                    <div className="flex space-x-4 mb-4 md:mb-0">
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <Instagram className="w-5 h-5" />
                        </a>
                    </div>
                    
                    {/* Copyright */}
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <p className="text-sm text-gray-400">© {new Date().getFullYear()} Preash H & H | All Rights Reserved</p>
                    </div>
                    
                    {/* Footer Links */}
                    <div className="flex space-x-6">
                        <a href="#" className="text-white hover:text-gray-300 transition duration-300">About</a>
                        <a href="#" className="text-white hover:text-gray-300 transition duration-300">Terms</a>
                        <a href="#" className="text-white hover:text-gray-300 transition duration-300">Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;