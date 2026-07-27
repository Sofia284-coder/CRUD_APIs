import express from "express";
const router = express.Router();

import { getDescription, getHealth } from "../controllers/CRUDcontrollers.js";

router.get("/", getDescription);
router.get("/health", getHealth);


export default router;