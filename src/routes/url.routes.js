import {Router} from "express";

import {create} from "../controllers/url.controller.js";
import {validate} from "../middleware/validate.middleware.js";
import {createUrlSchema} from "../validators/url.validator.js"

const router = Router();

router.post("/", validate(createUrlSchema), create);

export default router;