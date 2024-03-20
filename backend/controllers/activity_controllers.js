import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

//IMPORT ALL THE FUNCTIONS FROM SERVICES
import {
  createActivity,
  getActivityFromId,
  getAllActivities,
  getAllCurrentActivities,
} from "../services/activity_services.js";
import {
  addTag,
  relationalTblUpdateActivity,
} from "../services/tag_services.js";

import { getTaskFromActivityId } from "../services/task_services.js";

const activityRouter = express.Router();
activityRouter.use(bodyParser.urlencoded({ extended: false }));

//API GET ALL ACTIVITIES (Manage all activities page)
activityRouter.get("/all", async (req, res) => {
  const activities = await getAllActivities();
  if (activities.rowCount > 0) {
    res.status(200).json({
      success: true,
      message: "activities found successfully!",
      activities: activities.rows,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Activity cannot be found",
    });
  }
});

//API GET ALL CURRENT ACTIVITIES (in drop down for creating the task page in the frontend)
activityRouter.get("/current/all", async (req, res) => {
  const activities = await getAllCurrentActivities();
  if (activities.rowCount > 0) {
    res.status(200).json({
      success: true,
      message: "activities found successfully!",
      activities: activities.rows,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Activity cannot be found",
    });
  }
});

//API GET AN ACTIVITY FROM AN ACTIVITY ID (activity detail page)
activityRouter.get("/:id", async (req, res) => {
  const activity = await getActivityFromId(req.params.id);
  if (activity.rowCount > 0) {
    res.status(200).json({
      success: true,
      message: "activity found successfully!",
      activity: activity.rows,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Activity cannot be found",
    });
  }
});

//API ADD NEW ACTIVITY
activityRouter.post("/create", async (req, res) => {
  const {
    title,
    description,
    url,
    startdate,
    enddate,
    status,
    activitytype,
    tags,
  } = req.body;

  // Using split() with a comma as the delimiter and added to an array
  const tagsArray = tags.split(",");

  // Adding '#' in front of each word using map() and this returns array with #
  const hashtagArray = tagsArray.map(function (tag) {
    return "#" + tag.trim();
  });

  //API CREATING TASK
  const activity = await createActivity(
    title,
    description,
    url,
    startdate,
    enddate,
    status,
    activitytype
  );

  const createdActivity = activity.rows[0];

  //IF TAGS AVAILABLE ONLY THE BELOW MENTION LOOP WORKS..
  if (tags) {
    //SEND ALL ACCORDINGLY VIA LOOP TO THE DB
    for (const tagText of hashtagArray) {
      // CREATING TAG
      const tag = await addTag(tagText);
      const createdTag = tag.rows[0];

      // CREATING RELATIONAL DB
      const relationalUpdate = await relationalTblUpdateActivity(
        createdActivity.id,
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
    message: "Activity added successfully!",
  });
});

//API DELETE ACTIVITY
try {
  activityRouter.delete("/delete/:id", async (req, res) => {
    const activityId = req.params.id;
    //get all tasks according to the given activityId
    const allTasks = await getTaskFromActivityId(activityId);
    const data = allTasks.rows;

    if (allTasks.rowCount > 0) {
      // Check if all statuses are either 1 or 2
      const allStatusesOneOrTwo = data.every(
        (item) => item.status === 1 || item.status === 2
      );

      if (allStatusesOneOrTwo) {
        res.status(200).json({
          success: false,
          message: "Can not perform the delete, check your tasks' status",
        });
      } else {
        console.log("Not all statuses are either 1 or 2.");

        for (const tasksToBeDeleted of data) {
          await axios
            .delete(`http://localhost:4000/task/delete/${tasksToBeDeleted.id}`)
            .then((response) => {
              console.log(response.data);
            })
            .catch((err) => console.log(err));
        }
      }
    } else {
      console.log("perform the activity delition");
    }
  });
} catch (error) {
  console.log(err);
}

export default activityRouter;
