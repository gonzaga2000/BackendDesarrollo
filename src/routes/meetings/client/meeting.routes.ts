import express from "express";
import { userMustBeLogged, userMustBeClient } from "../../../middlewares/auth.middlewares";
import { getMeetings, getMeeting,} from "../../../controllers/meetings/client/meetings.controller";

const router = express.Router();

router.use(userMustBeLogged);
router.use(userMustBeClient);

router.get("/", getMeetings);
router.get("/:id", getMeeting);


export default router;