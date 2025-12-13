// src/components/Footer.jsx
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ChevronRight } from 'lucide-react';
import { COLORS } from '../constants/config';

const { ACCENT_ORANGE, PRIMARY_DARK } = COLORS;

const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-2xl font-bold mb-4">SabriHelpAge</h3>
                    <p className="text-gray-400 mb-4">
                        Serving society with compassion and dedication for over a decade.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>
                
                <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
                        <li><a href="#about" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
                        <li><a href="#causes" className="text-gray-400 hover:text-white transition duration-300">Our Causes</a></li>
                        <li><a href="#sociofare" className="text-gray-400 hover:text-white transition duration-300">The SocioFare</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li>7B, Mysore Road, Kolkata</li>
                        <li>033-4601 3886</li>
                        <li>info@sabrihelpage.org</li>
                    </ul>
                </div>
                
                {/* Removed the empty div from the original code */}
                <div className="md:col-span-1">
                    <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
                    <p className="text-gray-400 mb-4">Get the latest updates in your inbox.</p>
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="p-3 rounded-l-lg text-gray-900 focus:outline-none w-full"
                        />
                        <button
                            type="submit"
                            className="p-3 rounded-r-lg font-bold transition duration-300"
                            style={{ backgroundColor: ACCENT_ORANGE }}
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                    </form>
                </div>
                
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-700 text-center">
                <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} SabriHelpAge. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;