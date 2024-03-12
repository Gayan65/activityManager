import db from "../db/db.js";

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
