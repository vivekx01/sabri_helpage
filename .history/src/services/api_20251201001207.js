// src/services/api.js
import { API_BASE_URL } from '../constants/config';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Blogs
  async getBlogs(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/blogs${queryString ? `?${queryString}` : ''}`);
  }

  async getBlogById(id) {
    return this.request(`/blogs/${id}`);
  }

  // Stories
  async getStories(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/stories${queryString ? `?${queryString}` : ''}`);
  }

  async getStoryById(id) {
    return this.request(`/stories/${id}`);
  }

  // Events
  async getEvents(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/events${queryString ? `?${queryString}` : ''}`);
  }

  async getEventById(id) {
    return this.request(`/events/${id}`);
  }

  // Videos
  async getVideos(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/videos${queryString ? `?${queryString}` : ''}`);
  }

  async getVideoById(id) {
    return this.request(`/videos/${id}`);
  }

  // Awards
  async getAwards(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/awards${queryString ? `?${queryString}` : ''}`);
  }

  // Publications
  async getPublications(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/publications${queryString ? `?${queryString}` : ''}`);
  }

  // FAQs
  async getFaqs(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/faqs${queryString ? `?${queryString}` : ''}`);
  }

  // Teachers
  async getTeachers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/teachers${queryString ? `?${queryString}` : ''}`);
  }

  // Donors
  async createDonor(donorData) {
    return this.request('/donors', {
      method: 'POST',
      body: JSON.stringify(donorData),
    });
  }

  // Volunteers
  async createVolunteer(volunteerData) {
    return this.request('/volunteers', {
      method: 'POST',
      body: JSON.stringify(volunteerData),
    });
  }

  // Internships
  async createInternship(internshipData) {
    return this.request('/internships', {
      method: 'POST',
      body: JSON.stringify(internshipData),
    });
  }

  // Club Registration
  async createClubRegistration(clubData) {
    return this.request('/clubs', {
      method: 'POST',
      body: JSON.stringify(clubData),
    });
  }

  // Contact
  async createContact(contactData) {
    return this.request('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // CSR
  async submitCSR(formData) {
    return this.request('/csr/submit', {
      method: 'POST',
      headers: {},
      body: formData,
    });
  }

  // Site Config
  async getSiteConfig() {
    return this.request('/site-config');
  }
}

export default new ApiService();
