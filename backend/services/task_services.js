import db from "../db/db.js";

//GET ALL TASKS - SQL
export const getAllTasks = async () => {
    const res = await db.query("SELECT * FROM task");
    return res;
};

//GET ALL ACTIVE TASKS - SQL
export const getAllActiveTasks = async () => {
    const res = await db.query(
        "SELECT * FROM task WHERE task.status = 1 OR task.status = 2;"
    );
    return res;
};

//GET A TASK FROM TASK_ID - SQL
export const getTaskFromId = async (taskId) => {
    const res = await db.query(`SELECT * FROM task WHERE task.id = ${taskId}`);
    return res;
};
