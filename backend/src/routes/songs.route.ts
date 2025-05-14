import Router from "express"
import { getAllSongs, getFeaturedSongs, getTrendingSongs, getMadeForYouSongs } from "../controllers/songs.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();


router.get("/songs", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", protectRoute, getFeaturedSongs);
router.get("/made-for-you", protectRoute, getMadeForYouSongs);
router.get("/trending", protectRoute, getTrendingSongs);

export default router;