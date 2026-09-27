import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Application root element was not found");
}

createRoot(rootElement).render(<App />);

// SEO pages include useful static HTML for crawlers and no-JavaScript visitors.
// Keep it visible until React has had a frame to render, then hand over to the
// real application. Doing this at the entry point prevents a failed lazy route
// from leaving a full-screen loading shell above the app forever.
requestAnimationFrame(() => {
  document.getElementById("app-preload-root")?.remove();
});
