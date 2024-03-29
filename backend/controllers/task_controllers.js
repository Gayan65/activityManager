import express from "express";
import bodyParser from "body-parser";

//IMPORT ALL THE FUNCTIONS FROM SERVICES
import {
  getAllTasks,
  getAllActiveTasks,
  getTaskFromId,
  getTaskFromActivityId,
  createTask,
  deleteTask,
  cancelTask,
  updateTask,
} from "../services/task_services.js";

import {
  addTag,
  deleteTagRows,
  deleteTagTaskRows,
  relationalTagUpdate,
  relationalTblUpdate,
  updateTag,
} from "../services/tag_services.js";

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
      task: task.rows,
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

  //API CREATING TASK
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
    task: createdTask,
  });
});

//API DELETE TASK
taskRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  //delete the relational table ids
  const deleteRelationalTagTask = await deleteTagTaskRows(id);
  if (deleteRelationalTagTask.rows.length > 0) {
    const deletedTagIds = deleteRelationalTagTask.rows;

    //SEND ALL TAG IDS TO DELETE VIA LOOP TO THE DB
    for (const tagDelete of deletedTagIds) {
      // DELETING TAG
      const tag = await deleteTagRows(tagDelete.tagid);
      const deletedTag = tag.rows[0];

      if (deletedTag.rowCount === 0) {
        res.status(500).json({
          success: false,
          message: "Error deleting tags in tag table",
        });
        return;
      }
    }
  }
  //delete task
  const removedTask = await deleteTask(id);
  if (removedTask.rows.length > 0) {
    res.status(200).json({
      success: true,
      message: "Delete task successfully!",
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Delete task unsuccessful!",
    });
  }
});

//API UPDATE CANCEL STATUS FOR A NEW/ WORK IN PROCESS TASK FROM A TASK ID (tasks detail page)
taskRouter.patch("/cancelUpdate/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const taskId = req.params.id;
    if (status == 1 || status == 2) {
      const updateCancelTask = await cancelTask(taskId);
      if (updateCancelTask.rowCount > 0) {
        res.status(200).json({
          success: true,
          message: "The task classified as canceled",
          updatedtask: updateCancelTask.rows[0],
        });
      } else {
        res.status(200).json({
          success: false,
          message: "task can not be classified as cancel",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Request can not be made!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//API UPDATE TASK
taskRouter.patch("/update/:id", async (req, res) => {
  const taskId = req.params.id;
  const { name, content, startdate, enddate, activityid, status, tags } =
    req.body;

  // UPDATING TASK
  const task = await updateTask(
    taskId,
    name,
    content,
    startdate,
    enddate,
    activityid,
    status
  );

  const updatedTask = task.rows[0];

  //IF TAGS AVAILABLE ONLY THE BELOW MENTION LOOP WORKS..
  if (tags) {
    //Deleting all tags belong to this task id
    //delete the relational table ids
    const deleteRelationalTagTask = await deleteTagTaskRows(taskId);
    if (deleteRelationalTagTask.rows.length > 0) {
      const deletedTagIds = deleteRelationalTagTask.rows;

      //SEND ALL TAG IDS TO DELETE VIA LOOP TO THE DB
      for (const tagDelete of deletedTagIds) {
        // DELETING TAG
        const tag = await deleteTagRows(tagDelete.tagid);
        const deletedTag = tag.rows[0];

        if (deletedTag.rowCount === 0) {
          res.status(500).json({
            success: false,
            message: "Error deleting tags in tag table",
          });
          return;
        }
      }
    }

    // Using split() with a comma as the delimiter and added to an array
    const tagsArray = tags.split(",");

    // Adding '#' in front of each word using map() and this returns array with #
    const hashtagArray = tagsArray.map(function (tag) {
      return "#" + tag.trim();
    });

    //SEND ALL ACCORDINGLY VIA LOOP TO THE DB
    for (const tagText of hashtagArray) {
      // CREATING TAG
      const tag = await addTag(tagText);
      const createdTag = tag.rows[0];

      // CREATING RELATIONAL DB
      const relationalUpdate = await relationalTblUpdate(taskId, createdTag.id);

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
    task: updatedTask,
  });
});

export default taskRouter;
