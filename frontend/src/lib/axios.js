import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "http://localhost:5001/api/"   // Added trailing slash here
    : "/api/",
  withCredentials: true,
});
