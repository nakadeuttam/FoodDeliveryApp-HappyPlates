import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const adminLogin = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/admin/login`, credentials);
        if (response.data.token) {
            localStorage.setItem("adminToken", response.data.token);
            localStorage.setItem("adminEmail", response.data.email);
            localStorage.setItem("adminRole", response.data.role);
        }
        return response;
    } catch (error) {
        throw error;
    }
};

export const adminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminRole");
};

export const getAdminToken = () => {
    return localStorage.getItem("adminToken");
};

export const isAdminAuthenticated = () => {
    const token = getAdminToken();
    const role = localStorage.getItem("adminRole");
    return token && role === "ADMIN";
};