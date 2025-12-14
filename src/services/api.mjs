// src/services/api.mjs
// Functional API client to avoid `this` binding issues when passing methods

import { API_BASE_URL } from '../constants/config.js';

const jsonRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get token from localStorage if it exists
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...(options.headers || {}),
    },
    credentials: 'include',
    ...options,
  };

  console.log(`Making ${config.method} request to:`, url);
  
  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => ({}));
    
    if (!res.ok) {
      const message = data?.message || data?.error || res.statusText || 'Request failed';
      console.error('API Error:', { status: res.status, message, endpoint });
      const error = new Error(message);
      error.status = res.status;
      
      // Handle unauthorized errors
      if (res.status === 401) {
        // Clear invalid token
        if (typeof window !== 'undefined') {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
        }
        // Redirect to login if we're not already there
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
      
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Request failed:', { endpoint, error });
    throw error;
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
  if (!token) {
    console.error('No auth token found');
    throw new Error('Not authenticated');
  }
  
  return jsonRequest(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...(options.headers || {})
    }
  });
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
    try {
      let data = await jsonRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      data = data['data']
      
      if (data.token) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('adminToken', data.token);
          localStorage.setItem('adminUser', JSON.stringify(data.user || {}));
        }
        return { success: true, ...data };
      }
      
      return { success: false, message: data.message || 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.message || 'An error occurred during login' 
      };
    }
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
