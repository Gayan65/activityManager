import { db } from "../db/db.js";

//CREATE A TASK NOTIFICATION- SQL
export const createTaskNotification = async (taskId, status) => {
  const res = await db.query(
    "INSERT INTO Notification (taskid, status) VALUES ($1, $2) RETURNING *",
    [taskId, status]
  );
  return res;
};

//CREATE A ACTIVITY NOTIFICATION- SQL
export const createActivityNotification = async (activityId, status) => {
  const res = await db.query(
    "INSERT INTO Notification (activityid, status) VALUES ($1, $2) RETURNING *",
    [activityId, status]
  );
  return res;
};

//GET  ALL NOTIFICATIONS AN ACTIVITY - SQL
export const getAllNotifications = async () => {
  const res = await db.query(
    "SELECT notification.id, notification.taskid, notification.activityid, notification.status, task.name, activity.title FROM notification LEFT JOIN task ON notification.taskid = task.id LEFT JOIN activity ON notification.activityid = activity.id ORDER BY notification.id DESC;"
  );
  return res;
};

//DELETE  ALL NOTIFICATIONS - SQL
export const deleteAllNotifications = async () => {
  const res = await db.query("DELETE FROM notification");
  return res;
};
