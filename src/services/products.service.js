import { API_URI } from "../config";

const services = {};

services.getAllproducts = async (payload = {}) => {
  try {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams();

    if (payload.search) {
      params.append("search", payload.search);
    }

    if (payload.isActive !== undefined && payload.isActive !== "") {
      params.append("is_active", payload.isActive);
    }

    if (payload.isFeatured !== undefined) {
      params.append("isFeatured", payload.isFeatured);
    }

    const response = await fetch(
      `${API_URI}/admin/product?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

services.deleteProduct = async (product_id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_URI}/admin/product/${product_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export default services;
