import {Router} from "express";
import {redirect} from "../controllers/url.controller.js";

const router = Router();

router.get("/:shortCode", redirect);

export default router;