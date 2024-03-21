import db from "../db/db.js";

//GET ALL ACTIVITIES - SQL
export const getAllActivities = async () => {
  const res = await db.query(
    "SELECT activity.id, activity.title, activity.description, activity.url, activity.startdate, activity.enddate, status.title AS status, activitytype.name AS activitytype, ARRAY_AGG(tag.name) AS tagnames FROM activity LEFT JOIN status ON activity.status = status.id LEFT JOIN activitytype ON activity.activitytype = activitytype.id LEFT JOIN tagactivity ON activity.id = tagactivity.activityid LEFT JOIN tag ON tagactivity.tagid = tag.id GROUP BY activity.id, status.title, activitytype.name"
  );
  return res;
};

//GET ALL ACTIVITIES - SQL
export const getAllCurrentActivities = async () => {
  const res = await db.query(
    "SELECT * FROM activity WHERE activity.status = 1 OR activity.status = 2"
  );
  return res;
};

//GET AN ACTIVITY FROM THE ACTIVITY_ID - SQL
export const getActivityFromId = async (activityId) => {
  const res = await db.query(
    `SELECT * FROM activity WHERE activity.id = ${activityId}`
  );
  return res;
};

//CREATE AN ACTIVITY - SQL (ONLY TASK NO TAGS ADDED HERE..)
export const createActivity = async (
  title,
  description,
  url,
  startdate,
  enddate,
  status,
  activitytype
) => {
  const res = await db.query(
    "INSERT INTO Activity (title, description, url, startdate, enddate, status, activitytype) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [title, description, url, startdate, enddate, status, activitytype]
  );
  return res;
};

//DELETE AN ACTIVITY - SQL (ONLY ACTIVITY NO TAGS ADDED HERE..)
export const deleteActivity = async (activityId) => {
  const res = await db.query(
    `DELETE FROM activity WHERE activity.id = ${activityId} RETURNING *`
  );
  return res;
};

//CANCEL STATUS FOR A ACTIVITY - SQL (ONLY ACTIVITY NO TAGS ADDED HERE..)
export const cancelActivity = async (activityId) => {
  const res = await db.query(
    `UPDATE activity SET status = 4 WHERE activity.id = ${activityId} RETURNING *`
  );
  return res;
};
