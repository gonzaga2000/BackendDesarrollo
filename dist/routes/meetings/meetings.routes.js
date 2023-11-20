"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router({ mergeParams: true });
// User routes
const meeting_routes_1 = __importDefault(require("./user/meeting.routes"));
router.use("/meetings", meeting_routes_1.default);
const meeting_routes_2 = __importDefault(require("./admin/meeting.routes"));
router.use("/admin/meetings", meeting_routes_2.default);
const meeting_routes_3 = __importDefault(require("./client/meeting.routes"));
router.use("/client/meetings", meeting_routes_3.default);
// Admin routes
exports.default = router;
