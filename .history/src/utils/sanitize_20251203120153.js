export const sanitizeText = (input) => {
  if (typeof input !== 'string') return '';
  // Remove script/style tags and on* attributes
  return input
    .replace(/<\/(?:script|style)>/gi, '')
    .replace(/<(?:script|style)[\s\S]*?>[\s\S]*?<\/(?:script|style)>/gi, '')
    .replace(/on[a-z]+\s*=\s*"[^"]*"/gi, '')
    .replace(/on[a-z]+\s*=\s*'[^']*'/gi, '')
    .replace(/on[a-z]+\s*=\s*[^\s>]+/gi, '')
    .replace(/[<>]/g, (m) => ({ '<': '&lt;', '>': '&gt;' }[m]));
};

export const sanitizeList = (items) => {
  if (!Array.isArray(items)) return [];
  return items.map((x) => sanitizeText(String(x ?? '')));
};

export default sanitizeText;