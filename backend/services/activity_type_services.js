import { db } from "../db/db.js";

//GET ALL ACTIVITY TYPES - SQL
export const getAllActivityTypes = async () => {
  const res = await db.query("SELECT * FROM activitytype");
  return res;
};
