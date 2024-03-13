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

import { addTag, relationalTblUpdate } from "../services/tag_services.js";

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

//API ADD NEW TASK (still multiple tags can not be added.....)
taskRouter.post("/create", async (req, res) => {
  const { name, content, startdate, enddate, activityid, status, tags } =
    req.body;

  // Using split() with a comma as the delimiter and added to an array
  const tagsArray = tags.split(",");

  // Adding '#' in front of each word using map() and this returns array with #
  const hashtagArray = tagsArray.map(function (tag) {
    return "#" + tag.trim();
  });

  //CREATING TASK
  const task = await createTask(
    name,
    content,
    startdate,
    enddate,
    activityid,
    status
  );

  const createdTask = task.rows[0];

  //IF TAGS AVAILABLE ONLY THE BELOW MENTION LOOP WORKS..
  if (tags) {
    //SEND ALL ACCORDINGLY VIA LOOP TO THE DB
    for (const tagText of hashtagArray) {
      // CREATING TAG
      const tag = await addTag(tagText);
      const createdTag = tag.rows[0];

      // CREATING RELATIONAL DB
      const relationalUpdate = await relationalTblUpdate(
        createdTask.id,
        createdTag.id
      );

      if (relationalUpdate.rowCount === 0) {
        res.status(500).json({
          success: false,
          message: "Error updating relational table",
        });
        return;
      }
    }
  }

  res.status(200).json({
    success: true,
    message: "Task added successfully!",
  });
});

export default taskRouter;
