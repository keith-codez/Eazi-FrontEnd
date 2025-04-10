import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/staff/";
const API_PASS_URL = "http://127.0.0.1:8000/api/"




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



export const requestPasswordReset = async (email) => {
    try {
        const response = await axios.post(`${API_PASS_URL}password_reset/`, { email });
        return response.data;
    } catch (error) {
        console.error("Password reset request failed:", error.response?.data);
        throw error;
    }
};


export const resetPassword = async (token, password) => {
    try {
        const response = await axios.post(`${API_PASS_URL}password_reset/confirm/`, {
            password: password,
            token: token,
        });
        return response.data;
    } catch (error) {
        console.error("Password reset failed:", error.response?.data);
        throw error;
    }
};


export const loginCustomer = async (email, password) => {
    const response = await fetch(`${API_PASS_URL}/rental/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem("customer_access_token", data.access_token);
      localStorage.setItem("customer_refresh_token", data.refresh_token);
    }
    return data;
  };
  
  export const registerCustomer = async (name, email, password) => {
    const response = await fetch(`${API_PASS_URL}/rental/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    return await response.json();
  };