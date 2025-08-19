import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const getRestaurants = (params = {}) => api.get('/restaurants', { params });
export const getRestaurant = (id) => api.get(`/restaurants/${id}`);
export const getRestaurantMetrics = (id, params) => api.get(`/analytics/restaurant/${id}`, { params });
export const getTopRestaurants = (params) => api.get('/analytics/top-restaurants', { params });