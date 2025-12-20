import axios from "axios";
import { getAdminToken } from "./adminAuthService";

const API_URL = "http://localhost:8080/api/orders";

const getAuthHeaders = () => {
    const token = getAdminToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchAllOrders = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred while fetching the orders', error);
        throw error;
    }
};

export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await axios.patch(
            `${API_URL}/status/${orderId}?status=${status}`,
            {},
            { headers: getAuthHeaders() }
        );
        return response.status === 200;
    } catch (error) {
        console.error('Error occurred while updating the status', error);
        throw error;
    }
};