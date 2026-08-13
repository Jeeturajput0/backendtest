import { API_URI, AUTH_TOKEN } from "../config";

const service = {};

service.getallsize = async (payload = {}) => {
  try {
    const query = new URLSearchParams({
      page: String(payload.page || 1),
      limit: String(payload.limit || 10),
    });

    const url = `${API_URI}/size?${query.toString()}`;

    console.log("SIZE API URL:", url);
    console.log("SIZE TOKEN:", AUTH_TOKEN);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("SIZE STATUS:", res.status);

    const data = await res.json();

    console.log("SIZE RESPONSE:", data);

    return data;

  } catch (error) {
    console.error("SIZE SERVICE ERROR:", error);

    return {
      success: false,
      message: error.message || "Size is not fetched",
      data: [],
    };
  }
};

export default service;