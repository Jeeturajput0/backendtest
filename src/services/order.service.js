import { API_URI } from "../config";

const services = {};

services.getAllOrders = async (payload = {}) => {
  try {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams();

    params.append("page", payload.page || 1);
    params.append("limit", payload.limit || 10);

    if (payload.search) {
      params.append("search", payload.search);
    }

    const response = await fetch(
      `${API_URI}/admin/order?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    console.log("ORDERS RESPONSE:", data);

    return data;
  } catch (error) {
    console.log("ORDERS ERROR:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};

services.getOrderById = async (order_id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_URI}/admin/order/${order_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    console.log("ORDER DETAIL RESPONSE:", data);

    return data;
  } catch (error) {
    console.log("ORDER DETAIL ERROR:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};
export default services;