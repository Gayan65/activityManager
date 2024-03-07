import db from "../db/db.js";

//GET ALL ACTIVITIES - SQL
export const getAllActivities = async () => {
    const res = await db.query("SELECT * FROM activity");
    return res;
};

//GET AN ACTIVITY FROM THE ACTIVITY_ID - SQL
export const getActivityFromId = async (activityId) => {
    const res = await db.query(
        `SELECT * FROM activity WHERE activity.id = ${activityId}`
    );
    return res;
};
