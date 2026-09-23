import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { buildCatalog, readNote } from "./catalog.js";

function notesApi() {
  function attach(server) {
    server.middlewares.use((req, res, next) => {
      const url = new URL(req.url, "http://localhost");
      if (url.pathname === "/api/catalog") {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify(buildCatalog()));
        return;
      }
      if (url.pathname === "/api/file") {
        const note = readNote(url.searchParams.get("path") || "");
        if (!note) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "not found" }));
          return;
        }
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify(note));
        return;
      }
      next();
    });
  }

  return {
    name: "notes-api",
    configureServer: attach,
    configurePreviewServer: attach,
  };
}

export default defineConfig({
  plugins: [react(), notesApi()],
  server: { host: "127.0.0.1", port: 5173, strictPort: true },
});
