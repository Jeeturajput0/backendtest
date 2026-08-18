import { API_URI, AUTH_TOKEN } from "../config";

const service = {};

service.getallsize = async (payload = {}) => {
  try {
    const query = new URLSearchParams({
      page: String(payload.page || 1),
      limit: String(payload.limit || 10),
    });

    // Size management is an authenticated admin API. The public `/size`
    // endpoint does not exist, which previously caused the list to fail.
    const url = `${API_URI}/admin/size?${query.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return {
      ...data,
      success: res.ok && data.success !== false,
      data: Array.isArray(data.data) ? data.data : [],
    };

  } catch (error) {
    return {
      success: false,
      message: error.message || "Size is not fetched",
      data: [],
    };
  }
};

export default service;
