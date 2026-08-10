import { Navigate, useLocation } from "react-router-dom";

export default function RequireRole({ roles, children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  // if (!roles.includes(role)) {
  //   const destination = role === "admin" ? "/admin" : role === "vendor" ? "/vendor" : "/";
  //   return <Navigate to={destination}  />;
  // } 
  return children;
}
