import axios from "axios";

export const API_URI = "http://localhost:2000/api";
export const BACK_URL = "http://localhost:2000";
export const AUTH_TOKEN = localStorage.getItem("token");

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
