import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "/api",
    timeout: 5000,
    headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    }
});

export default axiosInstance;
