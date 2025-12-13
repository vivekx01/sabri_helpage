import React, { useState, useCallback, useEffect } from 'react';
import { 
  Menu, X, Play, ArrowRight, Star, StarHalf, Facebook, Twitter, 
  Instagram, Mail, ChevronRight, MessageCircle, Heart, Users, Globe, 
  Search, Linkedin, Youtube, Calendar, User, MessageSquare, Briefcase, 
  Activity, Award, FileText, HelpCircle, Shield, ArrowLeft, MapPin, Clock, BookOpen, CheckCircle, Wallet, Phone, Map
} from 'lucide-react';

// ==================== CONSTANTS ====================
const COLORS = {
  PRIMARY_DARK: '#260B00',
  ACCENT_ORANGE: '#FF7A42',
  BG_LIGHT_GRAY: '#f7f7f7', // Slightly lighter gray for modern feel
  LOGO_RED: '#d32f2f'
};

const IMAGE_URLS = {
  HERO: 'HeroSection.jpg',
  // Replicating the image layout from the 1st screenshot (triangular/overlapping)
  WHAT_WE_STAND_FOR_1: 'https://images.unsplash.com/photo-1543269664-76bc39a7b973?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Woman and child (large)
  WHAT_WE_STAND_FOR_2: 'https://images.unsplash.com/photo-1590497525301-447e155b5500?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Children black and white (top small)
  WHAT_WE_STAND_FOR_3: 'https://images.unsplash.com/photo-1534346765116-2d1643c7b80a?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Boy and girl outdoor (bottom small)

  MENTAL_HEALTH: 'MentalHealth.jpg',
  ELDERLY_CARE: 'elderlyCareImg.jpg',
  GIRL_EDUCATION: 'girlChildEducation.jpg',
  DONATE_CALLOUT: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  NEWS_1_LEGAL: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  NEWS_2_FOOD: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  NEWS_3_WATER: 'WaterFilteration.jpg'
};

const GALLERY_IMAGES = [
  'https://i.ytimg.com/vi/csNcS9X49dQ/maxresdefault.jpg',
  'https://i.ytimg.com/vi/1rkvGnEzcPo/maxresdefault.jpg',
  'https://i.ytimg.com/vi/dGbKiy3rC0A/maxresdefault.jpg',
  'https://i.ytimg.com/vi/Y5DlqFH7hHg/maxresdefault.jpg',
  'https://i.ytimg.com/vi/aBQWyMwXj8Q/maxresdefault.jpg',
  'https://i.ytimg.com/vi/Zw9RWZ5dZ4g/maxresdefault.jpg'
];

const YOUTUBE_VIDEO_ID = 'csNcS9X49dQ';

const SOCIAL_LINKS = [
  { Icon: Youtube, url: 'https://www.youtube.com/@sabrihelpage', label: 'Youtube' },
  { Icon: Instagram, url: 'https://www.instagram.com/sabrihelpage/', label: 'Instagram' },
  { Icon: Linkedin, url: 'https://www.linkedin.com/company/sabri-helpage/', label: 'Linkedin' },
  { Icon: Facebook, url: 'https://www.facebook.com/SabriHelpage/', label: 'Facebook' },
  { Icon: Twitter, url: 'https://twitter.com/SabriHelpage', label: 'X (Twitter)' }
];

// Map of page names to display titles for Breadcrumbs
const PAGE_TITLES = {
  home: 'Home',
  about: 'About Us',
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
  ilc: 'ILC',
  sociofare: 'Sociofare',
  ourcauses: 'Our Causes Landing',
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

const YoutubeEmbed = ({ videoId, title }) => (
  <div className="space-y-3">
    <div className="relative w-full overflow-hidden rounded-xl shadow-lg" style={{ paddingTop: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
    <a
      href="https://www.youtube.com/@sabrihelpage167"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-red-700 transition"
    >
      <Youtube className="w-4 h-4 mr-2" /> Watch on YouTube
    </a>
  </div>
);

const BackButton = ({ onClick }) => (
  <button 
    onClick={onClick} 
    className="text-sm font-semibold mb-8 flex items-center hover:text-gray-700 transition"
    style={{ color: COLORS.ACCENT_ORANGE }}
  >
    <ChevronRight className="w-5 h-5 rotate-180 mr-1" /> Back to Home
  </button>
);

// ==================== HEADER ====================
const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Updated Nav Items based on requirements
  const navItems = [
    { name: 'Our Causes', page: 'ourcauses' },
    { name: 'Impact Leaders Circle (ILC)', page: 'ilc' },
    { name: 'Sociofare', page: 'sociofare' },
    { name: 'Stories', page: 'stories' },
    { name: 'Events', page: 'events' }
  ];

  const handleNavClick = (page) => {
    setIsMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 md:py-3">
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center"
            aria-label="Sabri Helpage Home"
          >
            <img 
              src="websiteLogo.jpg" 
              alt="SabriHelpAge Logo" 
              className="h-16 md:h-20 object-contain transition-transform hover:scale-105"
            />
          </button>

          <div className="hidden lg:flex flex-1 items-center justify-end space-x-8">
            <nav className="flex space-x-6 text-sm font-bold uppercase tracking-wide text-gray-700">
              {navItems.map(item => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.page)}
                  className="hover:text-orange-500 transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            <button
              onClick={() => onNavigate('donate')}
              className="text-white px-6 py-3 rounded-full font-bold transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              style={{ backgroundColor: COLORS.PRIMARY_DARK }}
            >
              Donate Now
            </button>
          </div>

          <button 
            className="lg:hidden p-2 text-gray-900" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
              onClick={() => {
                handleNavClick('donate');
              }}
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

// ==================== FOOTER ====================
const Footer = ({ onNavigate }) => {
  const footerLinks = {
    quickLinks: [
      { name: 'FAQ', page: 'faq' },
      { name: 'CSR Summit', page: 'csr' },
      { name: 'Awards', page: 'awards' },
      { name: 'Publications', page: 'publications' },
      { name: 'Events', page: 'events' },
      { name: 'Blog', page: 'blog' },
      { name: 'Gallery', page: 'gallery' },
      { name: 'Contact Us', page: 'contact' }
    ],
  };

  return (
    <footer className="pt-16 pb-6" style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Logo & Social */}
          <div>
            <button 
              onClick={() => onNavigate('home')} 
              className="flex flex-col items-start mb-6"
            >
              <span className="text-3xl font-extrabold leading-none" style={{ color: COLORS.LOGO_RED, fontFamily: 'cursive' }}>
                SabriHelpAge
              </span>
              <div className="w-32 h-1 bg-white/20 mt-2 mb-1" />
            </button>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Dedicated to serving humanity through comprehensive welfare programs for the elderly, women, and children.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map(({ Icon, url, label }) => (
                <a 
                  key={label}
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={label}
                  className="bg-white/10 p-2 rounded-full hover:bg-orange-500 transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-orange-500 rounded-full"></span>
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {footerLinks.quickLinks.map(link => (
                <button 
                  key={link.name}
                  onClick={() => onNavigate(link.page)}
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm flex items-center text-left"
                >
                  <ChevronRight className="w-3 h-3 mr-1 text-orange-500" /> {link.name}
                </button> 
              ))}
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div>
             <h4 className="text-xl font-bold mb-6 relative inline-block">
              Stay Updated
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-orange-500 rounded-full"></span>
            </h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest impact stories.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:border-orange-500"
              />
              <button className="bg-orange-500 text-white px-4 py-2 rounded-r-lg font-bold hover:bg-orange-600 transition">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Lowest Footer */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-gray-500">
            © 2025 Sabri Helpage. All rights reserved.
          </div>
          <div className="flex space-x-6 text-xs text-gray-400">
            <button onClick={() => onNavigate('about')} className="hover:text-white transition">About Us</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-white transition">Terms of Use</button>
            <button onClick={() => onNavigate('privacy')} className="hover:text-white transition">Privacy Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ==================== HOME PAGE ====================
const HomePage = ({ onNavigate }) => {
  const supporters = [
    "Google", "Microsoft", "Tata Trusts", "Reliance Foundation", "HDFC Bank"
  ];

  const stories = [
    { id: 1, title: "Riya's Dream of Education", img: IMAGE_URLS.GIRL_EDUCATION, date: "Oct 20, 2025" },
    { id: 2, title: "Healing Minds in Rural India", img: IMAGE_URLS.MENTAL_HEALTH, date: "Nov 05, 2025" },
    { id: 3, title: "Dignity for Senior Citizens", img: IMAGE_URLS.ELDERLY_CARE, date: "Nov 12, 2025" }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center text-white text-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <ResponsiveImage
            src={IMAGE_URLS.HERO}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-70"
            fallbackText="Hero+Image"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
            Serving society for <br/>
            <span className="text-orange-500">more than a decade.</span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10 max-w-3xl mx-auto text-gray-100">
            Focused on Mental Health, Elderly Care, and Women & Children Welfare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('about')}
              className="bg-orange-500 text-white px-10 py-4 rounded-full font-bold text-lg transition transform hover:scale-105 hover:bg-orange-600 shadow-lg"
            >
              Read More
            </button>
            <button
              onClick={() => onNavigate('donate')}
              className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg transition transform hover:scale-105 hover:bg-gray-100 shadow-lg border-2 border-white"
            >
              Support Us
            </button>
          </div>
        </div>
      </section>

      {/* What We Stand For - 2nd Image Layout (Collage/Triangle Style) */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Layout Collage */}
            <div className="relative h-[500px] hidden lg:block">
              <div className="absolute left-0 top-10 w-[60%] h-[80%] rounded-2xl overflow-hidden shadow-2xl z-10 transform hover:scale-[1.02] transition duration-500">
                 <ResponsiveImage src={IMAGE_URLS.WHAT_WE_STAND_FOR_1} className="w-full h-full object-cover" fallbackText="Main+Pic" />
              </div>
              <div className="absolute right-0 top-0 w-[35%] h-[45%] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-0 transform hover:scale-[1.02] transition duration-500">
                <ResponsiveImage src={IMAGE_URLS.WHAT_WE_STAND_FOR_2} className="w-full h-full object-cover" fallbackText="Top+Right" />
              </div>
              <div className="absolute right-4 bottom-0 w-[45%] h-[50%] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20 transform hover:scale-[1.02] transition duration-500">
                <ResponsiveImage src={IMAGE_URLS.WHAT_WE_STAND_FOR_3} className="w-full h-full object-cover" fallbackText="Bot+Right" />
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">What We Stand For</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Shaping Lives Through <br/> Compassionate Action.
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                At Sabri Helpage, our mission is to make a positive and lasting impact on the lives of marginalized people globally. We believe in a world where compassion translates into tangible change.
              </p>
              <div className="flex space-x-6">
                <button 
                  onClick={() => onNavigate('gallery')}
                  className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-800 transition transform hover:-translate-y-1"
                >
                  View Gallery
                </button>
                <button className="flex items-center text-gray-800 font-bold hover:text-orange-500 transition">
                  <Play className="w-10 h-10 text-orange-500 mr-3 fill-current bg-orange-100 rounded-full p-2" />
                  Watch Video
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Causes Section - Removed Raised Section, View More Opens Gallery */}
      <section className="py-20" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle className="mb-16">Our Core Causes</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Mental Health', img: IMAGE_URLS.MENTAL_HEALTH },
              { title: 'Elderly Care', img: IMAGE_URLS.ELDERLY_CARE },
              { title: 'Girl Education', img: IMAGE_URLS.GIRL_EDUCATION }
            ].map((cause, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
                <div className="h-56 relative">
                  <ResponsiveImage src={cause.img} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">{cause.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6 text-sm line-clamp-3">
                    Dedicated to providing resources, support, and advocacy for {cause.title.toLowerCase()} initiatives across the country.
                  </p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => onNavigate('gallery')}
                      className="flex-1 border-2 border-orange-500 text-orange-500 py-2 rounded-full font-bold hover:bg-orange-50 transition text-sm"
                    >
                      View More
                    </button>
                    <button 
                      onClick={() => onNavigate('donate')}
                      className="flex-1 bg-gray-900 text-white py-2 rounded-full font-bold hover:bg-gray-800 transition text-sm"
                    >
                      Donate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Club Membership (Replacing Give Hope) */}
      <section className="py-24 relative overflow-hidden bg-orange-600">
        <div className="absolute inset-0 opacity-20 mix-blend-multiply">
           <ResponsiveImage src={IMAGE_URLS.DONATE_CALLOUT} className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative text-center text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Join Our Impact Leaders Circle</h2>
          <p className="text-xl mb-10 text-orange-50 font-medium">
            Become a member of an exclusive community dedicated to sustained social change. Get regular updates, tax benefits, and invites to exclusive events.
          </p>
          <button
            onClick={() => onNavigate('ilc')} // Assuming registration form is on ILC page
            className="bg-white text-orange-600 px-10 py-4 rounded-full font-extrabold text-lg shadow-xl hover:bg-gray-100 transition transform hover:scale-105"
          >
            Register Membership
          </button>
        </div>
      </section>

      {/* Our Stories (Replacing News) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <SectionTitle className="text-left">Our Stories</SectionTitle>
            <button 
              onClick={() => onNavigate('stories')}
              className="hidden md:flex items-center text-orange-500 font-bold hover:text-orange-600"
            >
              Read All <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {stories.map((story) => (
              <div key={story.id} className="group cursor-pointer" onClick={() => onNavigate('blog')}>
                <div className="overflow-hidden rounded-2xl mb-4 shadow-md">
                  <ResponsiveImage 
                    src={story.img} 
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-700" 
                  />
                </div>
                <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">{story.date}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-orange-600 transition">{story.title}</h3>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">A heartwarming tale of resilience and how your contributions made a difference.</p>
                <button className="mt-4 text-sm font-bold text-gray-800 underline decoration-orange-500 decoration-2 underline-offset-4 hover:text-orange-600">Read Story</button>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
             <button 
              onClick={() => onNavigate('stories')}
              className="inline-block bg-gray-100 text-gray-800 px-6 py-3 rounded-full font-bold"
            >
              Read All Stories
            </button>
          </div>
        </div>
      </section>

      {/* Supporters Section */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Our Supporters</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60 grayscale hover:grayscale-0 transition duration-500">
            {supporters.map((s, i) => (
              <span key={i} className="text-xl md:text-2xl font-bold text-gray-600">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle className="mb-16">Voices of Change</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition duration-300 relative">
                <MessageCircle className="w-10 h-10 text-orange-200 absolute top-6 right-6" />
                <div className="flex text-orange-500 mb-4">
                  {[...Array(5)].map((_, x) => <Star key={x} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">"Sabri Helpage provided me with the opportunity to serve my community in ways I never thought possible. Truly inspiring work."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Amit Verma</h4>
                    <p className="text-xs text-gray-500">Volunteer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// ==================== CONTACT PAGE (NEW LAYOUT) ====================
const ContactPage = ({ onNavigate }) => {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="pt-10 pb-6 text-center">
        <h1 className="text-4xl font-serif font-bold text-gray-900">Contact <span className="text-orange-500">Us</span></h1>
      </div>

      {/* Green Banner */}
      <div className="bg-green-900 py-12 relative overflow-hidden mb-24">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Do you have a <span className="text-yellow-400">Query ?</span></h2>
        </div>
        {/* Flower decoration placeholder */}
        <div className="absolute right-10 top-0 text-yellow-400 opacity-80 hidden md:block">
           <div className="text-6xl">🌻</div>
        </div>
      </div>

      {/* Form Card (Floating over banner style implemented via margins) */}
      <div className="max-w-3xl mx-auto px-4 -mt-32 relative z-20 mb-20">
        <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12">
          <h3 className="text-xl font-bold text-center text-gray-800 mb-8">Send us a Message</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Your Name *" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 text-sm" />
              <input type="email" placeholder="Your Email *" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 text-sm" />
            </div>
            <input type="text" placeholder="Subject" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 text-sm" />
            <div className="relative">
              <textarea placeholder="Your Message *" rows="4" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 text-sm"></textarea>
              <span className="absolute bottom-3 right-3 text-gray-400 text-xs">✎</span>
            </div>
            <div className="text-center">
              <button className="bg-[#8B5A2B] text-white px-8 py-3 rounded font-bold text-sm hover:bg-[#6d4620] transition shadow-md">
                Send Message 🚀
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-4xl mx-auto px-4 mb-16 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Find Us on the Map</h3>
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
          {/* Placeholder for Map Image */}
          <div className="w-full h-64 bg-blue-50 relative flex items-center justify-center">
             <MapPin className="w-12 h-12 text-red-500 absolute" />
             <img 
               src="https://maps.googleapis.com/maps/api/staticmap?center=Kolkata&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7CKolkata&key=YOUR_API_KEY" 
               alt="Map Location"
               className="w-full h-full object-cover"
               onError={(e) => {e.target.src='https://placehold.co/800x400/e2e8f0/475569?text=Google+Map+View'}}
             />
          </div>
        </div>
      </div>

      {/* Contact Info Grid */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Address */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition duration-300 border border-gray-100">
            <MapPin className="w-8 h-8 mx-auto text-red-500 mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Address</h4>
            <p className="text-sm text-gray-600 mb-4">7 B, Mysore Road, Rashbehari Avenue, Kolkata - 700026</p>
            <a href="#" className="text-xs text-blue-600 font-semibold flex items-center justify-center">
              <Globe className="w-3 h-3 mr-1" /> Open in Google Maps
            </a>
          </div>

          {/* Card 2: Email */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition duration-300 border border-gray-100">
            <Mail className="w-8 h-8 mx-auto text-blue-500 mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Email</h4>
            <p className="text-sm text-gray-600 mb-4">info@sabrihelpage.org</p>
            <a href="mailto:info@sabrihelpage.org" className="text-xs text-blue-600 font-semibold flex items-center justify-center">
              <ArrowRight className="w-3 h-3 mr-1" /> Send Email
            </a>
          </div>

          {/* Card 3: Contact */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition duration-300 border border-gray-100">
            <Phone className="w-8 h-8 mx-auto text-green-500 mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Contact</h4>
            <p className="text-sm text-gray-600 mb-4">+91 9874021457</p>
            <a href="tel:+919874021457" className="text-xs text-blue-600 font-semibold flex items-center justify-center">
              <Phone className="w-3 h-3 mr-1" /> Call Now
            </a>
          </div>

          {/* Card 4: Telephone */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition duration-300 border border-gray-100">
            <Phone className="w-8 h-8 mx-auto text-green-600 mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Telephone</h4>
            <p className="text-sm text-gray-600 mb-4">033 4601 3886</p>
            <a href="tel:03346013886" className="text-xs text-blue-600 font-semibold flex items-center justify-center">
              <Phone className="w-3 h-3 mr-1" /> Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== PLACEHOLDER PAGES (New Requirements) ====================
const ILCPage = ({ onNavigate }) => (
  <section className="py-20 text-center">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6">Impact Leaders Circle (ILC)</h1>
      <p className="text-lg text-gray-600 mb-8">A premium membership for changemakers. Join the circle to drive sustainable impact.</p>
      {/* Registration form placeholder for ILC */}
      <div className="bg-gray-100 p-8 rounded-xl">
        <h3 className="font-bold mb-4">Membership Registration Form</h3>
        <p className="text-sm text-gray-500">[Form Content Here]</p>
      </div>
    </div>
  </section>
);

const SociofarePage = ({ onNavigate }) => (
  <section className="py-20 text-center">
    <h1 className="text-4xl font-bold mb-6">Sociofare</h1>
    <p className="text-lg text-gray-600">Innovating social welfare through technology and community.</p>
  </section>
);

const OurCausesLandingPage = ({ onNavigate }) => (
  <section className="py-20 text-center">
    <h1 className="text-4xl font-bold mb-6">Our Causes</h1>
    <p className="text-lg text-gray-600">Explore all the initiatives we support.</p>
    {/* List of all causes */}
  </section>
);

const StoriesPage = ({ onNavigate }) => (
  <section className="py-20 text-center">
    <h1 className="text-4xl font-bold mb-6">Our Stories</h1>
    <p className="text-lg text-gray-600">Real stories of change from the ground.</p>
  </section>
);

const EventsPage = ({ onNavigate }) => (
  <section className="py-20 text-center">
    <h1 className="text-4xl font-bold mb-6">Upcoming Events</h1>
    <p className="text-lg text-gray-600">Join us at our next gathering or fundraiser.</p>
  </section>
);

// ... [Existing pages: About, Gallery, Donate, Causes, etc. - Kept simple for brevity but included in App logic]
const PrivacyPage = () => <div className="p-20 text-center"><h1 className="text-3xl font-bold">Privacy Policy</h1></div>;
const TermsPage = () => <div className="p-20 text-center"><h1 className="text-3xl font-bold">Terms of Use</h1></div>;
const FAQPage = () => <div className="p-20 text-center"><h1 className="text-3xl font-bold">FAQ</h1></div>;
const PublicationsPage = () => <div className="p-20 text-center"><h1 className="text-3xl font-bold">Publications</h1></div>;
const CSRSummitPage = () => <div className="p-20 text-center"><h1 className="text-3xl font-bold">CSR Summit</h1></div>;
const AwardsPage = () => <div className="p-20 text-center"><h1 className="text-3xl font-bold">Awards</h1></div>;
const BlogPage = () => <div className="p-20 text-center"><h1 className="text-3xl font-bold">Blog</h1></div>;

// ==================== MAIN APP ====================
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={handleNavigate} />;
      case 'contact': return <ContactPage onNavigate={handleNavigate} />;
      case 'about': return <AboutPage onNavigate={handleNavigate} />;
      case 'gallery': return <GalleryPage onNavigate={handleNavigate} />;
      case 'donate': return <DonatePage onNavigate={handleNavigate} />;
      
      // New Pages
      case 'ilc': return <ILCPage onNavigate={handleNavigate} />;
      case 'sociofare': return <SociofarePage onNavigate={handleNavigate} />;
      case 'ourcauses': return <OurCausesLandingPage onNavigate={handleNavigate} />;
      case 'stories': return <StoriesPage onNavigate={handleNavigate} />;
      case 'events': return <EventsPage onNavigate={handleNavigate} />;
      
      // Existing/Footer Links
      case 'privacy': return <PrivacyPage />;
      case 'terms': return <TermsPage />;
      case 'faq': return <FAQPage />;
      case 'publications': return <PublicationsPage />;
      case 'csr': return <CSRSummitPage />;
      case 'awards': return <AwardsPage />;
      case 'blog': return <BlogPage />;
      
      case 'mental-health': return <MentalHealthPage onNavigate={handleNavigate} />;
      case 'elderly-care': return <ElderlyCarePage onNavigate={handleNavigate} />;
      case 'girl-education': return <GirlEducationPage onNavigate={handleNavigate} />;
      case 'internship': return <InternshipPage onNavigate={handleNavigate} />;
      
      default: return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-800">
      <Header onNavigate={handleNavigate} />
      <Breadcrumbs page={currentPage} onNavigate={handleNavigate} />
      <main className="flex-grow animate-fade-in">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;