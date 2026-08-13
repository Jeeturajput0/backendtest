import { API_URI, AUTH_TOKEN } from "../config";

const services = {};


services.getAllCategories = async (payload = {}) => {
  try {
    const query = new URLSearchParams();

    query.append("page", String(payload.page || 1));

    query.append("limit", String(payload.limit || 10));

    if (payload.search) {
      query.append("search", payload.search);
    }

    if (payload.isActive !== undefined && payload.isActive !== "") {
      query.append("isActive", String(payload.isActive));
    }

    if (payload.isFeatured !== undefined && payload.isFeatured !== "") {
      query.append("isFeatured", String(payload.isFeatured));
    }

    const url = `${API_URI}/category?${query.toString()}`;

    console.log("CATEGORY API:", url);

    const response = await fetch(url, {
      method: "GET",
    });

    const data = await response.json();

    console.log("CATEGORY RESPONSE:", data);

    return data;
  } catch (error) {
    console.error("Get categories error:", error);

    return {
      success: false,
      message: error.message || "Categories not fetched",
      data: [],
    };
  }
};


services.categoryDelete = async (category_id) => {
  try {
    const res = await fetch(`${API_URI}/admin/category/${category_id}`, {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Delete category error:", error);

    return {
      success: false,
      message: error.message || "Category not deleted",
    };
  }
};

export default services;
