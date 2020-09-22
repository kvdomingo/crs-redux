import axios from "axios";


const jwtToken = localStorage.getItem("token");

const axiosInstance = axios.create({
    baseURL: "/api",
    timeout: 5000,
    headers: { "Content-Type": "application/json" }
});

(jwtToken) && (axiosInstance.defaults.headers["Authorization"] = `JWT ${jwtToken}`);

export default axiosInstance;
