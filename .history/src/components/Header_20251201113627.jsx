// src/components/Header.jsx
import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { PRIMARY_DARK, ACCENT_ORANGE, LOGO_RED, NAV_ITEMS } from '../constants/config';

const Header = ({ onDonateClick, onReadMoreClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-[0.45rem] md:py-[0.675rem]">
                    
                    {/* Logo */}
                    <a href="#" className="flex flex-col items-start space-y-0" aria-label="Sabri Helpage Home">
                        <span 
                            className="text-[2.06rem] font-handwriting tracking-tight font-extrabold leading-none"
                            style={{ color: LOGO_RED, fontFamily: 'cursive' }}
                        >
                            SabriHelpAge
                        </span>
                        <div className="w-full h-px" style={{ backgroundColor: PRIMARY_DARK }}></div> 
                        <span 
                            className="text-[0.6rem] italic font-semibold pt-1"
                            style={{ color: PRIMARY_DARK }}
                        >
                            sarve bhavantu sukhinah
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex flex-1 items-center justify-end space-x-6">
                        <nav className="flex space-x-6 text-sm font-semibold items-center">
                            {NAV_ITEMS.map(item => (
                                <a 
                                    key={item.name} 
                                    href={item.href} 
                                    className={`text-gray-700 hover:text-gray-900 transition duration-200 py-2 
                                        ${item.isActive 
                                            ? `relative font-bold text-gray-900 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:rounded-full` 
                                            : ''}`}
                                    style={item.isActive ? { '--tw-after-bg': ACCENT_ORANGE, backgroundColor: 'transparent' } : {}}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>

                        {/* Search Input */}
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Search here..."
                                className={`pl-4 pr-10 py-2 w-40 border border-gray-200 rounded-full focus:outline-none focus:ring-2 transition duration-200 text-sm shadow-inner text-gray-900`}
                                style={{ '--tw-ring-color': ACCENT_ORANGE }}
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
                        </div>
                        
                        {/* Read More Button */}
                        <button 
                            onClick={onReadMoreClick}
                            className={`text-white px-6 py-2.5 rounded-full font-bold transition duration-300 shadow-md text-sm`}
                            style={{ backgroundColor: ACCENT_ORANGE }}
                        >
                            Read More
                        </button>

                        {/* Donate Now Button */}
                        <button 
                            onClick={onDonateClick}
                            className={`text-white px-6 py-2.5 rounded-full font-bold transition duration-300 shadow-md text-sm`}
                            style={{ backgroundColor: PRIMARY_DARK }}
                        >
                            Donate Now
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button className={`lg:hidden p-2 text-gray-900`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-white z-40 overflow-y-auto pt-20">
                    <nav className="flex flex-col space-y-1 p-4 text-sm font-medium">
                        {NAV_ITEMS.map(item => (
                            <a 
                                key={item.name} 
                                href={item.href} 
                                onClick={() => setIsMenuOpen(false)}
                                className="py-3 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition text-base"
                            >
                                {item.name}
                            </a>
                        ))}
                        <button 
                            onClick={() => { onReadMoreClick(); setIsMenuOpen(false); }}
                            className={`text-center text-white mt-4 px-4 py-3 rounded-full font-bold transition duration-300 shadow-md`}
                            style={{ backgroundColor: ACCENT_ORANGE }}
                        >
                            Read More
                        </button>
                        <button 
                            onClick={() => { onDonateClick(); setIsMenuOpen(false); }}
                            className={`text-center text-white mt-4 px-4 py-3 rounded-full font-bold transition duration-300 shadow-md`}
                            style={{ backgroundColor: PRIMARY_DARK }}
                        >
                            Donate Now
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;