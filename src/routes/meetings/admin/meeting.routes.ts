import express from "express";
import { userMustBeLogged, userMustBeAdmin } from "../../../middlewares/auth.middlewares";
import {
    getMeetings,
    getMeeting,
    deleteMeeting,
    updateMeeting
    // ver que mas pued hacer
} from "../../../controllers/meetings/admin/meetings.controller";

const router = express.Router();

router.use(userMustBeLogged);
router.use(userMustBeAdmin);


router.get("/", getMeetings);
router.get("/:id", getMeeting);
router.delete("/:id", deleteMeeting);
router.put("/:id", updateMeeting);

export default router;