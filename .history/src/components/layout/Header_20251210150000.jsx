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
    <header className="shadow-md sticky top-0 z-50 font-sans" style={{ backgroundColor: '#fff', color: '#b13c30' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-1 md:py-2">
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center"
            aria-label="Sabri Helpage Home"
          >
            <img 
              src="/websiteLogo.jpg" 
              alt="SabriHelpAge Logo" 
              className="object-contain transition-transform hover:scale-105 h-36 md:h-40"
            />
          </button>

          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex space-x-8 text-sm md:text-base font-semibold uppercase tracking-normal" style={{ color: '#b13c30' }}>
              {navItems.map(item => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.page)}
                  className="transition-colors duration-200 relative group py-1 hover:opacity-90"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#b13c30' }}></span>
                </button>
              ))}
            </nav>

            <button
              onClick={() => onNavigate('donate')}
              className="px-6 py-2 rounded-full font-extrabold transition duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-sm md:text-base"
              style={{ backgroundColor: '#b13c30', color: '#fff' }}
            >
              Donate Now
            </button>
          </div>

          <button 
            className="lg:hidden p-2" style={{ color: '#b13c30' }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-10 h-10" /> : <Menu className="w-10 h-10" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full w-full z-40 shadow-2xl border-t" style={{ backgroundColor: '#fff' }}>
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map(item => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.page)}
                className="py-3 px-4 font-semibold rounded-lg transition text-left border-b"
                style={{ backgroundColor: '#fff', color: '#b13c30', borderColor: '#b13c30' }}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('gallery')}
              className="py-3 px-4 font-semibold rounded-lg transition text-left border-b"
              style={{ backgroundColor: '#fff', color: '#b13c30', borderColor: '#b13c30' }}
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="py-3 px-4 font-semibold rounded-lg transition text-left border-b"
              style={{ backgroundColor: '#fff', color: '#b13c30', borderColor: '#b13c30' }}
            >
              Contact Us
            </button>
            <button
              onClick={() => { handleNavClick('donate'); }}
              className="mt-4 w-full py-4 rounded-lg font-bold text-center shadow-md"
              style={{ backgroundColor: '#b13c30', color: '#fff' }} 
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
