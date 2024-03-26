import { db } from "../db/db.js";

//CREATE AN ACTIVITY - SQL (ONLY TASK NO TAGS ADDED HERE..)
export const createTaskNotification = async (taskId, status) => {
  const res = await db.query(
    "INSERT INTO Notification (taskid, status) VALUES ($1, $2) RETURNING *",
    [taskId, status]
  );
  return res;
};
