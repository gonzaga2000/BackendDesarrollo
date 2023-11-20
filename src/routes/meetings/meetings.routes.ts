import express from "express";

const router = express.Router({ mergeParams: true });

// User routes



import userMeetingsRoutes from "./user/meeting.routes";
router.use("/meetings", userMeetingsRoutes);

//import adminMeetingsRoutes from "./admin/meeting.routes";
//router.use("admin/meetings", adminMeetingsRoutes);

//import clientMeetingsRoutes from "./client/meeting.routes.ts";
//router.use("client/meetings", clientMeetingsRoutes);

// Admin routes



export default router;