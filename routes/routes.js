import { Router } from "express";
import ApiController from "../controllers/apiController.js";

const router = new Router()

router.post("/api/release",ApiController.release)

router.post("/api/admission",ApiController.admission)

export default router
