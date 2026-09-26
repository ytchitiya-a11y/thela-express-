import axios from 'axios';
import { auth } from '../firebase';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach the current Firebase ID token to every outgoing request automatically.
// This is the ONLY place auth headers are set - no page needs to handle it manually.
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===== Products =====
export const getProducts = (category) =>
  api.get('/products', { params: category ? { category } : {} });

export const getProductById = (id) => api.get(`/products/${id}`);

// ===== Auth sync (call right after Firebase login/signup) =====
export const syncCustomer = (payload) => api.post('/auth/customer/sync', payload);

// ===== Orders =====
export const placeOrder = (payload) => api.post('/orders', payload);
export const getMyOrders = () => api.get('/orders');
export const getOrderById = (id) => api.get(`/orders/${id}`);

// ===== Payments (Razorpay) =====
export const createRazorpayOrder = (order_id) => api.post('/payments/create-order', { order_id });
export const verifyPayment = (payload) => api.post('/payments/verify', payload);

export default api;
