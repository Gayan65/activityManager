import db from "../db/db.js";

//GET ALL ACTIVITIES - SQL
export const getAllActivities = async () => {
    const res = await db.query("SELECT * FROM activity");
    return res;
};
