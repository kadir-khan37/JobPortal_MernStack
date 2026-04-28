import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ← Change to your actual backend URL
  withCredentials: true,        // ← This is very important
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;