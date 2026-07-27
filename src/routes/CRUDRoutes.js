import express from "express";
const router = express.Router();

import { getDescription, getHealth, getAll, getByID} from "../controllers/CRUDcontrollers.js";

router.get("/", getDescription);
router.get("/health", getHealth);
router.get("/tasks", getAll);
router.get("/tasks/:id", getByID);


export default router;