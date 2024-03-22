import { db } from "../db/db.js";

//GET ALL TASKS - SQL
export const getAllTasks = async () => {
  const res = await db.query(
    "SELECT task.id, task.name, task.content, task.startdate, task.enddate, status.title AS status, activity.title,  ARRAY_AGG(tag.name) AS tagnames FROM task LEFT JOIN status ON task.status = status.id LEFT JOIN activity ON task.activityid = activity.id LEFT JOIN tagtask ON task.id = tagtask.taskid LEFT JOIN tag ON tagtask.tagid = tag.id GROUP BY task.id, status.title, activity.title"
  );
  return res;
};

//GET ALL ACTIVE TASKS - SQL
export const getAllActiveTasks = async () => {
  const res = await db.query(
    "SELECT task.id, task.name, task.content, task.startdate, task.enddate, status.title AS status, activity.title,  ARRAY_AGG(tag.name) AS tagnames FROM task LEFT JOIN status ON task.status = status.id LEFT JOIN activity ON task.activityid = activity.id LEFT JOIN tagtask ON task.id = tagtask.taskid LEFT JOIN tag ON tagtask.tagid = tag.id WHERE task.status = 1 OR task.status = 2 GROUP BY task.id, status.title, activity.title"
  );
  return res;
};

//GET A TASK FROM TASK_ID - SQL
export const getTaskFromId = async (taskId) => {
  const res = await db.query(
    `SELECT task.id AS id, task.name AS name, task.content AS content, task.startdate AS startdate, task.enddate AS enddate, status.id AS status, activity.id AS activityid, ARRAY_AGG(tag.name) AS tags FROM task LEFT JOIN status ON task.status = status.id LEFT JOIN activity ON task.activityid = activity.id LEFT JOIN tagtask ON task.id = tagtask.taskid LEFT JOIN tag ON tagtask.tagid = tag.id WHERE task.id = ${taskId} GROUP BY task.id, task.name, task.content, task.startdate, task.enddate, status.id, activity.id`
  );
  return res;
};

//GET A TASK FROM ACTIVITY_ID - SQL
export const getTaskFromActivityId = async (activityId) => {
  const res = await db.query(
    `SELECT * FROM task WHERE activityid = ${activityId}`
  );
  return res;
};

//CREATE A TASK - SQL (ONLY TASK NO TAGS ADDED HERE..)
export const createTask = async (
  name,
  content,
  startdate,
  enddate,
  activityid,
  status
) => {
  const res = await db.query(
    "INSERT INTO Task (Name, Content, StartDate, EndDate, ActivityId, Status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, content, startdate, enddate, activityid, status]
  );
  return res;
};

//DELETE A TASK - SQL (ONLY TASK NO TAGS ADDED HERE..)
export const deleteTask = async (taskid) => {
  const res = await db.query(
    `DELETE FROM task WHERE task.id = ${taskid} RETURNING *`
  );
  return res;
};

//CANCEL STATUS FOR A TASK - SQL (ONLY TASK NO TAGS ADDED HERE..)
export const cancelTask = async (taskid) => {
  const res = await db.query(
    `UPDATE task SET status = 4 WHERE task.id = ${taskid} RETURNING *`
  );
  return res;
};

//UPDATE A TASK - SQL (ONLY TASK NO TAGS ADDED HERE..)
export const updateTask = async (
  taskId,
  name,
  content,
  startdate,
  enddate,
  activityid,
  status
) => {
  const res = await db.query(
    `UPDATE Task SET Name = $1, Content =$2, StartDate =$3, EndDate = $4, ActivityId = $5, Status = $6 WHERE task.id = ${taskId} RETURNING *`,
    [name, content, startdate, enddate, activityid, status]
  );
  return res;
};
