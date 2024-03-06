import db from "../db/db.js";

//GET ALL TASKS - SQL
export const getAllTasks = async () => {
    const res = await db.query("SELECT * FROM task");
    return res;
};
