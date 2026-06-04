
const baseURL = 'http://localhost:5000';


export const buildAuthHeaders = (customHeaders = {}, hasBody = false) => {
  const token = localStorage.getItem('loginToken');

  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  };

  // Only set Content-Type if there's a body
  if (hasBody && !customHeaders['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
};

const apiClient = async (endpoint, options = {}) => {
  const method = options.method || 'GET';

  console.log(`${method} ${baseURL}/api/${endpoint}`);

  // Check if there's a body in the request
  const hasBody = options.body !== undefined;

  const response = await fetch(`${baseURL}/api/${endpoint}`, {
    method,
    credentials: 'include',
    ...options,
    headers: buildAuthHeaders(options.headers || {}, hasBody),
  });

  let data;

  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    console.error('API Error Response:', data);
    throw new Error(data?.message || 'Something went wrong');
  }

  return data;
};

export default apiClient;
