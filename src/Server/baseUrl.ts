import axios from "axios";
const baseURL = "https://upskilling-egypt.com:3005";
export const ImageURL = "https://upskilling-egypt.com:3005"
export const axiosInstance = axios.create({
    baseURL,
});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
export const USERS_URLS = {
    login: `${baseURL}/api/auth/login`,
}