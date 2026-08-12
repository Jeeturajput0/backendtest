import api from "./api";

const brandService = {
  getAll: () => api.get("/admin/brand"),
  getById: (id) => api.get(`/admin/brand/${id}`),
  create: (data) => api.post("/admin/brand", data),
  update: (id, data) => api.put(`/admin/brand/${id}`, data),
  remove: (id) => api.delete(`/admin/brand/${id}`),
};

export default brandService;
