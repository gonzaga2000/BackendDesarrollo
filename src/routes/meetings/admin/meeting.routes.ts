import express from "express";
import { userMustBeLogged, userMustBeAdmin } from "../../../middlewares/auth.middlewares";
import {
    getMeetings,
    createMeeting,
    deleteMeeting,
    // ver que mas pued hacer
} from "../../../controllers/meetings/user/meetings.controller";

const router = express.Router();

router.use(userMustBeLogged);
router.use(userMustBeAdmin);


// agregar mas weas ue pueda hacer
router.get("/", getMeetings);
router.post("/", createMeeting);
router.delete("/:id", deleteMeeting);

export default router;