import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { getAdminToken } from "@/lib/adminSession";

// Admin function-auth patch needs the backend client; only load it when an
// admin session can exist (admin route or stored admin token).
if (window.location.pathname.startsWith("/admin") || getAdminToken()) {
  import("@/lib/adminFunctionAuth").then((m) => m.installAdminFunctionAuth());
}

createRoot(document.getElementById("root")!).render(<App />);
