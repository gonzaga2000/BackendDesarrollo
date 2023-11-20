"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middlewares_1 = require("../../../middlewares/auth.middlewares");
const meetings_controller_1 = require("../../../controllers/meetings/user/meetings.controller");
const router = express_1.default.Router();
router.use(auth_middlewares_1.userMustBeLogged);
router.use(auth_middlewares_1.userMustBeEmployee);
router.get("/", meetings_controller_1.getMeetings);
router.get("/:id", meetings_controller_1.getMeeting);
router.post("/", meetings_controller_1.createMeeting);
router.delete("/:id", meetings_controller_1.deleteMeeting);
exports.default = router;
