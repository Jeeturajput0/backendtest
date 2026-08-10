import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { token, isAuthenticated, loading } = useSelector(
    (state) => state.auth,
  );
  if (loading)
    return (
      <div className="grid min-h-screen place-items-center">Loading...</div>
    );
  return token && isAuthenticated ? children : <Navigate to="/login" replace />;
}
