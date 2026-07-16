import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
    checkIn,
    checkOut,
    getMyCheckIn,
    getNearbyUsers
} from "../controllers/checkinController.js";

const router = express.Router();

// Check In
router.post("/checkin", authMiddleware, checkIn);

// Check Out
router.post("/checkout", authMiddleware, checkOut);

// Get Current Check-In
router.get("/me", authMiddleware, getMyCheckIn);

// Get Nearby Users
router.get("/nearby", authMiddleware, getNearbyUsers);

export default router;