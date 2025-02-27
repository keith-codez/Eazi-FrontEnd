import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/staff/";

export const loginManager = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}login/`, { username, password });
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        return response.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data);
        throw error;
    }
};

export const registerManager = async (username, first_name, middle_name, last_name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}register/`, {
            username, first_name, middle_name, last_name, email, password
        });

        return response.data;
    } catch (error) {
        console.error("Registration failed:", error.response?.data);
        throw error;
    }
};
