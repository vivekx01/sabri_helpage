export const fetchWithRetry = async (url, options = {}, retries = 3) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (retries > 0) {
      // Wait for 1 second before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error; // Re-throw if all retries fail
  }
};

export const createApiService = (baseURL) => {
  return {
    get: async (endpoint, options = {}) => {
      return fetchWithRetry(`${baseURL}${endpoint}`, {
        ...options,
        method: 'GET',
      });
    },
    post: async (endpoint, data, options = {}) => {
      return fetchWithRetry(`${baseURL}${endpoint}`, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    // Add other HTTP methods as needed
  };
};

// Example usage:
// const api = createApiService('https://api.example.com');
// const data = await api.get('/endpoint');
