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
  
  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const message = data?.message || data?.error || res.statusText;
      throw new Error(message || 'Request failed');
    }
    return data;
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(`Failed to connect to server. Make sure the backend is running on ${API_BASE_URL}`);
    }
    throw error;
  }
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

// Helper to get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
};

// Authenticated request helper
const authRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  };
  return jsonRequest(endpoint, { ...options, headers });
};

const api = {
  // Authentication
  login: async (email, password) => {
    const data = await jsonRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.success && data.data?.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminToken', data.data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.data));
      }
    }
    return data;
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    }
  },
  getCurrentUser: async () => {
    try {
      return await authRequest('/auth/me');
    } catch (error) {
      return null;
    }
  },
  isAuthenticated: () => {
    return !!getAuthToken();
  },

  // Config
  getSiteConfig: () => jsonRequest('/config'),
  getConfig: () => jsonRequest('/config'),

  // Editable content (protected)
  getPageContent: (slug) => jsonRequest(`/api/pages/published/${slug}`),
  updatePageContent: (slug, body) => authRequest(`/api/pages/${slug}`, { method: 'PUT', body: JSON.stringify(body) }),
  getPagesList: () => jsonRequest('/api/pages'),
  getCauseContent: (slug) => jsonRequest(`/content/cause/${slug}`),
  getTestimonials: () => jsonRequest('/testimonials'),

  // Collections (public read, protected write)
  getBlogs: (params = {}) => jsonRequest(withQuery('/blogs', params)),
  getBlogById: (id) => jsonRequest(`/blogs/${id}`),
  createBlog: (body) => authRequest('/blogs', { method: 'POST', body: JSON.stringify(body) }),
  updateBlog: (id, body) => authRequest(`/blogs/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteBlog: (id) => authRequest(`/blogs/${id}`, { method: 'DELETE' }),

  getStories: (params = {}) => jsonRequest(withQuery('/stories', params)),
  getStoryById: (id) => jsonRequest(`/stories/${id}`),
  createStory: (body) => authRequest('/stories', { method: 'POST', body: JSON.stringify(body) }),
  updateStory: (id, body) => authRequest(`/stories/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteStory: (id) => authRequest(`/stories/${id}`, { method: 'DELETE' }),

  getEvents: (params = {}) => jsonRequest(withQuery('/events', params)),
  getEventById: (id) => jsonRequest(`/events/${id}`),
  createEvent: (body) => authRequest('/events', { method: 'POST', body: JSON.stringify(body) }),
  updateEvent: (id, body) => authRequest(`/events/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteEvent: (id) => authRequest(`/events/${id}`, { method: 'DELETE' }),

  getVideos: (params = {}) => jsonRequest(withQuery('/videos', params)),
  getVideoById: (id) => jsonRequest(`/videos/${id}`),
  createVideo: (body) => authRequest('/videos', { method: 'POST', body: JSON.stringify(body) }),
  updateVideo: (id, body) => authRequest(`/videos/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteVideo: (id) => authRequest(`/videos/${id}`, { method: 'DELETE' }),

  getAwards: (params = {}) => jsonRequest(withQuery('/awards', params)),
  createAward: (body) => authRequest('/awards', { method: 'POST', body: JSON.stringify(body) }),
  updateAward: (id, body) => authRequest(`/awards/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteAward: (id) => authRequest(`/awards/${id}`, { method: 'DELETE' }),

  getPublications: (params = {}) => jsonRequest(withQuery('/publications', params)),
  createPublication: (body) => authRequest('/publications', { method: 'POST', body: JSON.stringify(body) }),
  updatePublication: (id, body) => authRequest(`/publications/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deletePublication: (id) => authRequest(`/publications/${id}`, { method: 'DELETE' }),

  getFaqs: (params = {}) => jsonRequest(withQuery('/faqs', params)),
  createFaq: (body) => authRequest('/faqs', { method: 'POST', body: JSON.stringify(body) }),
  updateFaq: (id, body) => authRequest(`/faqs/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteFaq: (id) => authRequest(`/faqs/${id}`, { method: 'DELETE' }),

  getTeachers: (params = {}) => jsonRequest(withQuery('/teachers', params)),
  createTeacher: (body) => authRequest('/teachers', { method: 'POST', body: JSON.stringify(body) }),
  updateTeacher: (id, body) => authRequest(`/teachers/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteTeacher: (id) => authRequest(`/teachers/${id}`, { method: 'DELETE' }),

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
