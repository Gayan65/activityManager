import { db } from "../db/db.js";

//CREATE A NOTIFICATION- SQL
export const createTaskNotification = async (taskId, status) => {
  const res = await db.query(
    "INSERT INTO Notification (taskid, status) VALUES ($1, $2) RETURNING *",
    [taskId, status]
  );
  return res;
};

//GET  ALL NOTIFICATIONS AN ACTIVITY - SQL
export const getAllNotifications = async () => {
  const res = await db.query(
    "SELECT notification.id, notification.taskid, notification.activityid, notification.status, task.name, activity.title FROM notification LEFT JOIN task ON notification.taskid = task.id LEFT JOIN activity ON notification.activityid = activity.id"
  );
  return res;
};
