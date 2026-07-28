import express from "express";
const router = express.Router();

import { getDescription, getHealth, getAll, getByID, createTask, updateTask, deleteTask} from "../controllers/CRUDcontrollers.js";

router.get("/", getDescription);
router.get("/health", getHealth);
router.get("/tasks", getAll);
router.get("/tasks/:id", getByID);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask)
router.delete("/tasks/:id", deleteTask)


export default router;