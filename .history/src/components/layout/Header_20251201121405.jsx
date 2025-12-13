import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { COLORS } from '../../constants/config';

const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Our Causes', page: 'ourcauses' },
    { name: 'Sociofare', page: 'sociofare' },
    { name: 'SSIC', page: 'ilc' },
  ];

  const handleNavClick = (page) => {
    setIsMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-[0.12rem] md:py-[0.18rem]">
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center"
            aria-label="Sabri Helpage Home"
          >
            <img 
              src="/websiteLogo.jpg" 
              alt="SabriHelpAge Logo" 
              className="object-contain transition-transform hover:scale-105 h-[3.4rem] md:h-[4.4rem]"
            />
          </button>

          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex space-x-8 text-sm md:text-base font-semibold uppercase tracking-normal text-gray-700">
              {navItems.map(item => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.page)}
                  className="hover:text-[#FFA876] transition-colors duration-200 relative group py-1"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFA876] transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            <button
              onClick={() => onNavigate('donate')}
              className="text-white px-6 py-2 rounded-full font-extrabold transition duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-sm md:text-base"
              style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
            >
              Donate Now
            </button>
          </div>

          <button 
            className="lg:hidden p-2 text-gray-900" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-10 h-10" /> : <Menu className="w-10 h-10" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full w-full bg-white z-40 shadow-2xl border-t">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map(item => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.page)}
                className="py-3 px-4 text-gray-800 font-semibold hover:bg-orange-50 rounded-lg transition text-left border-b border-gray-100"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('gallery')}
              className="py-3 px-4 text-gray-800 font-semibold hover:bg-orange-50 rounded-lg transition text-left border-b border-gray-100"
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="py-3 px-4 text-gray-800 font-semibold hover:bg-orange-50 rounded-lg transition text-left border-b border-gray-100"
            >
              Contact Us
            </button>
            <button
              onClick={() => { handleNavClick('donate'); }}
              className="mt-4 w-full text-white py-4 rounded-lg font-bold text-center shadow-md"
              style={{ backgroundColor: COLORS.PRIMARY_DARK }} 
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
