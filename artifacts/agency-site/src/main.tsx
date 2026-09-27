import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { scheduleAnalytics } from "./lib/analytics";

scheduleAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
