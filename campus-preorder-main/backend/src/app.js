import express from "express";
import cors from "cors";

import campusRoutes from "./routes/campus.routes.js";
import authRoutes from "./routes/auth.routes.js";
import vendorRoutes from "./routes/vendor.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { env } from "./config/env.js";

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.frontendUrls.length === 0 || env.frontendUrls.includes(origin)) {
        callback(null, true);
        return;
      }

      const error = new Error("Origin not allowed by CORS");
      error.statusCode = 403;
      callback(error);
    },
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/campuses", campusRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/orders", orderRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message =
    statusCode >= 500 ? "Internal server error" : err.message || "Request failed";

  if (statusCode >= 500) {
    console.error(err);
  }

  res.status(statusCode).json({ message });
});

export default app;
