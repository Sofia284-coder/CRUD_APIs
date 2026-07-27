import express from "express";
const router = express.Router();

import { getDescription, getHealth, getAll, getByID, createTask} from "../controllers/CRUDcontrollers.js";

router.get("/", getDescription);
router.get("/health", getHealth);
router.get("/tasks", getAll);
router.get("/tasks/:id", getByID);
router.post("/tasks", createTask);


export default router;