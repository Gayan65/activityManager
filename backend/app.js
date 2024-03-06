import express from "express";
import "dotenv/config";
import db from "./db/db.js";
import taskRouter from "./controllers/task_controllers.js";

const app = express();

//GET ENVS
const port = process.env.PORT;

//API ROUTES MIDDLEWARES
app.use("/task", taskRouter);

//BACKEND SEVER AND DATABASE CONNECTION
await db.connect().then(() => {
    console.log("DB connected successfully !....");
    app.listen(port, () => {
        console.log(`Server is running port number ${port}`);
    });
});
