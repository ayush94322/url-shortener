import {Router} from "express";
import {qrCode, redirect} from "../controllers/url.controller.js";

const router = Router();

router.get("/:shortCode/qr", qrCode);
router.get("/:shortCode", redirect);

export default router;