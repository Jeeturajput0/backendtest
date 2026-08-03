import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = new URLSearchParams(window.location.search).get("token");
      const payloadPart = token?.split(".")[1];

      if (!token || !payloadPart) throw new Error("Missing Google token");

      const payload = JSON.parse(
        decodeURIComponent(
          window.atob(payloadPart.replace(/-/g, "+").replace(/_/g, "/"))
            .split("")
            .map((character) => `%${character.charCodeAt(0).toString(16).padStart(2, "0")}`)
            .join("")
        )
      );

      if (!payload.role || (payload.exp && payload.exp * 1000 < Date.now())) {
        throw new Error("Invalid Google token");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", payload.role);
      localStorage.setItem(
        "userdetails",
        JSON.stringify({ _id: payload.userId, email: payload.email, role: payload.role })
      );

      navigate(
        payload.role === "admin" ? "/admin" : payload.role === "vendor" ? "/vendor" : "/",
        { replace: true }
      );
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userdetails");
      navigate("/login?error=google_auth_failed", { replace: true });
    }
  }, [navigate]);

  return <h1>Logging in...</h1>;

}
