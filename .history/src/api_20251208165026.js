let API_BASE = '';
try {
  // Prefer Vite env, fallback to same-origin
  API_BASE = (import.meta?.env?.VITE_API_BASE_URL || '') || '';
} catch (e) {
  API_BASE = '';
}
// If not provided, default to same-origin and rely on Vite proxy in dev
if (!API_BASE && typeof window !== 'undefined' && window.location) {
  API_BASE = ''; // same-origin prefix, e.g. '/api/public/...'
}

async function request(path, options = {}) {
  const url = API_BASE + path;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    let body;
    try { body = JSON.parse(text); } catch(e) { body = text; }
    throw new Error(body && body.error ? body.error : res.statusText);
  }
  return res.json();
}

export async function postContact(payload) {
  return request('/api/public/contact', { method: 'POST', body: JSON.stringify(payload) });
}

export async function postSubscribe(payload) {
  return request('/api/public/subscribe', { method: 'POST', body: JSON.stringify(payload) });
}

export async function postDonate(payload) {
  return request('/api/public/donate', { method: 'POST', body: JSON.stringify(payload) });
}

export async function getCauses() {
  return request('/api/public/causes');
}

export async function getStories() {
  return request('/api/public/stories');
}

export async function getAnimals() {
  return request('/apixyz/animals');
}

export default { postContact, postSubscribe, postDonate, getCauses, getStories, getAnimals };
