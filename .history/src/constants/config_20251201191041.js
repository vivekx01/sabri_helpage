import { Youtube, Instagram, Linkedin, Facebook, X } from 'lucide-react';

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const COLORS = {
  // Primary brand color
  PRIMARY: '#eb4c28',           // Main brand color (vibrant red-orange)
  PRIMARY_DARK: '#c13919',      // Darker shade for headers and emphasis
  PRIMARY_LIGHT: '#f17052',     // Lighter shade for backgrounds and hover states
  PRIMARY_PALE: '#fef0ed',      // Very light shade for subtle backgrounds
  
  // Accent colors
  ACCENT_ORANGE: '#ff7f50',     // Complementary coral orange for CTAs
  ACCENT_WARM: '#f56242',       // Warm accent for highlights
  
  // Neutral colors
  BG_LIGHT_GRAY: '#f7f7f7',
  TEXT_DARK: '#2a1410',         // Dark warm brown for text
  TEXT_GRAY: '#6B6B6B',         // Gray for secondary text
  
  // Legacy (keeping for backwards compatibility)
  LOGO_RED: '#d32f2f'
};

export const IMAGE_URLS = {
  // Use reliable placeholders so images render even if public assets are missing
  HERO: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
  WHAT_WE_STAND_FOR_1: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
  WHAT_WE_STAND_FOR_2: 'https://images.unsplash.com/photo-1520974692437-4e1d6b1b4d0d?auto=format&fit=crop&w=800&q=80',
  WHAT_WE_STAND_FOR_3: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=900&q=80',
  MENTAL_HEALTH: 'https://images.unsplash.com/photo-1512341689857-198e7f1c9784?auto=format&fit=crop&w=1400&q=80',
  ELDERLY_CARE: 'https://images.unsplash.com/photo-1542601098-8fc4b8d1592b?auto=format&fit=crop&w=1400&q=80',
  GIRL_EDUCATION: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1400&q=80',
  DONATE_CALLOUT: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  NEWS_1_LEGAL: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
  NEWS_2_FOOD: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80',
  NEWS_3_WATER: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1000&q=80',
  AWARDS_BACKGROUND: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=1400&q=60',
  CHILDREN_HAPPY: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
  KIDS_LEARNING: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=80',
  COMMUNITY_SUPPORT: 'https://images.unsplash.com/photo-1542601098-8fc4b8d1592b?auto=format&fit=crop&w=1200&q=80',
};

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1593113598375-3b7a4b7b1b5b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1532634977-307d02ad48d9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542601098-8fc4b8d1592b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512341689857-198e7f1c9784?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
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