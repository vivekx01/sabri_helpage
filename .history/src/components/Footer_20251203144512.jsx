import React from 'react';
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
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                        </button>
                    </form>
                </div>
            </div>
            
            {/* Bottom Section */}
            <div className="mt-12 pt-8 border-t border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Social Media Icons */}
                        <div className="flex space-x-4 mb-4 md:mb-0">
                            <a href="#" className="text-gray-400 hover:text-white transition duration-300" aria-label="YouTube">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition duration-300" aria-label="LinkedIn">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8.98h5v15H0v-15zM8.98 8.98h4.78v2.05h.07c.66-1.25 2.27-2.57 4.67-2.57 5 0 5.92 3.29 5.92 7.57v8.95h-5v-7.93c0-1.89-.03-4.32-2.64-4.32-2.64 0-3.05 2.06-3.05 4.18v8.07h-5v-15z"/></svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition duration-300" aria-label="Twitter">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23.953 4.57a10 10 0 0 1-2.825.775 4.932 4.932 0 0 0 2.163-2.723 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.379 4.482A13.949 13.949 0 0 1 1.671 3.149a4.822 4.822 0 0 0-.666 2.475 4.916 4.916 0 0 0 2.188 4.096 4.903 4.903 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.93 4.93 0 0 0 4.604 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.211c9.057 0 14.009-7.513 14.009-14.01 0-.213-.005-.425-.014-.636a10.025 10.025 0 0 0 2.41-2.538z"/></svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition duration-300" aria-label="Facebook">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.324v21.351C0 23.406.595 24 1.325 24h11.495V14.706H9.691v-3.62h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.098 2.795.142v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.62h-3.12V24h6.116C23.406 24 24 23.406 24 22.675V1.324C24 .592 23.406 0 22.675 0z"/></svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition duration-300" aria-label="Instagram">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.263 2.242 1.325 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.242 1.263-3.608 1.325-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.325-3.608.975-.975 2.242-1.263 3.608-1.325C8.416 2.175 8.796 2.163 12 2.163zm0 1.837c-3.17 0-3.548.012-4.796.07-1.032.047-1.595.22-1.966.37-.495.192-.848.423-1.222.796-.373.374-.604.727-.796 1.222-.15.371-.323.934-.37 1.966-.058 1.248-.07 1.626-.07 4.796s.012 3.548.07 4.796c.047 1.032.22 1.595.37 1.966.192.495.423.848.796 1.222.374.373.727.604 1.222.796.371.15.934.323 1.966.37 1.248.058 1.626.07 4.796.07s3.548-.012 4.796-.07c1.032-.047 1.595-.22 1.966-.37.495-.192.848-.423 1.222-.796.373-.374.604-.727.796-1.222.15-.371.323-.934.37-1.966.058-1.248.07-1.626.07-4.796s-.012-3.548-.07-4.796c-.047-1.032-.22-1.595-.37-1.966-.192-.495-.423-.848-1.222-.796-.371-.15-.934-.323-1.966-.37-1.248-.058-1.626-.07-4.796-.07zm0 3.24a6.597 6.597 0 1 1 0 13.194 6.597 6.597 0 0 1 0-13.194zm0 10.9a4.303 4.303 0 1 0 0-8.606 4.303 4.303 0 0 0 0 8.606zm6.406-10.9a1.54 1.54 0 1 1 0-3.081 1.54 1.54 0 0 1 0 3.081z"/></svg>
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