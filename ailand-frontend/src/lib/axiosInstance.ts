import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // e.g. http://localhost:8000
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
