import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Server Port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the VibeSpot Backend 🚀",
        version: "1.0.0"
    });
});

// Health Check Route
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        server: "Running",
        timestamp: new Date().toISOString()
    });
});

// Start Server
app.listen(PORT, () => {
    console.log("=================================");
    console.log("🚀 VibeSpot Backend Started");
    console.log(`🌐 Server : http://localhost:${PORT}`);
    console.log("=================================");
});