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
  WHAT_WE_STAND_FOR_1: 'https://images.unsplash.com/photo-1543269664-76bc39a7b973?q=80&w=1500&auto=format&fit=crop',
  WHAT_WE_STAND_FOR_2: 'https://images.unsplash.com/photo-1590497525301-447e155b5500?q=80&w=1500&auto=format&fit=crop',
  WHAT_WE_STAND_FOR_3: 'https://images.unsplash.com/photo-1534346765116-2d1643c7b80a?q=80&w=1500&auto=format&fit=crop',
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

const PAGE_TITLES = {
  home: 'Home',
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

const YoutubeEmbed = ({ videoId, title }) => (

  <div className="space-y-3">

    

    {/* YouTube Video */}

    <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>

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



    {/* Watch on YouTube Button */}

    <a

      href="https://www.youtube.com/@sabrihelpage167"

      target="_blank"

      rel="noopener noreferrer"

      className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-red-700 transition"

    >

      YouTube

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

  const navItems = [
     { name: 'Impact Leaders Circle (ILC)', page: 'ilc' },
    { name: 'Our Causes', page: 'ourcauses' },
   
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
              className="h-20 md:h-24 object-contain transition-transform hover:scale-105"
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

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-gray-500">
            © 2025 Sabri Helpage. All rights reserved.
          </div>
          <div className="flex space-x-6 text-xs text-gray-400">
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
  [

    {

      name: "Rohan Sharma",

      title: "Former Intern",

      quote: "The experience was life-changing. I loved the emphasis on elderly care and mental health.",

      avatar: "RS",

      rating: 5

    },

    {

      name: "Priya Verma",

      title: "Donor",

      quote: "I'm proud to support an organization with such transparency and focus on girl child education.",

      avatar: "PV",

      rating: 4.5

    },

    {

      name: "Dr. Alok Gupta",

      title: "Partner NGO",

      quote: "Our collaboration on mental health initiatives has been immensely successful and rewarding.",

      avatar: "AG",

      rating: 5

    }

  ];



  const newsItems = [

    {

      title: "Legal Aid Camp for Rural Women",

      date: "Nov 1, 2025",

      img: IMAGE_URLS.NEWS_1_LEGAL,

      snippet: "Sabri Helpage successfully organized a free legal aid and counseling camp in rural Bihar."

    },

    {

      title: "Food Distribution Drive in Slums",

      date: "Oct 15, 2025",

      img: IMAGE_URLS.NEWS_2_FOOD,

      snippet: "A week-long food and ration distribution drive helped feed 5,000 families."

    },

    {

      title: "New Water Filtration Project",

      date: "Sep 28, 2025",

      img: IMAGE_URLS.NEWS_3_WATER,

      snippet: "Launched a sustainable water filtration system providing clean drinking water."

    }

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
              onClick={() => onNavigate('ourcauses')}
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

      

      {/* What We Stand For */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
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

            {/* Milestones and Video */}
            {/* Milestones and Video */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* --- LEFT COLUMN: Milestones --- */}
            <div className="flex flex-col h-full">
              <div 
                className="p-6 md:p-10 rounded-3xl shadow-2xl h-full flex flex-col transition-transform duration-500 hover:scale-[1.01]" 
                style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
              >
                <p className="text-sm font-bold uppercase tracking-widest text-white/90 mb-3">
                  Our Milestones
                </p>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 leading-tight">
                  We've Accomplished Most During This Span.
                </h3>

                {/* Grid: 1 column on mobile, 3 on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-auto">
                  {[
                    { value: '75.5K', label: 'People Helped' },
                    { value: '34.2K', label: 'Happy Lives' },
                    { value: '57.4', label: 'Locations' }
                  ].map((stat, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-2xl text-center border border-white/10 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1" 
                      style={{ backgroundColor: COLORS.PRIMARY_DARK }}
                    >
                      <span className="block text-2xl md:text-3xl font-extrabold text-white">{stat.value}</span>
                      <span className="block text-xs font-bold text-gray-300 uppercase mt-1 tracking-wider">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* --- RIGHT COLUMN: Video & Channel Button --- */}
            {/* Added lg:pl-12 to give space between left card and video */}
            <div className="flex flex-col gap-6 lg:pl-12">
              
              {/* VIDEO FRAME: Added a white border/padding around the video to make it smaller/sleeker */}
              <div className="bg-white p-3 rounded-3xl shadow-xl border border-gray-100 transform transition-all hover:shadow-2xl">
                <div className="relative w-full overflow-hidden rounded-2xl aspect-video bg-black/5">
                   <YoutubeEmbed videoId={YOUTUBE_VIDEO_ID} title="Sabri Helpage Story" />
                </div>
              </div>

              {/* The "Cool" Button - Aligned with the video */}
              <a 
                href="https://www.youtube.com/@YourChannel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-white border border-gray-200 hover:border-red-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* YouTube Icon Container */}
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                     <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                     </svg>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Watch Our Stories</span>
                    <span className="text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors">Visit YouTube Channel</span>
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
                   <svg className="w-4 h-4 text-gray-400 group-hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

            </div>

          </div>
        </div>
      </section>


      {/* Causes Section */}
      <section className="py-20" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <SectionTitle className="mb-16">Our Core Causes</SectionTitle>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { 
          title: 'Mental Health', 
          img: IMAGE_URLS.MENTAL_HEALTH, 
          route: 'mental-health' // Unique identifier for the page
        },
        { 
          title: 'Elderly Care', 
          img: IMAGE_URLS.ELDERLY_CARE, 
          route: 'elderly-care' 
        },
        { 
          title: 'Girl Education', 
          img: IMAGE_URLS.GIRL_EDUCATION, 
          route: 'girl-education' 
        }
      ].map((cause, idx) => (
        <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
          {/* Image Section */}
          <div className="h-56 relative">
            <ResponsiveImage src={cause.img} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">{cause.title}</h3>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <p className="text-gray-600 mb-6 text-sm line-clamp-3">
              Dedicated to providing resources, support, and advocacy for {cause.title.toLowerCase()} initiatives across the country.
            </p>
            
            <div className="flex gap-3">
              {/* READ MORE BUTTON */}
              <button 
                onClick={() => onNavigate(cause.route)} 
                className="flex-1 border-2 border-orange-500 text-orange-500 py-2 rounded-full font-bold hover:bg-orange-50 transition text-sm"
              >
                Read More
              </button>

              {/* DONATE BUTTON */}
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

      {/* Supporters Section */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Our Supporters</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60 grayscale hover:grayscale-0 transition duration-500">
            {supporters.map((s, i) => (
              <span key={i} className="text-xl md:text-2xl font-bold text-gray-600">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Club Membership */}
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
            onClick={() => onNavigate('ilc')}
            className="bg-white text-orange-600 px-10 py-4 rounded-full font-extrabold text-lg shadow-xl hover:bg-gray-100 transition transform hover:scale-105"
          >
            Register Membership
          </button>
        </div>
      </section>

      

     {/* Testimonials */}
      <section className="py-20" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle className="mb-16">Voices of Change</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rohan Sharma",
                title: "Former Intern",
                quote: "The experience was life-changing. I loved the emphasis on elderly care and mental health.",
                avatar: "RS",
                rating: 5
              },
              {
                name: "Priya Verma",
                title: "Donor",
                quote: "I'm proud to support an organization with such transparency and focus on girl child education.",
                avatar: "PV",
                rating: 4.5
              },
              {
                name: "Dr. Alok Gupta",
                title: "Partner NGO",
                quote: "Our collaboration on mental health initiatives has been immensely successful and rewarding.",
                avatar: "AG",
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition duration-300 relative">
                <MessageCircle className="w-10 h-10 text-orange-200 absolute top-6 right-6" />
                <div className="flex text-orange-500 mb-4">
                  {[...Array(5)].map((_, x) => (
                    <Star key={x} className={`w-4 h-4 ${x < Math.round(testimonial.rating) ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-full mr-3 flex items-center justify-center text-orange-600 font-bold text-xs">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Our Stories / News & Updates */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header: Title Centered, Button on Right */}
          <div className="relative flex items-center justify-center mb-12">
            <SectionTitle className="text-center">Our Stories</SectionTitle>
            
            {/* Desktop Button: Positioned Absolutely to the right */}
            <button 
              onClick={() => onNavigate('stories')}
              className="hidden md:flex absolute right-0 items-center text-orange-500 font-bold hover:text-orange-600"
            >
              Read All <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          
          {/* Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                id: 1,
                title: "Legal Aid Camp for Rural Women",
                date: "Nov 1, 2025",
                img: IMAGE_URLS.NEWS_1_LEGAL,
                snippet: "Sabri Helpage successfully organized a free legal aid and counseling camp in rural Bihar."
              },
              {
                id: 2,
                title: "Food Distribution Drive in Slums",
                date: "Oct 15, 2025",
                img: IMAGE_URLS.NEWS_2_FOOD,
                snippet: "A week-long food and ration distribution drive helped feed 5,000 families."
              },
              {
                id: 3,
                title: "New Water Filtration Project",
                date: "Sep 28, 2025",
                img: IMAGE_URLS.NEWS_3_WATER,
                snippet: "Launched a sustainable water filtration system providing clean drinking water."
              }
            ].map((story) => (
              <div key={story.id} className="group cursor-pointer" onClick={() => onNavigate('blog')}>
                <div className="overflow-hidden rounded-2xl mb-4 shadow-md">
                  <ResponsiveImage 
                    src={story.img} 
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-700" 
                  />
                </div>
                <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">{story.date}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-orange-600 transition">{story.title}</h3>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">{story.snippet}</p>
                <button className="mt-4 text-sm font-bold text-gray-800 underline decoration-orange-500 decoration-2 underline-offset-4 hover:text-orange-600">Read Story</button>
              </div>
            ))}
          </div>
          
          {/* Mobile Button (Visible only on small screens) */}
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
    </>
  );
};


// ==================== CONTACT PAGE ====================
const ContactPage = ({ onNavigate }) => {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="pt-10 pb-6 text-center">
        <h1 className="text-4xl font-serif font-bold text-gray-900">Contact <span className="text-orange-500">Us</span></h1>
      </div>

      <div className="bg-green-900 py-12 relative overflow-hidden mb-24">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Do you have a <span className="text-yellow-400">Query ?</span></h2>
        </div>
        <div className="absolute right-10 top-0 text-yellow-400 opacity-80 hidden md:block">
          <div className="text-6xl">🌻</div>
        </div>
      </div>

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

      <div className="max-w-4xl mx-auto px-4 mb-16 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Find Us on the Map</h3>
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
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

      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition duration-300 border border-gray-100">
            <MapPin className="w-8 h-8 mx-auto text-red-500 mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Address</h4>
            <p className="text-sm text-gray-600 mb-4">7 B, Mysore Road, Rashbehari Avenue, Kolkata - 700026</p>
            <a href="#" className="text-xs text-blue-600 font-semibold flex items-center justify-center">
              <Globe className="w-3 h-3 mr-1" /> Open in Google Maps
            </a>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition duration-300 border border-gray-100">
            <Mail className="w-8 h-8 mx-auto text-blue-500 mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Email</h4>
            <p className="text-sm text-gray-600 mb-4">info@sabrihelpage.org</p>
            <a href="mailto:info@sabrihelpage.org" className="text-xs text-blue-600 font-semibold flex items-center justify-center">
              <ArrowRight className="w-3 h-3 mr-1" /> Send Email
            </a>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition duration-300 border border-gray-100">
            <Phone className="w-8 h-8 mx-auto text-green-500 mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Contact</h4>
            <p className="text-sm text-gray-600 mb-4">+91 9874021457</p>
            <a href="tel:+919874021457" className="text-xs text-blue-600 font-semibold flex items-center justify-center">
              <Phone className="w-3 h-3 mr-1" /> Call Now
            </a>
          </div>

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

// ==================== NEW PAGES ====================
const ILCPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Welcome Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-900 mb-4">
            Welcome to Sabri Social Impact Club!
          </h2>
          <div className="h-1 w-24 bg-purple-200 mx-auto"></div>
        </div>

        {/* Body Text */}
        <div className="prose max-w-none text-slate-700 leading-relaxed text-justify mb-16">
          <p className="mb-4 text-lg">
            <span className="font-bold text-purple-900">SSIC</span> is the vision of Sabri Helpage to create a caring and socially responsible community where businesses and nonprofits work together to make a difference in society that lasts.
          </p>
          <p className="text-lg">
            The Sabri Social Impact Club wants to see a future where people work together to help weak communities, give youth power, support girls, and make India's environmental and social welfare system stronger.
          </p>
        </div>

        {/* Register Button (Call to Action) */}
        <div className="flex justify-center mb-16">
          <button 
            onClick={toggleModal}
            className="group relative px-8 py-4 bg-purple-900 text-white font-bold rounded-full shadow-lg hover:bg-purple-800 transition-all transform hover:-translate-y-1 flex items-center gap-3"
          >
            Register for SSIC Membership
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </main>

      {/* ================= BANNER QUOTE (Matches Image Style) ================= */}
      <div className="w-full bg-purple-600 py-16 px-6 text-center shadow-inner relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-2xl md:text-3xl text-white font-serif italic leading-normal">
            "To create a thriving ecosystem that connects people and organisations that care about social welfare and making a difference."
          </p>
          <p className="text-purple-200 mt-4 font-semibold tracking-wider uppercase text-sm">
            — SSIC Mission Statement
          </p>
        </div>
      </div>

      {/* ================= MISSION SECTION (Matches "Quick Facts" Layout) ================= */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h3 className="text-3xl text-purple-900 mb-8 font-serif border-b pb-4">Our Mission</h3>
        
        <div className="space-y-6 text-slate-700">
          {[
            "To create a thriving ecosystem that connects people and organisations that care about social welfare and making a difference.",
            "To promote solutions based on research and new ways of doing things that deal with important social problems in a way that has a lasting, large-scale effect.",
            "To help businesses and non-profits share information, work together, and build their skills so that social development efforts are stronger and more unified.",
            "To encourage people to act in a socially responsible way through structured programs, partnerships, and initiatives that make communities stronger.",
            "To create a welcoming space where people can share their thoughts, resources, and chances to make society stronger, healthier, and more caring."
          ].map((mission, idx) => (
            <div key={idx} className="flex gap-4 items-start">
               <span className="font-bold text-purple-500 text-xl">›</span>
               <p className="leading-relaxed">{mission}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MODAL: REGISTRATION FORM ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
          
          {/* Modal Container */}
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl my-8 flex flex-col max-h-[90vh]" style={{ backgroundColor: '#FFF8F0' }}>
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-orange-200 sticky top-0 bg-white z-10 rounded-t-xl" style={{ backgroundColor: '#FFF8F0' }}>
              <div>
                <h2 className="text-2xl font-bold" style={{ color: '#FF7F50' }}>SSIC Registration</h2>
                <p className="text-sm text-gray-600">Please fill out all details below to apply.</p>
              </div>
              <button onClick={toggleModal} className="p-2 hover:bg-orange-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Scrollable Form Content */}
            <div className="overflow-y-auto p-8 space-y-10 custom-scrollbar">
              
              {/* Section A: Org Details */}
              <section>
                <div className="flex items-center gap-2 mb-4" style={{ color: '#FF7F50' }}>
                  <Building2 className="w-5 h-5" />
                  <h3 className="font-bold text-lg uppercase tracking-wide">A. Organisation Details</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organisation Name</label>
                    <input type="text" className="w-full p-3 bg-white border border-orange-200 rounded focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Enter full legal name" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type of Organisation</label>
                    <div className="flex gap-6 p-3 bg-white border border-orange-200 rounded">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="orgType" className="accent-orange-600 w-4 h-4" />
                        <span className="text-gray-700">Corporate</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="orgType" className="accent-orange-600 w-4 h-4" />
                        <span className="text-gray-700">NGO / Nonprofit</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reg No. / CIN / NGO ID</label>
                    <input type="text" className="w-full p-3 bg-white border border-orange-200 rounded focus:ring-2 focus:ring-orange-500 outline-none" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year of Establishment</label>
                    <input type="number" className="w-full p-3 bg-white border border-orange-200 rounded focus:ring-2 focus:ring-orange-500 outline-none" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry / Sector</label>
                    <input type="text" className="w-full p-3 bg-white border border-orange-200 rounded focus:ring-2 focus:ring-orange-500 outline-none" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Head Office Address</label>
                    <textarea rows="3" className="w-full p-3 bg-white border border-orange-200 rounded focus:ring-2 focus:ring-orange-500 outline-none"></textarea>
                  </div>
                </div>
              </section>

              <hr className="border-orange-200" />

              {/* Section B: Contact Person */}
              <section>
                <div className="flex items-center gap-2 mb-4" style={{ color: '#FF7F50' }}>
                  <User className="w-5 h-5" />
                  <h3 className="font-bold text-lg uppercase tracking-wide">B. Contact Person Details</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" className="w-full p-3 bg-white border border-orange-200 rounded focus:ring-2 focus:ring-orange-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                    <input type="text" className="w-full p-3 bg-white border border-orange-200 rounded focus:ring-2 focus:ring-orange-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <input type="tel" className="w-full p-3 bg-white border border-orange-200 rounded focus:ring-2 focus:ring-orange-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" className="w-full p-3 bg-white border border-orange-200 rounded focus:ring-2 focus:ring-orange-500 outline-none" />
                  </div>
                </div>
              </section>

              <hr className="border-orange-200" />

              {/* Section C: Membership Info */}
              <section>
                <div className="flex items-center gap-2 mb-4" style={{ color: '#FF7F50' }}>
                  <FileText className="w-5 h-5" />
                  <h3 className="font-bold text-lg uppercase tracking-wide">C. Membership Information</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Membership Category</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <label className="border border-orange-200 p-4 rounded flex items-center gap-3 cursor-pointer hover:border-orange-500 transition-colors bg-white">
                          <input type="radio" name="membership" className="w-5 h-5 accent-orange-600" />
                          <span className="font-medium">Annual Membership</span>
                       </label>
                       <label className="border border-orange-200 p-4 rounded flex items-center gap-3 cursor-pointer hover:border-orange-500 transition-colors bg-white">
                          <input type="radio" name="membership" className="w-5 h-5 accent-orange-600" />
                          <span className="font-medium">3-Year Membership</span>
                       </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Joining / Area of Interest</label>
                    <textarea rows="2" className="w-full p-3 bg-white border border-orange-200 rounded focus:ring-2 focus:ring-orange-500 outline-none"></textarea>
                  </div>
                </div>
              </section>

              <hr className="border-orange-200" />

              {/* Section D: Focus Areas */}
              <section>
                <div className="flex items-center gap-2 mb-4" style={{ color: '#FF7F50' }}>
                  <CheckSquare className="w-5 h-5" />
                  <h3 className="font-bold text-lg uppercase tracking-wide">D. Organisational Focus Areas</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Community Development",
                    "Research & Innovation",
                    "Education & Youth",
                    "Girl Child Empowerment",
                    "Sustainability & Environment",
                    "Social Welfare",
                    "Skill Development",
                    "Health & Well-being"
                  ].map((item) => (
                    <label key={item} className="flex items-center gap-3 p-3 border border-orange-200 rounded hover:bg-orange-50 cursor-pointer transition-colors bg-white">
                      <input type="checkbox" className="w-5 h-5 rounded text-orange-600 focus:ring-orange-500 border-orange-300" />
                      <span className="text-gray-700">{item}</span>
                    </label>
                  ))}
                  <div className="md:col-span-2 flex items-center gap-3 p-3 border border-orange-200 rounded bg-white">
                     <input type="checkbox" className="w-5 h-5 rounded text-orange-600" />
                     <span className="text-gray-700 whitespace-nowrap">Other:</span>
                     <input type="text" className="w-full border-b border-orange-300 focus:border-orange-500 outline-none bg-transparent px-2" placeholder="Specify here..." />
                  </div>
                </div>
              </section>

              <hr className="border-orange-200" />

              {/* Section E: Activities */}
              <section>
                <h3 className="font-bold text-lg uppercase tracking-wide mb-2" style={{ color: '#FF7F50' }}>E. Social Impact Activities</h3>
                <p className="text-sm text-gray-500 mb-3">Provide a short description of your organisation’s ongoing or past social initiative.</p>
                <textarea rows="4" className="w-full p-3 bg-white border border-orange-200 rounded focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Brief Summary..."></textarea>
              </section>

              <hr className="border-orange-200" />

              {/* Section F: Documents */}
              <section>
                <h3 className="font-bold text-lg uppercase tracking-wide mb-4" style={{ color: '#FF7F50' }}>F. Documents to Attach</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Registration Certificate (CIN/NGO Reg)",
                    "PAN Card",
                    "Organisation Profile",
                    "Logo (High Resolution)",
                    "Contact Person ID Proof"
                  ].map((doc) => (
                    <label key={doc} className="flex items-center justify-between p-4 border border-dashed border-orange-300 rounded-lg cursor-pointer hover:bg-orange-50 hover:border-orange-400 transition-colors group bg-white">
                       <div className="flex items-center gap-3">
                         <Upload className="w-5 h-5 text-orange-400 group-hover:text-orange-500" />
                         <span className="text-sm font-medium text-gray-600 group-hover:text-orange-700">{doc}</span>
                       </div>
                       <input type="file" className="hidden" />
                    </label>
                  ))}
                </div>
              </section>

            </div>

            {/* Footer (Sticky) */}
            <div className="p-6 border-t border-orange-200 bg-white rounded-b-xl flex justify-end gap-4" style={{ backgroundColor: '#FFF8F0' }}>
              <button 
                onClick={toggleModal}
                className="px-6 py-2 text-gray-600 font-medium hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button className="px-8 py-3 text-white font-bold rounded-lg shadow-md transition-transform active:scale-95" style={{ backgroundColor: '#FF7F50' }}>
                Submit Registration
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

const SociofarePage = ({ onNavigate }) => (
  <section className="py-20 bg-white">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Sociofare</h1>
      <p className="text-lg text-gray-600 mb-8">Innovating social welfare through technology and community engagement.</p>
      <div className="bg-gray-50 p-8 rounded-xl">
        <p className="text-gray-700 leading-relaxed">
          Sociofare is our initiative to leverage technology and innovation to create sustainable solutions for social challenges. 
          Through partnerships and community-driven programs, we aim to transform how welfare services are delivered.
        </p>
      </div>
    </div>
  </section>
);

const OurCausesLandingPage = ({ onNavigate }) => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Our Causes</h1>
      <p className="text-lg text-gray-600 mb-12 text-center">Explore all the initiatives we support across India.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Mental Health', img: IMAGE_URLS.MENTAL_HEALTH, page: 'mental-health' },
          { title: 'Elderly Care', img: IMAGE_URLS.ELDERLY_CARE, page: 'elderly-care' },
          { title: 'Girl Education', img: IMAGE_URLS.GIRL_EDUCATION, page: 'girl-education' }
        ].map((cause, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer" onClick={() => onNavigate(cause.page)}>
            <ResponsiveImage src={cause.img} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">{cause.title}</h3>
              <button className="text-orange-500 font-semibold hover:text-orange-600">Learn More →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const StoriesPage = ({ onNavigate }) => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Our Stories</h1>
      <p className="text-lg text-gray-600 mb-12 text-center">Real stories of change from the communities we serve.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer" onClick={() => onNavigate('blog')}>
            <ResponsiveImage src={IMAGE_URLS.GIRL_EDUCATION} className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="text-orange-500 text-sm font-semibold">Nov {i}, 2025</span>
              <h3 className="text-xl font-bold mt-2 mb-3">Story Title {i}</h3>
              <p className="text-gray-600 text-sm">A heartwarming tale of resilience and transformation...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const EventsPage = ({ onNavigate }) => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Upcoming Events</h1>
      <p className="text-lg text-gray-600 mb-12 text-center">Join us at our next gathering or fundraiser.</p>
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500 hover:shadow-2xl transition">
            <div className="flex items-start gap-6">
              <div className="text-center">
                <div className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                  <div className="text-2xl font-bold">2{i}</div>
                  <div className="text-xs">DEC</div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Event Title {i}</h3>
                <p className="text-gray-600 mb-2">Location: Kolkata, India</p>
                <p className="text-sm text-gray-500">Join us for an inspiring event focused on community development.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ==================== EXISTING PAGES FROM SECOND CODE ====================
const GalleryPage = ({ onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Photo Gallery</h1>
        <p className="text-lg text-gray-700 mb-12 leading-relaxed">
          Explore the moments that define our mission and impact in communities across the world.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition duration-300 hover:scale-105"
              onClick={() => setSelectedImage(img)}
            >
              <ResponsiveImage 
                src={img}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-64 object-cover"
                fallbackText="Gallery+Image"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition duration-300" />
            </div>
          ))}
        </div>

        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
};

const DonatePage = ({ onNavigate = () => {} }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(5000);
  const [customAmount, setCustomAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [supportCategory, setSupportCategory] = useState('Elderly Care');
  const [citizenType, setCitizenType] = useState('indian');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [pan, setPan] = useState('');
  const [isExistingDonor, setIsExistingDonor] = useState(false);

  const donationOptions = [5000, 15000, 25000];
  const finalAmount = customAmount ? parseFloat(customAmount) : amount;

  const handleSelectAmount = useCallback((val) => {
    setAmount(val);
    setCustomAmount('');
  }, []);

  const handleCustomAmountChange = useCallback((e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setAmount(0);
    } else if (donationOptions.includes(amount)) {
      setAmount(donationOptions[0]);
    }
  }, [amount]);

  const handleNext = useCallback(() => {
    if (finalAmount <= 0) return;
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [finalAmount]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Donation submitted:', { finalAmount, isRecurring, firstName, lastName, email, mobile, supportCategory });
    onNavigate('home');
  }, [finalAmount, isRecurring, firstName, lastName, email, mobile, supportCategory, onNavigate]);

  const FormInput = ({ id, label, type = 'text', value, onChange, required = false }) => (
    <div className="group">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-focus-within:text-orange-500">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-gray-400"
      />
    </div>
  );

  const StatCard = ({ icon: Icon, value, label }) => (
    <div className="flex flex-col items-center text-white p-3 transform transition-all duration-300 hover:scale-110">
      <Icon className="w-8 h-8 mb-1 animate-pulse" />
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm font-medium text-white/90">{label}</div>
    </div>
  );

  const FocusAreaCard = ({ icon: Icon, title, subtitle, iconColor }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg border-b-4 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer group">
      <div 
        className="p-4 rounded-full mb-3 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" 
        style={{ backgroundColor: iconColor.bg }}
      >
        <Icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" style={{ color: iconColor.fg }} />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-1 transition-colors duration-300 group-hover:text-orange-500">{title}</h3>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen font-sans antialiased" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center text-sm font-semibold mb-8 hover:text-gray-700 transition-all duration-300 hover:translate-x-[-4px] group"
          style={{ color: COLORS.ACCENT_ORANGE }}
        >
          <ChevronRight className="w-5 h-5 rotate-180 mr-1 transition-transform duration-300 group-hover:translate-x-[-2px]" /> 
          Back to Home
        </button>

        {/* Step 1 - Donation Form */}
        <div 
          className={`transition-all duration-500 ${step === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'}`}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div
              className="grid grid-cols-1 lg:grid-cols-2 relative z-10 border-b-8 shadow-2xl"
              style={{
                backgroundColor: COLORS.ACCENT_ORANGE,
                borderColor: COLORS.PRIMARY_DARK,
              }}
            >
              {/* Left Side - Hero Section */}
              <div className="p-6 sm:p-8 lg:p-10 text-center lg:text-left flex flex-col justify-center animate-fadeIn">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
                  Transform Lives, Empower Communities
                </h1>
                <p className="text-base sm:text-lg text-white/90 max-w-3xl lg:max-w-none mx-auto mb-6 sm:mb-10">
                  Join us in building a compassionate world where every elderly person can thrive with dignity.
                </p>
                
                <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-b border-white/30 py-4 max-w-xl lg:max-w-none mx-auto">
                  <StatCard icon={Users} value="50K+" label="Lives Touched" />
                  <StatCard icon={MapPin} value="25" label="Regions Served" />
                  <StatCard icon={Clock} value="10+" label="Years of Service" />
                </div>
              </div>

              {/* Right Side - Donation Form */}
              <div className="p-4 sm:p-4 lg:p-6 flex flex-col justify-center">
                <div 
                  className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl border-4 transition-all duration-300 hover:shadow-3xl" 
                  style={{ borderColor: COLORS.PRIMARY_DARK }}
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Sabri Helpage Donation</h2>
                  
                  <form className="space-y-4 sm:space-y-5">
                    {/* Amount Selection */}
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      {donationOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectAmount(opt)}
                          className={`flex-1 py-2 sm:py-3 rounded-xl text-base sm:text-lg font-bold transition-all duration-300 shadow-md transform hover:scale-105 active:scale-95 ${
                            amount === opt
                              ? 'bg-orange-500 text-white scale-105'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          style={amount === opt ? { backgroundColor: COLORS.ACCENT_ORANGE } : {}}
                        >
                          ₹{opt.toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount */}
                    <div>
                      <input
                        type="number"
                        placeholder="₹ Other Amount (Min ₹ 100)"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        min="100"
                        className={`w-full p-3 rounded-xl text-base sm:text-lg text-gray-800 border-2 transition-all duration-300 focus:outline-none focus:ring-2 hover:border-orange-300 ${
                          finalAmount > 0 && customAmount && amount === 0 ? 'border-orange-500 ring-orange-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    
                    {finalAmount <= 0 && (
                      <p className="text-red-500 text-sm animate-pulse">Please select or enter an amount.</p>
                    )}

                    {/* Support Category */}
                    <div>
                      <label htmlFor="support-category" className="block text-sm font-semibold text-gray-700 mb-2">
                        I offer my support for
                      </label>
                      <select
                        id="support-category"
                        value={supportCategory}
                        onChange={(e) => setSupportCategory(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white text-gray-800 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all duration-200 hover:border-gray-400 cursor-pointer"
                      >
                        <option>Elderly Care</option>
                        <option>Education</option>
                        <option>Mental Health</option>
                        <option>General Fund</option>
                      </select>
                    </div>

                    {/* Login Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        className="w-full py-3 rounded-xl text-base sm:text-lg font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-md border-2 border-transparent hover:border-gray-300 transform hover:scale-[1.02] active:scale-95"
                      >
                        <span className="text-xs sm:text-sm font-medium block mb-1 text-gray-500">For Regular Donors</span>
                        Login
                      </button>
                    </div>

                    {/* One-time / Recurring */}
                    <div className="flex justify-between gap-3 sm:gap-4 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsRecurring(false)}
                        className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 border transform hover:scale-105 active:scale-95 ${
                          !isRecurring ? 'bg-orange-500 text-white shadow-md border-orange-500 scale-105' : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                        style={!isRecurring ? { backgroundColor: COLORS.ACCENT_ORANGE } : {}}
                      >
                        One-time
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsRecurring(true)}
                        className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 border transform hover:scale-105 active:scale-95 ${
                          isRecurring ? 'bg-orange-500 text-white shadow-md border-orange-500 scale-105' : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                        style={isRecurring ? { backgroundColor: COLORS.ACCENT_ORANGE } : {}}
                      >
                        Monthly Recurring
                      </button>
                    </div>
                    
                    {/* Next Button */}
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={finalAmount <= 0}
                        className="w-full py-3 rounded-xl text-lg sm:text-xl font-bold text-white transition-all duration-300 shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-95 hover:shadow-2xl"
                        style={{ backgroundColor: finalAmount > 0 ? COLORS.PRIMARY_DARK : undefined }}
                      >
                        Next
                      </button>
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center pt-2">
                      All Donations to Sabri Helpage are tax exempted.
                    </p>
                  </form>
                </div>
              </div>
            </div>
                
            {/* Focus Areas Section */}
            <div className="py-10 sm:py-16 px-4 sm:px-10 lg:px-20">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-2">Our Focus Areas</h2>
              <p className="text-sm sm:text-md text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
                We're committed to creating sustainable change across critical sectors that impact the most vulnerable members of society.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <FocusAreaCard
                  icon={Heart}
                  title="Mental Health"
                  subtitle="Ensuring mental health and healthcare."
                  iconColor={{ fg: '#f97316', bg: '#fff7ed' }}
                />
                <FocusAreaCard
                  icon={Users}
                  title="Elderly Care"
                  subtitle="Dignity and support for senior citizens."
                  iconColor={{ fg: '#10b981', bg: '#ecfdf5' }}
                />
                <FocusAreaCard
                  icon={BookOpen}
                  title="Girl Child Education"
                  subtitle="Education and girl child empowerment."
                  iconColor={{ fg: '#3b82f6', bg: '#eff6ff' }}
                />
              </div>
            </div>

            {/* Impact Section */}
            <div className="py-10 sm:py-16 px-4 sm:px-10 lg:px-20" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
              <div className="grid grid-cols-1">
                <div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 text-gray-900" style={{ color: COLORS.ACCENT_ORANGE }}>
                    Your Support Creates Impact
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
                    When you donate, you're not just giving money. You're providing education, healthcare, protection, and hope to those who need it most. Every rupee is a step towards a more equitable world.
                  </p>

                  <div className="bg-white p-4 rounded-xl shadow-md border-l-4 transition-all duration-300 hover:shadow-lg" style={{ borderColor: COLORS.PRIMARY_DARK }}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center text-xs sm:text-sm font-semibold text-gray-800 space-y-2 sm:space-y-0 sm:space-x-4 mb-2">
                      <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> 100% Transparent</span>
                      <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Verified NGO</span>
                      <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Direct Impact</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      We ensure that your donation reaches those who need it most, with complete transparency and accountability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 - Donor Details */}
        <div 
          className={`transition-all duration-500 ${step === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'}`}
        >
          <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 lg:p-10 rounded-2xl shadow-2xl border-t-8" style={{ borderColor: COLORS.PRIMARY_DARK }}>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-2">Donor Details</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Please provide your details for tax receipt generation and confirmation.
            </p>
            
            {/* Donation Summary */}
            <div className="bg-gray-50 p-4 rounded-xl mb-6 sm:mb-8 border border-gray-200 transition-all duration-300 hover:shadow-md">
              <h3 className="text-base sm:text-lg font-bold text-gray-700 flex items-center mb-2">
                <Wallet className="w-5 h-5 mr-2 text-green-600" /> Donation Summary
              </h3>
              <div className="flex justify-between text-sm text-gray-600 border-b border-gray-100 pb-2 mb-2">
                <span>Amount:</span>
                <span className="font-semibold text-gray-800">₹{finalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 border-b border-gray-100 pb-2 mb-2">
                <span>Support Category:</span>
                <span className="font-semibold text-gray-800">{supportCategory}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Frequency:</span>
                <span className="font-semibold text-gray-800">{isRecurring ? 'Monthly Recurring' : 'One-time'}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Citizenship */}
              <div>
                <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3">Citizenship</label>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {['indian', 'foreign'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setCitizenType(type)}
                      className={`flex-1 p-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 flex items-center justify-center transform hover:scale-[1.02] active:scale-95 ${
                        citizenType === type ? 'text-white shadow-lg scale-[1.02]' : 'bg-gray-100 text-gray-800 border-2 border-gray-300 hover:border-gray-500'
                      }`}
                      style={citizenType === type ? { backgroundColor: COLORS.PRIMARY_DARK } : {}}
                    >
                      {type === 'indian' ? 'Indian Citizens' : 'Foreign Citizens/OCI'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput id="first-name" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <FormInput id="last-name" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <FormInput id="mobile" label="Mobile Number" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
              </div>

              {/* DOB and PAN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput id="dob" label="Date of Birth" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                {citizenType === 'indian' && (
                  <FormInput id="pan" label="PAN Number" value={pan} onChange={(e) => setPan(e.target.value)} required />
                )}
              </div>

              {/* Address Section */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-700 pt-4 border-t border-gray-100">Address Details</h3>
              <FormInput id="address" label="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} required />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInput id="zip" label="Zip/Postal Code" value={zip} onChange={(e) => setZip(e.target.value)} required />
                <FormInput id="city" label="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                <FormInput id="province" label="State/Province" value={province} onChange={(e) => setProvince(e.target.value)} required />
              </div>
              
              {/* Existing Donor */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Are you an existing donor?</label>
                <div className="flex gap-6">
                  <div className="flex items-center group cursor-pointer">
                    <input
                      id="existing-yes"
                      name="existing-donor"
                      type="radio"
                      checked={isExistingDonor === true}
                      onChange={() => setIsExistingDonor(true)}
                      className="h-4 w-4 cursor-pointer transition-transform duration-200 group-hover:scale-110"
                      style={{ accentColor: COLORS.PRIMARY_DARK }}
                    />
                    <label htmlFor="existing-yes" className="ml-2 block text-sm text-gray-900 cursor-pointer group-hover:text-orange-500 transition-colors">Yes</label>
                  </div>
                  <div className="flex items-center group cursor-pointer">
                    <input
                      id="existing-no"
                      name="existing-donor"
                      type="radio"
                      checked={isExistingDonor === false}
                      onChange={() => setIsExistingDonor(false)}
                      className="h-4 w-4 cursor-pointer transition-transform duration-200 group-hover:scale-110"
                      style={{ accentColor: COLORS.PRIMARY_DARK }}
                    />
                    <label htmlFor="existing-no" className="ml-2 block text-sm text-gray-900 cursor-pointer group-hover:text-orange-500 transition-colors">No</label>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
                By sharing your details, you agree to receive tax receipt, stories and updates via mobile, WhatsApp, landline, email, and post.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 order-2 sm:order-1 w-full py-3 px-6 rounded-xl text-base sm:text-lg font-bold text-gray-800 bg-gray-200 hover:bg-gray-300 transition-all duration-300 shadow-md transform hover:scale-[1.02] active:scale-95"
                >
                  Back to Amount
                </button>
                <button
                  type="submit"
                  disabled={
                    !firstName || !lastName || !email || !mobile || !address || !zip || !city || !province || (citizenType === 'indian' && !pan)
                  }
                  className="flex-1 order-1 sm:order-2 w-full py-3 px-6 rounded-xl text-base sm:text-lg font-bold text-white transition-all duration-300 shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-95 hover:shadow-2xl"
                  style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
                >
                  Pay ₹{finalAmount.toLocaleString('en-IN')} Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        input:focus, select:focus {
          transform: scale(1.01);
        }

        button:active {
          transform: scale(0.95);
        }

        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }

        .group:hover .group-hover\\:rotate-6 {
          transform: rotate(6deg);
        }

        .group:hover .group-hover\\:text-orange-500 {
          color: #f97316;
        }

        .group:hover .group-hover\\:translate-x-\\[-2px\\] {
          transform: translateX(-2px);
        }

        .group-focus-within\\:text-orange-500:focus-within {
          color: #f97316;
        }

        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
};

const MentalHealthPage = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <ResponsiveImage 
          src={IMAGE_URLS.MENTAL_HEALTH}
          alt="Mental Health Support"
          className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg"
          fallbackText="Mental+Health"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Mental Health Awareness and Support</h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Mental health is an intrinsic part of human well-being, yet it often remains stigmatized and underserved. Sabri Helpage is committed to breaking the silence surrounding mental health issues.
        </p>
        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>Our Approach</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700 mb-10">
          <li><strong>Free Counseling:</strong> Providing subsidized or free sessions with certified psychoanalysts.</li>
          <li><strong>Awareness Workshops:</strong> Conducting workshops in schools and communities.</li>
          <li><strong>Digital Resources:</strong> Creating online content and self-help guides.</li>
          <li><strong>Support Groups:</strong> Facilitating safe, confidential spaces for sharing.</li>
        </ul>
        <div className="p-6 rounded-xl text-center shadow-inner" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
          <h3 className="text-2xl font-bold mb-3 text-gray-900">Need Help Now?</h3>
          <p className="text-lg text-gray-700 mb-4">You are not alone. Reach out for confidential support today.</p>
          <a 
            href="mailto:info@sabrihelpage.org"
            className="inline-block text-white px-8 py-3 rounded-full font-bold transition duration-300 shadow-md hover:opacity-90"
            style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
};

const ElderlyCarePage = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <ResponsiveImage 
          src={IMAGE_URLS.ELDERLY_CARE}
          alt="Elderly Care"
          className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg"
          fallbackText="Elderly+Care"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Dignified Elderly Care Program</h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Our seniors deserve respect, companionship, and high-quality care. Sabri Helpage runs initiatives focused on combating loneliness and ensuring dignified living.
        </p>
        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>Program Pillars</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700 mb-10">
          <li><strong>Home Visits:</strong> Regular visits from volunteers to provide companionship.</li>
          <li><strong>Medical Camps:</strong> Free health screenings and medication assistance.</li>
          <li><strong>Recreational Centers:</strong> Creating safe spaces for social interaction.</li>
          <li><strong>Emotional Support:</strong> Counseling services to address depression and isolation.</li>
        </ul>
        <div className="p-6 rounded-xl text-center shadow-inner" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
          <h3 className="text-2xl font-bold mb-3 text-gray-900">Volunteer Today</h3>
          <p className="text-lg text-gray-700 mb-4">Your time is a priceless gift. Spend an hour connecting with a senior.</p>
          <button 
            onClick={() => onNavigate('contact')}
            className="text-white px-8 py-3 rounded-full font-bold transition duration-300 shadow-md hover:opacity-90"
            style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
          >
            Apply to Volunteer
          </button>
        </div>
      </div>
    </section>
  );
};

const GirlEducationPage = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <ResponsiveImage 
          src={IMAGE_URLS.GIRL_EDUCATION}
          alt="Girl Education"
          className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg"
          fallbackText="Girl+Education"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Empowering the Girl Child through Education</h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Education is the single most powerful tool for breaking the cycle of poverty. Our Girl Child Education program provides scholarships and safe learning environments.
        </p>
        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>What We Provide</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700 mb-10">
          <li><strong>Scholarships:</strong> Covering tuition fees, examination costs, and school uniforms.</li>
          <li><strong>Mentorship:</strong> Connecting girls with successful women professionals.</li>
          <li><strong>Digital Literacy:</strong> Training in basic computer skills and internet usage.</li>
          <li><strong>Health and Hygiene:</strong> Providing essential supplies and education.</li>
        </ul>
        <div className="p-6 rounded-xl text-center shadow-inner" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
          <h3 className="text-2xl font-bold mb-3 text-gray-900">Sponsor a Child</h3>
          <p className="text-lg text-gray-700 mb-4">Your contribution of just $30 per month can support a girl's entire education.</p>
          <button 
            onClick={() => onNavigate('donate')}
            className="text-white px-8 py-3 rounded-full font-bold transition duration-300 shadow-md hover:opacity-90"
            style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
          >
            Sponsor Now
          </button>
        </div>
      </div>
    </section>
  );
};

const BlogPage = ({ onNavigate }) => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <BackButton onClick={() => onNavigate('home')} />
      <h1 className="text-4xl font-bold mb-12 text-center">Our Blog</h1>
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
            <span className="text-orange-500 text-sm font-semibold">November {i}, 2025</span>
            <h2 className="text-2xl font-bold mt-2 mb-3">Blog Post Title {i}</h2>
            <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            <button className="text-orange-500 font-semibold hover:text-orange-600">Read More →</button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CSRSummitPage = ({ onNavigate }) => (
  <section className="py-20 bg-white">
    <div className="max-w-4xl mx-auto px-4">
      <BackButton onClick={() => onNavigate('home')} />
      <h1 className="text-4xl font-bold mb-6">CSR & ESG Summit</h1>
      <p className="text-lg text-gray-700 mb-8">Join us for our annual Corporate Social Responsibility and ESG Summit, bringing together industry leaders and changemakers.</p>
      <div className="bg-gray-50 p-8 rounded-xl">
        <h3 className="text-2xl font-bold mb-4">Summit Highlights</h3>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li>Keynote speeches from industry leaders</li>
          <li>Panel discussions on sustainability</li>
          <li>Networking opportunities</li>
          <li>Award ceremonies</li>
        </ul>
      </div>
    </div>
  </section>
);

const AwardsPage = ({ onNavigate }) => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <BackButton onClick={() => onNavigate('home')} />
      <h1 className="text-4xl font-bold mb-12 text-center">Awards & Recognition</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-4xl">🏆</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Award Title {i}</h3>
              <p className="text-sm text-gray-600">January 2025</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PrivacyPage = ({ onNavigate }) => (
  <section className="py-20 bg-white">
    <div className="max-w-4xl mx-auto px-4">
      <BackButton onClick={() => onNavigate('home')} />
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <div className="space-y-6 text-gray-700">
        <p>Sabri Helpage is committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your information.</p>
        <h2 className="text-2xl font-bold" style={{ color: COLORS.ACCENT_ORANGE }}>Information Collection</h2>
        <p>We collect information when you donate, volunteer, or register for updates. This includes your name, contact details, and payment information.</p>
        <h2 className="text-2xl font-bold" style={{ color: COLORS.ACCENT_ORANGE }}>Data Protection</h2>
        <p>We implement industry-standard security measures to protect your personal information from unauthorized access.</p>
      </div>
    </div>
  </section>
);

const TermsPage = ({ onNavigate }) => (
  <section className="py-20 bg-white">
    <div className="max-w-4xl mx-auto px-4">
      <BackButton onClick={() => onNavigate('home')} />
      <h1 className="text-4xl font-bold mb-6">Terms of Use</h1>
      <div className="space-y-6 text-gray-700">
        <p>By accessing and using this website, you agree to be bound by these terms and conditions.</p>
        <h2 className="text-2xl font-bold" style={{ color: COLORS.ACCENT_ORANGE }}>Usage Guidelines</h2>
        <p>You agree to use this website only for lawful purposes and in a manner that does not infringe upon the rights of others.</p>
        <h2 className="text-2xl font-bold" style={{ color: COLORS.ACCENT_ORANGE }}>Copyright</h2>
        <p>All content on this website is protected by copyright and may not be reproduced without permission.</p>
      </div>
    </div>
  </section>
);

const FAQPage = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    { q: "How will my donation make a difference?", a: "Every contribution directly supports our programs in mental health, elderly care, and education." },
    { q: "Are donations tax deductible?", a: "Yes, all donations to Sabri Helpage are eligible for tax exemption under Section 80G." },
    { q: "Can I volunteer with Sabri Helpage?", a: "Absolutely! We welcome volunteers. Please contact us through our website." },
    { q: "How transparent is Sabri Helpage?", a: "We maintain complete transparency with regular audits and public reports." }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <BackButton onClick={() => onNavigate('home')} />
        <h1 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-900">{faq.q}</span>
                <ChevronRight 
                  className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-90' : ''}`}
                  style={{ color: COLORS.ACCENT_ORANGE }}
                />
              </button>
              {openIndex === index && (
                <div className="pb-4 text-gray-700 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PublicationsPage = ({ onNavigate }) => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <BackButton onClick={() => onNavigate('home')} />
      <h1 className="text-4xl font-bold mb-12 text-center">Publications</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6">
            <div className="h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-5xl">📄</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Annual Report {2020 + i}</h3>
            <p className="text-sm text-gray-600 mb-4">Comprehensive overview of our activities and impact.</p>
            <button className="text-orange-500 font-semibold hover:text-orange-600">Download PDF →</button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const InternshipPage = ({ onNavigate }) => (
  <section className="py-20 bg-white">
    <div className="max-w-4xl mx-auto px-4">
      <BackButton onClick={() => onNavigate('home')} />
      <h1 className="text-4xl font-bold mb-6">Internship Opportunities</h1>
      <p className="text-lg text-gray-700 mb-8">
        Join Sabri Helpage as an intern and gain valuable experience while making a real difference.
      </p>
      <div className="space-y-6">
        {['Social Work', 'Content Writing', 'Program Management', 'Research'].map((role, i) => (
          <div key={i} className="bg-gray-50 p-6 rounded-xl border-l-4 border-orange-500">
            <h3 className="text-xl font-bold mb-2">{role} Intern</h3>
            <p className="text-sm text-gray-600">Duration: 3-6 months | Location: Remote/Kolkata</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <button 
          onClick={() => onNavigate('contact')}
          className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  </section>
);

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
      case 'gallery': return <GalleryPage onNavigate={handleNavigate} />;
      case 'donate': return <DonatePage onNavigate={handleNavigate} />;
      case 'ilc': return <ILCPage onNavigate={handleNavigate} />;
      case 'sociofare': return <SociofarePage onNavigate={handleNavigate} />;
      case 'ourcauses': return <OurCausesLandingPage onNavigate={handleNavigate} />;
      case 'stories': return <StoriesPage onNavigate={handleNavigate} />;
      case 'events': return <EventsPage onNavigate={handleNavigate} />;
      case 'privacy': return <PrivacyPage onNavigate={handleNavigate} />;
      case 'terms': return <TermsPage onNavigate={handleNavigate} />;
      case 'faq': return <FAQPage onNavigate={handleNavigate} />;
      case 'publications': return <PublicationsPage onNavigate={handleNavigate} />;
      case 'csr': return <CSRSummitPage onNavigate={handleNavigate} />;
      case 'awards': return <AwardsPage onNavigate={handleNavigate} />;
      case 'blog': return <BlogPage onNavigate={handleNavigate} />;
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