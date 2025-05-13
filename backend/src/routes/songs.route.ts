import Router from "express"
import { Songs } from "../controllers/songs.controller.js";

const router = Router();

router.get("/songs", Songs)

export default router;