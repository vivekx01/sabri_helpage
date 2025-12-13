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
                  View More
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-gradient-to-br from-[#F5F0E8] via-[#FFF9F4] to-[#F5F0E8] min-h-screen pb-20">
      {/* Header with decorative elements */}
      <div className="pt-16 pb-8 text-center relative">
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#FF8C42] opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-[#C75C2E] opacity-10 rounded-full blur-3xl"></div>
        <h1 className="text-5xl font-serif font-bold text-gray-900 relative z-10">
          Let's <span className="text-[#C75C2E]">Connect</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto px-4">
          Have questions or want to make a difference? We'd love to hear from you. 
          Reach out and let's create positive change together.
        </p>
      </div>

      {/* Stats Banner */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#C75C2E] to-[#A84920] p-6 rounded-2xl text-white text-center shadow-xl">
            <Clock className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-sm opacity-90">Response Time</div>
          </div>
          <div className="bg-gradient-to-br from-[#FF8C42] to-[#E67E22] p-6 rounded-2xl text-white text-center shadow-xl">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">1000+</div>
            <div className="text-sm opacity-90">Lives Touched</div>
          </div>
          <div className="bg-gradient-to-br from-[#8B5A2B] to-[#6d4620] p-6 rounded-2xl text-white text-center shadow-xl">
            <MessageCircle className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">100%</div>
            <div className="text-sm opacity-90">Dedicated Support</div>
          </div>
        </div>
      </div>

      {/* Query Banner with gradient */}
      <div className="bg-gradient-to-r from-[#A84920] via-[#C75C2E] to-[#FF8C42] py-16 relative overflow-hidden mb-20 shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Have a <span className="text-[#FFF9F4]">Question?</span>
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Whether you're looking to volunteer, donate, or simply learn more about our mission, 
            we're here to help guide your journey toward making an impact.
          </p>
        </div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-white/20 hidden lg:block">
          <div className="text-9xl">💬</div>
        </div>
        <div className="absolute left-10 top-1/2 -translate-y-1/2 text-white/20 hidden lg:block">
          <div className="text-7xl">✨</div>
        </div>
      </div>

      {/* Contact Form with modern design */}
      <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-20 mb-24">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#FF8C42]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#FF8C42]/10 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#C75C2E]/10 to-transparent rounded-tr-full"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#C75C2E] to-[#FF8C42] rounded-2xl mb-4 shadow-lg">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Send us a Message
              </h3>
              <p className="text-gray-600">We typically respond within 24 hours</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#C75C2E] text-sm bg-gray-50 transition duration-300 hover:border-[#FF8C42]"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#C75C2E] text-sm bg-gray-50 transition duration-300 hover:border-[#FF8C42]"
                  />
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#C75C2E] text-sm bg-gray-50 transition duration-300 hover:border-[#FF8C42]"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows="6"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#C75C2E] text-sm bg-gray-50 transition duration-300 resize-none hover:border-[#FF8C42]"
                ></textarea>
                <span className="absolute bottom-4 right-4 text-gray-400 text-2xl">✎</span>
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-[#C75C2E] to-[#FF8C42] text-white px-12 py-4 rounded-xl font-bold text-base hover:from-[#A84920] hover:to-[#E67E22] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-3">
            Other Ways to <span className="text-[#C75C2E]">Reach Us</span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your preferred method of communication. We're available through multiple channels 
            to ensure you can connect with us conveniently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Address Card */}
          <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#C75C2E] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF8C42]/10 to-transparent rounded-bl-full"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-[#C75C2E] to-[#FF8C42] w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-xl">Visit Our Office</h4>
              <p className="text-sm text-gray-500 mb-4">Drop by for a chat or to learn more about our work</p>
              <p className="text-sm text-gray-700 mb-5 leading-relaxed font-medium">
                7 B, Mysore Road, Rashbehari Avenue,<br />Kolkata - 700026, West Bengal
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=7+B+Mysore+Road+Rashbehari+Avenue+Kolkata+700026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-[#C75C2E] font-bold hover:text-[#FF8C42] transition group-hover:gap-3 gap-2"
              >
                <Globe className="w-5 h-5" /> Get Directions
              </a>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#FF8C42] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C75C2E]/10 to-transparent rounded-bl-full"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-[#FF8C42] to-[#E67E22] w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-xl">Email Us</h4>
              <p className="text-sm text-gray-500 mb-4">For detailed inquiries and documentation</p>
              <p className="text-sm text-gray-700 mb-5 leading-relaxed font-medium">
                info@sabrihelpage.org
              </p>
              <a
                href="mailto:info@sabrihelpage.org"
                className="inline-flex items-center text-sm text-[#FF8C42] font-bold hover:text-[#C75C2E] transition group-hover:gap-3 gap-2"
              >
                <Send className="w-5 h-5" /> Send Email
              </a>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#8B5A2B] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8B5A2B]/10 to-transparent rounded-bl-full"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-[#8B5A2B] to-[#6d4620] w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-xl">Call Us (Mobile)</h4>
              <p className="text-sm text-gray-500 mb-4">Available during business hours for immediate assistance</p>
              <p className="text-sm text-gray-700 mb-5 leading-relaxed font-medium">
                +91 9874021457
              </p>
              <a
                href="tel:+919874021457"
                className="inline-flex items-center text-sm text-[#8B5A2B] font-bold hover:text-[#6d4620] transition group-hover:gap-3 gap-2"
              >
                <Phone className="w-5 h-5" /> Call Now
              </a>
            </div>
          </div>

          {/* Telephone Card */}
          <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#C75C2E] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF8C42]/10 to-transparent rounded-bl-full"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-[#C75C2E] to-[#A84920] w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-xl">Office Line</h4>
              <p className="text-sm text-gray-500 mb-4">Reach our main office for general inquiries</p>
              <p className="text-sm text-gray-700 mb-5 leading-relaxed font-medium">
                033 4601 3886
              </p>
              <a
                href="tel:03346013886"
                className="inline-flex items-center text-sm text-[#C75C2E] font-bold hover:text-[#FF8C42] transition group-hover:gap-3 gap-2"
              >
                <Phone className="w-5 h-5" /> Call Office
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-gradient-to-r from-[#8B5A2B] via-[#A84920] to-[#C75C2E] rounded-3xl p-10 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join us in our mission to transform lives. Every conversation starts with a simple hello.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-white text-[#C75C2E] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg">
                Learn More
              </button>
              <button className="bg-[#FF8C42] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#E67E22] transition shadow-lg">
                Get Involved
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




// ==========// ILC Page Component
// Events Page Component with matching color theme
const EventsPage = () => (
  <div className="min-h-screen bg-white">
    {/* Header */}
    <div className="bg-[#FF7F50] text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Upcoming Events</h1>
       
      </div>
    </div>

    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-[#FF7F50] mb-6">Upcoming Events</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join us at our next gatherings, fundraisers, and community programs to make a difference together.
        </p>
        <div className="h-1 w-24 bg-[#FF7F50] mx-auto mt-6"></div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-[#FFF8F0] p-6 rounded-xl text-center">
          <div className="text-4xl font-bold text-[#FF7F50] mb-2">15+</div>
          <div className="text-gray-700">Events This Year</div>
        </div>
        <div className="bg-[#FFF8F0] p-6 rounded-xl text-center">
          <div className="text-4xl font-bold text-[#FF7F50] mb-2">5K+</div>
          <div className="text-gray-700">Participants</div>
        </div>
        <div className="bg-[#FFF8F0] p-6 rounded-xl text-center">
          <div className="text-4xl font-bold text-[#FF7F50] mb-2">12</div>
          <div className="text-gray-700">Cities Covered</div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg border border-[#FFE4D6] overflow-hidden hover:shadow-xl transition-shadow">
            <div className="md:flex">
              {/* Event Date */}
              <div className="md:w-1/5 bg-[#FF7F50] text-white p-8 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold">2{i}</div>
                <div className="text-xl uppercase">DEC</div>
                <div className="text-lg">2025</div>
                <div className="mt-4 text-sm bg-white text-[#FF7F50] px-3 py-1 rounded-full font-semibold">
                  {i === 1 ? 'Upcoming' : i === 2 ? 'Ongoing' : 'Registration Open'}
                </div>
              </div>
              
              {/* Event Details */}
              <div className="md:w-4/5 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Community Health Camp #{i}</h3>
                <p className="text-gray-600 mb-6">
                  Join us for a comprehensive health check-up camp focusing on elderly care and mental health awareness. 
                  Free consultations, health screenings, and wellness workshops for all age groups.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-map-marker-alt text-[#FF7F50]"></i>
                    <span className="text-gray-700">Kolkata Community Center, West Bengal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-clock text-[#FF7F50]"></i>
                    <span className="text-gray-700">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-users text-[#FF7F50]"></i>
                    <span className="text-gray-700">Expected: 300+ Participants</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-tag text-[#FF7F50]"></i>
                    <span className="text-gray-700">Free Entry</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-[#FFF8F0] text-[#E67347] px-3 py-1 rounded-full text-sm">Health</span>
                  <span className="bg-[#FFF8F0] text-[#E67347] px-3 py-1 rounded-full text-sm">Elderly Care</span>
                  <span className="bg-[#FFF8F0] text-[#E67347] px-3 py-1 rounded-full text-sm">Mental Health</span>
                  <span className="bg-[#FFF8F0] text-[#E67347] px-3 py-1 rounded-full text-sm">Community</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-6 py-3 bg-[#FF7F50] text-white font-semibold rounded-lg hover:bg-[#E67347] transition-colors flex items-center gap-2 justify-center">
                    <i className="fas fa-calendar-plus"></i>
                    Register Now
                  </button>
                  <button className="px-6 py-3 border border-[#FF7F50] text-[#FF7F50] font-semibold rounded-lg hover:bg-[#FFF8F0] transition-colors flex items-center gap-2 justify-center">
                    <i className="fas fa-share-alt"></i>
                    Share Event
                  </button>
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center">
                    <i className="fas fa-info-circle"></i>
                    More Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Past Events Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-[#FF7F50] mb-8 text-center">Past Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-[#FFE4D6] p-6 hover:shadow-lg transition-shadow">
              <div className="text-[#FF7F50] font-bold text-lg mb-2">Nov {15 + i}, 2025</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Youth Empowerment Workshop</h3>
              <p className="text-gray-600 text-sm mb-4">
                Skill development session for underprivileged youth in rural communities.
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span>Delhi Center</span>
              </div>
              <button className="w-full py-2 border border-[#FF7F50] text-[#FF7F50] font-medium rounded-lg hover:bg-[#FFF8F0] transition-colors">
                View Photos
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16 bg-[#FFF8F0] rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-[#FF7F50] mb-4">Stay Updated</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter to get notified about upcoming events, volunteer opportunities, and community programs.
        </p>
        <div className="max-w-md mx-auto flex gap-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-4 py-3 border border-[#FFE4D6] rounded-lg focus:ring-2 focus:ring-[#FF7F50] outline-none"
          />
          <button className="px-6 py-3 bg-[#FF7F50] text-white font-semibold rounded-lg hover:bg-[#E67347] transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Updated ILCPage with matching color theme from image
const ILCPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFocusAreas, setSelectedFocusAreas] = useState([]);
  const [otherFocusArea, setOtherFocusArea] = useState('');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const toggleFocusArea = (area) => {
    setSelectedFocusAreas(prev =>
      prev.includes(area)
        ? prev.filter(item => item !== area)
        : [...prev, area]
    );
  };

  const focusAreas = [
    "Community Development",
    "Research & Innovation",
    "Education & Youth",
    "Girl Child Empowerment",
    "Sustainability & Environment",
    "Social Welfare",
    "Skill Development",
    "Health & Well-being"
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Header */}
      <div className="bg-[#FF7F50] text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sabri Social Impact Club</h1>
          
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Welcome Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#FF7F50] mb-4">
            Welcome to Sabri Social Impact Club!
          </h2>
          <div className="h-1 w-24 bg-[#FF7F50] mx-auto"></div>
        </div>

        {/* Body Text */}
        <div className="prose max-w-none text-gray-700 leading-relaxed text-justify mb-16">
          <p className="mb-4 text-lg">
            <span className="font-bold text-[#FF7F50]">SSIC</span> is the vision of Sabri Helpage to create a caring and socially responsible community where businesses and nonprofits work together to make a difference in society that lasts.
          </p>
          <p className="text-lg">
            The Sabri Social Impact Club wants to see a future where people work together to help weak communities, give youth power, support girls, and make India's environmental and social welfare system stronger.
          </p>
        </div>

        {/* Register Button */}
        <div className="flex justify-center mb-16">
          <button 
            onClick={toggleModal}
            className="group relative px-8 py-4 bg-[#FF7F50] text-white font-bold rounded-full shadow-lg hover:bg-[#E67347] transition-all transform hover:-translate-y-1 flex items-center gap-3"
          >
            Register for SSIC Membership
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      </main>

      {/* Mission Banner */}
      <div className="w-full bg-[#FF7F50] py-16 px-6 text-center shadow-inner relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-white"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-2xl md:text-3xl text-white font-serif italic leading-normal">
            "To create a thriving ecosystem that connects people and organisations that care about social welfare and making a difference."
          </p>
          <p className="text-[#FFE4D6] mt-4 font-semibold tracking-wider uppercase text-sm">
            — SSIC Mission Statement
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h3 className="text-3xl text-[#FF7F50] mb-8 font-serif border-b pb-4">Our Mission</h3>
        
        <div className="space-y-6 text-gray-700">
          {[
            "To create a thriving ecosystem that connects people and organisations that care about social welfare and making a difference.",
            "To promote solutions based on research and new ways of doing things that deal with important social problems in a way that has a lasting, large-scale effect.",
            "To help businesses and non-profits share information, work together, and build their skills so that social development efforts are stronger and more unified.",
            "To encourage people to act in a socially responsible way through structured programs, partnerships, and initiatives that make communities stronger.",
            "To create a welcoming space where people can share their thoughts, resources, and chances to make society stronger, healthier, and more caring."
          ].map((mission, idx) => (
            <div key={idx} className="flex gap-4 items-start">
               <span className="font-bold text-[#FF7F50] text-xl">›</span>
               <p className="leading-relaxed">{mission}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl my-8 flex flex-col max-h-[90vh]" style={{ backgroundColor: '#FFF8F0' }}>
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#FFE4D6] sticky top-0 bg-white z-10 rounded-t-xl" style={{ backgroundColor: '#FFF8F0' }}>
              <div>
                <h2 className="text-2xl font-bold text-[#FF7F50]">SSIC Registration</h2>
                <p className="text-sm text-gray-600">Please fill out all details below to apply.</p>
              </div>
              <button onClick={toggleModal} className="p-2 hover:bg-[#FFE4D6] rounded-full transition-colors">
                <i className="fas fa-times text-gray-500"></i>
              </button>
            </div>

            {/* Form Content */}
            <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* Section A: Org Details */}
              <section className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-[#FF7F50]">
                  <i className="fas fa-building text-lg"></i>
                  <h3 className="font-bold text-lg">A. Organisation Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organisation Name</label>
                    <input type="text" className="w-full p-3 bg-white border border-[#FFE4D6] rounded-lg focus:ring-2 focus:ring-[#FF7F50] focus:border-[#FF7F50] outline-none transition-colors" placeholder="Enter full legal name" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type of Organisation</label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <label className="flex items-center gap-3 p-3 bg-white border border-[#FFE4D6] rounded-lg cursor-pointer hover:bg-[#FFF8F0] transition-colors flex-1">
                        <input type="radio" name="orgType" value="corporate" className="accent-[#FF7F50] w-4 h-4" />
                        <span className="text-gray-700 font-medium">Corporate</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 bg-white border border-[#FFE4D6] rounded-lg cursor-pointer hover:bg-[#FFF8F0] transition-colors flex-1">
                        <input type="radio" name="orgType" value="ngo" className="accent-[#FF7F50] w-4 h-4" />
                        <span className="text-gray-700 font-medium">NGO / Nonprofit</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                    <input type="text" className="w-full p-3 bg-white border border-[#FFE4D6] rounded-lg focus:ring-2 focus:ring-[#FF7F50] outline-none" placeholder="CIN / NGO Reg. No." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year of Establishment</label>
                    <input type="number" className="w-full p-3 bg-white border border-[#FFE4D6] rounded-lg focus:ring-2 focus:ring-[#FF7F50] outline-none" placeholder="YYYY" min="1900" max="2025" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry / Sector</label>
                    <input type="text" className="w-full p-3 bg-white border border-[#FFE4D6] rounded-lg focus:ring-2 focus:ring-[#FF7F50] outline-none" placeholder="e.g., Education, Healthcare, Technology" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Head Office Address</label>
                    <textarea rows="3" className="w-full p-3 bg-white border border-[#FFE4D6] rounded-lg focus:ring-2 focus:ring-[#FF7F50] outline-none resize-none" placeholder="Full address with city and PIN code"></textarea>
                  </div>
                </div>
              </section>

              {/* Section B: Contact Person */}
              <section className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-[#FF7F50]">
                  <i className="fas fa-user text-lg"></i>
                  <h3 className="font-bold text-lg">B. Contact Person Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" className="w-full p-3 bg-white border border-[#FFE4D6] rounded-lg focus:ring-2 focus:ring-[#FF7F50] outline-none" placeholder="Enter full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                    <input type="text" className="w-full p-3 bg-white border border-[#FFE4D6] rounded-lg focus:ring-2 focus:ring-[#FF7F50] outline-none" placeholder="e.g., CEO, Manager" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                    <input type="tel" className="w-full p-3 bg-white border border-[#FFE4D6] rounded-lg focus:ring-2 focus:ring-[#FF7F50] outline-none" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" className="w-full p-3 bg-white border border-[#FFE4D6] rounded-lg focus:ring-2 focus:ring-[#FF7F50] outline-none" placeholder="your@email.com" />
                  </div>
                </div>
              </section>

              {/* Section C: Membership Info */}
              <section className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-[#FF7F50]">
                  <i className="fas fa-id-card text-lg"></i>
                  <h3 className="font-bold text-lg">C. Membership Information</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Membership Category</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="flex items-center gap-3 p-4 bg-white border-2 border-[#FFE4D6] rounded-lg cursor-pointer hover:border-[#FF7F50] transition-colors has-[:checked]:border-[#FF7F50] has-[:checked]:bg-[#FFF8F0]">
                        <input type="radio" name="membership" value="annual" className="accent-[#FF7F50] w-4 h-4" />
                        <div>
                          <div className="font-medium text-gray-800">Annual Membership</div>
                          <div className="text-sm text-gray-500">Renew every year</div>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-4 bg-white border-2 border-[#FFE4D6] rounded-lg cursor-pointer hover:border-[#FF7F50] transition-colors has-[:checked]:border-[#FF7F50] has-[:checked]:bg-[#FFF8F0]">
                        <input type="radio" name="membership" value="3year" className="accent-[#FF7F50] w-4 h-4" />
                        <div>
                          <div className="font-medium text-gray-800">3-Year Membership</div>
                          <div className="text-sm text-gray-500">Best value option</div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Joining / Area of Interest</label>
                    <textarea rows="2" className="w-full p-3 bg-white border border-[#FFE4D6] rounded-lg focus:ring-2 focus:ring-[#FF7F50] outline-none resize-none" placeholder="Tell us why you want to join SSIC and your areas of interest..."></textarea>
                  </div>
                </div>
              </section>

              {/* Section D: Focus Areas */}
              <section className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-[#FF7F50]">
                  <i className="fas fa-bullseye text-lg"></i>
                  <h3 className="font-bold text-lg">D. Organisational Focus Areas</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {focusAreas.map((area) => (
                    <label key={area} className="flex items-center gap-3 p-3 bg-white border border-[#FFE4D6] rounded-lg cursor-pointer hover:bg-[#FFF8F0] transition-colors">
                      <input 
                        type="checkbox" 
                        checked={selectedFocusAreas.includes(area)}
                        onChange={() => toggleFocusArea(area)}
                        className="w-4 h-4 rounded border-gray-300 text-[#FF7F50] focus:ring-[#FF7F50]" 
                      />
                      <span className="text-gray-700 text-sm font-medium">{area}</span>
                    </label>
                  ))}
                  <div className="sm:col-span-2 flex items-center gap-3 p-3 bg-white border border-[#FFE4D6] rounded-lg">
                    <input 
                      type="checkbox" 
                      checked={otherFocusArea !== ''}
                      onChange={(e) => {
                        if (!e.target.checked) setOtherFocusArea('');
                        toggleFocusArea('Other');
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-[#FF7F50] focus:ring-[#FF7F50]" 
                    />
                    <span className="text-gray-700 text-sm font-medium whitespace-nowrap">Other:</span>
                    <input 
                      type="text" 
                      value={otherFocusArea}
                      onChange={(e) => setOtherFocusArea(e.target.value)}
                      className="flex-1 border-b border-[#FFE4D6] focus:border-[#FF7F50] outline-none px-2 py-1 bg-transparent" 
                      placeholder="Specify other focus area..." 
                    />
                  </div>
                </div>
              </section>

              {/* Section E: Activities */}
              <section className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-[#FF7F50]">
                  <i className="fas fa-chart-line text-lg"></i>
                  <h3 className="font-bold text-lg">E. Social Impact Activities</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Provide a short description of your organisation's ongoing or past social initiatives</p>
                <textarea rows="4" className="w-full p-3 bg-white border border-[#FFE4D6] rounded-lg focus:ring-2 focus:ring-[#FF7F50] outline-none resize-none" placeholder="Describe your social impact projects, beneficiaries, and outcomes..."></textarea>
              </section>

              {/* Section F: Documents */}
              <section className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-[#FF7F50]">
                  <i className="fas fa-file-upload text-lg"></i>
                  <h3 className="font-bold text-lg">F. Documents to Attach</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "Registration Certificate",
                    "PAN Card",
                    "Organisation Profile",
                    "Logo (High Resolution)",
                    "Contact Person ID Proof"
                  ].map((doc, index) => (
                    <label key={index} className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#FFE4D6] rounded-lg cursor-pointer hover:border-[#FF7F50] hover:bg-[#FFF8F0] transition-colors group">
                      <i className="fas fa-cloud-upload-alt text-2xl text-[#FF7F50] mb-2 group-hover:scale-110 transition-transform"></i>
                      <span className="text-sm font-medium text-gray-700 text-center">{doc}</span>
                      <span className="text-xs text-gray-500 mt-1">Click to upload</span>
                      <input type="file" className="hidden" />
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">Supported formats: PDF, JPG, PNG (Max 5MB each)</p>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#FFE4D6] bg-white rounded-b-xl flex flex-col sm:flex-row justify-between items-center gap-4" style={{ backgroundColor: '#FFF8F0' }}>
              <p className="text-sm text-gray-600 text-center sm:text-left">
                All fields are mandatory unless specified otherwise
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={toggleModal}
                  className="px-6 py-2.5 text-gray-600 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-8 py-2.5 bg-[#FF7F50] text-white font-semibold rounded-lg hover:bg-[#E67347] transition-colors shadow-md flex items-center gap-2">
                  <i className="fas fa-paper-plane"></i>
                  Submit Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const AboutPage = ({ onNavigate }) => (
  <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-orange-100">
    
    {/* Navigation / Back Button */}
    <div className="absolute top-6 left-6 z-10">
      <button 
        onClick={() => onNavigate('home')} 
        className="flex items-center text-gray-500 hover:text-[#C2410C] transition-colors font-medium text-sm group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </button>
    </div>

   
    {/* Main About Text Section */}
    <div className="bg-[#FFF7ED] border-y border-orange-100">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">Who We Are</h2>
        
        <div className="prose prose-lg text-gray-700 max-w-none leading-relaxed space-y-6">
          <p>
            Sabri Helpage was founded in 2013 and is based in Kolkata, India. Its simple goal is to bring dignity, care, and emotional support to communities that are often ignored. Over time, it has become a caring social project that focuses on three main areas: mental health, caring for the elderly, and educating girls.
          </p>
          <p>
            Sabri Helpage works at the grassroots level, helping families in need and villages that are hard to reach where there isn't much information or help. Sabri Helpage keeps making a difference by running counselling camps, programs for emotional well-being, help for seniors, and programs that promote education and empowerment for young girls.
          </p>
          <div className="bg-white p-8 border-l-4 border-[#F97316] rounded-r-xl shadow-sm my-8">
            <p className="font-medium text-gray-800 italic text-lg leading-relaxed">
              "What started as a sincere effort has now become a dependable source of support for many. Sabri Helpage is dedicated to making society more knowledgeable, emotionally strong, and welcoming, one life at a time."
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Governing Body Section */}
    <div className="max-w-5xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Governing Body</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          The visionaries and leaders dedicating their lives to compassionate service.
        </p>
      </div>

      <div className="space-y-12">
        
        {/* Profile 1: Aarti BR Singh */}
        <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-xl shadow-orange-100/40 hover:shadow-2xl hover:shadow-orange-100/60 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/4 w-full flex flex-col items-center text-center sticky top-24">
              <div className="w-32 h-32 rounded-full bg-[#FFF7ED] border-2 border-[#F97316] flex items-center justify-center mb-4 text-[#C2410C] text-3xl font-bold shadow-inner">
                AS
              </div>
              <h3 className="text-xl font-bold text-gray-900">Aarti BR Singh</h3>
              <p className="text-[#F97316] font-bold text-xs uppercase tracking-widest mt-2 bg-orange-50 px-3 py-1 rounded-full">Founder</p>
            </div>
            <div className="md:w-3/4 text-gray-600 leading-relaxed space-y-4">
              <p>
                Aarti BR Singh, the visionary Founder of Sabri Helpage, is a caring social leader whose work has changed the lives of many people in India. She started Sabri Helpage in 2013 because she cared deeply about the well-being of her community. She believed that everyone, no matter their age, background, or situation, deserves emotional support, respect, and hope.
              </p>
              <p>
                Aarti's journey has been fuelled by her concern for three important areas that society often ignores: mental health, elderly care, and girl child education. Sabri Helpage has become a trusted and respected initiative under her leadership. It helps vulnerable communities, especially in areas that don't get enough attention and don't have easy access to services.
              </p>
              <p>
                Her caring attitude, hands-on work, and ability to connect with people from all walks of life have helped shape the organization's identity. People know Aarti BR Singh for her commitment to making society more emotionally strong and welcoming. Her work continues to inspire many people who want to make a difference in the world.
              </p>
            </div>
          </div>
        </div>

        {/* Profile 2: Yash Guptaa */}
        <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-xl shadow-orange-100/40 hover:shadow-2xl hover:shadow-orange-100/60 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/4 w-full flex flex-col items-center text-center sticky top-24">
              <div className="w-32 h-32 rounded-full bg-[#FFF7ED] border-2 border-[#F97316] flex items-center justify-center mb-4 text-[#C2410C] text-3xl font-bold shadow-inner">
                YG
              </div>
              <h3 className="text-xl font-bold text-gray-900">Yash Guptaa</h3>
              <p className="text-[#F97316] font-bold text-xs uppercase tracking-widest mt-2 bg-orange-50 px-3 py-1 rounded-full">Philanthropist</p>
            </div>
            <div className="md:w-3/4 text-gray-600 leading-relaxed space-y-4">
              <p>
                Yash Guptaa is a young philanthropist who makes a difference in the world. His work for the greater good shows both compassion and purpose. He believes strongly in giving back to society, so he has worked to support causes that make a real difference in the lives of vulnerable communities over time.
              </p>
              <p>
                Yash's giving is based on feeling for others, taking responsibility, and taking action. He thinks that real service isn't just giving money; it's also understanding the real problems on the ground and working towards long-term solutions. His focus extends across mental health awareness, education for underprivileged children, elderly support, and welfare initiatives that uplift marginalized groups.
              </p>
              <p>
                With a forward-looking mindset, Yash Guptaa actively collaborates with organizations and social changemakers to amplify impact. His commitment to humanitarian work reflects his core values - kindness, integrity, and the desire to build a more compassionate society. He continues to inspire others to join the journey of meaningful service by volunteering, supporting community programs, or speaking out for social causes.
              </p>
            </div>
          </div>
        </div>

        {/* Profile 3: Prerna Guptaa */}
        <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-xl shadow-orange-100/40 hover:shadow-2xl hover:shadow-orange-100/60 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/4 w-full flex flex-col items-center text-center sticky top-24">
              <div className="w-32 h-32 rounded-full bg-[#FFF7ED] border-2 border-[#F97316] flex items-center justify-center mb-4 text-[#C2410C] text-3xl font-bold shadow-inner">
                PG
              </div>
              <h3 className="text-xl font-bold text-gray-900">Prerna Guptaa</h3>
              <p className="text-[#F97316] font-bold text-xs uppercase tracking-widest mt-2 bg-orange-50 px-3 py-1 rounded-full">Social Leader</p>
            </div>
            <div className="md:w-3/4 text-gray-600 leading-relaxed space-y-4">
              <p>
                Prerna Guptaa is a kind-hearted person who helps others because she cares about them and wants to make the world a better place. She is very aware of the problems that vulnerable communities face and has dedicated herself to supporting programs that promote dignity, opportunity, and mental health.
              </p>
              <p>
                Prerna's charitable work is more than just giving money; it's thoughtful, open to everyone, and based on real human connection. She thinks that the best way to make a difference is to understand what people have been through and meet their needs with care and respect. She supports education for girls, women's health, mental health, and community development. This shows that she believes that people who are empowered make societies that are empowered.
              </p>
              <p>
                Prerna Guptaa is known for being down-to-earth and strong. She always supports important causes by giving advice, resources, and hands-on help. Her presence gives people peace of mind and motivates them to do good deeds and be responsible members of society. She continues to improve people's lives and help make society more aware, welcoming, and caring through her kind leadership and deep commitment.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* Footer CTA */}
    <div className="bg-[#C2410C] text-white py-20 px-6 text-center mt-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Join our mission today</h2>
        <p className="text-orange-100 text-lg mb-10">
          Whether through volunteering, donation, or spreading awareness, your support helps us build a stronger community.
        </p>
        <button 
          onClick={() => onNavigate('contact')}
          className="bg-white text-[#C2410C] font-bold px-10 py-4 rounded-lg hover:bg-orange-50 transition-colors shadow-lg transform hover:-translate-y-1"
        >
          Get Involved
        </button>
      </div>
    </div>

    {/* Simple Footer Bar */}
    <div className="bg-white py-8 px-6 border-t border-gray-200">
      <div className="max-w-5xl mx-auto text-center text-gray-400 text-sm">
        <p>© 2024 Sabri Helpage. All rights reserved.</p>
      </div>
    </div>
  </div>
);
// Sociofare Page Component with Improved UI
const SociofarePage = () => (
  <div className="min-h-screen bg-white">
    {/* Header */}
    <div className="bg-[#FF7F50] text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">The SocioFare Awards 2025</h1>
        
      </div>
    </div>

    {/* Hero Section */}
    <div className="bg-[#FF7F50] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">The SocioFare Awards 2025</h1>
        <p className="text-xl md:text-2xl text-[#FFE4D6] max-w-4xl mx-auto leading-relaxed">
          Celebrating the Real Life Heroes who are creating impactful change
        </p>
        <div className="h-1 w-32 bg-white mx-auto mt-8 opacity-50"></div>
      </div>
    </div>

    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Main Content */}
      <div className="prose max-w-none text-gray-700 leading-relaxed mb-16 text-justify bg-white rounded-2xl p-8 shadow-sm border border-[#FFE4D6]">
        <p className="text-lg mb-6">
          Sabri Helpage takes immense pride in dedicating the nursing house where wellness dedication and unwavering support has unfitted to what developed and made a lasting impact on society. These individuals work quietly behind the actions, driven only exceptionally full by compassion and purpose, to shine a light on their remarkable contributions and express our heartfelt gratitude for their continued efforts in making the world a better, kinder place for all.
        </p>
        <p className="text-lg">
          Their actions inspire resilience, and a spirit of unity in our communities.
        </p>
      </div>

      {/* Events Section */}
      <div className="bg-[#FFF8F0] rounded-2xl p-8 mb-12 border border-[#FFE4D6]">
        <h3 className="text-3xl font-bold text-[#FF7F50] mb-8 text-center">2025 Events Calendar</h3>
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#FFE4D6]">
            <select className="w-full p-3 border border-[#FFE4D6] rounded-lg focus:ring-2 focus:ring-[#FF7F50] outline-none bg-white">
              <option>All Months</option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-[#FFE4D6] hover:shadow-md transition-shadow">
              <div className="text-center mb-4">
                <div className="bg-[#FF7F50] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <span className="font-bold text-lg">{i*10}</span>
                </div>
                <div className="text-[#FF7F50] font-semibold mt-2">MAR 2025</div>
              </div>
              <h4 className="text-lg font-bold text-gray-800 text-center mb-3">Award Ceremony #{i}</h4>
              <p className="text-gray-600 text-sm text-center">Celebrating community heroes and their impactful work</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-[#FFF8F0] p-8 rounded-2xl border border-[#FFE4D6] hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-bullseye text-2xl text-[#FF7F50]"></i>
            <h3 className="text-2xl font-bold text-[#FF7F50]">Our Mission</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            The SocioFare is a movement dedicated to recognizing and celebrating selfless individuals who devote their lives to the service of others.
          </p>
        </div>
        <div className="bg-[#FFF8F0] p-8 rounded-2xl border border-[#FFE4D6] hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-hands-helping text-2xl text-[#FF7F50]"></i>
            <h3 className="text-2xl font-bold text-[#FF7F50]">Join Us</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Be part of this celebration of real-life heroes who illuminate the path for others through their compassion and service.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16 bg-[#FF7F50] rounded-2xl p-12 text-white">
        <h3 className="text-3xl font-bold mb-4">Nominate a Hero</h3>
        <p className="text-[#FFE4D6] mb-6 max-w-2xl mx-auto">
          Know someone making a difference? Nominate them for the SocioFare Awards 2025 and help us recognize their incredible work.
        </p>
        <button className="bg-white text-[#FF7F50] px-8 py-3 rounded-lg font-semibold hover:bg-[#FFF8F0] transition-colors">
          Submit Nomination
        </button>
      </div>
    </div>
  </div>
);

// Improved Causes Page Component
const OurCausesLandingPage = () => (
  <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-orange-100">
    
    

    {/* Cause 1: Elderly Care */}
    <div className="bg-[#FFF7ED] border-y border-orange-100">
      <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 items-start">
        <div className="md:w-1/3">
          <div className="inline-block px-3 py-1 bg-white border border-orange-200 text-[#C2410C] text-xs font-bold uppercase rounded-full mb-4">
            Core Focus
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">Elderly Care</h3>
          <p className="text-[#F97316] font-medium italic">"Making their golden years truly golden"</p>
        </div>
        <div className="md:w-2/3">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            In India, the disintegration of the joint family system has left millions of elderly citizens vulnerable to isolation and neglect. We provide more than just medical aid; we provide a sense of belonging.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex gap-4 items-start">
              <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-[#F97316]"></div>
              <span className="text-gray-700"><strong>Legal & Medical Support:</strong> Assisting abandoned seniors with legal counseling to claim their rights and providing free geriatric healthcare.</span>
            </li>
            <li className="flex gap-4 items-start">
              <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-[#F97316]"></div>
              <span className="text-gray-700"><strong>Combating Isolation:</strong> Organizing community events and recreational centers where seniors can socialize and regain their dignity.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Cause 2: Education & Girl Child */}
    <div className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 items-start">
        <div className="md:w-1/3">
          <div className="inline-block px-3 py-1 bg-[#FFF7ED] border border-orange-200 text-[#C2410C] text-xs font-bold uppercase rounded-full mb-4">
            Empowerment
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">Girl Child & Education</h3>
          <p className="text-[#F97316] font-medium italic">"Empowering the street child"</p>
        </div>
        <div className="md:w-2/3">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Our focus is specifically on <strong>street girls</strong>—the most invisible demographic in urban India. We believe education is the only tool that can break the cycle of poverty for them.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="bg-[#FFF7ED] p-6 rounded-xl border border-orange-100 hover:border-orange-300 transition-colors">
              <h4 className="font-bold text-[#C2410C] mb-2">Hygiene & Dignity</h4>
              <p className="text-sm text-gray-600">
                We conduct regular distribution drives for sanitary pads and hygiene kits for street-dwelling women and girls who lack access to clean sanitation.
              </p>
            </div>
            <div className="bg-[#FFF7ED] p-6 rounded-xl border border-orange-100 hover:border-orange-300 transition-colors">
              <h4 className="font-bold text-[#C2410C] mb-2">Vocational Skills</h4>
              <p className="text-sm text-gray-600">
                Beyond basic literacy, we provide vocational training to ensure these girls can secure safe, dignified employment as they reach adulthood.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Cause 3: Mental Health */}
    <div className="bg-[#FFF7ED] border-y border-orange-100">
      <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 items-start">
        <div className="md:w-1/3">
           <div className="inline-block px-3 py-1 bg-white border border-orange-200 text-[#C2410C] text-xs font-bold uppercase rounded-full mb-4">
            Awareness
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">Mental Health</h3>
          <p className="text-[#F97316] font-medium italic">"Breaking the silence"</p>
        </div>
        <div className="md:w-2/3">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Mental health remains a taboo subject in many Indian households. Sabri Helpage is dedicated to de-stigmatizing mental illness through awareness campaigns and counseling support.
          </p>
          <p className="text-gray-600 leading-relaxed border-l-4 border-[#F97316] pl-6 py-2 bg-white">
            We organize workshops in schools and colleges to help young people recognize the signs of depression and anxiety, fostering a generation that is not afraid to ask for help.
          </p>
        </div>
      </div>
    </div>

    {/* Unique Feature: The SocioFare Awards */}
    <div className="bg-[#C2410C] text-white">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">The SocioFare Awards</h2>
            <p className="text-orange-100 text-lg leading-relaxed mb-8">
              A unique initiative by Sabri Helpage to shine a spotlight on excellence in social welfare. We believe that those who dedicate their lives to helping others deserve to be celebrated.
            </p>
            <button className="bg-white text-[#C2410C] font-bold px-8 py-3 rounded hover:bg-orange-50 transition-colors">
              Nominate a Changemaker
            </button>
          </div>
          <div className="bg-[#F97316] p-8 rounded-xl shadow-lg border border-orange-500">
            <h4 className="text-xl font-bold mb-6 text-white border-b border-orange-400 pb-4">Our Impact</h4>
            <div className="space-y-6">
              <div>
                <div className="text-4xl font-bold mb-1">50,000+</div>
                <div className="text-orange-100 text-sm uppercase tracking-wide">Lives impacted</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">10+</div>
                <div className="text-orange-100 text-sm uppercase tracking-wide">Years of Service</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">25+</div>
                <div className="text-orange-100 text-sm uppercase tracking-wide">Regions covered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Simple Footer */}
  
  </div>
);

// Improved Stories Page Component
const StoriesPage = () => (
  <div className="min-h-screen bg-white">
    {/* Header */}
    <div className="bg-[#FF7F50] text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Our Stories</h1>
        
      </div>
    </div>

    {/* Hero Section */}
    <div className="bg-[#FF7F50] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Stories</h1>
        <p className="text-xl text-[#FFE4D6]">
          Real stories of change from the communities we serve.
        </p>
        <div className="h-1 w-24 bg-white mx-auto mt-8 opacity-50"></div>
      </div>
    </div>

    <div className="max-w-4xl mx-auto px-6 py-16 -mt-10">
      {/* Stories in Vertical Layout */}
      <div className="space-y-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#FFE4D6] hover:shadow-xl transition-all duration-300 group">
            <div className="md:flex">
              <div className="md:w-2/5 relative overflow-hidden">
                <div className="h-64 md:h-full bg-gradient-to-br from-[#FF7F50] to-[#E67347] flex items-center justify-center relative">
                  <i className="fas fa-book-open text-6xl text-white opacity-20 absolute top-4 right-4"></i>
                  <i className="fas fa-book-open text-4xl text-white z-10 group-hover:scale-110 transition-transform"></i>
                </div>
                <div className="absolute top-4 left-4 bg-white text-[#FF7F50] px-3 py-1 rounded-full text-sm font-semibold">
                  Inspiration
                </div>
              </div>
              
              <div className="md:w-3/5 p-8">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[#FF7F50] text-sm font-semibold bg-[#FFF8F0] px-3 py-1 rounded-full">
                    Nov {i}, 2025
                  </span>
                  <div className="flex space-x-2 text-[#FF7F50]">
                    <button className="p-2 hover:bg-[#FFF8F0] rounded-full transition-colors">
                      <i className="fas fa-share-alt"></i>
                    </button>
                    <button className="p-2 hover:bg-[#FFF8F0] rounded-full transition-colors">
                      <i className="far fa-heart"></i>
                    </button>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-[#FF7F50] transition-colors">
                  Story Title {i}: A Journey of Hope and Transformation
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  This is a heartwarming tale of resilience and transformation from our community. 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...
                </p>
                
                <div className="flex items-center justify-between">
                  <button className="text-[#FF7F50] font-semibold hover:text-[#E67347] flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read Full Story 
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </button>
                  <span className="text-sm text-gray-500">5 min read</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <button className="px-8 py-3 border-2 border-[#FF7F50] text-[#FF7F50] font-semibold rounded-lg hover:bg-[#FFF8F0] transition-colors flex items-center gap-2 mx-auto">
          <i className="fas fa-sync-alt"></i>
          Load More Stories
        </button>
      </div>

      {/* Newsletter */}
      <div className="mt-20 bg-[#FFF8F0] rounded-2xl p-8 text-center border border-[#FFE4D6]">
        <h3 className="text-2xl font-bold text-[#FF7F50] mb-4">Stay Updated</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Subscribe to get the latest stories and updates from our community directly in your inbox.
        </p>
        <div className="max-w-md mx-auto flex gap-3">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-4 py-3 border border-[#FFE4D6] rounded-lg focus:ring-2 focus:ring-[#FF7F50] outline-none"
          />
          <button className="px-6 py-3 bg-[#FF7F50] text-white font-semibold rounded-lg hover:bg-[#E67347] transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
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
      case 'about': return <AboutPage onNavigate={handleNavigate} />;
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