export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

export const sanitizeHtml = (html) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

/**
 * Sanitizes text by removing potentially dangerous HTML
 * @param {string} text - The text to be sanitized
 * @returns {string} - The sanitized text
 */
export const sanitizeText = (text) => {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Sanitizes an array of text items
 * @param {Array} list - Array of text items to be sanitized
 * @returns {Array} - Array of sanitized text items
 */
export const sanitizeList = (list) => {
  if (!Array.isArray(list)) return [];
  return list.map(item => sanitizeText(item));
};
