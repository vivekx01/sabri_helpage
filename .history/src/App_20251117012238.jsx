import React, { useState, useCallback } from 'react';
import { 
  Menu, X, Play, ArrowRight, Star, StarHalf, Facebook, Twitter, 
  Instagram, Mail, ChevronRight, MessageCircle, Heart, Users, Globe, 
  Search, Linkedin, Youtube, Calendar, User, MessageSquare, Briefcase, 
  Activity, Award, FileText, HelpCircle, Shield, ArrowLeft, MapPin, Clock, BookOpen, CheckCircle, Wallet
} from 'lucide-react';

// ==================== CONSTANTS ====================
const COLORS = {
  PRIMARY_DARK: '#260B00',
  ACCENT_ORANGE: '#FF7A42',
  BG_LIGHT_GRAY: '#f0f0f0',
  LOGO_RED: '#d32f2f'
};

const IMAGE_URLS = {
  HERO: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  CHILDREN_HAPPY: 'https://i.ytimg.com/vi/csNcS9X49dQ/maxresdefault.jpg',
  KIDS_LEARNING: 'https://i.ytimg.com/vi/1rkvGnEzcPo/maxresdefault.jpg',
  COMMUNITY_SUPPORT: 'https://i.ytimg.com/vi/dGbKiy3rC0A/maxresdefault.jpg',
  MENTAL_HEALTH: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  ELDERLY_CARE: 'https://images.unsplash.com/photo-1576765974257-b414b9ea0051?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  GIRL_EDUCATION: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  DONATE_CALLOUT: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  NEWS_1_LEGAL: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  NEWS_2_FOOD: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  NEWS_3_WATER: 'https://i.ytimg.com/vi/Y5DlqFH7hHg/maxresdefault.jpg'
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

// ==================== SHARED COMPONENTS ====================
const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-center text-gray-900 ${className}`}>
    {children}
  </h2>
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

const YoutubeEmbed = ({ videoId, title }) => (
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
);

// ==================== HEADER ====================
const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'About Us', page: 'about' },
    { name: 'Our Causes', page: 'causes' },
    { name: 'Blog', page: 'blog' },
    { name: 'Gallery', page: 'gallery' }
  ];

  const handleNavClick = (page) => {
    setIsMenuOpen(false);
    onNavigate(page);
    window.scrollTo(0, 0);
  };

  return (
    <header className="bg-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex flex-col items-start space-y-0"
            aria-label="Sabri Helpage Home"
          >
            <span className="text-2xl md:text-3xl font-extrabold leading-none" style={{ color: COLORS.LOGO_RED, fontFamily: 'cursive' }}>
              SabriHelpAge
            </span>
            <div className="w-full h-px" style={{ backgroundColor: COLORS.PRIMARY_DARK }} />
            <span className="text-xs italic font-semibold pt-1" style={{ color: COLORS.PRIMARY_DARK }}>
              sarve bhavantu sukhinah
            </span>
          </button>

          <div className="hidden lg:flex flex-1 items-center justify-end space-x-6">
            <nav className="flex space-x-5 text-sm font-semibold items-center">
              {navItems.map(item => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.page)}
                  className="text-gray-700 hover:text-gray-900 transition duration-200 py-2"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="pl-4 pr-10 py-2 w-32 xl:w-40 border border-gray-200 rounded-full focus:outline-none focus:ring-2 transition duration-200 text-sm shadow-inner text-gray-900"
                style={{ '--tw-ring-color': COLORS.ACCENT_ORANGE }}
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
            </div>

            <button
              onClick={() => onNavigate('donate')}
              className="text-white px-5 py-2 rounded-full font-bold transition duration-300 shadow-md text-sm hover:bg-gray-800"
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
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full w-full bg-white z-40 shadow-lg pb-4">
          <nav className="flex flex-col space-y-1 p-4 text-sm font-medium">
            {navItems.map(item => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.page)}
                className="py-3 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition text-base text-left"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => onNavigate('donate')}
              className="text-center text-white mt-4 px-4 py-3 rounded-full font-bold transition duration-300 shadow-md hover:bg-gray-800"
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
      { name: 'About Us', page: 'about' },
      { name: 'Our Causes', page: 'causes' },
      { name: 'Blog', page: 'blog' },
      { name: 'Contact', page: 'home' }
    ],
    getInvolved: [
      { name: 'Become a Volunteer', page: 'home' },
      { name: 'Internships', page: 'internship' },
      { name: 'Donate Securely', page: 'donate' }
    ],
    legal: [
      { name: 'Privacy Policy', page: 'privacy' },
      { name: 'Terms of Use', page: 'terms' },
      { name: 'FAQ', page: 'faq' }
    ],
    more: [
      { name: 'CSR Summit', page: 'csr' },
      { name: 'Awards', page: 'awards' },
      { name: 'Publications', page: 'publications' }
    ]
  };

  const socialLinks = [
    { Icon: Facebook, url: 'https://www.facebook.com/SabriHelpage/', label: 'Facebook' },
    { Icon: Twitter, url: 'https://twitter.com/SabriHelpage', label: 'Twitter' },
    { Icon: Instagram, url: 'https://www.instagram.com/sabrihelpage/', label: 'Instagram' },
    { Icon: Youtube, url: 'https://www.youtube.com/@sabrihelpage', label: 'Youtube' },
    { Icon: Linkedin, url: 'https://www.linkedin.com/company/sabri-helpage/', label: 'Linkedin' }
  ];

  return (
    <footer className="py-12" style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <button 
              onClick={() => onNavigate('home')} 
              className="flex flex-col items-start space-y-0"
              aria-label="Sabri Helpage Home"
            >
              <span className="text-2xl font-extrabold leading-none" style={{ color: COLORS.LOGO_RED, fontFamily: 'cursive' }}>
                SabriHelpAge
              </span>
              <div className="w-full h-px bg-white/50" />
              <span className="text-xs italic font-semibold pt-1 text-gray-400">
                sarve bhavantu sukhinah
              </span>
            </button>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map(({ Icon, url, label }) => (
                <a 
                  key={label}
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={label}
                >
                  <Icon className="w-6 h-6 text-gray-400 hover:text-white transition" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {footerLinks.quickLinks.map(link => (
                <li key={link.name}>
                  <button 
                    onClick={() => onNavigate(link.page)}
                    className="hover:text-white transition flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2" /> {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>Get Involved</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {footerLinks.getInvolved.map(link => (
                <li key={link.name}>
                  <button 
                    onClick={() => onNavigate(link.page)}
                    className="hover:text-white transition flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2" /> {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Mail className="w-4 h-4 inline mr-3 align-text-bottom" /> info@sabrihelpage.org</li>
              <li><Calendar className="w-4 h-4 inline mr-3 align-text-bottom" /> 033-4601 3886</li>
              <li><Globe className="w-4 h-4 inline mr-3 align-text-bottom" /> 7B Mysore Rd, Kolkata 700026</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm text-gray-400">
            {footerLinks.legal.map(link => (
              <button 
                key={link.name}
                onClick={() => onNavigate(link.page)}
                className="hover:text-white transition"
              >
                {link.name}
              </button>
            ))}
            {footerLinks.more.map(link => (
              <button 
                key={link.name}
                onClick={() => onNavigate(link.page)}
                className="hover:text-white transition"
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="text-center text-sm text-gray-500">
            © 2025 Sabri Helpage. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

// ==================== HOME PAGE ====================
const HomePage = ({ onNavigate }) => {
  const causes = [
    { 
      name: 'Mental Health', 
      page: 'mental-health', 
      goal: 50000, 
      raised: 35000, 
      img: IMAGE_URLS.MENTAL_HEALTH,
      description: 'Providing counseling and awareness for mental well-being.'
    },
    { 
      name: 'Elderly Care', 
      page: 'elderly-care', 
      goal: 120000, 
      raised: 85000, 
      img: IMAGE_URLS.ELDERLY_CARE,
      description: 'Ensuring dignified and compassionate care for seniors.'
    },
    { 
      name: 'Girl Child Education', 
      page: 'girl-education', 
      goal: 10000, 
      raised: 7500, 
      img: IMAGE_URLS.GIRL_EDUCATION,
      description: 'Empowering girls through education and scholarships.'
    }
  ];

  const testimonials = [
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

  const Rating = ({ rating }) => (
    <div className="flex items-center text-sm mb-3" style={{ color: COLORS.ACCENT_ORANGE }}>
      {[...Array(5)].map((_, i) => {
        if (rating >= i + 1) return <Star key={i} className="w-4 h-4 fill-current" />;
        if (rating >= i + 0.5) return <StarHalf key={i} className="w-4 h-4 fill-current" />;
        return <Star key={i} className="w-4 h-4 text-gray-300" />;
      })}
    </div>
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] sm:h-[650px] md:h-[750px] flex items-center justify-center text-white text-center overflow-hidden" style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
        <div className="absolute inset-0">
          <ResponsiveImage
            src={IMAGE_URLS.HERO}
            alt="Community hands together showing unity and support"
            className="w-full h-full object-cover filter grayscale opacity-80"
            fallbackText="Hero+Image"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-md sm:text-lg font-semibold uppercase tracking-widest mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>
            SABRI HELPAGE
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6">
            Serving society for more than a decade.
          </h1>
          <p className="text-xl font-medium mb-8 max-w-2xl mx-auto">
            Focused on Mental Health, Elderly Care, and Women & Children Welfare.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
            <button
              onClick={() => onNavigate('about')}
              className="text-white px-8 py-3 rounded-full font-bold transition duration-300 shadow-xl text-lg hover:opacity-90"
              style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
            >
              Read More
            </button>
            <button
              onClick={() => onNavigate('donate')}
              className="text-white px-8 py-3 rounded-full font-bold transition duration-300 shadow-xl text-lg hover:bg-gray-800"
              style={{ backgroundColor: COLORS.PRIMARY_DARK, border: `2px solid ${COLORS.ACCENT_ORANGE}` }}
            >
              Support Us
            </button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col space-y-4">
              {[IMAGE_URLS.CHILDREN_HAPPY, IMAGE_URLS.KIDS_LEARNING, IMAGE_URLS.COMMUNITY_SUPPORT].map((img, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-xl shadow-lg h-32 flex items-center justify-center overflow-hidden relative"
                  style={{ backgroundColor: idx % 2 === 0 ? COLORS.ACCENT_ORANGE : COLORS.PRIMARY_DARK }}
                >
                  <ResponsiveImage 
                    src={img} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />
                </div>
              ))}
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: COLORS.ACCENT_ORANGE }}>
                WHAT WE STAND FOR
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mt-2 mb-6">
                Shaping Lives Through Compassionate Action.
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                At Sabri Helpage, our mission is to make a positive and lasting impact on the lives of marginalized people globally.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => onNavigate('gallery')}
                  className="text-white px-8 py-3 rounded-full font-bold transition duration-300 shadow-md hover:opacity-90"
                  style={{ backgroundColor: COLORS.PRIMARY_DARK }}
                >
                  View Gallery
                </button>
                <button 
                  className="text-gray-900 border-2 px-8 py-3 rounded-full font-bold transition duration-300 shadow-md flex items-center justify-center hover:bg-gray-50"
                  style={{ borderColor: COLORS.PRIMARY_DARK }}
                >
                  <Play className="w-5 h-5 mr-2" style={{ color: COLORS.PRIMARY_DARK }} /> Watch Video
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones and Video */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="flex flex-col h-full">
              <div className="p-6 md:p-8 rounded-xl shadow-2xl h-full flex flex-col" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>
                <p className="text-sm font-semibold uppercase tracking-widest text-white mb-2">OUR MILESTONES</p>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 md:mb-8">
                  We've Accomplished Most During This Span.
                </h3>
                <div className="grid grid-cols-3 gap-3 md:gap-4 mt-auto">
                  {[
                    { value: '75.5K', label: 'People Helped' },
                    { value: '34.2K', label: 'Happy Lives' },
                    { value: '57.4', label: 'Locations' }
                  ].map((stat, idx) => (
                    <div key={idx} className="p-3 rounded-lg text-center" style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
                      <span className="block text-2xl md:text-3xl font-extrabold text-white">{stat.value}</span>
                      <span className="block text-xs font-medium text-gray-200 uppercase mt-1">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col h-full">
              <div className="relative w-full shadow-2xl rounded-2xl overflow-hidden h-96">
                <YoutubeEmbed videoId={YOUTUBE_VIDEO_ID} title="Sabri Helpage Story" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Causes Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle className="mb-16">Our Core Causes</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {causes.map((cause) => (
              <div key={cause.name} className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105">
                <div className="h-48 w-full bg-gray-200 relative">
                  <ResponsiveImage 
                    src={cause.img} 
                    alt={cause.name} 
                    className="w-full h-full object-cover"
                    fallbackText="Cause+Image"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <h4 className="absolute bottom-0 left-0 p-4 text-white text-2xl font-bold">{cause.name}</h4>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">{cause.description}</p>

                  <div className="mb-6">
                    <div className="flex justify-between text-sm font-semibold text-gray-700 mb-1">
                      <span>Raised: ${cause.raised.toLocaleString()}</span>
                      <span>Goal: ${cause.goal.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full" 
                        style={{ 
                          width: `${Math.min(100, (cause.raised / cause.goal) * 100)}%`, 
                          backgroundColor: COLORS.ACCENT_ORANGE 
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button 
                      onClick={() => onNavigate(cause.page)}
                      className="flex-1 flex items-center justify-center text-sm font-bold px-4 py-2 rounded-full transition duration-300 hover:bg-gray-100"
                      style={{ color: COLORS.ACCENT_ORANGE, border: `2px solid ${COLORS.ACCENT_ORANGE}` }}
                    >
                      Read More
                    </button>
                    <button 
                      onClick={() => onNavigate('donate')}
                      className="flex-1 flex items-center justify-center text-sm font-bold text-white px-4 py-2 rounded-full transition duration-300 hover:opacity-90"
                      style={{ backgroundColor: COLORS.PRIMARY_DARK }}
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate Callout */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
        <div className="absolute inset-0 opacity-10">
          <ResponsiveImage 
            src={IMAGE_URLS.DONATE_CALLOUT}
            alt="People joining hands"
            className="w-full h-full object-cover"
            fallbackText="Callout+Background"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Even a Small Donation Can Benefit Many People.
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Your generosity provides essential resources, education, and health support to communities that need it most.
          </p>
          <button
            onClick={() => onNavigate('donate')}
            className="text-lg text-white px-10 py-4 rounded-full font-extrabold transition duration-300 shadow-xl hover:opacity-90"
            style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
          >
            Give Hope Today <ArrowRight className="w-5 h-5 ml-2 inline" />
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle className="mb-12">
            What People Say About Us <MessageSquare className="w-10 h-10 inline-block align-bottom" style={{ color: COLORS.PRIMARY_DARK }} />
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-xl border-t-4" style={{ borderColor: index % 2 === 0 ? COLORS.ACCENT_ORANGE : COLORS.PRIMARY_DARK }}>
                <Rating rating={t.rating} />
                <p className="text-lg italic text-gray-800 mb-5 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold mr-3"
                    style={{ backgroundColor: index % 2 === 0 ? COLORS.ACCENT_ORANGE : COLORS.PRIMARY_DARK }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle className="mb-12">Latest News & Updates</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300">
                <ResponsiveImage 
                  src={item.img}
                  alt={item.title}
                  className="h-56 w-full object-cover"
                  fallbackText="News+Image"
                />
                <div className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: COLORS.ACCENT_ORANGE }}>
                    <Calendar className="w-4 h-4 inline mr-1 align-sub" /> {item.date}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.snippet}</p>
                  <button 
                    onClick={() => onNavigate('blog')}
                    className="font-semibold text-sm transition duration-300 flex items-center hover:text-gray-900"
                    style={{ color: COLORS.ACCENT_ORANGE }}
                  >
                    Read Full Story <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// ==================== ABOUT PAGE ====================
const AboutPage = ({ onNavigate }) => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Deep Roots and Vision</h1>
        <p className="text-xl text-gray-700 mb-8 leading-relaxed font-light">
          Sabri Helpage is more than just an organization; it is the culmination of a decade-long dream to establish a society founded on the principles of altruism, voluntary spirit, and comprehensive human development.
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>The Founder's Journey</h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Founded by Aarti BR Singh, a distinguished psychoanalyst and entrepreneur, Sabri Helpage was born from the realization that true societal health requires addressing both the physical and psychological well-being of individuals.
        </p>

        <div className="bg-white p-6 rounded-xl shadow-2xl border-l-4 mb-8" style={{ borderColor: COLORS.PRIMARY_DARK }}>
          <p className="text-xl italic text-gray-900">
            "Sarve bhavantu sukhinah, sarve santu niramayah."
          </p>
          <p className="text-md text-gray-600 mt-2">
            — Let all be happy, let all be free from illness. This ancient mantra guides our every action.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-8" style={{ color: COLORS.ACCENT_ORANGE }}>Our Core Commitments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-5 rounded-xl border-t-4 shadow-sm" style={{ borderColor: COLORS.PRIMARY_DARK }}>
            <Heart className="w-8 h-8 mb-3" style={{ color: COLORS.ACCENT_ORANGE }} />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Holistic Welfare</h3>
            <p className="text-gray-600 text-sm">Focusing on mental health, elderly care, and empowering women & children.</p>
          </div>
          <div className="p-5 rounded-xl border-t-4 shadow-sm" style={{ borderColor: COLORS.PRIMARY_DARK }}>
            <Globe className="w-8 h-8 mb-3" style={{ color: COLORS.ACCENT_ORANGE }} />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Global Development</h3>
            <p className="text-gray-600 text-sm">Promoting human and global sustainability through international collaborations.</p>
          </div>
        </div>

        <p className="text-lg text-gray-700 mb-12 leading-relaxed">
          Today, Sabri Helpage stands as a testament to the power of human kindness. We invite you to explore our work further and join us in building a happier, healthier, and more compassionate future for all.
        </p>
      </div>
    </section>
  );
};

// ==================== GALLERY PAGE ====================
const GalleryPage = ({ onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-20 md:py-28 bg-white">
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
                alt={`Sabri Helpage gallery image ${index + 1}`}
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
              alt="Selected gallery image"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
};

// ==================== CAUSE DETAIL PAGES ====================
const MentalHealthPage = ({ onNavigate }) => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <ResponsiveImage 
          src={IMAGE_URLS.MENTAL_HEALTH}
          alt="Mental Health Support Group"
          className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg"
          fallbackText="Mental+Health+Image"
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
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <ResponsiveImage 
          src={IMAGE_URLS.ELDERLY_CARE}
          alt="Elderly Woman smiling"
          className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg"
          fallbackText="Elderly+Care+Image"
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
            onClick={() => onNavigate('home')}
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
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <ResponsiveImage 
          src={IMAGE_URLS.GIRL_EDUCATION}
          alt="Young girls studying together"
          className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg"
          fallbackText="Girl+Education+Image"
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

// ==================== DONATE PAGE ====================
const DonatePage = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(5000);
  const [customAmount, setCustomAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false); 
  const [supportCategory, setSupportCategory] = useState('Elderly Care');
  
  // Step 2 State
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

  // Updated donation options to match the image
  const donationOptions = [5000, 15000, 25000];
  const finalAmount = customAmount ? parseFloat(customAmount) : amount;

  const handleSelectAmount = useCallback((val) => {
    setAmount(val);
    setCustomAmount('');
  }, []);

  const handleCustomAmountChange = useCallback((e) => {
    const value = e.target.value;
    setCustomAmount(value);
    // Only clear selected amount if a custom amount is being entered
    if (value) {
      setAmount(0);
    } else if (donationOptions.includes(amount)) {
      // Revert to a default selected amount if custom is cleared
      setAmount(donationOptions[0]);
    }
  }, [amount]);

  const handleNext = useCallback(() => {
    if (finalAmount <= 0) return;
    setStep(2);
  }, [finalAmount]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Donation submitted:', { finalAmount, isRecurring, firstName, lastName, email, mobile, supportCategory });
    
    // Simulate navigation to a success page or home (using console log instead of alert)
    console.log(`Thank you, ${firstName}! Your donation of ₹${finalAmount.toLocaleString('en-IN')} has been submitted.`);
    
    // Navigate to home or success page
    onNavigate('home');
  }, [finalAmount, isRecurring, firstName, lastName, email, mobile, supportCategory, onNavigate]);

  // Helper component for form inputs (Step 2)
  const FormInput = ({ id, label, type = 'text', value, onChange, required = false }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input 
        id={id} 
        type={type} 
        value={value} 
        onChange={onChange} 
        required={required} 
        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2" 
        style={{ '--tw-ring-color': COLORS.PRIMARY_DARK }} 
      />
    </div>
  );

  // Stat Card for the Orange Header
  const StatCard = ({ icon: Icon, value, label }) => (
    <div className="flex flex-col items-center text-white p-3">
      <Icon className="w-8 h-8 mb-1" />
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm font-medium text-white/90">{label}</div>
    </div>
  );

  // Focus Area Card
  const FocusAreaCard = ({ icon: Icon, title, subtitle, iconColor }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg border-b-4 hover:shadow-xl transition duration-300 transform hover:scale-[1.01]">
      <div className="p-4 rounded-full mb-3" style={{ backgroundColor: iconColor.bg }}>
        <Icon className="w-8 h-8" style={{ color: iconColor.fg }} />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button 
          onClick={() => onNavigate('home')} 
          className="flex items-center text-sm font-semibold mb-8 hover:text-gray-700 transition"
          style={{ color: COLORS.ACCENT_ORANGE }}
        >
          <ChevronRight className="w-5 h-5 rotate-180 mr-1" /> Back to Home
        </button>

        {/* --- Step 1: Landing Page & Amount Form (Main Layout) --- */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Header Section (Orange Banner) */}
            <div className="p-10 text-center" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
                Transform Lives, Empower Communities
              </h1>
              <p className="text-lg text-white/90 max-w-3xl mx-auto mb-10">
                Join us in building a compassionate world where every elderly person can thrive with dignity.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 border-t border-b border-white/30 py-4 max-w-xl mx-auto">
                <StatCard icon={Users} value="50K+" label="Lives Touched" />
                <StatCard icon={MapPin} value="25" label="Regions Served" />
                <StatCard icon={Clock} value="10+" label="Years of Service" />
              </div>
            </div>

            {/* Focus Areas Section */}
            <div className="py-16 px-4 sm:px-10 lg:px-20">
              <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">Our Focus Areas</h2>
              <p className="text-md text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                We're committed to creating sustainable change across critical sectors that impact the most vulnerable members of society.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FocusAreaCard 
                  icon={Users} 
                  title="Elderly Care" 
                  subtitle="Dignity and support for senior citizens." 
                  iconColor={{ fg: '#10b981', bg: '#ecfdf5' }} // Green
                />
                <FocusAreaCard 
                  icon={BookOpen} 
                  title="Education" 
                  subtitle="Education and girl child empowerment." 
                  iconColor={{ fg: '#3b82f6', bg: '#eff6ff' }} // Blue
                />
                <FocusAreaCard 
                  icon={Heart} 
                  title="Health" 
                  subtitle="Ensuring mental health and healthcare." 
                  iconColor={{ fg: '#f97316', bg: '#fff7ed' }} // Orange
                />
              </div>
            </div>

            {/* Impact and Donation Form Section */}
            <div className="py-16 px-4 sm:px-10 lg:px-20" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Left Column: Impact Text */}
                <div>
                  <h2 className="text-4xl font-extrabold mb-4 text-gray-900" style={{ color: COLORS.ACCENT_ORANGE }}>
                    Your Support Creates Impact
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    When you donate, you're not just giving money. You're providing education, healthcare, protection, and hope to those who need it most. Every rupee is a step towards a more equitable world.
                  </p>

                  {/* Impact Badge */}
                  <div className="bg-white p-4 rounded-xl shadow-md border-l-4" style={{ borderColor: COLORS.PRIMARY_DARK }}>
                    <div className="flex items-center text-sm font-semibold text-gray-800 space-x-4 mb-2">
                      <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> 100% Transparent</span>
                      <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Verified NGO</span>
                      <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Direct Impact</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      We ensure that your donation reaches those who need it most, with complete transparency and accountability.
                    </p>
                  </div>
                </div>

                {/* Right Column: Donation Form Card (Step 1) */}
                <div className="rounded-xl shadow-2xl p-6" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>
                  <h2 className="text-2xl font-bold text-white mb-6">Sabri Helpage Donation</h2>
                  
                  <form className="space-y-5">
                    
                    {/* Amount Options */}
                    <div className="flex justify-between gap-2">
                      {donationOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectAmount(opt)}
                          className={`flex-1 py-3 rounded-xl text-lg font-bold transition duration-200 shadow-md ${
                            amount === opt
                              ? 'bg-white text-gray-800'
                              : 'bg-white/20 text-white hover:bg-white/40'
                          }`}
                        >
                          ₹{opt.toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount / Other Amount */}
                    <div>
                      <input
                        type="number"
                        placeholder="₹ Other Amount (Min ₹ 100)"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        min="100"
                        className={`w-full p-3 rounded-xl text-lg text-gray-800 border-2 transition duration-200 focus:outline-none focus:ring-2 ${
                            finalAmount > 0 && customAmount && amount === 0 ? 'border-white ring-white' : 'border-transparent'
                        }`}
                      />
                    </div>
                    
                    {finalAmount <= 0 && <p className="text-red-100 text-sm">Please select or enter an amount.</p>}

                    {/* Support Category Dropdown */}
                    <div>
                      <label htmlFor="support-category" className="block text-sm font-semibold text-white mb-2">I offer my support for</label>
                      <select
                        id="support-category"
                        value={supportCategory}
                        onChange={(e) => setSupportCategory(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2"
                        style={{ '--tw-ring-color': COLORS.PRIMARY_DARK }}
                      >
                        <option>Elderly Care</option>
                        <option>Education</option>
                        <option>Mental Health</option>
                        <option>General Fund</option>
                      </select>
                    </div>

                    {/* Login for Regular Users (Mock) */}
                    <div className="pt-2">
                        <button 
                            type="button"
                            className="w-full py-3 rounded-xl text-lg font-bold text-gray-800 bg-white hover:bg-gray-100 transition duration-300 shadow-md"
                        >
                            <span className="text-sm font-medium block mb-1 text-gray-500">For Regular Users</span>
                            Login
                        </button>
                    </div>

                    {/* Recurring/One-time Toggle */}
                    <div className="flex justify-between gap-4 pt-3">
                        <button
                            type="button"
                            onClick={() => setIsRecurring(false)}
                            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition duration-200 ${
                                !isRecurring ? 'bg-white text-gray-800 shadow-md' : 'text-white/80'
                            }`}
                        >
                            One-time
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsRecurring(true)}
                            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition duration-200 ${
                                isRecurring ? 'bg-white text-gray-800 shadow-md' : 'text-white/80'
                            }`}
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
                        className="w-full py-3 rounded-xl text-xl font-bold text-white transition duration-300 shadow-xl"
                        style={{ backgroundColor: COLORS.PRIMARY_DARK }}
                      >
                        Next
                      </button>
                    </div>
                    
                    <p className="text-xs text-white/80 text-center pt-2">
                        All Donations to Sabri Helpage are tax exempted.
                    </p>
                  </form>
                </div>
              </div>
            </div>
            
          </div>
        )}

        {/* --- Step 2: Donor Details Form --- */}
        {step === 2 && (
          <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-2xl border-t-8" style={{ borderColor: COLORS.PRIMARY_DARK }}>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Donor Details</h1>
            <p className="text-gray-600 mb-8">
              Please provide your details for tax receipt generation and confirmation.
            </p>
            
            {/* Donation Summary Panel */}
            <div className="bg-gray-50 p-4 rounded-xl mb-8 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-700 flex items-center mb-2">
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
                {/* Citizenship Selector */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">Citizenship</label>
                  <div className="flex gap-4">
                    {['indian', 'foreign'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setCitizenType(type)}
                        className={`flex-1 p-3 rounded-lg text-base font-semibold transition duration-200 flex items-center justify-center ${
                          citizenType === type ? 'text-white shadow-lg' : 'bg-gray-100 text-gray-800 border-2 border-gray-300 hover:border-gray-500'
                        }`}
                        style={citizenType === type ? { backgroundColor: COLORS.PRIMARY_DARK } : {}}
                      >
                        {type === 'indian' ? 'Indian Citizens' : 'Foreign Citizens/OCI'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput id="first-name" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  <FormInput id="last-name" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <FormInput id="mobile" label="Mobile Number" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput id="dob" label="Date of Birth" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                  {citizenType === 'indian' && (
                    <FormInput id="pan" label="PAN Number" value={pan} onChange={(e) => setPan(e.target.value)} required />
                  )}
                </div>

                {/* Address */}
                <h3 className="text-xl font-bold text-gray-700 pt-4 border-t border-gray-100">Address Details</h3>
                <FormInput id="address" label="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} required />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormInput id="zip" label="Zip/Postal Code" value={zip} onChange={(e) => setZip(e.target.value)} required />
                  <FormInput id="city" label="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                  <FormInput id="province" label="State/Province" value={province} onChange={(e) => setProvince(e.target.value)} required />
                </div>
                
                {/* Existing Donor Radio Buttons */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Are you an existing donor?</label>
                  <div className="flex gap-6">
                    <div className="flex items-center">
                      <input 
                        id="existing-yes" 
                        name="existing-donor" 
                        type="radio" 
                        checked={isExistingDonor === true} 
                        onChange={() => setIsExistingDonor(true)} 
                        className="h-4 w-4" 
                        style={{ accentColor: COLORS.PRIMARY_DARK }} 
                      />
                      <label htmlFor="existing-yes" className="ml-2 block text-sm text-gray-900">Yes</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="existing-no" 
                        name="existing-donor" 
                        type="radio" 
                        checked={isExistingDonor === false} 
                        onChange={() => setIsExistingDonor(false)} 
                        className="h-4 w-4" 
                        style={{ accentColor: COLORS.PRIMARY_DARK }} 
                      />
                      <label htmlFor="existing-no" className="ml-2 block text-sm text-gray-900">No</label>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
                  By sharing your details, you agree to receive tax receipt, stories and updates via mobile, WhatsApp, landline, email, and post.
                </p>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 order-2 sm:order-1 w-full py-3 px-6 rounded-xl text-lg font-bold text-gray-800 bg-gray-200 hover:bg-gray-300 transition duration-300 shadow-md"
                  >
                    Back to Amount
                  </button>
                  <button
                    type="submit"
                    disabled={
                      !firstName || !lastName || !email || !mobile || !address || !zip || !city || !province || (citizenType === 'indian' && !pan)
                    }
                    className="flex-1 order-1 sm:order-2 w-full py-3 px-6 rounded-xl text-lg font-bold text-white transition duration-300 shadow-xl disabled:bg-gray-400"
                    style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
                  >
                    Pay ₹{finalAmount.toLocaleString('en-IN')} Now
                  </button>
                </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== BLOG PAGE ====================
const BlogPage = ({ onNavigate }) => {
  const blogPosts = [
    {
      title: "Choolale: The Artisanal Broom Project Empowering Visually Impaired Women in Kerala",
      date: "1/29/2025",
      image: IMAGE_URLS.CHILDREN_HAPPY,
      excerpt: "At the entrance of Lakshmi Menon's home in Kerala, two colorful brooms hang on the wall..."
    },
    {
      title: "India's Elder Care Sector Sees a Boom as Startups Like Primus Lead the 'Active Ageing' Revolution",
      date: "1/29/2025",
      image: IMAGE_URLS.ELDERLY_CARE,
      excerpt: "When 85-year-old Ramesh Nair (name changed) retired after four decades..."
    },
    {
      title: "The Son They Never Had: Das Kumar's Journey from Struggle to Service",
      date: "1/20/2025",
      image: IMAGE_URLS.KIDS_LEARNING,
      excerpt: "In the bustling heart of Kolkata, amidst the chaos of city life..."
    },
    {
      title: "Assam Woman Has Given 22 Years to Bring Education to Tribal Groups & Help Heal Trauma",
      date: "1/8/2025",
      image: IMAGE_URLS.GIRL_EDUCATION,
      excerpt: "The morning sun cast long shadows over a small learning center..."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Blog</h1>
        <p className="text-lg text-gray-700 mb-12 leading-relaxed">
          Stories of hope, impact, and transformation from our work across communities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
              <ResponsiveImage 
                src={post.image}
                alt={post.title}
                className="h-56 w-full object-cover"
                fallbackText="Blog+Image"
              />
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: COLORS.ACCENT_ORANGE }}>
                  <Calendar className="w-4 h-4 inline mr-1 align-sub" /> {post.date}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                <button 
                  className="font-semibold text-sm transition duration-300 flex items-center hover:text-gray-900"
                  style={{ color: COLORS.ACCENT_ORANGE }}
                >
                  Read More <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== CSR SUMMIT PAGE ====================
const CSRSummitPage = ({ onNavigate }) => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Sabri Helpage's Global CSR & ESG Summit: A Catalyst for Change
        </h1>

        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>
          Understanding CSR and ESG
        </h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Before we delve into the potential benefits of the summit, it's essential to understand the core concepts of CSR and ESG.
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-700 mb-8">
          <li><strong>Corporate Social Responsibility (CSR):</strong> This is a self-regulating business model that helps a company be socially accountable to itself, its stakeholders, and the public.</li>
          <li><strong>Environmental, Social, and Governance (ESG):</strong> This framework measures a company's performance in vital areas such as corporate governance, social responsibility, and environmental impact.</li>
        </ul>

        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>
          Potential Benefits of the Global CSR & ESG Summit
        </h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700 mb-8">
          <li><strong>Knowledge Sharing:</strong> Bringing together industry experts, NGOs, and policymakers can facilitate the exchange of best practices.</li>
          <li><strong>Networking Opportunities:</strong> Such platforms can foster collaborations and partnerships among different stakeholders.</li>
          <li><strong>Policy Advocacy:</strong> It can influence policy decisions by highlighting the importance of CSR and ESG.</li>
          <li><strong>Brand Reputation Enhancement:</strong> Companies can showcase their commitment to sustainability.</li>
          <li><strong>Investor Confidence:</strong> Investors increasingly prioritize ESG factors.</li>
        </ul>

        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>
          Potential Impact on Society
        </h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700 mb-10">
          <li><strong>Environmental Sustainability:</strong> It can drive initiatives to reduce carbon emissions and promote clean energy.</li>
          <li><strong>Social Development:</strong> The summit can focus on issues like poverty alleviation, education, and healthcare.</li>
          <li><strong>Good Governance:</strong> It can promote transparency, accountability, and ethical business practices.</li>
        </ul>

        <div className="p-6 rounded-xl text-center shadow-inner" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
          <h3 className="text-2xl font-bold mb-3 text-gray-900">Secure your spot now!</h3>
          <p className="text-lg text-gray-700 mb-4">
            Don't miss this opportunity to be part of something extraordinary. Register for the first step and embark on a transformative journey.
          </p>
          <button 
            className="text-white px-8 py-3 rounded-full font-bold transition duration-300 shadow-md hover:opacity-90"
            style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
};

// ==================== AWARDS PAGE ====================
const AwardsPage = ({ onNavigate }) => {
  const awards = [
    { date: "28th January, 2020", title: "Prime Minister Award", image: IMAGE_URLS.HERO },
    { date: "20th May, 2025", title: "Excellence Recognition", image: IMAGE_URLS.COMMUNITY_SUPPORT },
    { date: "28th January, 2020", title: "Community Service Award", image: IMAGE_URLS.ELDERLY_CARE },
    { date: "28th January, 2020", title: "Social Impact Award", image: IMAGE_URLS.GIRL_EDUCATION }
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 text-center">Awards & Recognitions</h1>
        <p className="text-lg text-gray-700 mb-12 leading-relaxed text-center max-w-3xl mx-auto">
          Let's Expand on Sabri Helpage's Impactful Work. While formal awards and recognition are undoubtedly valuable, 
          Sabri Helpage's greatest reward lies in the tangible impact it creates in the lives of its beneficiaries.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {awards.map((award, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
              <ResponsiveImage 
                src={award.image}
                alt={award.title}
                className="h-48 w-full object-cover"
                fallbackText="Award"
              />
              <div className="p-4 text-center">
                <p className="text-sm font-semibold mb-2" style={{ color: COLORS.ACCENT_ORANGE }}>{award.date}</p>
                <h3 className="text-lg font-bold text-gray-900">{award.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            className="text-white px-8 py-3 rounded-full font-bold transition duration-300 shadow-md hover:opacity-90"
            style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
          >
            View All Awards
          </button>
        </div>
      </div>
    </section>
  );
};

// ==================== PRIVACY PAGE ====================
const PrivacyPage = ({ onNavigate }) => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Privacy Policy</h1>

        <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>
          Information Collection
        </h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Sabri Helpage obtains user information when the user donates something, participates in a campaign, or registers to get updates.
        </p>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          To ensure legitimate donations, we require: Your Name, postal address, email address, contact number, payment processing details, and any further information if needed.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>
          Use of Personal Information
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Sabri Helpage does not gather or track personal information unless the user decides to provide it. No business or organization outside of Sabri Helpage receives, shares, rents, or distributes this personal information.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>
          Email Privacy
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Sabri Helpage adds people to its email database who sign up for mailing lists. The addresses on our lists are never sold, rented, leased, borrowed, or traded.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>
          Cookie Information
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Sabri Helpage uses cookies to enhance user experience. Users can adjust their browser settings to manage cookie behavior.
        </p>

        <p className="text-sm text-gray-600 mt-12">
          For questions, please contact us at <a href="mailto:support@sabrihelpage.org" className="underline" style={{ color: COLORS.ACCENT_ORANGE }}>support@sabrihelpage.org</a>
        </p>
      </div>
    </section>
  );
};

// ==================== TERMS PAGE ====================
const TermsPage = ({ onNavigate }) => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Terms and Conditions</h1>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Sabri Helpage maintains the right, at any moment, to modify these terms and conditions by publishing updates online. You consent to using this website solely for legitimate purposes and in a way that doesn't violate anyone else's rights.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>
          Copyright Policy
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          It is completely forbidden to utilize any of the presented items for commercial purposes or to publish them without first obtaining permission from Sabri Helpage.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>
          External Websites
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          The content of external websites is not within the control of Sabri Helpage. We disclaim all responsibility for any claims, information, goods, or services on external websites.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>
          Governing Law And Jurisdiction
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          These Terms of Use shall be governed by the laws of INDIA. Each party irrevocably accepts and submits to the exclusive jurisdiction of the courts in Kolkata, India.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>
          Contact
        </h2>
        <div className="text-lg text-gray-700 space-y-2">
          <p>Sabri Helpage</p>
          <p>7B, Mysore Road, Rashbehari Avenue</p>
          <p>Kolkata - 700026</p>
          <p>033-4601 3886</p>
          <p><a href="mailto:info@sabrihelpage.org" className="underline" style={{ color: COLORS.ACCENT_ORANGE }}>info@sabrihelpage.org</a></p>
        </div>
      </div>
    </section>
  );
};

// ==================== FAQ PAGE ====================
const FAQPage = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "How will my small contribution make a difference?", a: "Every contribution, no matter how small, helps us provide essential services to those in need. Your donation directly supports our programs in mental health, elderly care, and education." },
    { q: "What is the advantage of becoming a monthly donor?", a: "Monthly donors provide us with reliable, sustained funding that allows us to plan long-term programs and make a lasting impact in communities." },
    { q: "Are donations to Sabri Helpage tax exempt?", a: "Yes, Sabri Helpage is a registered non-profit organization. Donations are eligible for tax exemption under Section 80G of the Income Tax Act." },
    { q: "How will I get a tax exemption certificate for my donation?", a: "Tax exemption certificates are automatically sent to your registered email address within 7-10 business days of your donation." },
    { q: "Are my online donation transactions secure?", a: "Yes, we use industry-standard encryption and secure payment gateways to ensure all transactions are completely safe and secure." },
    { q: "Does Sabri Helpage accept cash donations?", a: "We primarily accept online donations for transparency and record-keeping. However, for special circumstances, please contact our office directly." },
    { q: "How does Sabri Helpage raise its funds?", a: "We raise funds through individual donations, corporate partnerships, grants, and fundraising events." },
    { q: "How does Sabri Helpage choose the projects it supports?", a: "Projects are selected based on community needs assessment, sustainability, and alignment with our core mission areas." },
    { q: "Does Sabri Helpage ensure that its projects use the allocated funds properly?", a: "Yes, we have strict financial controls and regular audits to ensure all funds are used effectively and transparently." },
    { q: "Can I sponsor an individual through Sabri Helpage?", a: "Yes, we offer sponsorship programs for children's education and elderly care. Contact us for more details." }
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 text-center">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-700 mb-12 leading-relaxed text-center">
          Find answers to common questions about Sabri Helpage and how you can get involved.
        </p>

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

// ==================== PUBLICATIONS PAGE ====================
const PublicationsPage = ({ onNavigate }) => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Publications</h1>
        <p className="text-lg text-gray-700 mb-12 leading-relaxed">
          Explore our research, reports, and publications on social welfare, mental health, and community development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <FileText className="w-16 h-16 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Annual Report 2024</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive overview of our activities, impact, and financial statements for the year 2024.
                </p>
                <button 
                  className="font-semibold text-sm transition duration-300 flex items-center hover:text-gray-900"
                  style={{ color: COLORS.ACCENT_ORANGE }}
                >
                  Download PDF <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== INTERNSHIP PAGE ====================
const InternshipPage = ({ onNavigate }) => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Internship Opportunities</h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Join Sabri Helpage as an intern and gain valuable experience while making a real difference in the lives of vulnerable communities. 
          Our internship programs offer hands-on experience in social work, mental health counseling, community development, and project management.
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>
          What You'll Gain
        </h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700 mb-8">
          <li>Practical experience in the non-profit sector</li>
          <li>Mentorship from experienced professionals</li>
          <li>Certificate of completion</li>
          <li>Networking opportunities</li>
          <li>Potential for full-time employment</li>
        </ul>

        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ color: COLORS.ACCENT_ORANGE }}>
          Available Positions
        </h2>
        <div className="space-y-4 mb-10">
          {['Social Work Intern', 'Content Writing Intern', 'Program Management Intern', 'Research Intern'].map((position, index) => (
            <div key={index} className="p-4 border-l-4 bg-gray-50 rounded" style={{ borderColor: COLORS.ACCENT_ORANGE }}>
              <h3 className="font-bold text-lg text-gray-900">{position}</h3>
              <p className="text-sm text-gray-600">Duration: 3-6 months | Location: Remote/Kolkata</p>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-xl text-center shadow-inner" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
          <h3 className="text-2xl font-bold mb-3 text-gray-900">Ready to Apply?</h3>
          <p className="text-lg text-gray-700 mb-4">
            Send your resume and cover letter to our recruitment team today.
          </p>
          <a 
            href="mailto:careers@sabrihelpage.org"
            className="inline-block text-white px-8 py-3 rounded-full font-bold transition duration-300 shadow-md hover:opacity-90"
            style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
};

// ==================== MAIN APP ====================
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'gallery':
        return <GalleryPage onNavigate={handleNavigate} />;
      case 'mental-health':
        return <MentalHealthPage onNavigate={handleNavigate} />;
      case 'elderly-care':
        return <ElderlyCarePage onNavigate={handleNavigate} />;
      case 'girl-education':
        return <GirlEducationPage onNavigate={handleNavigate} />;
      case 'donate':
        return <DonatePage onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'csr':
        return <CSRSummitPage onNavigate={handleNavigate} />;
      case 'awards':
        return <AwardsPage onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPage onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsPage onNavigate={handleNavigate} />;
      case 'faq':
        return <FAQPage onNavigate={handleNavigate} />;
      case 'publications':
        return <PublicationsPage onNavigate={handleNavigate} />;
      case 'internship':
        return <InternshipPage onNavigate={handleNavigate} />;
      case 'causes':
        return <HomePage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;