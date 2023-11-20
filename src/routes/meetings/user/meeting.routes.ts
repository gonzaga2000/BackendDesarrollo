import express from "express";
import { userMustBeLogged, userMustBeEmployee } from "../../../middlewares/auth.middlewares";
import {
    getMeetings,
    createMeeting,
    deleteMeeting,
    getMeeting
} from "../../../controllers/meetings/user/meetings.controller";

const router = express.Router();

router.use(userMustBeLogged);
router.use(userMustBeEmployee);

router.get("/", getMeetings);
router.get("/:id", getMeeting);
router.post("/", createMeeting);
router.delete("/:id", deleteMeeting);

export default router;