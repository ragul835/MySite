import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const rawPort = process.env.PORT || "5000";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    manifest: true,
    target: "es2022",
    cssTarget: "es2022",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          // @radix-ui packages are intentionally left unassigned here: grouping
          // them into a shared vendor chunk (or letting the "react" match below
          // catch "@radix-ui/react-*" package names) forced every route to
          // download every radix primitive (accordion, select, dialog, ...)
          // even though a given page only uses one or two. Returning undefined
          // lets Rollup split each one into the route chunk(s) that actually
          // import it.
          if (id.includes("@radix-ui")) return;
          if (id.includes("framer-motion")) return "motion-vendor";
          if (/[/\\]node_modules[/\\](react|react-dom|scheduler)[/\\]/.test(id)) return "react-vendor";
        },
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
