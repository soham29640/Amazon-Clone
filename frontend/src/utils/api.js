import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' }
});

// Attach JWT token to every request
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

// Products
export const getProducts = () => API.get('/products');
export const getProduct = (id) => API.get(`/products/${id}`);
export const searchProducts = (q) => API.get(`/products/search?q=${q}`);
export const getProductsByCategory = (cat) => API.get(`/products/category/${cat}`);

// Cart
export const getCart = () => API.get('/cart');
export const addCartItem = (data) => API.post('/cart/add', data);
export const removeCartItem = (id) => API.delete(`/cart/${id}`);

// Orders
export const placeOrder = (data) => API.post('/orders', data);
export const getOrders = () => API.get('/orders');
export const getOrder = (id) => API.get(`/orders/${id}`);

export default API;
