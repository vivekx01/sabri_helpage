import { Youtube, Instagram, Linkedin, Facebook, X } from 'lucide-react';

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const COLORS = {
  // Primary brand color - Burgundy Red Theme
  PRIMARY: '#b34034',           // Main brand color (deep burgundy red)
  PRIMARY_DARK: '#8a2d26',      // Darker shade for headers and emphasis
  PRIMARY_LIGHT: '#c75a4d',     // Lighter shade for backgrounds and hover states
  PRIMARY_PALE: '#f5e6e4',      // Very light shade for subtle backgrounds

  // Secondary colors derived from primary
  SECONDARY: '#b34034',        // Same as primary for consistency
  SECONDARY_DARK: '#8a2d26',    // Darker secondary
  SECONDARY_LIGHT: '#c75a4d',   // Lighter secondary

  // Accent colors (harmonized with burgundy theme)
  ACCENT_ORANGE: '#b34034',     // Use primary for consistency
  ACCENT_WARM: '#8a2d26',       // Use primary dark for warmth

  // Neutral colors
  BG_LIGHT_GRAY: '#f8f8f8',     // Slightly warmer gray
  BG_WHITE: '#ffffff',         // Pure white for contrast
  TEXT_DARK: '#2a1410',        // Dark warm brown for text
  TEXT_GRAY: '#6B6B6B',        // Gray for secondary text
  TEXT_LIGHT: '#9ca3af',       // Light gray for muted text

  // Status colors (subtle variations)
  SUCCESS: '#10b981',          // Keep green for success
  WARNING: '#f59e0b',          // Keep amber for warnings
  ERROR: '#ef4444',            // Keep red for errors

  // Legacy (keeping for backwards compatibility)
  LOGO_RED: '#b34034'
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
  '/event1.jpg',
  '/event2.jpg',
  '/event3.jpg',
  '/event4.jpg',
  '/event5.jpg',
  '/event6.jpg',
  '/event7.jpg'
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