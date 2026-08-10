import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const location = useLocation();
  return localStorage.getItem("token") ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
