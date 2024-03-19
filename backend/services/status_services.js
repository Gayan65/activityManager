import db from "../db/db.js";

//GET ALL ACTIVITIES - SQL
export const getAllActiveStatus = async () => {
  const res = await db.query(
    "SELECT * FROM status WHERE status.id = 1 OR status.id = 2 OR status.id = 3"
  );
  return res;
};
