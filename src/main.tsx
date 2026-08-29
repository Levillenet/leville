import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { installAdminFunctionAuth } from "@/lib/adminFunctionAuth";

installAdminFunctionAuth();

createRoot(document.getElementById("root")!).render(<App />);
