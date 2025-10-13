import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getBrands = async (category = null) => {
  const params = category ? { category } : {};
  const response = await api.get('/brands', { params });
  return response.data;
};

export const getPriceRange = async (category = null) => {
  const params = category ? { category } : {};
  const response = await api.get('/price-range', { params });
  return response.data;
};

export const getRecommendations = async (filters) => {
  const response = await api.post('/recommend', filters);
  return response.data;
};

export const getProductById = async (productId) => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};

export const getSimilarProducts = async (productId, limit = 5) => {
  const response = await api.get(`/products/${productId}/similar`, {
    params: { limit },
  });
  return response.data;
};

export default api;