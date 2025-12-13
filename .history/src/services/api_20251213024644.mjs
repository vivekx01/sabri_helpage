// src/services/api.mjs
// Functional API client to avoid `this` binding issues when passing methods

import { API_BASE_URL } from '../constants/config.js';

const jsonRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include', // Ensures cookies are sent for CORS
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
    throw new Error(error.message || 'Network error');
  }
};

const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
};

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
  // Public API endpoints
  postContact: (payload) => jsonRequest('/api/public/contact', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  
  postSubscribe: (payload) => jsonRequest('/api/public/subscribe', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  
  postDonate: (payload) => jsonRequest('/api/public/donate', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  
  getCauses: () => jsonRequest('/api/public/causes'),
  getStories: () => jsonRequest('/api/public/stories'),
  getConfig: () => jsonRequest('/config'),
  
  // Admin endpoints
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
    window.location.href = '/admin/login';
  },
  getAdminPages: async () => authRequest('/api/admin/pages'),
  getAdminPage: async (slug) => authRequest(`/api/admin/pages/${slug}`),
  updateAdminPage: async (slug, data) => authRequest(`/api/admin/pages/${slug}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteAdminPage: async (slug) => authRequest(`/api/admin/pages/${slug}`, {
    method: 'DELETE',
  }),
  getContacts: async () => authRequest('/api/admin/contacts'),
  getPages: async () => jsonRequest('/api/pages'),
  getPage: async (slug) => jsonRequest(`/api/pages/${slug}`),
};

export default api;
