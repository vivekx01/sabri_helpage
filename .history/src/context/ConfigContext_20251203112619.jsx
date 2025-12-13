// src/context/ConfigContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import { IMAGE_URLS as LOCAL_IMAGE_URLS, GALLERY_IMAGES as LOCAL_GALLERY, YOUTUBE_VIDEO_ID as LOCAL_VIDEO_ID, SOCIAL_LINKS as LOCAL_SOCIAL } from '../constants/config';

const ConfigContext = createContext({ config: null, loading: true, error: null });

export const ConfigProvider = ({ children }) => {
  const [state, setState] = useState({ config: null, loading: true, error: null });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const cfgRes = await api.getConfig();
        const cfg = cfgRes?.data || cfgRes || {};
        if (!mounted) return;
        // Normalize backend config and merge with local fallbacks
        const merged = {
          heroImages: cfg.heroImages?.length ? cfg.heroImages : [LOCAL_IMAGE_URLS.HERO],
          carouselImages: cfg.carouselImages || [],
          galleryImages: cfg.galleryImages?.length ? cfg.galleryImages : LOCAL_GALLERY,
          primaryVideoId: cfg.primaryVideoId || LOCAL_VIDEO_ID,
          imageMap: cfg.imageMap || {},
          texts: cfg.texts || {},
          socialLinks: cfg.socialLinks?.length ? cfg.socialLinks : LOCAL_SOCIAL,
          logoUrl: cfg.logoUrl || '/websiteLogo.jpg',
          pages: cfg.pages || {},
          causes: cfg.causes || {},
        };
        // Fetch supplemental content (optional; tolerate failures)
        try {
          const [about, mh, elderly, girl, testimonials] = await Promise.all([
            api.getPageContent('about').catch(() => null),
            api.getCauseContent('mental-health').catch(() => null),
            api.getCauseContent('elderly-care').catch(() => null),
            api.getCauseContent('girl-education').catch(() => null),
            api.getTestimonials().catch(() => []),
          ]);
          merged.pages = { ...(merged.pages || {}), ...(about ? { about } : {}) };
          merged.causes = {
            ...(merged.causes || {}),
            ...(mh ? { 'mental-health': mh } : {}),
            ...(elderly ? { 'elderly-care': elderly } : {}),
            ...(girl ? { 'girl-education': girl } : {}),
          };
          merged.testimonials = testimonials || [];
        } catch (_) {}
        setState({ config: merged, loading: false, error: null });
      } catch (error) {
        // Fallback to local constants entirely
        const fallback = {
          heroImages: [LOCAL_IMAGE_URLS.HERO],
          carouselImages: [],
          galleryImages: LOCAL_GALLERY,
          primaryVideoId: LOCAL_VIDEO_ID,
          imageMap: {},
          texts: {},
          socialLinks: LOCAL_SOCIAL,
          logoUrl: '/websiteLogo.jpg',
          pages: {},
          causes: {},
          testimonials: [],
        };
        setState({ config: fallback, loading: false, error });
      }
    })();
    return () => { mounted = false; };
  }, []);

  const value = useMemo(() => state, [state]);
  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => useContext(ConfigContext);
