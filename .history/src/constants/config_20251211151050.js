import { Youtube, Instagram, Linkedin, Facebook, X } from 'lucide-react';

export const COLORS = {
  PRIMARY_DARK: '#260B00',
  ACCENT_ORANGE: '#b4362c',
  BG_LIGHT_GRAY: '#f7f7f7',
  LOGO_RED: '#b4362c'
};

export const IMAGE_URLS = {
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

export const GALLERY_IMAGES = [
  'event1.jpg',
  'event2.jpg',
  'event3.jpg',
  'event4.jpg',
  'event5.jpg',
  'event6.jpg',
  'event7.jpg'
];

export const YOUTUBE_VIDEO_ID = 'csNcS9X49dQ';

export const SOCIAL_LINKS = [
  { Icon: Youtube, url: 'https://www.youtube.com/@sabrihelpage', label: 'Youtube' },
  { Icon: Instagram, url: 'https://www.instagram.com/sabrihelpage/', label: 'Instagram' },
  { Icon: Linkedin, url: 'https://www.linkedin.com/company/sabri-helpage/', label: 'Linkedin' },
  { Icon: Facebook, url: 'https://www.facebook.com/SabriHelpage/', label: 'Facebook' },
  { Icon: X, url: 'https://x.com/SabriHelpage', label: 'X' }
];

export const API_BASE_URL = 'http://localhost:5000';

export const PAGE_TITLES = {
  home: 'Home',
  about: 'About Us',
  contact: 'Contact Us',
  gallery: 'Gallery',
  donate: 'Donate',
  ilc: 'ILC',
  sociofare: 'Sociofare',
  ourcauses: 'Our Causes',
  stories: 'Stories',
  events: 'Events',
  privacy: 'Privacy Policy',
  terms: 'Terms of Use',
  faq: 'FAQ',
  publications: 'Publications',
  csr: 'CSR Summit',
  awards: 'Awards',
  blog: 'Blog',
  'mental-health': 'Mental Health',
  'elderly-care': 'Elderly Care',
  'girl-education': 'Girl Education',
  internship: 'Internship'
};

export default {
  COLORS,
  IMAGE_URLS,
  GALLERY_IMAGES,
  YOUTUBE_VIDEO_ID,
  SOCIAL_LINKS,
  PAGE_TITLES
};