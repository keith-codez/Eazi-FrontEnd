import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/regulator/";
const API_PASS_URL = "http://127.0.0.1:8000/api/"


export const loginManager = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_URL}login/`,
      { username, password },
      {
        withCredentials: true, // ✅ send cookies with the request
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ Ensure response is what you expect
    return response.data; // should include { user: { ... } }

  } catch (error) {
    console.error("Login request failed:", error);
    throw new Error("Login failed");
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



export const registerCustomer = async ( email, username, phone_number, first_name, last_name, password) => {
    try {
        const response = await axios.post(`${API_URL}register/customer/`, {
            email, username, phone_number, first_name, last_name, password
        });

        return response.data;
    } catch (error) {
        console.error("Registration failed:", error.response?.data);
        throw error;
    }
};


