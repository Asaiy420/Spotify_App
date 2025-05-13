import Router from "express"
import { Stats } from "../controllers/stat.controller.js";

const router = Router();

router.get("/stats", Stats)

export default router;