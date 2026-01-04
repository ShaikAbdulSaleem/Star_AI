// packages/backend/src/server.js
import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";

import { connectDB } from "./config/db.js";
import { initSocket } from "./socket/index.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import ideaRoutes from "./routes/idea.routes.js";
import matchRoutes from "./routes/match.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import roomRoutes from "./routes/room.routes.js";
import milestoneRoutes from "./routes/milestone.routes.js";
import insightRoutes from "./routes/insight.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Global middlewares
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true
  })
);
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ideas", ideaRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/milestones", milestoneRoutes);
app.use("/api/insights", insightRoutes);

// Error handler (last)
app.use(errorHandler);

// Start server + DB + Socket.io
const start = async () => {
  try {
    mongoose.set("strictQuery", true);
    await connectDB();

    // Initialize Socket.IO with same HTTP server
    const io = initSocket(server, CLIENT_URL);
    app.set("io", io); // if controllers ever need to emit

    server.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server start error:", err.message);
    process.exit(1);
  }
};

start();

