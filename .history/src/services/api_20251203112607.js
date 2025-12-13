// src/services/api.js
// Functional API client to avoid `this` binding issues when passing methods
import { API_BASE_URL } from '../constants/config';

const jsonRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  };
  const res = await fetch(url, config);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.message || data?.error || res.statusText;
    throw new Error(message || 'Request failed');
  }
  return data;
};

const formRequest = async (endpoint, formData, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    method: 'POST',
    body: formData,
    ...(options || {}),
  };
  const res = await fetch(url, config);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.message || data?.error || res.statusText;
    throw new Error(message || 'Upload failed');
  }
  return data;
};

const withQuery = (path, params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return `${path}${qs ? `?${qs}` : ''}`;
};

const api = {
  // Config
  getSiteConfig: () => jsonRequest('/config'),
  getConfig: () => jsonRequest('/config'),

  // Editable content
  getPageContent: (slug) => jsonRequest(`/content/page/${slug}`),
  getCauseContent: (slug) => jsonRequest(`/content/cause/${slug}`),
  getTestimonials: () => jsonRequest('/testimonials'),

  // Collections
  getBlogs: (params = {}) => jsonRequest(withQuery('/blogs', params)),
  getBlogById: (id) => jsonRequest(`/blogs/${id}`),

  getStories: (params = {}) => jsonRequest(withQuery('/stories', params)),
  getStoryById: (id) => jsonRequest(`/stories/${id}`),

  getEvents: (params = {}) => jsonRequest(withQuery('/events', params)),
  getEventById: (id) => jsonRequest(`/events/${id}`),

  getVideos: (params = {}) => jsonRequest(withQuery('/videos', params)),
  getVideoById: (id) => jsonRequest(`/videos/${id}`),

  getAwards: (params = {}) => jsonRequest(withQuery('/awards', params)),
  getPublications: (params = {}) => jsonRequest(withQuery('/publications', params)),
  getFaqs: (params = {}) => jsonRequest(withQuery('/faqs', params)),
  getTeachers: (params = {}) => jsonRequest(withQuery('/teachers', params)),

  // Forms
  createDonor: (body) => jsonRequest('/donors', { method: 'POST', body: JSON.stringify(body) }),
  createVolunteer: (body) => jsonRequest('/volunteers', { method: 'POST', body: JSON.stringify(body) }),
  createInternship: (body) => jsonRequest('/internships', { method: 'POST', body: JSON.stringify(body) }),
  createClubRegistration: (body) => jsonRequest('/clubs', { method: 'POST', body: JSON.stringify(body) }),
  createContact: (body) => jsonRequest('/contacts', { method: 'POST', body: JSON.stringify(body) }),

  // CSR w/ FormData
  submitCSR: (formData) => formRequest('/csr/submit', formData),
};

export default api;
