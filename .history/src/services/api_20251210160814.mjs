// src/services/api.mjs
// API client for backend page endpoints

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export async function getPages() {
  const res = await fetch(`${API_BASE_URL}/pages`);
  if (!res.ok) throw new Error('Failed to fetch pages');
  return res.json();
}

export async function getPage(slug) {
  const res = await fetch(`${API_BASE_URL}/pages/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch page');
  return res.json();
}

export async function updatePage(slug, data) {
  const res = await fetch(`${API_BASE_URL}/pages/${slug}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update page');
  return res.json();
}
