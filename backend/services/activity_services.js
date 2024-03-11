import db from "../db/db.js";

//GET ALL ACTIVITIES - SQL
export const getAllActivities = async () => {
    const res = await db.query(
        "SELECT activity.id, activity.title, activity.description, activity.url, activity.startdate, activity.enddate, status.title AS status, activitytype.name AS activitytype, ARRAY_AGG(tag.name) AS tagnames FROM activity LEFT JOIN status ON activity.status = status.id LEFT JOIN activitytype ON activity.activitytype = activitytype.id LEFT JOIN tagactivity ON activity.id = tagactivity.activityid LEFT JOIN tag ON tagactivity.tagid = tag.id GROUP BY activity.id, status.title, activitytype.name"
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
