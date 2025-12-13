const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

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

export default { postContact };