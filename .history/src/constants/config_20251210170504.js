// Main navigation items for header
export const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Our Causes', href: '/ourcauses' },
  { name: 'Sociofare', href: '/sociofare' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Donate', href: '/donate' },
  { name: 'Contact', href: '/contact' }
];
import { Youtube, Instagram, Linkedin, Facebook, X } from 'lucide-react';

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const COLORS = {
  // All theme colors set to #b13c30 for a unified look
  PRIMARY: '#b13c30',
  PRIMARY_DARK: '#b13c30',
  PRIMARY_LIGHT: '#b13c30',
  PRIMARY_PALE: '#b13c30',
  ACCENT_ORANGE: '#b13c30',
  ACCENT_WARM: '#b13c30',
  BG_LIGHT_GRAY: '#fff', // Use white for backgrounds to avoid UI breakage
  TEXT_DARK: '#b13c30',
  TEXT_GRAY: '#b13c30',
  LOGO_RED: '#b13c30',
};

export const IMAGE_URLS = {
  // Use absolute paths for assets in `public/` so they work on any route
  HERO: '/HeroSection.jpg',
  WHAT_WE_STAND_FOR_1: '/event2.jpg',
  WHAT_WE_STAND_FOR_2: '/event3.jpg',
  WHAT_WE_STAND_FOR_3: '/event4.jpg',
  MENTAL_HEALTH: '/MentalHealth.jpg',
  ELDERLY_CARE: '/elderlyCareImg.jpg',
  GIRL_EDUCATION: '/girlChildEducation.jpg',
  DONATE_CALLOUT: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  NEWS_1_LEGAL: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  NEWS_2_FOOD: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  NEWS_3_WATER: '/WaterFilteration.jpg'
};

export const GALLERY_IMAGES = [
  { src: '/event1.jpg', text: 'Community Outreach Program' },
  { src: '/event2.jpg', text: 'Elderly Care Initiative' },
  { src: '/event3.jpg', text: 'Health Awareness Camp' },
  { src: '/event4.jpg', text: 'Food Distribution Drive' },
  { src: '/event5.jpg', text: 'Education for Girls' },
  { src: '/event6.jpg', text: 'Mental Health Workshop' },
  { src: '/event7.jpg', text: 'Water Filtration Project' },
  { src: '/event8.jpg', text: 'CSR Summit Event' },
  { src: '/event9.jpg', text: 'Award Ceremony' },
  { src: '/event10.jpg', text: 'Volunteer Training Session' },
  { src: '/elderlyCareImg.jpg', text: 'Elderly Home Visit' },
  { src: '/girlChildEducation.jpg', text: 'Girl Child Education Program' }
];

export const YOUTUBE_VIDEO_ID = 'csNcS9X49dQ';

export const SOCIAL_LINKS = [
  { Icon: Youtube, url: 'https://www.youtube.com/@sabrihelpage167', label: 'Youtube' },
  { Icon: Instagram, url: 'https://www.instagram.com/sabrihelpage/', label: 'Instagram' },
  { Icon: Linkedin, url: 'https://www.linkedin.com/company/sabri-helpage/', label: 'Linkedin' },
  { Icon: Facebook, url: 'https://www.facebook.com/SabriHelpage/', label: 'Facebook' },
  { Icon: X, url: 'https://x.com/SabriHelpage', label: 'X' }
];

export const PAGE_TITLES = {
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

export default {
  COLORS,
  IMAGE_URLS,
  GALLERY_IMAGES,
  YOUTUBE_VIDEO_ID,
  SOCIAL_LINKS,
  PAGE_TITLES
};