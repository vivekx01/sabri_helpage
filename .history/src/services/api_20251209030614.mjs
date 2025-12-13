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

// Helper to handle API errors
const handleApiError = (error) => {
  console.error('API Error:', error);
  let message = 'An error occurred while processing your request.';
  
  if (error.response) {
    message = error.response.data?.message || error.response.statusText || message;
  } else if (error.request) {
    message = 'No response from server. Please check your connection.';
  } else {
    message = error.message || message;
  }
  throw new Error(message);
};

// Authenticated request helper
const authRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  };
  
  try {
    return await jsonRequest(endpoint, { ...options, headers });
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    throw error;
  }
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
};

export default api;
