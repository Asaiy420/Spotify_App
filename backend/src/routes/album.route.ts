import Router from "express"
import { Albums } from "../controllers/album.controller.js";

const router = Router();

router.get("/albums", Albums)

export default router;