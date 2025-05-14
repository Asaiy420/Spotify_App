import Router from "express"
import { getAllAlbums, getAlbumById } from "../controllers/album.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.get("/albums", getAllAlbums);
router.get("/albums/:albumId", getAlbumById);

export default router;
