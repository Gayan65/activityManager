import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

//IMPORT ALL THE FUNCTIONS FROM SERVICES
import {
  cancelActivity,
  createActivity,
  deleteActivity,
  getActivityFromId,
  getAllActivities,
  getAllCurrentActivities,
  updateActivity,
} from "../services/activity_services.js";
import {
  addTag,
  deleteTagActivityRows,
  deleteTagRows,
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
    activity: createdActivity,
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
      // Check if any status is below 3
      const anyStatusBelow3 = data.some((item) => item.status < 3);

      if (anyStatusBelow3) {
        res.status(200).json({
          success: false,
          message: "Can not perform the delete, check your tasks' status",
        });
      } else {
        for (const tasksToBeDeleted of data) {
          await axios
            .delete(`http://localhost:4000/task/delete/${tasksToBeDeleted.id}`)
            .then((response) => {
              //console.log(response.data);
            })
            .catch((err) => console.log(err));
        }

        //performs the delete tags
        //delete the relational table ids
        const deleteRelationalTagActivity = await deleteTagActivityRows(
          activityId
        );
        if (deleteRelationalTagActivity.rows.length > 0) {
          const deletedTagIds = deleteRelationalTagActivity.rows;

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

          //delete task
          const removedActivity = await deleteActivity(activityId);
          if (removedActivity.rows.length > 0) {
            res.status(200).json({
              success: true,
              message: "Delete Activity successfully!",
            });
          } else {
            res.status(200).json({
              success: false,
              message: "Delete Activity unsuccessful!",
            });
          }
        }
      }
    } else {
      //performs the delete tags
      //delete the relational table ids
      const deleteRelationalTagActivity = await deleteTagActivityRows(
        activityId
      );
      if (deleteRelationalTagActivity.rows.length > 0) {
        const deletedTagIds = deleteRelationalTagActivity.rows;

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

      //delete activity
      const removedActivity = await deleteActivity(activityId);
      if (removedActivity.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: "Delete Activity successfully!",
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Delete Activity unsuccessful!",
        });
      }
    }
  });
} catch (error) {
  console.log(err);
}

//API UPDATE CANCEL STATUS FOR A NEW/ WORK IN PROCESS ACTIVITY FROM A ACTIVITY ID (activity detail page)
activityRouter.patch("/cancelUpdate/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const activityId = req.params.id;
    if (status == 1 || status == 2) {
      //get all tasks according to the given activityId
      const allTasks = await getTaskFromActivityId(activityId);
      const data = allTasks.rows;

      if (allTasks.rowCount > 0) {
        // Check if any status is below 3 (New, In process)
        const anyStatusBelow3 = data.some((item) => item.status < 3);
        if (anyStatusBelow3) {
          res.status(200).json({
            success: false,
            message: "Check your tasks status!",
          });
        } else {
          //PERFORM CANCEL
          const updateCancelActivity = await cancelActivity(activityId);
          if (updateCancelActivity.rowCount > 0) {
            res.status(200).json({
              success: true,
              message: "The activity classified as canceled",
              updatedactivity: updateCancelActivity.rows[0],
            });
          } else {
            res.status(200).json({
              success: false,
              message: "Activity can not be classified as cancel",
            });
          }
        }
      } else {
        //PERFORM CANCEL
        const updateCancelActivity = await cancelActivity(activityId);
        if (updateCancelActivity.rowCount > 0) {
          res.status(200).json({
            success: true,
            message: "The activity classified as canceled",
            updatedactivity: updateCancelActivity.rows,
          });
        } else {
          res.status(200).json({
            success: false,
            message: "Activity can not be classified as cancel",
          });
        }
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

//API UPDATE ACTIVITY
activityRouter.patch("/update/:id", async (req, res) => {
  const activityId = req.params.id;
  const {
    title,
    description,
    url,
    startdate,
    enddate,
    activitytype,
    status,
    tags,
  } = req.body;

  // UPDATING ACTIVITY
  const activity = await updateActivity(
    activityId,
    title,
    description,
    url,
    startdate,
    enddate,
    activitytype,
    status
  );

  const updatedActivity = activity.rows[0];

  //IF TAGS AVAILABLE ONLY THE BELOW MENTION LOOP WORKS..
  if (tags) {
    //Deleting all tags belong to this activity id
    //delete the relational table ids
    const deleteRelationalTagActivity = await deleteTagActivityRows(activityId);
    if (deleteRelationalTagActivity.rows.length > 0) {
      const deletedTagIds = deleteRelationalTagActivity.rows;

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
      const relationalUpdate = await relationalTblUpdateActivity(
        activityId,
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
    message: "Activity updated successfully!",
    activity: updatedActivity,
  });
});

//SEARCH CONTROLLERS
activityRouter.post("/search", async (req, res) => {
  try {
    const { name, status, startdate, enddate } = req.body;

    const searchResults = await searchActivity(
      name,
      status,
      startdate,
      enddate
    );

    if (searchResults.rowCount > 0) {
      res.status(200).json({
        success: true,
        from: "activity",
        Activities: searchResults.rows,
      });
    } else {
      res.status(200).json({
        success: false,
        from: "activity",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export default activityRouter;
