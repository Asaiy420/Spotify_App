import { Router } from "express";
import { Admin } from "../controllers/admin.controller.js";
import { SignUp } from "../controllers/auth.controller.js";

const router = Router();

router.get("/admin", Admin);

export default router;
