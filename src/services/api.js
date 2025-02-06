import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_AUTH,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


const authApi = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getCurrentUser: () => api.get("/auth/me"),
};

const certificatesApi = {
  getCertificates: () => api.get("/admin/certificates"),
  // getCertificatesById: (userId) => api.get(`/users/${userId}`),
  // updateCertificates: (userId, userData) => api.put(`/users/${userId}`, userData),
  // deleteCertificates: (userId) => api.delete(`/users/${userId}`),
};

export { authApi, certificatesApi };