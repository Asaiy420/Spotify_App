import { Router } from "express";
import { Callback } from "../controllers/auth.controller.js";

const router = Router();

router.post("/callback", Callback);

export default router;
