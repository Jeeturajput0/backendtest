import {
  API_URI,
  AUTH_TOKEN,
} from "../config";

const service = {};

// =====================================================
// GET ALL BRANDS
// =====================================================

service.getAllBrands = async (payload = {}) => {
  try {
    const query = new URLSearchParams({
      page: String(payload.page || 1),
      limit: String(payload.limit || 10),
    });

    const token =
      localStorage.getItem("token") || AUTH_TOKEN;

    const url = `${API_URI}/brand?${query.toString()}`;

    console.log("BRAND API URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("STATUS:", response.status);
    console.log("CONTENT TYPE:", response.headers.get("content-type"));

    const text = await response.text();

    console.log("RAW BRAND RESPONSE:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch (error) {
      return {
        success: false,
        message: `Backend JSON nahi bhej raha. Status: ${response.status}`,
        data: [],
      };
    }

    return data;

  } catch (error) {
    console.error("GET BRAND ERROR:", error);

    return {
      success: false,
      message: error.message || "Brands are not fetched",
      data: [],
    };
  }
};

// =====================================================
// GET BRAND BY ID
// =====================================================

service.getBrandById = async (brand_id) => {
  try {
    const token =
      localStorage.getItem("token") ||
      AUTH_TOKEN;

    const response = await fetch(
      `${API_URI}/admin/brand/${brand_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    console.log(
      "BRAND DETAILS RESPONSE:",
      data
    );

    return data;

  } catch (error) {
    console.error(
      "GET BRAND DETAILS ERROR:",
      error
    );

    return {
      success: false,
      message:
        error.message ||
        "Brand details not found",
    };
  }
};

// =====================================================
// CREATE BRAND
// =====================================================

service.createBrand = async (formData) => {
  try {
    const token =
      localStorage.getItem("token") ||
      AUTH_TOKEN;

    const response = await fetch(
      `${API_URI}/admin/brand`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    console.log(
      "CREATE BRAND RESPONSE:",
      data
    );

    return data;

  } catch (error) {
    console.error(
      "CREATE BRAND ERROR:",
      error
    );

    return {
      success: false,
      message:
        error.message ||
        "Brand creation failed",
    };
  }
};

// =====================================================
// UPDATE BRAND
// =====================================================

service.updateBrand = async (
  brand_id,
  formData
) => {
  try {
    const token =
      localStorage.getItem("token") ||
      AUTH_TOKEN;

    const response = await fetch(
      `${API_URI}/admin/brand/${brand_id}`,
      {
        method: "PUT",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    console.log(
      "UPDATE BRAND RESPONSE:",
      data
    );

    return data;

  } catch (error) {
    console.error(
      "UPDATE BRAND ERROR:",
      error
    );

    return {
      success: false,
      message:
        error.message ||
        "Brand update failed",
    };
  }
};

// =====================================================
// DELETE BRAND
// =====================================================

service.deleteBrand = async (brand_id) => {
  try {
    const token =
      localStorage.getItem("token") ||
      AUTH_TOKEN;

    const response = await fetch(
      `${API_URI}/admin/brand/${brand_id}`,
      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    console.log(
      "DELETE BRAND RESPONSE:",
      data
    );

    return data;

  } catch (error) {
    console.error(
      "DELETE BRAND ERROR:",
      error
    );

    return {
      success: false,
      message:
        error.message ||
        "Brand delete failed",
    };
  }
};

export default service;