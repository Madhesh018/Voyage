import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes } from "../server/routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes
await registerRoutes(app);

// In production, serve static files from the dist/public directory
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../dist/public");
  app.use(express.static(distPath));
  
  // Handle client-side routing
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) {
      res.status(404).json({ message: "API route not found" });
    } else {
      res.sendFile(path.join(distPath, "index.html"));
    }
  });
}

// Export for Vercel serverless functions
export default app;