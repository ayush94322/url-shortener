import { Router } from "express";

import { create, analytics, list } from "../controllers/url.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createUrlSchema, paginationSchema } from "../validators/url.validator.js";

const router = Router();

router.post("/", validate(createUrlSchema), create);
router.get("/", validate(paginationSchema, "query"), list);
router.get("/:shortCode", analytics);

export default router;
