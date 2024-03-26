import express from "express";
import bodyParser from "body-parser";

import {
  createTaskNotification,
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

export default notificationRouter;
