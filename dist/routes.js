"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router({ mergeParams: true });
// Auth routes
const auth_routes_1 = __importDefault(require("./routes/auth/auth.routes"));
router.use(auth_routes_1.default);
// Auth routes
const meetings_routes_1 = __importDefault(require("./routes/meetings/meetings.routes"));
router.use(meetings_routes_1.default);
exports.default = router;
