import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/regulator/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ needed to send cookies
});

export default axiosInstance;
