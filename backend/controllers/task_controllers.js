import express from "express";

//IMPORT ALL THE FUNCTIONS FROM SERVICES
import {
    getAllTasks,
    getAllActiveTasks,
    getTaskFromId,
} from "../services/task_services.js";

const taskRouter = express.Router();

//API GET ALL TASKS - NEW, IN PROCESS, DONE, CANCELLED (Manage Existing Task page)
taskRouter.get("/all", async (req, res) => {
    const tasks = await getAllTasks();
    if (tasks.rowCount > 0) {
        res.status(200).json({
            success: true,
            message: "tasks found successfully!",
            tasks: tasks.rows,
        });
    } else {
        res.status(200).json({
            success: false,
            message: "Tasks cannot be found",
        });
    }
});

//API GET ALL ACTIVE TASKS - NEW, IN PROCESS (Main Dashboard View)
taskRouter.get("/active", async (req, res) => {
    const tasks = await getAllActiveTasks();
    if (tasks.rowCount > 0) {
        res.status(200).json({
            success: true,
            message: "tasks found successfully!",
            tasks: tasks.rows,
        });
    } else {
        res.status(200).json({
            success: false,
            message: "Tasks cannot be found",
        });
    }
});

//API GET A TASK FROM A TASK ID (tasks detail page)
taskRouter.get("/:id", async (req, res) => {
    const task = await getTaskFromId(req.params.id);
    if (task.rowCount > 0) {
        res.status(200).json({
            success: true,
            message: "task found successfully!",
            activity: task.rows,
        });
    } else {
        res.status(200).json({
            success: false,
            message: "task cannot be found",
        });
    }
});

export default taskRouter;
