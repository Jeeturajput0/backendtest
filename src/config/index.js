import axios from "axios";

export const BACK_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:2000";
export const API_URI = import.meta.env.VITE_API_URI || `${BACK_URL}/api`;
// Existing pages interpolate this value in request headers. Its string value is
// read at request time, so a token received after login is never stale.
export const AUTH_TOKEN = {
  [Symbol.toPrimitive]: () => localStorage.getItem("token") || "",
  toString: () => localStorage.getItem("token") || "",
};

export const setImageURL = (image) => {
  if (!image) return "";
  const value = String(image).trim().replaceAll("\\", "/");
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  const uploadsIndex = value.indexOf("uploads/");
  if (uploadsIndex !== -1) return `${BACK_URL}/${value.slice(uploadsIndex)}`;
  if (value.startsWith("products/")) return `${BACK_URL}/uploads/${value}`;
  return `${BACK_URL}/uploads/products/${value}`;
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const res = await axios.post(`${API_URI}/upload/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // Store this relative URL in MongoDB. It remains valid if the backend host changes.
    return res.data.imagePath;
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};
