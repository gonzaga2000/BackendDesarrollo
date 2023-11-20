import express from "express";

const router = express.Router({ mergeParams: true });

// Auth routes
import authRoutes from "./routes/auth/auth.routes";
router.use(authRoutes);

// Auth routes
import meetingRoutes from "./routes/meetings/meetings.routes";
router.use(meetingRoutes);

export default router;