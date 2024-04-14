import { db } from "../db/db.js";

//GET ALL ACTIVITIES - SQL
export const getAllActivities = async () => {
  const res = await db.query(
    "SELECT activity.id, activity.title, activity.description, activity.url, activity.startdate, activity.enddate, activity.status AS statustype ,status.title AS status, activitytype.name AS activitytype, ARRAY_AGG(tag.name) AS tagnames FROM activity LEFT JOIN status ON activity.status = status.id LEFT JOIN activitytype ON activity.activitytype = activitytype.id LEFT JOIN tagactivity ON activity.id = tagactivity.activityid LEFT JOIN tag ON tagactivity.tagid = tag.id GROUP BY activity.id, status.title, activitytype.name"
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
    `SELECT activity.id AS id, activity.title AS title, activity.description AS description, activity.url AS url, activity.startdate AS startdate, activity.enddate AS enddate, status.id AS status, status.title AS statustype , activitytype.id AS activitytype, ARRAY_AGG(tag.name) AS tags FROM activity LEFT JOIN status ON activity.status = status.id LEFT JOIN activitytype ON activity.activitytype = activitytype.id LEFT JOIN tagactivity ON activity.id = tagactivity.activityid LEFT JOIN tag ON tagactivity.tagid = tag.id WHERE activity.id = ${activityId} GROUP BY activity.id, activity.title, activity.description, activity.startdate, activity.enddate, status.id, activitytype.id`
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

//UPDATE AN ACTIVITY - SQL (ONLY ACTIVITY NO TAGS ADDED HERE..)
export const updateActivity = async (
  activityId,
  title,
  description,
  url,
  startdate,
  enddate,
  activitytype,
  status
) => {
  const res = await db.query(
    `UPDATE Activity SET Title = $1, Description =$2, url =$3, StartDate =$4, EndDate = $5, Activitytype = $6, Status = $7 WHERE activity.id = ${activityId} RETURNING *`,
    [title, description, url, startdate, enddate, activitytype, status]
  );
  return res;
};

//SEARCH ACTIVITY IN SQL
export const searchActivity = async (name, status, startdate, enddate) => {
  const queryParams = [];
  let queryString = `
    SELECT id, title, description, startdate, enddate, status FROM public.activity
    WHERE `;

  if (status !== undefined && status !== null) {
    queryString += `status = $${queryParams.length + 1}`;
    queryParams.push(status);
  } else {
    queryString += `TRUE`;
  }

  if (name) {
    queryString += ` AND activity.title = $${queryParams.length + 1}`;
    queryParams.push(name);
  }

  if (startdate) {
    queryString += ` AND startdate >= $${queryParams.length + 1}`;
    queryParams.push(startdate);
  }

  if (enddate) {
    queryString += ` AND enddate <= $${queryParams.length + 1}`;
    queryParams.push(enddate);
  }

  queryString += ` ORDER BY title;`;

  try {
    const res = await db.query(queryString, queryParams);
    return res;
  } catch (error) {
    // Handle the error appropriately
    console.error("Error executing SQL query:", error);
    throw error;
  }
};
