// Store login status in localStorage
export const login = (userType, token) => {
    localStorage.setItem("userType", userType);  // store 'customer' or 'staff'
    localStorage.setItem("authToken", token);    // store auth token
  };
  
  // Retrieve login status from localStorage
  export const getAuthStatus = () => {
    const userType = localStorage.getItem("userType");
    return { userType };  // Return userType (customer or staff)
  };
  
  // Clear login status (logout)
  export const logout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("authToken");
  };