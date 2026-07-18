import axios from "axios";

export const API_URI = "http://localhost:3000/api";
export const BACK_URL = "http://localhost:3000";
export const AUTH_TOKEN = localStorage.getItem("token");

export const setImageURL = (image) => {
  return `${BACK_URL}/uploads/${image}`;
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const res = await axios.post(`${API_URI}/upload/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    return res.data.filename;
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};
