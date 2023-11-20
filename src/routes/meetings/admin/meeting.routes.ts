import express from "express";
import { userMustBeLogged, userMustBeAdmin } from "../../../middlewares/auth.middlewares";
import {
    getMeetings,
    getMeeting,
    deleteMeeting,
    // ver que mas pued hacer
} from "../../../controllers/meetings/admin/meetings.controller";

const router = express.Router();

router.use(userMustBeLogged);
router.use(userMustBeAdmin);


// agregar mas weas ue pueda hacer
router.get("/", getMeetings);
router.get("/:id", getMeeting);
router.delete("/:id", deleteMeeting);

export default router;