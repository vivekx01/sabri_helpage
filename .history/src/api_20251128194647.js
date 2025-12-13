let API_BASE = '';
if (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_BASE_URL) {
  API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
} else {
  try {
    API_BASE = import.meta?.env?.VITE_API_BASE_URL || '';
  } catch (e) {
    API_BASE = '';
  }
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
  return request('/api/contact', { method: 'POST', body: JSON.stringify(payload) });
}

export async function postSubscribe(payload) {
  return request('/api/subscribe', { method: 'POST', body: JSON.stringify(payload) });
}

export async function postDonate(payload) {
  return request('/api/donate', { method: 'POST', body: JSON.stringify(payload) });
}

export async function getCauses() {
  return request('/api/causes');
}

export async function getStories() {
  return request('/api/stories');
}

export async function getAnimals() {
  return request('/apixyz/animals');
}

export default { postContact, postSubscribe, postDonate, getCauses, getStories, getAnimals };
