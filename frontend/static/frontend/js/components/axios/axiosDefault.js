import axios from "axios";


const axiosDefault = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosDefault;
