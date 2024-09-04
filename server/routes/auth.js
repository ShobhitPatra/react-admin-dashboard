import express from "express";

import { getMe, login, signup } from "../controllers/auth.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protectRoute, getMe);

export default router;
