const services = {};

// payload = { page: 1, limit: 10, search: "", isActive: true, isFeatured: false }

services.getAllCategories = async (payload = {}) => {
  try {
    const query = new URLSearchParams({
      page: payload.page || 1,
      limit: payload.limit || 10,
      search: payload.search || "",
      isActive: payload.isActive,
      isFeatured: payload.isFeatured,
    }).toString();
    const response = await fetch(`${process.env.API_URI}/categories?${query}`);
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: error.message,
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
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };

export default services;
