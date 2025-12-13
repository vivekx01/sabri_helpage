import React, { useState, useCallback } from 'react';
import { 
  Menu, X, Play, ArrowRight, Star, Facebook, Twitter, 
  Instagram, Mail, ChevronRight, MessageCircle, Heart, Users, Globe, 
  Linkedin, Youtube, Calendar, MapPin, Clock, BookOpen, CheckCircle, 
  Wallet, Phone, Map
} from 'lucide-react';

// ==================== CONSTANTS ====================
const COLORS = {
  PRIMARY_DARK: '#260B00',
  ACCENT_ORANGE: '#FF7A42',
  BG_LIGHT_GRAY: '#f7f7f7',
  LOGO_RED: '#d32f2f'
};

const IMAGE_URLS = {
  HERO: 'HeroSection.jpg',
  WHAT_WE_STAND_FOR_1: 'event2.jpg',
  WHAT_WE_STAND_FOR_2: 'event3.jpg',
  WHAT_WE_STAND_FOR_3: 'event4.jpg',
  MENTAL_HEALTH: 'MentalHealth.jpg',
  ELDERLY_CARE: 'elderlyCareImg.jpg',
  GIRL_EDUCATION: 'girlChildEducation.jpg',
  DONATE_CALLOUT: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  NEWS_1_LEGAL: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  NEWS_2_FOOD: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  NEWS_3_WATER: 'WaterFilteration.jpg'
};

const GALLERY_IMAGES = [
  'event1.jpg',
  'event2.jpg',
  'event3.jpg',
  'event4.jpg',
  'event5.jpg',
  'event6.jpg',
  'event7.jpg'
  
];

const YOUTUBE_VIDEO_ID = 'csNcS9X49dQ';

const SOCIAL_LINKS = [
  { Icon: Youtube, url: 'https://www.youtube.com/@sabrihelpage', label: 'Youtube' },
  { Icon: Instagram, url: 'https://www.instagram.com/sabrihelpage/', label: 'Instagram' },
  { Icon: Linkedin, url: 'https://www.linkedin.com/company/sabri-helpage/', label: 'Linkedin' },
  { Icon: Facebook, url: 'https://www.facebook.com/SabriHelpage/', label: 'Facebook' },
  { Icon: X, url: 'https://x.com/SabriHelpage', label: 'X' }
];
const PAGE_TITLES = {
  home:'<FaHome />', // Replaced string with Icon Component
  causes: 'Our Causes',
  blog: 'Stories & Blog',
  gallery: 'Gallery',
  donate: 'Donate',
  contact: 'Contact Us',
  'mental-health': 'Mental Health',
  'elderly-care': 'Elderly Care',
  'girl-education': 'Girl Child Education',
  csr: 'CSR Summit',
  awards: 'Awards',
  privacy: 'Privacy Policy',
  terms: 'Terms of Use',
  faq: 'FAQ',
  publications: 'Publications',
  internship: 'Internships',
  ilc: 'Impact Leaders Circle (ILC)',
  sociofare: 'Sociofare',
  ourcauses: 'Our Causes',
  stories: 'Our Stories',
  events: 'Events'
};

// ==================== SHARED COMPONENTS ====================
const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-center text-gray-900 ${className}`}>
    {children}
  </h2>
);

const ResponsiveImage = ({ src, alt, className = "", fallbackText = "Image" }) => (
  <img 
    src={src} 
    alt={alt} 
    className={className}
    onError={(e) => { 
      e.target.onerror = null; 
      e.target.src = `https://placehold.co/600x400/333333/FFFFFF?text=${fallbackText}`;
    }}
  />
);

const Breadcrumbs = ({ page, onNavigate }) => {
  if (page === 'home') return null;

  const title = PAGE_TITLES[page] || page.charAt(0).toUpperCase() + page.slice(1);

  return (
    <div className="bg-gray-100 py-3 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-sm text-gray-500">
        <button 
          onClick={() => onNavigate('home')} 
          className="hover:text-orange-500 transition-colors font-medium"
        >
          Home
        </button>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
        <span className="text-gray-800 font-semibold" style={{ color: COLORS.ACCENT_ORANGE }}>
          {title}
        </span>
      </div>
    </div>
  );
};

// ==================== APP COMPONENT ====================
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="text-2xl font-bold text-gray-900">
              <a href="#" className="flex items-center">
                <img src="logo.png" alt="Logo" className="h-8 mr-2" />
                Sabri Helpage
              </a>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-10">
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                About
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                Services
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                Blog
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                Contact
              </a>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-500 hover:text-gray-900 transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url(${IMAGE_URLS.HERO})` }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-4">
              Empowering Lives, Transforming Futures
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8">
              Join us in making a difference. Your support can change lives.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold py-3 px-6 rounded-lg">
                Get Involved
              </a>
              <a href="#" className="bg-white hover:bg-gray-100 transition-colors text-gray-900 font-semibold py-3 px-6 rounded-lg">
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* What We Stand For Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle className="mb-12">What We Stand For</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={IMAGE_URLS.WHAT_WE_STAND_FOR_1} alt="Event 2" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Event Title 1</h3>
                  <p className="text-gray-600 mb-4">
                    Short description of the event or cause that we stand for. Making a difference together.
                  </p>
                  <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors font-medium">
                    Learn More
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={IMAGE_URLS.WHAT_WE_STAND_FOR_2} alt="Event 3" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Event Title 2</h3>
                  <p className="text-gray-600 mb-4">
                    Short description of the event or cause that we stand for. Making a difference together.
                  </p>
                  <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors font-medium">
                    Learn More
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={IMAGE_URLS.WHAT_WE_STAND_FOR_3} alt="Event 4" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Event Title 3</h3>
                  <p className="text-gray-600 mb-4">
                    Short description of the event or cause that we stand for. Making a difference together.
                  </p>
                  <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors font-medium">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Causes Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle className="mb-12">Our Causes</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
                <img src={IMAGE_URLS.MENTAL_HEALTH} alt="Mental Health" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Mental Health</h3>
                  <p className="text-gray-600 mb-4">
                    Supporting mental health initiatives and providing resources for those in need.
                  </p>
                  <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors font-medium">
                    Learn More
                  </a>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
                <img src={IMAGE_URLS.ELDERLY_CARE} alt="Elderly Care" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Elderly Care</h3>
                  <p className="text-gray-600 mb-4">
                    Providing care and support for the elderly, ensuring their well-being and dignity.
                  </p>
                  <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors font-medium">
                    Learn More
                  </a>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
                <img src={IMAGE_URLS.GIRL_EDUCATION} alt="Girl Child Education" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Girl Child Education</h3>
                  <p className="text-gray-600 mb-4">
                    Promoting education for girl children and empowering them to achieve their dreams.
                  </p>
                  <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors font-medium">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <SectionTitle>Get Involved</SectionTitle>
              <p className="text-lg text-gray-600">
                Join us in making a difference. Your support can change lives.
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <a href="#" className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold py-3 px-6 rounded-lg mb-4 md:mb-0">
                Donate Now
              </a>
              <a href="#" className="bg-white hover:bg-gray-100 transition-colors text-gray-900 font-semibold py-3 px-6 rounded-lg">
                Volunteer Your Time
              </a>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <SectionTitle>Subscribe to Our Newsletter</SectionTitle>
              <p className="text-lg text-gray-600">
                Stay updated on our latest news and initiatives. Subscribe now!
              </p>
            </div>
            <div className="flex justify-center">
              <form className="w-full max-w-md">
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="flex-1 appearance-none border border-gray-300 rounded-lg py-3 px-4 mb-4 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold py-3 px-6 rounded-lg"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="mb-8 md:mb-0">
                <h3 className="text-lg font-semibold mb-4">About Us</h3>
                <p className="text-gray-400">
                  We are a non-profit organization dedicated to making a difference in the lives of those in need. Our mission is to empower individuals and communities through various initiatives and programs.
                </p>
              </div>

              <div className="mb-8 md:mb-0">
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mb-8 md:mb-0">
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {SOCIAL_LINKS.map(({ Icon, url, label }) => (
                    <a 
                      key={label} 
                      href={url} 
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div
