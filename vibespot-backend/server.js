import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";


// IMPORTANT:
// dotenv.config() must be called BEFORE importing supabase

import supabase from "./config/supabase.js";

import indexRoutes from "./routes/index.js";
import healthRoutes from "./routes/health.js";


const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});
// Routes
app.use("/", indexRoutes);
app.use("/health", healthRoutes);
app.use("/api/auth", (req, res, next) => {
    console.log("Incoming Auth Route:", req.method, req.url);
    next();
});
app.use("/api/auth", authRoutes);

// Start Server
app.listen(PORT, () => {
    console.log("=================================");
    console.log("🚀 VibeSpot Backend Started");
    console.log(`🌐 Server : http://localhost:${PORT}`);
    console.log("=================================");
});