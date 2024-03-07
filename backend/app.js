import express from "express";
import "dotenv/config";
import cors from "cors";
import db from "./db/db.js";
import taskRouter from "./controllers/task_controllers.js";
import activityRouter from "./controllers/activity_controllers.js";

const app = express();

//GET ENVS
const port = process.env.PORT;

//API ROUTES MIDDLEWARES
app.use(cors());
app.use("/task", taskRouter);
app.use("/activity", activityRouter);

//BACKEND SEVER AND DATABASE CONNECTION
await db.connect().then(() => {
    console.log("DB connected successfully !....");
    app.listen(port, () => {
        console.log(`Server is running port number ${port}`);
    });
});
