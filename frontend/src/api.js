import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (username, email, password) =>
    api.post('/auth/register', { username, email, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me'),
};

// Product endpoints
export const productsAPI = {
  getAll: (page = 1, perPage = 10, search = '') =>
    api.get('/products', { params: { page, per_page: perPage, search } }),
  getById: (id) => api.get(`/products/${id}`),
  create: (productData) => api.post('/products', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`),
};

// Cart endpoints
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addItem: (productId, quantity) =>
    api.post('/cart/items', { product_id: productId, quantity }),
  updateItem: (itemId, quantity) =>
    api.put(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId) => api.delete(`/cart/items/${itemId}`),
};

// Order endpoints
export const ordersAPI = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  create: () => api.post('/orders'),
};

// Review endpoints
export const reviewsAPI = {
  getByProductId: (productId) =>
    api.get(`/reviews/product/${productId}`),
  create: (productId, rating, comment) =>
    api.post(`/reviews/product/${productId}`, { rating, comment }),
};

export default api;
