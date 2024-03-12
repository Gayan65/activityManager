import express from "express";
import bodyParser from "body-parser";

//IMPORT ALL THE FUNCTIONS FROM SERVICES
import {
  getAllTasks,
  getAllActiveTasks,
  getTaskFromId,
  getTaskFromActivityId,
  createTask,
} from "../services/task_services.js";

const taskRouter = express.Router();
taskRouter.use(bodyParser.urlencoded({ extended: false }));

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

//API GET ALL TASKS FROM AN ACTIVITY ID (activity -> task -> detail page)
taskRouter.get("/activity/:id", async (req, res) => {
  const tasks = await getTaskFromActivityId(req.params.id);
  if (tasks.rowCount > 0) {
    res.status(200).json({
      success: true,
      message: "tasks found successfully!",
      tasks: tasks.rows,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "tasks cannot be found",
    });
  }
});

//API ADD NEW TASK
taskRouter.post("/create", async (req, res) => {
  const { name, content, startdate, enddate, activityid, status, tags } =
    req.body;
  const task = await createTask(
    name,
    content,
    startdate,
    enddate,
    activityid,
    status,
    tags
  );
  //TODO - FUNCTION FOR ADDING CHECK FOR TAGS AND ADD
  console.log(task);
});

export default taskRouter;
