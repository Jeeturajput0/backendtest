import { Navigate, useLocation } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const location = useLocation();
  const user = JSON.parse(
    localStorage.getItem("user") ||
      localStorage.getItem("userdetails") ||
      "null",
  );
  return localStorage.getItem("token") && user?.role === "admin" ? (
    children
  ) : (
    <Navigate to="/admin/login" replace state={{ from: location }} />
  );
}
