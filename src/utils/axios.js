import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Use your backend URL
  withCredentials: true,
});

// Add JWT token from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
