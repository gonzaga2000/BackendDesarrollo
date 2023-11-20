import express from "express";

const router = express.Router({ mergeParams: true });

// User Routes
import userAuthRoutes from "./user/auth.routes";
router.use("/auth", userAuthRoutes);

export default router;