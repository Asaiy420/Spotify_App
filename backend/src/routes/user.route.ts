import { Router } from "express";
import { Users } from "../controllers/user.controller.js";

const router = Router();

router.get("/users", Users);

export default router;
