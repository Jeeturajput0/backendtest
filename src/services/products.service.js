import { API_URI } from "../config";

const services = {};

const buildQuery = (payload = {}) => {
  const params = new URLSearchParams();

  if (payload.search) {
    params.append("search", payload.search);
  }

  if (payload.isActive !== undefined && payload.isActive !== "") {
    params.append("is_active", payload.isActive);
  }

  if (payload.isFeatured !== undefined && payload.isFeatured !== "") {
    params.append("isFeatured", payload.isFeatured);
  }

  return params.toString();
};

services.getAllproducts = async (payload = {}) => {
  try {
    const scope = payload.scope === "admin" ? "admin" : "public";
    const token = localStorage.getItem("token");
    const query = buildQuery(payload);
    const endpoint = scope === "admin" ? `${API_URI}/admin/product` : `${API_URI}/product`;
    const headers = {
      "Content-Type": "application/json",
    };

    if (scope === "admin" && token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(query ? `${endpoint}?${query}` : endpoint, {
      method: "GET",
      headers,
    });

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

    const response = await fetch(`${API_URI}/admin/product/${product_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export default services;
