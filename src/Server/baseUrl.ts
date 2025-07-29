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
    register: `${baseURL}/api/auth/register`,
    forgetPassword: `${baseURL}/api/auth/forgot-password`,
    resetPassword: `${baseURL}/api/auth/reset-password`,
    ChangePassword: `${baseURL}/api/auth/change-password`,
}



export const Student_URLS = {
  getStudents: `${baseURL}/api/student`,
}
export const GROUPS_URLS = {
  GET_ALL_GROUPS:`/api/group`,
  ADD_GROUP:`/api/group`,
  GET_GROUP_BY_ID:(id:string)=>`/api/group/${id}`,
  DELETE_GROUP:(id:string)=>`/api/group/${id}`,
  UPDATE_GROUP:(id:string)=>`/api/group/${id}`
}
export const STUDENTS_URLS = {
  GET_ALL_STUDENTS:`/api/student/without-group`,
  
}