import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the VibeSpot Backend 🚀",
        version: "1.0.0"
    });
});

export default router;