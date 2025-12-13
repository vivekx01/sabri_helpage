import React from 'react';

// --- Standalone Icons to prevent import errors ---
const IconChevronRight = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
);
const IconYoutube = () => (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>);
const IconLinkedin = () => (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.063 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);
const IconTwitter = () => (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>); // X Logo
const IconFacebook = () => (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>);
const IconInstagram = () => (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>);

const Footer = () => {
    // Data columns matching the image exactly
    const linksColumn1 = ["Search a Doctor", "Search a Clinic", "Insurance & Pricing", "FAQs", "Contact"];
    const linksColumn2 = ["Survey", "Course", "Self Understanding", "Campus", "Workplace"];
    const linksColumn3 = ["Disorder", "Therapy", "Psychoactive Drugs", "Franchise", "Jobs"];
    const linksColumn4 = ["Career", "Feedback", "Events", "Gallery"];
    const linksColumn5 = ["About Us", "Terms", "Privacy", "Support"];

    return (
        <footer className="w-full" style={{ backgroundColor: '#b13c30', color: '#fff' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* --- MAIN CONTENT GRID --- */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    
                    {/* LEFT SIDE: QUICK LINKS */}
                    <div className="flex-1">
                        {/* Title: Quick Links (Centered relative to the grid) */}
                        <div className="text-center mb-10">
                            <h3 className="text-3xl font-serif font-bold inline-block border-b-2 border-gray-600 pb-2 tracking-wide">
                                Quick Links
                            </h3>
                        </div>

                        {/* 5 Column Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-[15px] font-medium text-gray-300">
                            <ul className="space-y-4">
                                {linksColumn1.map((item, i) => <li key={i}><a href="#" className="hover:text-white hover:underline decoration-orange-500 underline-offset-4 transition">{item}</a></li>)}
                            </ul>
                            <ul className="space-y-4">
                                {linksColumn2.map((item, i) => <li key={i}><a href="#" className="hover:text-white hover:underline decoration-orange-500 underline-offset-4 transition">{item}</a></li>)}
                            </ul>
                            <ul className="space-y-4">
                                {linksColumn3.map((item, i) => <li key={i}><a href="#" className="hover:text-white hover:underline decoration-orange-500 underline-offset-4 transition">{item}</a></li>)}
                            </ul>
                            <ul className="space-y-4">
                                {linksColumn4.map((item, i) => <li key={i}><a href={item === 'Gallery' ? '/gallery' : '#'} className="hover:text-white hover:underline decoration-orange-500 underline-offset-4 transition">{item}</a></li>)}
                            </ul>
                            <ul className="space-y-4">
                                {linksColumn5.map((item, i) => <li key={i}><a href="#" className="hover:text-white hover:underline decoration-orange-500 underline-offset-4 transition">{item}</a></li>)}
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT SIDE: SHAREYRHEART */}
                    <div className="w-full lg:w-80 flex flex-col items-center lg:items-start text-center lg:text-left pt-2">
                        <h2 className="text-3xl font-serif font-extrabold mb-3 tracking-tight">ShareYrHeart</h2>
                        
                        {/* Pill Badge */}
                        <div className="border border-[#b13c30] rounded-full px-5 py-1.5 mb-5">
                            <span className="text-[10px] font-bold text-[#b13c30] uppercase tracking-[0.2em]">
                                Mental Health at Any Age
                            </span>
                        </div>

                        {/* Wavy Divider */}
                        <div className="w-full h-4 mb-6 opacity-30">
                            <svg width="100%" height="100%" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="#fff" strokeWidth="1" fill="none" />
                            </svg>
                        </div>

                        <p className="text-lg font-serif mb-4" style={{ color: '#fff' }}>Subscribe to our newsletter!</p>

                        {/* Newsletter Input */}
                        <div className="relative w-full max-w-xs mx-auto lg:mx-0">
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                className="w-full" style={{ backgroundColor: '#b13c30', color: '#fff', border: '1px solid #fff', borderRadius: '9999px', padding: '14px 56px 14px 20px' }}
                            />
                            <button className="absolute right-1.5 top-1.5 bottom-1.5 w-10 h-10" style={{ backgroundColor: '#fff', color: '#b13c30', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM BAR --- */}
                <div className="mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    
                    {/* Socials (Left) */}
                    <div className="flex items-center gap-6 text-gray-400 order-2 md:order-1">
                        <a href="#" className="hover:text-white transition"><IconYoutube /></a>
                        <a href="#" className="hover:text-white transition"><IconLinkedin /></a>
                        <a href="#" className="hover:text-white transition"><IconTwitter /></a>
                        <a href="#" className="hover:text-white transition"><IconFacebook /></a>
                        <a href="#" className="hover:text-white transition"><IconInstagram /></a>
                    </div>

                    {/* Copyright (Center) */}
                    <div className="text-gray-500 text-sm font-serif order-1 md:order-2">
                        © {new Date().getFullYear()} Presah H & H | All Rights Reserved
                    </div>

                    {/* Legal Links (Right) - SEPARATED AS REQUESTED */}
                    <div className="flex items-center gap-8 text-sm text-gray-300 font-serif order-3">
                        <a href="/about" className="hover:text-white transition">About</a>
                        <a href="/terms" className="hover:text-white transition">Terms</a>
                        <a href="/privacy" className="hover:text-white transition">Privacy</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;