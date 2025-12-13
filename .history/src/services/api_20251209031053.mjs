// src/services/api.mjs
// Functional API client to avoid `this` binding issues when passing methods

import { API_BASE_URL } from '../constants/config';

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
  getAdminPages: async () => authRequest('/admin/pages'),
  getAdminPage: async (slug) => authRequest(`/admin/pages/${slug}`),
  updateAdminPage: async (slug, data) => authRequest(`/admin/pages/${slug}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteAdminPage: async (slug) => authRequest(`/admin/pages/${slug}`, {
    method: 'DELETE',
  }),
  getPages: async () => jsonRequest('/api/pages'),
  getPage: async (slug) => jsonRequest(`/api/pages/${slug}`),
  // Aliases for AdminPanel compatibility
  getPagesList: async () => jsonRequest('/api/pages'),
  getPageContent: async (slug) => jsonRequest(`/api/pages/${slug}`),
};

export default api;
