import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import validateEnv from "./utils/validateEnv.js";

import authRoutes from "./routes/authRoutes.js";


// IMPORTANT:
// dotenv.config() must be called BEFORE importing supabase

import supabase from "./config/supabase.js";

import indexRoutes from "./routes/index.js";
import healthRoutes from "./routes/health.js";
import checkinRoutes from "./routes/checkinRoutes.js";
import vibeRoutes from "./routes/vibeRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { logger } from "./utils/logger.js";
validateEnv();

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
app.use("/api/checkins",checkinRoutes);
app.use("/api/vibes", vibeRoutes);
app.use(errorMiddleware);

// Start Server
app.listen(PORT, () => {
    console.log("=================================");
    console.log("🚀 VibeSpot Backend Started");
    logger.info(
        `Server running on port ${PORT}`
    );
    console.log("=================================");
});