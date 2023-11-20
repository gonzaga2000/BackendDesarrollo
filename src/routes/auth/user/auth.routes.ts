import express from "express";
import { loginUser } from "../../../controllers/auth/user/auth.controller";

const router = express.Router();

router.post("/login", loginUser);
//router.post("/register", registerUser);

export default router;