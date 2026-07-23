import { Router } from "express";

import { create, analytics, list, update, remove } from "../controllers/url.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createUrlSchema, paginationSchema, updateUrlSchema } from "../validators/url.validator.js";

const router = Router();

router.post("/", validate(createUrlSchema), create);
router.get("/", validate(paginationSchema, "query"), list);
router.get("/:shortCode", analytics);
router.patch("/:shortCode", validate(updateUrlSchema), update);
router.delete("/:shortCode", remove);

export default router;
