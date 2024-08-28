import axios from "axios";

const API_TOKEN = process.env.API_TOKEN;
const BASEROW_API_URL_GET = process.env.BASEROW_API_URL_GET;

const api = axios.create({
  baseURL: BASEROW_API_URL_GET,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = API_TOKEN;
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;
