import express from "express";
import bodyParser from "body-parser";

import {
  createActivityNotification,
  createTaskNotification,
  deleteAllNotifications,
  getAllNotifications,
} from "../services/notification_services.js";

const notificationRouter = express.Router();
notificationRouter.use(bodyParser.urlencoded({ extended: false }));

//API - CREATE TASK NOTIFICATION
notificationRouter.post("/task", async (req, res) => {
  try {
    const { taskId, status } = req.body;
    const notification = await createTaskNotification(taskId, status);
    if (notification.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "Notification added successfully!",
        notification: notification.rows,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Notification can not be added!",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
});

//API GET
notificationRouter.get("/all", async (req, res) => {
  try {
    const notifications = await getAllNotifications();
    if (notifications.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "Notifications found successfully!",
        notifications: notifications.rows,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Notifications can not be found!",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
});

//API - CREATE ACTIVITY NOTIFICATION
notificationRouter.post("/activity", async (req, res) => {
  try {
    const { activityId, status } = req.body;
    const notification = await createActivityNotification(activityId, status);
    if (notification.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "Notification added successfully!",
        notification: notification.rows,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Notification can not be added!",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
});

// API - DELETE ALL NOTIFICATIONS
notificationRouter.delete("/clear", async (req, res) => {
  try {
    const notification = await deleteAllNotifications();
    if (notification.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "Notifications deleted successfully!",
        notification: notification.rows,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Notification can not be deleted!",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
});

export default notificationRouter;
