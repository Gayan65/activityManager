import { db } from "../db/db.js";

//ADD A TAG - SQL
export const addTag = async (tag) => {
  const res = await db.query("INSERT INTO tag (Name) VALUES ($1) RETURNING *", [
    tag,
  ]);
  return res;
};

//ADD TASK TAG TO RELATIONAL TABLES - SQL
export const relationalTblUpdate = async (taskid, tagid) => {
  const res = await db.query(
    "INSERT INTO tagtask (taskid, tagid) VALUES ($1, $2)",
    [taskid, tagid]
  );
  return res;
};

//DELETE tagtask RELATIONAL DATA ROWS - SQL
export const deleteTagTaskRows = async (taskid) => {
  const res = await db.query(
    `DELETE FROM tagtask WHERE taskid = ${taskid} RETURNING *`
  );
  return res;
};

//DELETE tags DATA ROWS - SQL
export const deleteTagRows = async (tagid) => {
  const res = await db.query(
    `DELETE FROM tag WHERE tag.id = ${tagid} RETURNING *`
  );
  return res;
};

//UPDATE a TAG - SQL
export const updateTag = async (tag) => {
  const res = await db.query("UPDATE tag SET Name = $1 RETURNING *", [tag]);
  return res;
};

//UPDATE TASK TAG TO RELATIONAL TABLES - SQL
export const relationalTagUpdate = async (taskid, tagid) => {
  const res = await db.query(
    `UPDATE tagtask SET tagid = $1 WHERE tagtask.taskid = ${taskid}`,
    [tagid]
  );
  return res;
};

//ADD TASK TAG TO RELATIONAL TABLES - SQL
export const relationalTblUpdateActivity = async (activityid, tagid) => {
  const res = await db.query(
    "INSERT INTO tagactivity (activityid, tagid) VALUES ($1, $2)",
    [activityid, tagid]
  );
  return res;
};

//DELETE tagactivity RELATIONAL DATA ROWS - SQL
export const deleteTagActivityRows = async (activityid) => {
  const res = await db.query(
    `DELETE FROM tagactivity WHERE activityid = ${activityid} RETURNING *`
  );
  return res;
};
